//CUSTOM MIDDLEWARE
const validateUser = async (req, res, next) => {
    const user = req.user;
        if(user.body && Object.keys(req.body).length > 0) {
        res.status(200)
        next();
        } else {
            res.status(500).json({
                message: 'Missing user data!'
            })
        }
};

module.exports = validateUser