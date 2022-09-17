import mongoose from "mongoose";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

const dompurify = DOMPurify(new JSDOM().window);

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: {type: String, required: true },
    email: { type: String, required: true, index: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    sanitizedFirstName: { type: String, required: true },
    sanitizedLastName: { type: String, required: true },
    sanitizedEmail: { type: String, required: true, index: true, unique: true },
    sanitizedPassword: { type: String, required: true }
});

userSchema.pre('validate', function(next) {
    if(this.first_name) {
        this.sanitizedFirstName = dompurify.sanitize(this.first_name)
    }
    if(this.last_name) {
        this.sanitizedLastName = dompurify.sanitize(this.last_name)
    }
    if(this.email) {
        this.sanitizedEmail = dompurify.sanitize(this.email)
    }
    if(this.password) {
        this.sanitizedPassword = dompurify.sanitize(this.password)
    }
    next();
});

const User = mongoose.model('User', userSchema);

export default User;