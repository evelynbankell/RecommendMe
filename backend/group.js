//'use strict';

const bodyParser = require('body-parser');
const logger = require('morgan');
const {Datastore} = require('@google-cloud/datastore');

module.exports = {
    getGroups: getGroups,
    getGroup: getGroup,
    addGroup: addGroup,
    updateGroup: updateGroup,
    deleteGroup: deleteGroup
}

/*
 * Manage groups
 */
function Group(id, title, imageURL, createdDate, createdBy) {
    this.id = id;
    this.title = title;
    this.imageURL = imageURL;
    this.createdDate = createdDate;
    this.createdBy = createdBy;
}

async function getGroups(datastore) {
    console.log("getGroups");
    let groups = [];
    const query = datastore.createQuery('Group').order('title', { descending: false });
    try {
      let entities = await datastore.runQuery(query);
      entities = entities[0]; // test if empty?!
      for (const entity of entities) {
        let group = new Group(entity[datastore.KEY]['id'], entity['title'], entity['imageURL'], entity['createdDate'], entity['createdBy']);
        groups.push(group);
      }
      return groups;
    }
    catch(err) {
        console.error('ERROR: ', err);
        return;
    }
};

async function getGroup(datastore, id) {
    //console.log("getGroup - id: ", id);
    const key = datastore.key(['Group', datastore.int(id)]);
    //console.log("getGroup - key: ", key);
    try {
      let entity = await datastore.get(key);
      //console.log("getGroup - entity: ", entity);
      entity = entity[0]; // test if empty?!
      if (entity == null)
        return null;
      let group = new Group(entity[datastore.KEY]['id'], entity['title'], entity['imageURL'], entity['createdDate'], entity['createdBy']);
      return group;
    }
    catch(err) {
      console.error('ERROR: getGroup', err);
      return;
    }
};

async function addGroup(datastore, group) {
    console.log("Insert new group: ", group);

    const key = datastore.key('Group', group.id);
    key.title = group.id;

    try {
        await datastore.save({
            key: key,
            data: group
        });
        console.log(`Group ${key.title} created successfully`);
        return key;
    }
    catch(err) {
        console.error('ERROR inserting group: ', err);
    }
};

async function updateGroup(datastore, id, title, imageURL) {

    console.log("Update group: ", id);
    const key = datastore.key(['Group', datastore.int(id)]);


    try {
        await datastore.merge({
            key: key,
            data: {
              title: title,
              imageURL: imageURL
            }
        });
        console.log(`Group ${key.id} updated successfully`);
        return key;
    }
    catch(err) {
        console.error('ERROR updating group: ', err);
    }
};


async function deleteGroup(datastore, id) {
    console.log("deleteGroup - id: ", id);
    const key = datastore.key(['Group', datastore.int(id)]);
    //console.log("getGroup - key: ", key);
    try {
        await datastore.delete(key);
    }
    catch(err) {
        console.error('ERROR: ', err);
    }

};
