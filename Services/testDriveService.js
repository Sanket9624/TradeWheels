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
      subject: `Your Test Drive Booking for ${car.brand} ${car.model} is Confirmed`,
      html: `
        <p>Dear <strong>${user.full_Name}</strong>,</p>
        <p>Thank you for choosing to book a test drive with us! We're excited to confirm your booking for the <strong>${car.brand} ${car.model}</strong>.</p>
        <p><strong>Booking Details:</strong></p>
        <ul>
          <li><strong>Car:</strong> ${car.brand} ${car.model}</li>
          <li><strong>Date:</strong> ${scheduledDate}</li>
          <li><strong>Time:</strong> ${scheduledTime}</li>
        </ul>
        <p>Please make sure to arrive on time and bring a valid driver's license with you. Our team will be ready to assist you with the test drive experience.</p>
        <p>If you have any questions or need to reschedule, feel free to contact us.</p>
        <p>Looking forward to seeing you!</p>
        <p>Best regards,<br>TradeWheels</p>
        <hr>
        <p><em>Note: This is an automated email. Please do not reply directly to this message.</em></p>
      `
    });

    // Send email to car owner
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: carOwner.email,
      subject: `New Test Drive Booking for Your ${car.brand} ${car.model}`,
      html: `
        <p>Dear <strong>${carOwner.full_Name}</strong>,</p>
        <p>We wanted to inform you that a test drive has been booked for your car, the <strong>${car.brand} ${car.model}</strong>.</p>
        <p><strong>Booking Details:</strong></p>
        <ul>
          <li><strong>Booked by:</strong> ${user.full_Name}</li>
          <li><strong>Date:</strong> ${scheduledDate}</li>
          <li><strong>Time:</strong> ${scheduledTime}</li>
        </ul>
        <p>Please ensure that the car is available and in good condition at the scheduled time. If you have any concerns or need to reschedule, please contact us as soon as possible.</p>
        <p>Thank you for being a valued part of our community!</p>
        <p>Best regards,<br>TradeWheels</p>
        <hr>
        <p><em>Note: This is an automated email. Please do not reply directly to this message.</em></p>
      `
    });

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
