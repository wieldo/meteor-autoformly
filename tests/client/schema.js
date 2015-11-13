let userProfile = new SimpleSchema({
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

let userLinkedServices = new SimpleSchema({
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
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
        optional: true
    },
    registered_emails: {
        type: [Object],
        blackbox: true,
        optional: true
    },
    emails: {
        type: Array,
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
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
    },
    isAdmin: {
        type: Boolean,
        optional: true
    }
});