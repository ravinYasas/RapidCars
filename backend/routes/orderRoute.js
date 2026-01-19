import express from "express"
import authMiddleware from '../middleware/auth.js'
import adminAuth from "../middleware/adminAuth.js";
import { placeOrder,userOrders,placeOrderRazorpay,placeOrderStripe,allOrders,updateStatus, verifyStripe } from "../controllers/orderController.js";


const orderRouter =express.Router();


//payment Features
orderRouter.post('/place',authMiddleware,placeOrder)
orderRouter.post('/stripe',authMiddleware,placeOrderStripe)
orderRouter.post('/razorpay',authMiddleware,placeOrderRazorpay)
//user Featrure
orderRouter.post('/userorders',authMiddleware,userOrders)

//admin Features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

//verify payment 
orderRouter.post('/verifyStripe',authMiddleware,verifyStripe)

export default orderRouter