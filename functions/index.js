/* eslint-disable promise/always-return */
const functions = require('firebase-functions');
const app = require('express')();
const cors = require('cors');
app.use(cors());

const fbAuth = require('./util/fbAuth');

/*------------------------------------------------------------------*
 *  handlers/users.js                                               *
 *------------------------------------------------------------------*/
const {getUserDetails, getProfileInfo, updateProfileInfo} = require('./handlers/users');

app.get('/getUser/:handle', getUserDetails);

// Returns all profile data of the currently logged in user
// TODO: Add fbAuth
app.get('/getProfileInfo', getProfileInfo);

// Updates the currently logged in user's profile information
// TODO: Add fbAuth
app.post('/updateProfileInfo', updateProfileInfo);

/*------------------------------------------------------------------*
 *  handlers/post.js                                                *
 *------------------------------------------------------------------*/
const {putPost, getallPostsforUser} = require('./handlers/post');

app.get('/getallPostsforUser', getallPostsforUser);

// Adds one post to the database
app.post('/putPost', fbAuth, putPost);


exports.api = functions.https.onRequest(app);