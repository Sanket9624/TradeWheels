const twilio = require('twilio');
const dotenv = require('../dotenv');
const jwt = require('jsonwebtoken');
const client = new twilio(process.env.TWILIO_SID,process.env.TWILIO_TOKEN);
const models = require('../models') 

const sendOtp = async (phone_number) => {
    return await client.verify.v2.services(process.env.SERVICE_ID)
            .verifications
            .create({to:`+91${phone_number}`,channel:'sms'});
};

const verifyOtp = async (phone_number, code) => {
    try {
        const verification_check = await client.verify.v2.services(process.env.SERVICE_ID)
            .verificationChecks
            .create({ to: `+91${phone_number}`, code: `${code}` });

        return verification_check;
    } catch (error) {
        console.error('Error verifying OTP:', error.response ? error.response.data : error.message);
        throw new Error(`Verification failed: ${error.message}`);
    }
};


const registerUser = async (full_Name,phone_number) => {
    const user = await models.User.create({full_Name,phone_number});
    return user;
};

const findUserById = async (id) => {
    return models.User.findOne({where:{id}});
};

const updateUserVerification = async (id, isVerified) => {
    const user = await models.User.findOne({ where: { id } });
    if (user) {
        user.is_verified = isVerified;
        await user.save();
    }
    return user;
};

const getUserName = async (req, res) => {

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const phone_number = decoded.phone_number;
        const full_name = await userService.getFullNameByNumber(phone_number);
        if (!full_name) {
            return res.status(404).json({ message: 'User not found' });
        }

        const initials = full_name.split(' ').map(name => name.charAt(0).toUpperCase()).join('');
        res.status(200).json({ userName: initials });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const updateUserFullName = async (userId, full_Name) => {
    const user = await models.User.findByPk(userId);
    if (!user) {
        throw new Error('User not found');
    }

    user.full_Name = full_Name;
    await user.save();

    return user;
};

const updateUserPhoneNumber = async (id, new_phone_number) => {
    const user = await models.User.findByPk(id);
    if (!user) {
        throw new Error('User not found');
    }

    user.phone_number = new_phone_number;
    user.is_verified = false; 

    await user.save();
};


const generateToken = (user) => {
    return jwt.sign({ id: user.id, phone_number: user.phone_number }, process.env.JWT_KEY, { expiresIn: '1h' });
};

module.exports = {
    sendOtp,
    verifyOtp,
    registerUser,
    findUserById,
    updateUserVerification,
    updateUserFullName,
    updateUserPhoneNumber,
    getUserName,
    generateToken
    
}