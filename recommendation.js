//'use strict';

const bodyParser = require('body-parser');
const logger = require('morgan');
const {Datastore} = require('@google-cloud/datastore');

module.exports = {
  getRecommendations: getRecommendations,
  addRecommendation: addRecommendation
}


/*
 * Manage chatPosts
 */
function Recommendation(id, category, createdBy, createdDate, description, imageUrl, rate, source, title, who, year) {
    this.id = id;
    this.category = category;
    this.createdBy = createdBy;
    this.createdDate = createdDate;
    this.description = description;
    this.imageUrl = imageUrl;
    this.rate = rate;
    this.source = source;
    this.title = title;
    this.who = who;
    this.year = year;
}

async function getRecommendations(datastore, id) {
    let recommendations = [];
    console.log("getRecommendations");
    const key = datastore.key(['Group', datastore.int(id), 'Recommendation']);
    const ancestorKey = datastore.key(['Group', datastore.int(id)]);
    try {
      const query = await datastore
        .createQuery('Recommendation')
        .hasAncestor(key.parent)
        .limit(100);
      let entities = await datastore.runQuery(query);
      entities = entities[0]; 
      for (const entity of entities) {
        let recommendation = new Recommendation(entity[datastore.KEY]['id'], entity['category'], entity['createdBy'], entity['createdDate'], entity['description'], entity['imageUrl'], entity['rate'], entity['source'],
        entity['title'], entity['who'], entity['year']
      );
        recommendations.push(recommendation);
      }
      return recommendations;
    }
    catch(err) {
      console.error('ERROR: ', err);
    }
 };

 async function addRecommendation(datastore, id, recommendation) {
   const key = datastore.key(['Group', datastore.int(id), 'Recommendation']);

   console.log(key);
   console.log(`Recommendation ${recommendation}`);
   try {
     await datastore.save({
       key: key,
       data: recommendation
     });
     console.log(`Recommendation ${key.id} created successfully`);
     return key.id;
   }
   catch(err) {
     console.error('ERROR: ', err);
   }
 };
