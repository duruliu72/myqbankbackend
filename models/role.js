const mongoose = require("mongoose");
const Joi = require('joi');
const roleSchema = new mongoose.Schema({
    roleName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        unique: true
    },
    roleid: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
        unique: true
    },
    permissionValue: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
        unique: true
    }
}, { timestamps: true });
module.exports.Role = mongoose.model('role', roleSchema);
module.exports.validate = function (role) {
    const schema = Joi.object({
        roleName: Joi.string()
            .min(5)
            .max(50)
            .required(),
        roleid: Joi.number().min(0).max(255).required(),
        permissionValue: Joi.number().min(0).max(255).required()
    });
    return schema.validate(role);
};