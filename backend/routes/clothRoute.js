import express from "express"
import { addCloth, listCloth, removeCloth, singleCloth, updateCloth } from "../controllers/clothController.js"
import multer from "multer"
import adminAuth from "../middleware/adminAuth.js";


const clothRouter= express.Router();

//image storage 
const storage = multer.diskStorage({
    filename:function(req,file,callback){
        callback(null,file.originalname)
    }
})

const upload =multer({storage})

clothRouter.post("/add",adminAuth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),addCloth)
clothRouter.get('/list',listCloth)
clothRouter.post('/remove',adminAuth,removeCloth)
clothRouter.post('/update',upload.single("image"),updateCloth)
clothRouter.post('/single',singleCloth)

export default clothRouter;