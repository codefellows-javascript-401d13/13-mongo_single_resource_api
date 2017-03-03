'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const createError = require('http-errors');
const debug = require('debug')('show:show');

const Character = require('./character.js');

const showSchema = Schema({
  name: {type: String, required: true},
  timestamp: {type: Date, required: true, default: Date.now()},
  characters: [{type: Schema.Types.ObjectId, ref: 'character'}]
});

const Show = module.exports = mongoose.model('show', showSchema);

Show.findByIdAndAddCharacter = function(id, character){
  debug('findByIdAndAddCharacter');
  console.log('got into findByIdAndAddCharacter');

  return Show.findById(id)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then(show => {
    character.showId = show._id;
    this.tempShow = show;
    return new Character(character).save();
  })
  .then(character => {
    this.tempShow.characters.push(character._id);
    this.tempCharacter = character;
    return this.tempShow.save();
  })
  .then(() => {
    return this.tempCharacter;
  });
};

Show.findByIdAndRemoveCharacter = function(id){
  debug('findByIdAndRemoveCharacter');

  return Character.findByIdAndRemove(id)
  .catch(err => Promise.reject(404, err.message))
  .then( () => {
    return; 
  });
};
