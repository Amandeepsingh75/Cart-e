const User = require('../models/user.model.js')
const uploadOnCloud = require('../utils/cloudinary.js')

// to generate access token function
const generateAccessToken = async (user_id) => {
  try {
    const getUser = await User.findById(user_id);
    const accessToken = getUser.accessGenerateToken();
    return { accessToken };
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while generating access token" });
  }
};
// options for cookies
const optionsforCookies = {
    httpOnly: false,
    secure: true,
    sameSite: 'None',
}

// register logic
const userRegiter = async (req, res) => {
    try {
        const { email, username, password } = req.body
        if ([email, username, password].some((fields) => fields?.trim() == '')) {
            return res.status(400).json('All fields are required')
        }
        const userExist = await User.findOne({
            $or: [{ email }, { username }]
        })
        if (userExist) {
            return res.status(409).json('User already exist')
        }
        const avatarImage = req.file?.path
        if (!avatarImage) return res.status(400).json('Please upload profile image')
            const avatarImageUpload = await uploadOnCloud(avatarImage)
        if (!avatarImageUpload) return res.status(400).json('profile image not upload on cloudinary ')
        const user = await User.create({ username: username.toLowerCase(), email, password , avatar:avatarImageUpload.url })
        const createdUser = await User.findById(user._id).select('-password')
        if (!createdUser) {
            return res.status(500).json({ msg: 'user not created by backend' })
        }
        res.status(201).json({ data: createdUser })

    } catch (error) {
        res.status(400).json({ message: 'resgisteration failed' })
    }
}


// login logic 
const userLogin = async (req, res) => {
    try {
        const { email, username, password } = req.body
        if (!email && !username) {
            return res.status(400).json('Invalid credentials')
        }
        const user = await User.findOne({ $or: [{ username }, { email }] })
        if (!user) {
            return res.status(400).json({ msg: 'User does not exist' })
        }
        if (password !== user.password) { return res.status(400).json('Invalid credentials pass') };
        const { accessToken } = await generateAccessToken(user._id)
        const getLoginUserData = await User.findById(user._id).select('-password')
        return res.status(200).cookie('accessToken', accessToken, optionsforCookies).json({ message: 'User Login Successfull', data: getLoginUserData })

    } catch (error) {
        console.error(error);
        res.status(401).json('User does not login ')
    }
}

// logout user logic
const userLogout = async (req, res) => {
    try {
        return res.status(200).clearCookie('accessToken', optionsforCookies).json({
            data: {},
            msg: 'User logout successfull'
        })
    } catch (error) {
        console.error(error);
        res.status(401).json('User logout failed ')
    }
}

// get login user data
const getLoginUser = async (req, res) => {
    return res.status(200).json({ userData: req.user })
}

// get all users . we don't need it in our assignment.
const getAllUser = async (req, res) => {
    try {
        const allUser = await User.find({});
        res.status(200).json(allUser);
    } catch (error) {
        res.status(400).json('error fetching all users', error)
    }
}
module.exports = { userRegiter, userLogin, userLogout, getLoginUser, getAllUser }
