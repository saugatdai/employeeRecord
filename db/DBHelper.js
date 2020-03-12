const { MongoClient, ObjectID } = require('mongodb');
//27017

const url = 'mongodb://localhost:27017';
const dbName = 'userDirectory';

const insertInfo = userData => {
    //Generate a unique object Id before inserting...
    MongoClient.connect(url, { useUnifiedTopology: true }, (error, client) => {
        if (error) {
            console.log(error);
            return;
        }

        const db = client.db(dbName);

        db.collection('holuses').insertOne({
            name: userData.name,
            age: userData.age,
            gender: userData.gender,
            country: userData.country,
            comments: userData.comments
        }, (error, result) => {
            if (error) {
                return console.log('Error has occured during insert');
            }
            console.log(result.ops);
            client.close();
        });
    });
};

const getUsers = (callback) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, (error, client) => {
        if (error) {
            console.log(error);
            return;
        }

        const db = client.db(dbName);

        db.collection('holuses').find({}).toArray((error, users) => {
            if (error) {
                console.log('Some Error Occured');
            }
            callback(users);
        });
    });
};

const findUser = (userId, callback) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, (error, client) => {
        if (error) {
            console.log(error);
            return;
        }

        const db = client.db(dbName);

        db.collection('holuses').findOne({ _id: new ObjectID(userId) }, (error, user) => {
            if (error) {
                return console.log('Error in finding a user..');
            }
            callback(user);
        });
    });
};

const updateDocument = (userData, callback) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, (error, client) => {
        if (error) {
            console.log(error);
            return;
        }

        const db = client.db(dbName);
        db.collection('holuses').updateOne({ "_id": ObjectID(userData._id) }, {
            $set: {
                "name": userData.name,
                "age": userData.age,
                "gender": userData.gender,
                "country": userData.country,
                "comments": userData.comments
            }
        });
        callback();
    });
};

const deleteDocument = (id, callback) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, (error, client) => {
        if (error) {
            console.log(error);
            return;
        }

        const db = client.db(dbName);
        
        db.collection('holuses').remove({"_id": ObjectID(id)});

        callback();
    });
};

module.exports = { insertInfo, getUsers, findUser, updateDocument, deleteDocument };
