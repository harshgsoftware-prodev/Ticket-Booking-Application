const User = require("../models/user.model");

const getUser = async (req, res) => {
    const user = await User.findById(req.user.id).select("name email");

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
};

module.exports = { getUser };
