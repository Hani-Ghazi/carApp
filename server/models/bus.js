const mongoose = require('mongoose');
const Promise = require('bluebird');
const errors = require('../utils/errors');

var busSchema = new mongoose.Schema({
  busId: {
    type: Number
  },
  arName: {
    type: String,
    required: true
  },
  enName: {
    type: String,
    required: true,
    defautl: ' ',
  },
  length: {
    type: Number,
    required: true
  },
  stopsCount: {
    type: Number
  }
});


busSchema.statics.getBusById = function (busId) {
  if(! busId || busId === '')
    return Promise.reject(errors.missingData);
  return this.findById(busId)
    .then(function(bus){
      if(! bus)
        return Promise.reject();
      bus = bus.toObject();
      delete bus.busId;
      return bus;
    });
};

busSchema.statics.updateStopsCount = function (busId, count) {
  var id = mongoose.Types.ObjectId(busId);
  var  thisModel = this;
  return thisModel.update({_id: id}, {stopsCount: count});
};

module.exports = mongoose.model('bus', busSchema, 'bus');