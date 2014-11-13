/**
* McqAnswer.js
*
* @description :: An McqAnswer is referenced by the Mcq Model
* @docs        :: TODO
*/

module.exports = {

  attributes: {
    id: {
        type: 'integer',
        autoIncrement: true,
        primaryKey: true
    },

    text: {
        type: 'string'
    },

    question: {
        model: 'Mcq'
    },

    mark: {
        type: 'integer'
    }
  }
};
