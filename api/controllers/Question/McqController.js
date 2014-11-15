/**
 * McqController
 *
 * @description :: Server-side logic for managing mcqs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 *
 * Copyright (C) 2015 Gary Krige
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */


module.exports = {
	_config: {
		model: 'mcq'
	},

	/*
	* Show a question
	*
	* It should ideally fetch only questions tagged
	* correctly. (i.e tagged as quiz 1)
	*
	*/
	index: function (req, res){
		//Have we selected a random question yet?
		if(req.session.mcq == undefined){
			//Select all the questions (should pick a tag)
			Mcq.find({limit: 10}).populate('answers').exec(function (err, obj){
				//Check for errors...
				if(err) return res.view(500, "Error: " + err)

				//Pick a random question and send to the session
				var rand = Math.floor(Math.random()*obj.length)
				req.session.mcq = obj[rand]

				//Go to the view
				return res.view()
			});
		}else{
			//We already have a session MCQ
			return res.view()
		}
	},

	/*
	* Check if an MCQ was answered correctly
	*/
	check: function(req, res){
		res.send(500, "Not Implemented")
	},

	/*
	* Create an MCQ object in the DB
	*/
	create: function (req, res){
		var correct = req.param('correct')
		var wrong = req.param('wrong')
		var quesText = req.param('question')

		var numAns = 0 //Count the finished answers
		var numTot = correct.length + wrong.length //Total answers

		//Write the answer to the DB
		var addAnswer = function (text, mark, ques){
			McqAnswer.create({text: text,
												mark: mark,
												question: ques.id}).exec(function (err, ans){
				if(err) return res.send(500, err)

				//No errror
				ques.answers.add(ans.id)
				ques.save()
				console.log(text + 'done')

				//Are we done?
				console.log(numAns + " - " + numTot)
				if( ++numAns == numTot){
					return res.redirect('/question/mcq')

					console.log("DONE!!!!!")
				}
			})
		}

		//Add answers to DB
		var addAnswers = function (err, ques){
			if(err) return res.send(500, err)

			//Add correct answers to DB
			for(var i = 0; i < correct.length; i++){
				addAnswer(correct[i], 1, ques)
			}

			//Add incorrect answers
			for(var i = 0; i < wrong.length; i++){
				addAnswer(wrong[i], 0, ques)
			}
		}

		//Check that we have what we need to add the question
		if(correct != undefined && wrong != undefined){
			console.log('Adding MCQ')

			//Write the question to the DB then go add answers to it
			Mcq.create({text: quesText}).exec(addAnswers)
		}else return res.send(500, "Not correct params")


	}
};
