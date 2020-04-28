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
 function User(id, email, name, active, imageURL, joined) {
   this.id = id;
   this.email = email;
   this.name = name;
   this.active = active;
   this.imageURL = imageURL;
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
         let user = new User(entity[datastore.KEY]['id'],entity['email'], entity['name'], entity['active'], entity['imageURL']);
         users.push(user);
       }
       return users;
   }
   catch(err) {
       console.error('ERROR: ', err);
   }
 };

 async function getUser(datastore, id) {
 //TODO: fixa
     console.log("getUser - id: ", id);
     const key = datastore.key(['User', datastore.int(id)]);
     console.log("getUser - key: ", key);
     try {
       let entity = await datastore.get(key);
       console.log("getUser - entity: ", entity);
       entity = entity[0]; // test if empty?!
       if (entity == null)
         return null;
       let user = new User(entity[datastore.KEY]['id'],entity['email'], entity['name'], entity['active'], entity['imageURL']);
       return user;
     }
     catch(err) {
       console.error('ERROR: getUser', err);
     }
 };

 async function addUser(datastore, user) {
   console.log("Insert new user: ", user);
   const key = datastore.key('User', user.id);
   key.title = user.id;
   try {
     await datastore.save({
       key: key,
       data: user
     });
     console.log(`User ${key.title} created successfully`);
     return key;
   }
   catch(err) {
     console.error('ERROR inserting user: ', err);
   }
 };

 async function updateUser(datastore, id, active, imageURL) {
   console.log("Update user: ", id);
   const key = datastore.key('User', datastore.int(id));

   let data = {};
   if (imageUrl != null)
       data['imageUrl'] = imageUrl;

   try {
       await datastore.merge({
           key: key,
           data: {
             active: active
           }
       });
       console.log(`User ${key.id} updated successfully`);
       return key;
   }
   catch(err) {
       console.error('ERROR updating group: ', err);
   }
 };
