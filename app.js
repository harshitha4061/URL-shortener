const express = require("express")
const path = require("path")
const connection = require("./connection")
const url = require("./models/functionmodel")

const functionRoute = require("./routes/router")
const staticRouter = require("./routes/staticrouter")
const userRouter=require("./routes/user")

require('dotenv').config();

const app = express()
const PORT = process.env.PORT

//middleware for views
app.set("view engine", "ejs");
app.set("views", path.resolve("./views")); //compatibility with other os like in linux/max=/ and in windows=\, (redunctant \),etc


//middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
connection(process.env.MONGO_URL).then(() => {
    app.listen(PORT, () => {
        console.log(`server started at port ${PORT}`)
    })
})

app.use("/url", functionRoute)
app.use("/", staticRouter)
app.use("/handle",userRouter)

app.get("/task", (req, res) => {
    // return res.end("<h1>hello world!</h1>")
    return res.render("home")
})

app.get("/url/:shortid", async (req, res) => {
    const short = req.params.shortid;
    console.log("Received shortid:", short);  // Log the shortid to check if it's correct

    const result = await url.findOneAndUpdate(
        { shortid: short },
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
