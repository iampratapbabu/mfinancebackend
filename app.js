const express = require("express");
const morgan = require('morgan');
const userRouter = require("./routes/userRoute");
const portfolioRouter = require("./routes/portfolioRoute");
const serviceRoute = require("./routes/serviceRoute");
const utilsRoute = require("./routes/utilRoute");

const cronService = require('./scripts/cronService');


const app=express();
app.use(express.json());

//running custom scripts or cron
cronService.main();

//dev middleware
if(process.env.NODE_ENV="development"){
	app.use(morgan('dev'));
};

//for making request without errors
//in official language called cors error handling
app.use((req,res,next) =>{
	//res.header("Access-Control-Allow-Credentials","true");
	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Headers","Origin, X-Requested-With,x-auth-token, Content-Type, Accept,Authorization,x-access-token");
	res.header("Access-Control-Allow-Methods","GET,OPTIONS,POST,PUT,PATCH,DELETE");
	next();
});

app.get('/',(req,res)=>{
  res.send("mFinance Server STATUS:[UP]");
});


//routing middlewares
app.use('/api/users',userRouter);
app.use('/api/portfolio',portfolioRouter);
app.use('/api/service',serviceRoute);
app.use('/api/utils',utilsRoute);




//no route handling
app.use('*',(req,res)=>{
	res.status(404).json({
		message:"No Routes Defined at this Path"
	})
})




module.exports = app;