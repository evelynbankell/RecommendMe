/*
Evelyn Bankell, eveba996
Emil Edström, emied641
2020-04-26

REST APIS for course tddd27
Written in Nodejs with express

database stored in Google Cloud Platform
*/

'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');

const app = express();
app.enable('trust proxy');

app.use(logger('dev'));
app.use(express.static('public'));

// enable files upload
const fileUpload = require('express-fileupload');
app.use(fileUpload({
  createParentPath: true
}));
var uniqueFilename = require('unique-filename')
//npm install express-fileupload
//npm i unique-filename

app.use(cors());
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;
const server = app.listen(process.env.PORT || 8080, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

const io = require('socket.io').listen(server);

// By default, the client will authenticate using the service account file
// specified by the GOOGLE_APPLICATION_CREDENTIALS environment variable and use
// the project specified by the GOOGLE_CLOUD_PROJECT environment variable. See
// https://github.com/GoogleCloudPlatform/google-cloud-node/blob/master/docs/authentication.md
// These environment variables are set automatically on Google App Engine

// Instantiate a datastore client
const {Datastore} = require('@google-cloud/datastore');
const {Storage} = require('@google-cloud/storage');

const projectId = 'tddd27-recommendme';
const keyFilename = './tddd27-recommendme-4b343424751c.json';
const datastore = new Datastore({projectId, keyFilename});
const storage = new Storage({projectId, keyFilename});

const photo_bucket = 'tddd27-recommendme-photos';

//Request of js files
const group = require('./group');
const post = require('./chatPost');
const user = require('./user');
const groupMember = require('./groupMember');
const recommendation = require('./recommendation');

app.get('/groups', async (req, res, next) => {
  try {
    let groups = await group.getGroups(datastore);
    console.log("GET /groups", groups);
    res.json(groups);
  } catch (error) {
    next(error);
    console.log(err);
    return res.sendStatus(400);
  }
});

app.get('/groups/:id', async (req, res, next) => {
  //console.log("GET /groups/:id ", req.params)
  try {
    const id = req.params.id;
    let groups = await group.getGroup(datastore, id);
    console.log("GET /groups/:id ", groups);
    if (groups == null)
      res.status(404).send({});
    else
      res.json(groups);
  } catch (error) {
    next(error);
    console.log(err);
    return res.sendStatus(400);
  }
});

// Content-type: form-data
app.post('/groups', async (req, res, next) => {
  // upload image and move to GCP Storage

  // TODO: add a default image here
  let imageURL = '';
  try {
    if(req.files) {
        let groupPhoto = req.files.groupPhoto;
        let unique_filename = uniqueFilename('') + path.extname(groupPhoto.name);
        groupPhoto.mv('./uploads/' + unique_filename);
        imageURL = await uploadFile('./uploads/', unique_filename);
    }
  } catch (err) {
      res.status(500).send(err);
  }

  // insert group into GCP DataStore
  try {
    let data = req.body;
    data['imageURL']= imageURL;
    let key = await group.addGroup(datastore, data);
    console.log("POST /groups", key);
    res.json(`{id: ${key.id}}`);
  }
  catch(error) {
    next(error);
  }
});


//
// RECOMMENDATIONS
//
// get recommendations for a group
app.get('/groups/:id/recommendations', async (req, res, next) => {
  try {
    const id = req.params.id;

    let recommendations = await recommendation.getRecommendations(datastore, id);
    console.log("GET /group/:id/recommendations", recommendations);

    res.json(recommendations);
  } catch (error) {
    next(error);
  }
});

/* FIXA
app.get('/groups/:groupId/recommendations/:reId', async (req, res, next) => {
  try {
    const groupId = req.params.groupId;
    const reId = req.params.reId;

    let recommendations = await recommendation.getRecommendation(datastore, groupId, reId);
    console.log("GET /group/:groupId/recommendations/:reId", recommendations);

    res.json(recommendations);
  } catch (error) {
    next(error);
  }
});
**/

// post a recommendation in a group
app.post('/groups/:id/recommendations', async (req, res, next) => {
  let imageURL = '';
  console.log('TEST', req.files);
  try {
    if(req.files) {
        console.log('TEST');
        imageURL = req.files.imageUrl;
        let unique_filename = uniqueFilename('') + path.extname(imageURL.name);
        imageURL.mv('./uploads/' + unique_filename);
        imageURL = await uploadFile('./uploads/', unique_filename);
    }
  } catch (err) {
      console.log(err);
      return res.sendStatus(500);
  }
  try {
    console.log('img', imageURL);
    let data = req.body;
    const id = req.params.id;
    data['imageUrl']= imageURL;
    let key = await recommendation.addRecommendation(datastore, id, data);
    console.log("POST /groups/:id/recommendations", key);
    res.json(`{id: ${key.id}}`);
  } catch (error) {
    next(error);
    console.log(error);
    return res.sendStatus(400);
  }

});

//
// USERS
//
// get all users
app.get('/users', async (req, res, next) => {
  try {
    let users = await user.getUsers(datastore);
    console.log("GET /users", users);

    res.json(users);
  } catch (error) {
    next(error);
    res.status(400).send(error);
  }
});

// get a user
app.get('/users/:email', async (req, res, next) => {
  console.log("GET /users/:email ", req.params.email)
  try {
    const email = req.params.email;
    let users = await user.getUser(datastore, email);
    console.log("GET /users/:email ", users);
    if (users)
      res.json(users);
    else
      return res.sendStatus(404);
  } catch (error) {
    next(error);
    res.status(400).send(error);
  }
});


//add a user
app.post('/users', async (req, res, next) => {
  // upload image and move to GCP Storage

  // TODO: add a default image here
  //let imageURL = '';
  //try {
  //  if(req.files) {
      //  imageURL = req.files.imageURL;
    //    let unique_filename = uniqueFilename('') + path.extname(imageURL.name);
    //    imageURL.mv('./uploads/' + unique_filename);
    //    imageURL = await uploadFile('./uploads/', unique_filename);
  //  }
  //} catch (err) {
  //    res.status(500).send(err);
  //}

  // insert group into GCP DataStore
  try {
    let data = req.body;
  //  data['imageURL']= imageURL;
    let key = await user.addUser(datastore, data);
    console.log("POST /users", key);
    res.json(`{id: ${key.id}}`);
  }
  catch(error) {
    next(error);
  }
});

// REST API chatPost
app.get('/group/:id/chatPosts', async (req, res, next) => {
  try {
    const id = req.params.id;

    let chatPosts = await post.getChatPosts(datastore, id);
    console.log("GET /group/:id/chatPosts", chatPosts);

    res.json(chatPosts);
  } catch (error) {
    next(error);
  }
});


app.post('/group/:id/chatPost', async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    let key = await post.insertChatPost(datastore, id, data);
    console.log("POST /group/:id/chatPost", key, data);

    res.json(key); //`{key: ${key}}`
  } catch (error) {
    next(error);
    res.status(400).send(error);
  }
});


