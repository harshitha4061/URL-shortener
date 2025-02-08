const express=require("express");
const router=express.Router();
const {generateurl,getanalytics}=require("../controllers/functioncontrol")

router.post("/",generateurl)
router.get("/analytics/:shortid",getanalytics)
module.exports=router;