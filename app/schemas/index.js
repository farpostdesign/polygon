const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const { Schema } = mongoose;

/**
 * Project Schema
 *
 */

module.exports.ProjectSchema = new Schema({
    name: { type: String, required: true },
    parent: { type: Schema.ObjectId, ref: 'Project' }
}, { timestamps: true });

/**
 * Design Schema
 *
 */

module.exports.DesignSchema = new Schema({
    name: { type: String, required: true },
    project: { type: Schema.ObjectId, ref: 'Project', required: true }
}, { timestamps: true });

/**
 * File Schema
 *
 */

module.exports.FileSchema = new Schema({
    filename: { type: String, required: true },
    position: { type: Number, required: true, min: 0 },
    design: { type: Schema.ObjectId, ref: 'Design', required: true }
}, { timestamps: true });

/**
 * User Schema
 *
 */

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    // password salt
    salt: { type: String, required: true },
    // hashed password with salt
    hash: { type: String, required: true }
}, { timestamps: true });

UserSchema.virtual('password').set(function setUserSchemaPassword(val) {
    this.__passwordToHash = val;
});

UserSchema.pre('save', function beforeUserSchemaSave(next) {
    if (!this.__passwordToHash) return next();
    const pass = this.__passwordToHash;

    Reflect.deleteProperty(this, '__passwordToHash');
    this.setPassword(pass, (err) => {
        if (err) return next(err);
        return next();
    });
});


UserSchema.plugin(passportLocalMongoose, {
    usernameField: 'email',
    usernameLowerCase: true
});

module.exports.UserSchema = UserSchema;
