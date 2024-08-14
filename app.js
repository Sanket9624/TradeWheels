const express = require('express');
const app = express();
const cors = require('cors');


app.use(cors({
    origin: '*',
}));


app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Routes
const userRoute = require('./Routes/user');
const sellCarRoute = require('./Routes/sellCar');
const imageUploadRoute = require('./Routes/imageUpload');
const filterCarRoute = require('./Routes/filterCar');
const testDriveRoute = require('./Routes/testDrive');



app.use('/api/user',userRoute);
app.use('/api/sellCar',sellCarRoute);
app.use('/api/images',imageUploadRoute);
app.use('/api/filter',filterCarRoute);
app.use('/api/testDrive',testDriveRoute);

const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`port is running on http://localhost:${port}`);
})