import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { productListReducer, productDetailsReducer, productDeleteReducer, productCreateReducer, productUpdateReducer, productReviewCreateReducer } from './reducers/productReducers.js';
import { composeWithDevTools } from 'redux-devtools-extension';
import { cartReducer } from './reducers/cartReducers.js';
import { userLoginReducer,userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userListReducer, userDeleteReducer, userUpdateReducer } from './reducers/userReducers.js';
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderListMyReducer, orderListReducer, orderDeliverReducer } from './reducers/orderReducers'


const reducer = combineReducers({
    productList : productListReducer,
    productDetails : productDetailsReducer,
    cart :  cartReducer,
    userLogin: userLoginReducer,
    userRegister : userRegisterReducer,
    userDetails : userDetailsReducer,
    userUpdateProfile : userUpdateProfileReducer,
    orderCreate : orderCreateReducer,
    orderDetails : orderDetailsReducer,
    orderPay : orderPayReducer,
    orderDeliver : orderDeliverReducer,
    orderListMy : orderListMyReducer,
    orderList : orderListReducer,
    userList : userListReducer,
    userDelete : userDeleteReducer,
    userUpdate : userUpdateReducer,
    productDelete : productDeleteReducer,
    productCreate : productCreateReducer,
    productUpdate : productUpdateReducer,
    productReviewCreate : productReviewCreateReducer

})

const cartItemsfromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfofromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const shippingAddressfromStorage = localStorage.getItem('shippingAddres') ? JSON.parse(localStorage.getItem('shippingAddress')) : {  }

const initialState = {
    cart : {cartItems : cartItemsfromStorage,
            shippingAddress : shippingAddressfromStorage},
    userLogin : {userInfo : userInfofromStorage}
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store