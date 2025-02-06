const shortId=require("shortid")
const url=require("../models/model");

async function generateurl(req,res){
    const body=req.body
    if (!body.url) return res.status(400).json({"error":"url is required"})
     const short=shortId();
     await url.create({
        shortid:short,
        redirecturl:body.url,
        visithistory:[]
     })
     return res.render("home",{id:short})
}

async function getanalytics(req, res) {
    const short = req.params.shortid;
    const result = await url.findOne({ shortid:short });

    // console.log("Short ID:", short);
    // console.log("Database Result:", result);

    if (!result) {
        return res.status(404).json({ error: "Short URL not found" });
    }

    return res.json({
        totalclicks: result.visithistory.length, 
        analytics: result.visithistory, 
    });
}

module.exports={
    generateurl,
    getanalytics
}