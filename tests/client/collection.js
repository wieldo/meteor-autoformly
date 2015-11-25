CollectionOK = new Mongo.Collection('usersOK');
CollectionFAIL = new Mongo.Collection('usersFAIL');

CollectionOK.attachSchema(UserSchema);