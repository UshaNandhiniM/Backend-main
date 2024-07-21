import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import connectDB from './Database/Config.js';
import userRouter from './Routers/userRoute.js';
import productRoute from './Routers/productRoute.js'
import orderRoute from './Routers/orderRoute.js'

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
    origin:"*",
    credentials: true,
}));

//DB connection
connectDB();

app.use((err, req, res, next) => {
  const statusCode = res.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});


//route
app.use('/api/user',userRouter)
app.use('/api/product',productRoute)
app.use('/api/order',orderRoute)

app.get('/', (req, res) => {
  res.status(200).send("hi welcome car service project")

})

app.listen(process.env.PORT, () =>{
 console.log('Server running on port')
});
