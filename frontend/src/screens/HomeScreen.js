import React, {useEffect} from 'react';
import {Row, Col, Carousel} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {listProducts} from '../actions/productActions';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';

const HomeScreen = ({match}) => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const {loading, error, products} = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <Carousel pause="hover">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/airmag2.jpeg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/lilnas.jpeg"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/airj10.jpeg"
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/nikeairyeezys.jpeg"
            alt="Fourth slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/airj12.jpeg"
            alt="Fifth slide"
          />
        </Carousel.Item>
      </Carousel>

      
      <></>
      <h1>TOP-PICKED SNEAKERS !</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger ">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={6} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
