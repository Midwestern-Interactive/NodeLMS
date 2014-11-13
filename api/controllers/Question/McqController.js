/**
 * McqController
 *
 * @description :: Server-side logic for managing mcqs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
		_config: {
			model: 'mcq'
		},

		/*
		 * This is just showing all of the questions in
		 * the database.
		 *
		 * It should ideally fetch only questions tagged
		 * correctly. (i.e tagged as quiz 1)
		 */
		index: function (req, res){
			Mcq.find().populate('answers').exec(function (err, obj){
				//Check for errors...
				if(err) return res.view(500, "Error: " + err)

				console.log('MCQ: \n' + obj)
				//Send ALL mcq objects to the mcq view
				return res.view({mcqs: obj})
			});
		},

		/*
		* Create an MCQ object
		*/
		create: function (req, res){
			console.log('Creating MCQ...')
			var correct = req.param('correct')
			var wrong = req.param('wrong')
			var i = 0

			//Add answers to DB
			var addAnswers = function (err, ques){
				console.log('Question Created')

				//Add correct answers to DB
				for(var i in correct){
					console.log('Adding correct answer: ' + correct[i])
					McqAnswer.create({text: correct[i], mark: 1, question: ques.id}).exec(function (err, ans){
						if(err) return res.send(500, err)

						console.log('Correct Answer Created')
						ques.answers.add(ans.id)
						ques.save()
						if( i++ === correct.length+wrong.length) return res.view({mcqs: [ques]})
					})
				}

				//Add incorrect answers
				for(var i in wrong){
					console.log('Adding wrong answer: ' + wrong[i])
					McqAnswer.create({text: wrong[i], mark: 0, question: ques.id}).exec(function (err, ans){
						if(err) return res.send(500, err)

						console.log('Wrong Answer Created')
						ques.answers.add(ans.id)
						ques.save()
						if( i++ === correct.length+wrong.length) return res.view({mcqs: [ques]})
					})
				}
			}

			Mcq.create({text: req.param('question')}).exec(addAnswers)

		}
};
