'use strict';

const filesizeParser = require('filesize-parser');

const mongo = require('@sealsystems/mongo');

const NotificationEmitter = require('./NotificationEmitter');

const mongoNotification = async function (options) {
  const dbOptions = {};

  if (!options.url) {
    throw new Error('Url is missing.');
  }
  if (!options.topic) {
    throw new Error('Topic is missing.');
  }

  Object.keys(options).forEach((key) => {
    if (['url', 'topic', 'writeOnly'].includes(key)) {
      return;
    }
    dbOptions[key] = options[key];
  });

  const db = await mongo.db(options.url, dbOptions);

  let collection;
  try {
    collection = await db.createCollection(options.topic, {
      capped: true,
      size: options.collectionSize ? filesizeParser(options.collectionSize) : 1024 * 1024
    });
  } catch (err) {
    collection = await db.collection(options.topic);
  }

  const notification = new NotificationEmitter({
    collection,
    writeOnly: options.writeOnly || false
  });

  await notification.init();

  return notification;
};

module.exports = mongoNotification;
