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

const findUserByNumber = async (phone_number) => {
    return models.User.findOne({where:{phone_number}});
};

const updateUserVerification = async (phone_number, isVerified) => {
    const user = await models.User.findOne({ where: { phone_number } });
    if (user) {
        user.is_verified = isVerified;
        await user.save();
    }
    return user;
};

const getUserName = async (req, res) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Authorization token is required' });
    }

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

const generateToken = (user) => {
    return  jwt.sign({id : user.id , phone_number:user.phone_number},process.env.JWT_KEY,{expiresIn:'1h'});
};

module.exports = {
    sendOtp,
    verifyOtp,
    registerUser,
    findUserByNumber,
    updateUserVerification,
    getUserName,
    generateToken
    
}