$('#create').on('click', function(){
  //Parameters to be sent to MCQ Model
  var ques = $('#question').val()
  var corr = []
  var wro = []

  //Loop through the checkbuttons
  $('input[id*=chkb]').each(function(index, element){
      //Add to Correct/Wrong list
      if($(element).is(':checked'))
        corr.push($('#ans' + index).val())
      else
        wro.push($('#ans' + index).val())
  });

  //Send JSON
  $.post('/question/mcq/create',
    {question: ques,
    correct: corr,
    wrong: wro},
    function(){
      window.location.assign('/question/mcq')
    }
  ).fail(function(res){
    alert("Error: " + res.getResponseHeader("error"));
  });
});
