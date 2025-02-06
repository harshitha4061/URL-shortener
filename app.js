const express=require("express")
const path=require("path")
const userRoute=require("./routes/router")
const staticRouter=require("./routes/route")
const connection=require("./connection")
const url=require("./models/model")
require('dotenv').config();

const app=express()
const PORT=process.env.PORT

app.set("view engine","ejs");
app.set("views",path.resolve("./views")); //compatibility with other os like in linux/max=/ and in windows=\, (redunctant \),etc

app.use(express.urlencoded({extended:false}))
app.use(express.json())
connection(process.env.MONGO_URL).then(()=>{
app.listen(PORT,()=>{
    console.log(`server started at port ${PORT}`)  
})})

app.use("/url",userRoute)
app.use("/",staticRouter)

app.get("/task",(req,res)=>{
    // return res.end("<h1>hello world!</h1>")
    return res.render("home")
})

app.get("/:shortid", async (req, res) => {
    const short = req.params.shortid;
    console.log("Received shortid:", short);  // Log the shortid to check if it's correct

    const result = await url.findOneAndUpdate(
        { shortid:short },
        {
            $push: {
                visithistory: { timestamp: Date.now() }
            }
        }
    );

    if (!result) {
        return res.status(404).json({ error: "Short URL not found" });
    }

    console.log("Redirect URL found:", result.redirecturl);  // Log the redirect URL to ensure it's correct

    res.redirect(result.redirecturl);
});
