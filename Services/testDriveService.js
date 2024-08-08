const nodemailer = require('nodemailer');
const { TestDrive, Car, User } = require('../models');

// Configure the email transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

const bookTestDrive = async (carId, userId, scheduledDate, scheduledTime) => {
  try {
    // Check if car exists
    const car = await Car.findOne({ where: { id: carId } });
    
    if (!car) {
      throw new Error('Car not found');
    }

    const existingTestDrive = await TestDrive.findOne({
        where: { car_id: carId, user_id: userId }
      });
  
      if (existingTestDrive) {
        const { scheduled_date, scheduled_time } = existingTestDrive;
        throw new Error(`Test drive already booked on ${scheduled_date} at ${scheduled_time}`);
      }
  

    // Create a test drive booking
    const testDrive = await TestDrive.create({
      car_id: carId,
      user_id: userId,
      scheduled_date: scheduledDate,
      scheduled_time: scheduledTime,
    });
    

    // Fetch user and car owner details
    const user = await User.findOne({ where: { id: userId } });
    const carOwner = await User.findOne({ where: { id: car.user_id } });

    if (!user || !carOwner) {
      throw new Error('User or car owner not found');
    }

    // Send email to user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Test Drive Booking Confirmation',
      text: `Your test drive booking for the car ${car.brand} ${car.model} on ${scheduledDate} at ${scheduledTime} has been confirmed.`,
    });

    // Send email to car owner
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: carOwner.email,
      subject: 'New Test Drive Booking',
      text: `A test drive for your car ${car.brand} ${car.model} has been booked by ${user.full_Name} on ${scheduledDate} at ${scheduledTime}.`,
    });
    console.log(carOwner.email);
    

    return testDrive;
  } catch (error) {
    throw new Error(`Error booking test drive: ${error.message}`);
  }
};

const getTestDrivesByUserId = async (userId) => {
    try {
      const testDrives = await TestDrive.findAll({
        where: { user_id: userId }
      });
  
      return testDrives;
    } catch (error) {
      throw new Error(`Error fetching test drives: ${error.message}`);
    }
  };
  

module.exports = { 
    bookTestDrive,
    getTestDrivesByUserId
 };
