const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const { Schema } = mongoose;
const BASE_SCHEMA_OPTIONS = {
    timestamps: true
};

/**
 * Project Schema
 *
 */

const ProjectSchema = new Schema({
    name: { type: String, required: true },
    parent: { type: Schema.ObjectId, ref: 'Project' },
    viewers: [{ type: Schema.ObjectId, ref: 'Viewer' }]
}, BASE_SCHEMA_OPTIONS);

/**
 * Design Schema
 *
 */

const DesignSchema = new Schema({
    name: { type: String, required: true },
    project: { type: Schema.ObjectId, ref: 'Project', required: true }
}, BASE_SCHEMA_OPTIONS);

/**
 * File Schema
 *
 */

const FileSchema = new Schema({
    filename: { type: String, required: true },
    position: { type: Number, required: true, min: 0 },
    design: { type: Schema.ObjectId, ref: 'Design', required: true }
}, BASE_SCHEMA_OPTIONS);

/**
 * User Schema
 *
 */

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    // password salt
    salt: { type: String, required: true },
    // hashed password with salt
    hash: { type: String, required: true },
    messagingProvider: { type: String, default: 'Mattermost' },
    messagingAccount: { type: String, required: true }
}, BASE_SCHEMA_OPTIONS);

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

/**
 * Viewer Schema
 *
 */

const ViewerSchema = new Schema({
    email: { type: String, required: true, unique: true },
    loginToken: { type: String },
    viewToken: { type: String },
    messagingProvider: { type: String, required: true },
    messagingAccount: { type: String, required: true }
}, BASE_SCHEMA_OPTIONS);

UserSchema.plugin(passportLocalMongoose, {
    usernameField: 'email',
    usernameLowerCase: true
});

module.exports = {
    ProjectSchema,
    DesignSchema,
    FileSchema,
    UserSchema,
    ViewerSchema
};