//
// GROUP MEMBERS
//
//add group member
app.post('/groups/:groupId/users/:userId', async (req, res, next) => {
  try {
    const groupId = req.params.groupId;
    const userId = req.params.userId;
    let data = req.body;
    console.log("data:", data);
    let key = await groupMember.addGroupMember(datastore, groupId, userId, data);
    console.log("POST /groups/:id/users", key);

    res.json(`{key: ${key}}`); //`{key: ${key}}`
  } catch (error) {
    next(error);
    res.status(400).send(error);
  }
});

//get users for specific group
app.get('/groups/:id/users', async (req, res, next) => {
  try {
    const id = req.params.id;
    //let data = req.body;

    let key = await groupMember.getGroupMembers(datastore, id, req.body);
    console.log("GET /groups/:id/users", key);

    res.json(`{key: ${key}}`); //`{key: ${key}}`
  } catch (error) {
    next(error);
    res.status(400).send(error);
  }
});

//get groups for specific user
app.get('/users/:id/groups', async (req, res, next) => {
  try {
    const id = req.params.id;
    //let data = req.body;

    let key = await groupMember.getUserGroups(datastore, id, req.body);
    console.log("GET /users/:id/groups", key);

    res.json(`{key: ${key}}`); //`{key: ${key}}`
  } catch (error) {
    next(error);
    res.status(400).send(error);
  }
});





// Uploads a local file to the bucket
async function uploadFile(filepath, filename) {

  let bucket_item = await storage.bucket(photo_bucket).upload(filepath + filename, {
    // Support for HTTP requests made with `Accept-Encoding: gzip`
    gzip: true,
    // By setting the option `destination`, you can change the name of the
    // object you are uploading to a bucket.
    metadata: {
      // Enable long-lived HTTP caching headers
      // Use only if the contents of the file will never change
      // (If the contents will change, use cacheControl: 'no-cache')
      cacheControl: 'public, max-age=31536000',
    },
  });
  //await storage.bucket(photo_bucket).file(filename).makePublic();

  return 'https://storage.cloud.google.com/' + photo_bucket + '/' + filename;
}






//module.exports = app;
