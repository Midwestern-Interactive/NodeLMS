/**
* Mcq.js
*
* @description :: An Mcq is a question type
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

		answers: {
		    collection: 'McqAnswer',
        via: 'question'
		}
  }
};
