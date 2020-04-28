//'use strict';

const bodyParser = require('body-parser');
const logger = require('morgan');
const {Datastore} = require('@google-cloud/datastore');

module.exports = {
  addGroupMember: addGroupMember,
  getGroupMembers: getGroupMembers,
  getUserGroups: getUserGroups

}

function GroupMember(id, groupId, userId, joinedDate) {
    this.id = id;
    this.userId = userId;
    this.joinedDate = joinedDate;
}

async function addGroupMember(datastore, groupId, userId, groupMember) {
  const key = datastore.key('GroupMember');
  const userKey = datastore.key(['User', datastore.int(userId), 'GroupMember']);
  const groupKey = datastore.key(['Group', datastore.int(groupId), 'GroupMember']);
  const task = {
    userId: userId,
    joinedDate: groupMember.joinedDate
  };

  try {
      const entities = [{
        key: key,
        data: task
      },
      {
        key: groupKey,
        data: task
      }];
    await datastore.insert(entities);

    console.log(`GroupMember ${groupMember.id} created successfully`);
    //return groupMember.id;
  }
  catch(err) {
    console.error('ERROR: ', err);
  }
};

async function getGroupMembers(datastore, id, group) {
    let groupMembers = [];
    console.log("getGroupMembers");
    const key = datastore.key(['Group', datastore.int(id), 'GroupMember']);
    try {
      const query = await datastore
        .createQuery('GroupMember')
        .limit(100);
      let entities = await datastore.runQuery(query);
      entities = entities[0]; // test if empty?!
      for (const entity of entities) {
        let groupMember = new GroupMember(entity[datastore.KEY]['id'], entity['groupId'], entity['userId'], entity['joinedDate']);
        groupMembers.push(groupMember);
      }
      return groupMembers;
    }
    catch(err) {
      console.error('ERROR: ', err);
    }
 };


 async function getUserGroups(datastore, id, user) {
     let groupMembers = [];
     console.log("getGroupMembers");
     const key = datastore.key(['User', datastore.int(id), 'GroupMember']);
     try {
       const query = await datastore
         .createQuery('GroupMember')
         .limit(100);
       let entities = await datastore.runQuery(query);
       entities = entities[0]; // test if empty?!
       for (const entity of entities) {
         let groupMember = new GroupMember(entity[datastore.KEY]['id'], entity['groupId'], entity['userId'], entity['joinedDate']);
         groupMembers.push(groupMember);
       }
       return groupMembers;
     }
     catch(err) {
       console.error('ERROR: ', err);
     }
  };
