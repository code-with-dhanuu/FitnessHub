import { Schema, model } from 'mongoose'

const userSchema = new Schema(
    {
        user_id: {
            type: String,
            required: true,
            unique: true
        },

        firstname: {
            type: String,
            required: true
        },

        lastname: {
            type: String,
            required: true
        },

        username: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true
        },

        mobileNo: {
            type: Number,
            required: true
        },

        city: {
            type: String,
            required: true
        },

        state: {
            type: String,
            required: true
        },

        pincode: {
            type: Number,
            required: true
        },

        password: {
            type: String,
            minlength: 8,
            required: true
        },

        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
            required: true
        },

        img: {
            type: String
        }

    },

    {
        timestamps: true
    }

)

const User = model("User", userSchema)

export default User;