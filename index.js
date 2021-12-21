const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;
const dbopper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'nucampsite';

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {

    assert.strictEqual(err, null);

    console.log('Connected correctly to server');

    const db = client.db(dbname);

    db.dropCollection('campsites', (err, result) => {
        assert.strictEqual(err, null);
        console.log('Dropped Collection', result);

        dbopper.insertDocument(db,{name: "Breadcrumb Trail Campground", description: "Test"},
            'campsites',result => {
            console.log('Insert Document:', result.ops);
            dbopper.findDocuments(db, 'campsites', docs => {
                console.log('Found Documents:', docs);

                dbopper.updateDocument(db, {name: "Breadcrumb Trail Campground"}, 
                {description: "Updated Test Description"}, 'campsites', 
                result => {
                    console.log('Updatd Document Count:', result.result.nModified);

                    dbopper.findDocuments(db, 'campsites', docs => {
                        console.log('Found Documents:', docs);

                        dbopper.removeDocument(db, {name: "Breadcrumb Trail Campground"},
                        'campsites', result => {
                            console.log('Deleted Document Count:', result.deletedCount);

                            client.close()
                        })
                    })
                })
            }) 
        });
    });
});