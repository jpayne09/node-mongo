const MongoClient = require('mongodb').MongoClient;
const dbopper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'nucampsite';

MongoClient.connect(url, { useUnifiedTopology: true }).then(client => {

    console.log('Connected correctly to server');

    const db = client.db(dbname);

    db.dropCollection('campsites')
        .then(result => {
            console.log('Dropped Collection', result);
        })
        .catch(err => console.log('No collection to dro['));

    dbopper.insertDocument(db, { name: "Breadcrumb Trail Campground", description: "Test" }, 'campsites')
        .then(result => {
            console.log('Insert Document:', result.ops);

            return dbopper.findDocuments(db, 'campsites');
        })
        .then(docs => {
            console.log('Found Documents:', docs);

            return dbopper.updateDocument(db, { name: "Breadcrumb Trail Campground" },
                { description: "Updated Test Description" }, 'campsites');
        })
        .then(result => {
            console.log('Updatd Document Count:', result.result.nModified);

            return dbopper.findDocuments(db, 'campsites');
        })
        .then(docs => {
            console.log('Found Documents:', docs);

            return dbopper.removeDocument(db, { name: "Breadcrumb Trail Campground" },
                'campsites')
        })
        .then(result => {
            console.log('Deleted Document Count:', result.deletedCount);

            client.close();
        })
        .catch(err => {
            console.log(err);
            client.close();
        });
})
    .catch(err => console.log(err));