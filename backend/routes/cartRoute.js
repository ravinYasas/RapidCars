import express from "express"
import authMiddleware from "../middleware/auth.js"
import { addToCart, getcart,updateCart, removeFromCart } from "../controllers/cartController.js";
const cartRouter = express.Router();

cartRouter.post('/add',authMiddleware,addToCart)
cartRouter.post('/remove',authMiddleware,removeFromCart)
cartRouter.post('/get',authMiddleware,getcart)
cartRouter.post('/update',authMiddleware,updateCart)

export default cartRouter;