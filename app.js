var express = require('express');
const routes = require("./routes/index");
const path = require("path");
const app = express();
const port = 3000;

const middleware = (req,res,next)=>{
    console.log(req.method +" "+req.url);   
    next();
}
app.use(middleware);
// app.use(express.static(__dirname+"/public"));
app.use(express.static(__dirname + '/public'));
// app.get("/", (req, res) => res.send("Test", { 'Content-Type': 'text/plain' }, 200));

app.use("/index", routes);


app.get("/", (req, res) => 
    res.sendFile(__dirname+"/views/index.html")
);

app.get("/home", (req, res) => 
    res.sendFile(__dirname+"/views/home.html")
);


app.listen(port, () => {
    console.log("Example app listening on port port!");
});