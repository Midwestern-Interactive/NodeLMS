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
		*
		*/
		index: function (req, res){
			Mcq.find({limit: 10}).populate('answers').exec(function (err, obj){
				//Check for errors...
				if(err) return res.view(500, "Error: " + err)
				var rand = Math.floor(Math.random()*obj.length)

				req.session.mcq = obj[rand]
				console.log(rand)
				//Send ALL mcq objects to the mcq view
				return res.view()
			});
		},

		/*
		* Check if an mcq was answered correctly
		*
		*/
		check: function(req, res){
			var ques
		},

		/*
		* Create an MCQ object in the db
		*/
		create: function (req, res){
			var correct = req.param('correct')
			var wrong = req.param('wrong')
			var l = 0
			console.log(correct)
			console.log(wrong)

			if(correct!=undefined && wrong!=undefined){
				//Add answers to DB
				var addAnswers = function (err, ques){

					//Add correct answers to DB
					for(var i in correct){
						McqAnswer.create({text: correct[i], mark: 1, question: ques.id}).exec(function (err, ans){
							if(err) return res.send(500, err)

							ques.answers.add(ans.id)
							ques.save()
							if( l++ == correct.length+wrong.length) return res.redirect('/question/mcq')
						})
					}

					//Add incorrect answers
					for(var i in wrong){
						McqAnswer.create({text: wrong[i], mark: 0, question: ques.id}).exec(function (err, ans){
							if(err) return res.send(500, err)

							ques.answers.add(ans.id)
							ques.save()
							if( l++ == correct.length+wrong.length) return res.redirect('/question/mcq')
						})
					}
				}

			Mcq.create({text: req.param('question')}).exec(addAnswers)
		}else {
			console.log("Error");
			return res.send(500, "Not correct")
		}
	}
};
