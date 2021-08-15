import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Rating from '../components/Rating';

import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProductDetails, createProductReview } from '../actions/productActions';

import {PRODUCT_CREATE_REVIEW_RESET} from '../constants/productConstants'


function ProductScreen({ history,match }) {

    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0) 
    const [comment, setComment] = useState('')   

    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails ;

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const { error: errorReviewCreate, success : successReviewCreate} = productReviewCreate ;

    const userLogin = useSelector(state => state.userLogin)
    const{ userInfo } = userLogin



    useEffect(() => {

        if(successReviewCreate){
          alert('Review submitted')
          setRating(0)
          setComment('')
          dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
        }
       
        dispatch(listProductDetails(match.params.id))
        

    }, [dispatch, match, successReviewCreate])

    const addToCartHandler = () => {
      history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const submitHandler = (e) => {
      e.preventDefault()
      dispatch(createProductReview(match.params.id, { rating, comment}))

    }

    return (
      <>
        <Link className="btn btn-dark my-3" to="/">
          Go back
        </Link>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger ">{error}</Message>
        ) : (
          <>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h2>{product.name}</h2>
                </ListGroupItem>
                <ListGroupItem>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroupItem>
                <ListGroupItem>
                  <h3>₹{product.price}</h3>
                </ListGroupItem>
                <ListGroupItem>
                  Description : {product.description}
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <Row>
                      <Col>Price : {product.price}</Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>
                        Availability :{' '}
                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                      </Col>
                    </Row>
                  </ListGroupItem>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                    <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control as = 'select' value={qty} onChange= {(e) => setQty(e.target.value)}>
                            {[...Array(product.countInStock).keys()].map((x) => (
                              <option key={x+1} value={x+1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                    </Row>
                    </ListGroup.Item>
                    
                  )}
                  <ListGroupItem>
                    <Button
                    onClick={addToCartHandler}
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                    >
                      Add to Cart
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No reviews yet</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map(review => (
                  <ListGroup.Item key = {review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0,10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a customer review</h2>
                  {errorReviewCreate && <Message variant='danger'>{errorReviewCreate}</Message>}
                  {userInfo ? (
                    <Form onSubmit= {submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>
                          Rating
                        </Form.Label>
                        <Form.Control as = 'select' value={rating} onChange={(e) => setRating(e.target.value)}>
                            <option value='1'>1 - Poor </option>
                            <option value='2'>2 - Fair </option>
                            <option value='3'>3 - Average </option>
                            <option value='4'>4 - Good </option>
                            <option value='5'>5 - Very good </option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                          <Form.Control as='textarea' row='3' value={comment} onChange = {(e) => setComment(e.target.value)}>

                          </Form.Control>

                      </Form.Group>
                      <Button variant='primary' type='submit'>
                        Submit
                      </Button>
                  </Form>) : <Message variant='danger'>Please <Link to='login'>Sign in</Link> to write a review</Message>}
                  {' '}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          </>
        )}
      </>
    );
}

export default ProductScreen
