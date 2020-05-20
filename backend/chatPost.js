//'use strict';

const bodyParser = require('body-parser');
const logger = require('morgan');
const {Datastore} = require('@google-cloud/datastore');

module.exports = {
    getChatPosts: getChatPosts,
    insertChatPost: insertChatPost
}


/*
 * Manage chatPosts
 */
function ChatPost(id, content, createdBy, createdDate) {
    this.id = id;
    this.content = content;
    this.createdBy = createdBy;
    this.createdDate = createdDate;
}


async function getChatPosts(datastore, id) {
    let chatPosts = [];
    console.log("getChatPosts");
    const key = datastore.key(['Group', datastore.int(id), 'ChatPost']);
    const ancestorKey = datastore.key(['Group', datastore.int(id)]);
    try {
      const query = await datastore
        .createQuery('ChatPost')
        .hasAncestor(key.parent)
        .limit(100);
      //console.log("query: ", query);
      let entities = await datastore.runQuery(query);
      entities = entities[0]; // test if empty?!
      for (const entity of entities) {
        let chatPost = new ChatPost(entity[datastore.KEY]['id'], entity['content'], entity['createdBy'], entity['createdDate']);
        chatPosts.push(chatPost);
      }
      return chatPosts;
    }
    catch(err) {
      console.error('ERROR: ', err);
    }
 };

 async function insertChatPost(datastore, id, chatPost) {
   const key = datastore.key(['Group', datastore.int(id), 'ChatPost']);

   const task = {
     content: chatPost.content,
     createdBy: chatPost.createdBy,
     createdDate: chatPost.createdDate
   };

   console.log(key);
   console.log(`ChatPost ${chatPost}`);
   try {
     await datastore.save({
       key: key,
       data: task
     });
     console.log(`ChatPost ${key.id} created successfully`);
     return key.id;
   }
   catch(err) {
     console.error('ERROR: ', err);
   }
 };
