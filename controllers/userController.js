const { registerService, loginService, updateProfileService } = require("../services/userService.js");

exports.registerController = async (req, res) => {
  try {
    const body = req.body;
    const response = await registerService(body);

    const { success, message, status, data } = response;
    if (success) {
      return res.status(status).json({ message, data });
    } else {
      return res.status(status).json({ message, data });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error });
  }
};

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await loginService(email, password);

    const { success, message, status, data } = response;
    if (success) {
      return res.status(status).json({ message, data });
    } else {
      return res.status(status).json({ message, data });
    }
  } catch (error) {
    console.log("Error: ", error);

    return res.status(500).json({ message: "Something went wrong", data: error });
  }
};

exports.profileController = async (req, res) => {
  try {
    const user = req.user

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    } else {
      return res.status(200).json({ message: "User details get successfully.", data: user });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", data: error });
  }
};

exports.updateProfileController = async (req, res) => {
  try {
    const user = req.user;
    const { name, email } = req.body;
    const response = await updateProfileService(user, name, email);

    const { success, message, status, data } = response;
    if (success) {
      return res.status(status).json({ message, data });
    } else {
      return res.status(status).json({ message, data });
    }
  } catch (error) {
    console.log("Error: ", error);

    return res.status(500).json({ message: "Something went wrong", data: error });
  }
};
