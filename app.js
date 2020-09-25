// Modules
const express = require('express');
const indexRoutes = require("./routes/index");
const authRoute = require('./routes/auth');
const accountRoute = require('./routes/account.route');
const entryRoute = require('./routes/entry.route');
const dotenv = require('dotenv'); 
const mongoose = require('mongoose');
// const verify = require('./routes/verifyToken');

// modules config
const app = express();
dotenv.config();

const port = process.env.PORT;

// DB connection
mongoose.connect(
    process.env.DB_CONNECTION,
    {useNewUrlParser: true,useUnifiedTopology: true },
    () => console.log("Connected DB")
);



const middleware = (req,res,next)=>{
    console.log(req.method +" "+req.url);   
    next();
}

app.use(middleware);
app.use(express.json());
app.use(express.static(__dirname + '/public'));


// Custom routes
app.use('/auth',authRoute);
app.use('/account',accountRoute);
app.use('/entry',entryRoute);

app.use("/index", indexRoutes);



app.get("/", (req, res) => 
    res.sendFile(__dirname+"/views/index.html")
); 

app.get("/home",(req, res) => 
    res.sendFile(__dirname+"/views/home.html")
);


app.listen(port, () => {
    console.log("Example app listening on port port!");
});