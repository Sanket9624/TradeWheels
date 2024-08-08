const { bookTestDrive , getTestDrivesByUserId } = require('../Services/testDriveService');

const bookTestDriveController = async (req, res) => {
  try {
    const { carId } = req.params;
    const { scheduledDate, scheduledTime } = req.body;
    const userId = req.userData.id; // Assuming user ID is stored in the request object after authentication

    if (!carId || !scheduledDate || !scheduledTime) {
      return res.status(400).json({ message: 'Car ID, scheduled date, and scheduled time are required' });
    }

    const testDrive = await bookTestDrive(carId, userId, scheduledDate, scheduledTime);

    res.status(200).json({ message: 'Test drive booked successfully', testDrive });
  } catch (error) {
    res.status(500).json({ message: 'Error booking test drive', error: error.message });
  }
};

const getTestDrivesByUserIdController = async (req, res) => {
    try {
      const userId = req.userData.id; // Assuming user ID is stored in the request object after authentication
  
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }
  
      const testDrives = await getTestDrivesByUserId(userId);
  
      res.status(200).json({ testDrives });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching test drives', error: error.message });
    }
  };
  

module.exports = { 
    bookTestDriveController,
    getTestDrivesByUserIdController
 };
