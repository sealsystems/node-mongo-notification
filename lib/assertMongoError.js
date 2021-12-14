'use strict';

const assertMongoError = function (err) {
  if (err && err.name === 'MongoError') {
    throw err;
  }
};

module.exports = assertMongoError;
