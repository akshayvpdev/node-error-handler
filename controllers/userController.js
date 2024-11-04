const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const customError = require("../utils/customError");



exports.getUsers = asyncHandler(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        status: 'success',
        data: {
            users
        }
    });
});

exports.getUserById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        return next(new customError("User not existt", 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
});


exports.updateUser = asyncHandler(async (req, res, next) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!updatedUser) {
        return next(new AppError('User not found', 404));
    }
    res.status(200).json({
        status: 'updated successfully',
        data: {
            user: updatedUser
        }
    });
});
