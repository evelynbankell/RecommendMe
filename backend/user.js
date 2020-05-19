//'use strict';

const bodyParser = require('body-parser');
const logger = require('morgan');
const {Datastore} = require('@google-cloud/datastore');

module.exports = {
    getUsers: getUsers,
    getUser: getUser,
    addUser: addUser,
    updateUser: updateUser
}

/*
 * Manage users
 */
 function User(email, name, imageURL, active) {
   this.email = email;
   this.name = name;
   this.imageURL = imageURL;
   this.active = active;
 }


 async function getUsers(datastore) {
   let users = [];
   const query = datastore
      .createQuery('User')
      .order('name', { descending: false });
   try {
       let entities = await datastore.runQuery(query);
       entities = entities[0]; // test if empty?!
       for (const entity of entities) {
         let user = new User(entity['email'], entity['name'], entity['imageURL'], entity['active']);
         users.push(user);
       }
       return users;
   }
   catch(err) {
       console.error('ERROR: ', err);
   }
 };

 async function getUser(datastore, email) {
 //TODO: fixa
     console.log("getUser - email: ", email);
     const key = datastore.key(['User', email]);
     try {
       let entity = await datastore.get(key);
       console.log("getUser - entity: ", entity);
       entity = entity[0]; // test if empty?!
       if (entity == null)
         return null;
       let user = new User(entity['email'], entity['name'], entity['imageURL'], entity['active']);
       return user;
     }
     catch(err) {
       console.error('ERROR: getUser', err);
     }
 };

 async function addUser(datastore, user) {
   console.log("Insert new user: ", user);
   const key = datastore.key('User', user.email);
   key.name = user.email;
   try {
     await datastore.save({
       key: key,
       data: user
     });
     console.log(`User ${key.name} created successfully`);
     return key;
   }
   catch(err) {
     console.error('ERROR inserting user: ', err);
   }
 };

 async function updateUser(datastore, email, active, imageURL) {
   console.log("Update user: ", email);
   const key = datastore.key(['User', email]);


   try {
       await datastore.merge({
           key: key,
           data: {
             active: active,
             imageURL: imageURL
           }
       });
       console.log(`User ${key.name} updated successfully`);
       return key;
   }
   catch(err) {
       console.error('ERROR updating group: ', err);
   }
 };
