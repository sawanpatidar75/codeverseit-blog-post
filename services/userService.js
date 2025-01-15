const userModel = require("../models/userModel");
const { generateToken } = require("../utils/helperFunction");

exports.registerService = async (data) => {
    const { name, email, password } = data;
    const formatEmail = email.toLowerCase();
    const checkUser = await userModel.findOne({ email: formatEmail });

    if (checkUser) {
        return {
            status: 409,
            success: false,
            message: "User already exists",
            data: null,
        };
    }

    const user = await userModel.create({
        name,
        email: formatEmail,
        password: password,
    });
    if (!user) {
        return {
            status: 401,
            success: false,
            message: "User not created",
            data: null,
        };
    };

    return {
        status: 201,
        success: true,
        message: "User registered successfully",
        data: null,
    };
};

exports.loginService = async (email, password) => {
    const formatEmail = email.toLowerCase();
    const checkUser = await userModel.findOne({ email: formatEmail });

    if (!checkUser) {
        return {
            status: 400,
            success: false,
            message: "Incorrect email or password",
            data: null,
        };
    }

    const passwordMatch = await checkUser.comparePassword(password);
    if (!passwordMatch) {
        return {
            status: 400,
            success: false,
            message: "Incorrect email or password",
            data: null,
        };
    };

    const payload = {
        id: checkUser._id,
        email: checkUser.email,
    };
    const token = await generateToken(payload);
    console.log(token);
    if(!token){
        return {
            status: 500,
            success: false,
            message: "Token not generated",
            data: null,
        };
    }

    return {
        status: 200,
        success: true,
        message: "User login successfully",
        data: token,
    };
};

exports.updateProfileService = async (user, name, email) => {
    const formatEmail = email.toLowerCase();
    const checkUser = await userModel.findById(user._id);
    if (!checkUser) {
        return {
            status: 400,
            success: false,
            message: "User not found",
            data: null,
        };
    }

    const checkEmail = await userModel.findOne({ email: formatEmail });
    if (checkEmail && checkEmail._id != user._id) {
        return {
            status: 409,
            success: false,
            message: "Email already exists",
            data: null,
        };
    }

    checkUser.name = name;
    checkUser.email = formatEmail;
    await checkUser.save();

    return {
        status: 200,
        success: true,
        message: "User updated successfully",
        data: null,
    };
};