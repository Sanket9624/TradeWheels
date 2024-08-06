const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Routes
const userRoute = require('./Routes/user');
const sellCarRoute = require('./Routes/sellCar');


app.use('/api/user',userRoute);
app.use('/api/sellCar',sellCarRoute);

const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`port is running on http://localhost:${port}`);
})