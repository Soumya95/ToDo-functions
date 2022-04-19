var admin = require("firebase-admin");

var serviceAccount = require("./react-todo-4f728-firebase-adminsdk-uvjbz-9f0dfe9a2d.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://react-todo-4f728-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true })

module.exports = {
    admin,db,serviceAccount
};