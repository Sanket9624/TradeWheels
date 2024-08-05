const userService = require('../Services/userService');

const sendOtp = async(req,res) => {
    const { phone_number } = req.body;
    try{
        userService.sendOtp(phone_number);
        res.status(500).json({
            message:'OTP sent Succesfully'
        });
    }catch(error){
        res.status(500).json({
            message : error.message
        });
    }
};

const verifyOtp = async (req, res) => {
    const { phone_number, code, full_Name } = req.body;
    try {
        const verification = await userService.verifyOtp(phone_number, code);
        console.log('Verification Response:', verification);

        if (verification.status === 'approved') {
            let user = await userService.findUserByNumber(phone_number);
            if (!user) {
                user = await userService.registerUser(full_Name, phone_number);
            }
            const token = userService.generateToken(user);
            await userService.updateUserVerification(phone_number, true);
            res.status(200).json({
                message: 'User registered successfully',
                token: token
            });
        } else {
            res.status(400).json({
                message: 'Invalid OTP'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

const getUserName = async (req, res) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Authorization token is required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const phone_number = decoded.phone_number;
        const user = await userService.findUserByNumber(phone_number);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const full_name = user.full_Name;
        const initials = full_name.split(' ').map(name => name.charAt(0).toUpperCase()).join('');
        res.status(200).json({ userName: initials });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const logout = async (req, res) => {
    const token = req.headers['authorization'];
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            await userService.updateUserVerification(decoded.phone_number, false);
        } catch (error) {
            console.error('Failed to decode token during logout', error);
        }
    }
    res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = {
    sendOtp,
    verifyOtp,
    getUserName,
    logout
}