const userProfile = new SimpleSchema({
    firstname: {
        type: String,
        min: 3,
        max: 10
    },
    lastname: {
        type: String,
        min: 5,
        max: 15
    },
    birthday: {
        type: Date,
        optional: true
    },
    gender: {
        type: String,
        allowedValues: ['Male', 'Female'],
        optional: true,
        defaultValue: "Male"
    },
    language: {
        type: String,
        allowedValues: ['PL', 'EN'],
        defaultValue: 'EN',
        optional: true
    }
});

const userLinkedServices = new SimpleSchema({
    facebook: {
        type: Boolean,
        defaultValue: false
    },
    google: {
        type: Boolean,
        defaultValue: false
    },
    profile: {
        type: userProfile
    }
});

/**
 * Users schema
 * @type {SimpleSchema}
 */
UserSchema = new SimpleSchema({
    username: {
        type: String,
        optional: true
    },
    registered_emails: {
        type: [Object],
        blackbox: true,
        optional: true
    },
    emails: {
        type: Array,
        optional: true
    },
    "emails.$": {
        type: Object
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date
    },
    profile: {
        type: userProfile,
        optional: true
    },
    linkedServices: {
        type: userLinkedServices
    },
    // Make sure this services field is in your schema if you're using any of the accounts packages
    services: {
        type: Object,
        optional: true,
        blackbox: true
    }
});