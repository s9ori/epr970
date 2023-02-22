var file_contents = file_data.prompt;
var openai_data = window.openai_data || {};
var prompts = '';


jQuery(document).ready(function($) {
    // Listen for text input event on the prompt textarea
    $('#prompt').on('input', function() {
      var prompts = $(this).val();
    });

  $('form.prep-form').submit(function(event) {
    event.preventDefault();
    var prompt = JSON.stringify(file_contents);
    var api_key = openai_data.api_key;
      var model = "text-davinci-003";
      var max_tokens = 1000;
      var prompts = $('#prompt').val();
      var temperature = .7;
      var url = "https://api.openai.com/v1/completions";
    
      var data = {
        "model": model,
        "prompt": "Following the style and structure of the intro, listener questions, and interviewer questions for each subject here:/n/n" + prompt + "\n\n Here is an intro, a numbered list of listener questions, and a numbered list of interviewer questions based on this subject: " + prompts + ":\n",
        "max_tokens": max_tokens,
        "temperature": temperature
      };

    // Make the API request using the prompt
    $.ajax({
      type: "POST",
      url: url,
      data: JSON.stringify(data),
      contentType: "application/json",
      beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "Bearer " + api_key);
      $('.navis-calling').show();
      $('.texted').hide();
      $('#gif-container').show();
      $('#prompt').hide();
      $('.openai-response').css({
        "opacity": "0",
        "display": "none"
      });
        },
        success: function(response) {
          // Get the generated text from the API response
          var text = response.choices[0].text;
  
          // Split the generated text into sections using the headers
          var sections = text.split(/(Intro:|Listener Questions:|Interviewer Questions:)/);
  
          // Create a new div element to display the generated text
          var generatedText = document.createElement('div');
  
          // Loop through the sections and add them to the generated text element
          for (var i = 0; i < sections.length; i++) {
            if (sections[i].startsWith('Intro:')) {
              // Add the intro section to the generated text element
              generatedText.innerHTML += '<br><b>Intro:</b> ' + sections[i].substr(6).trim() + '<br>';
            } else if (sections[i].startsWith('Listener Questions:')) {
              // Add the listener questions section to the generated text element
              generatedText.innerHTML += '<br><b>Listener Questions:</b><br>';
              var listenerQuestions = sections[i].substr(20).trim().split(/\n\d+\. /);
              for (var j = 0; j < listenerQuestions.length; j++) {
                generatedText.innerHTML += j + '. ' + listenerQuestions[j] + '<br>';
              }
            } else if (sections[i].startsWith('Interviewer Questions:')) {
              // Add the interviewer questions section to the generated text element
              generatedText.innerHTML += '<br><b>Interviewer Questions:</b><br>';
              var interviewerQuestions = sections[i].substr(23).trim().split(/\n\d+\. /);
              for (var k = 0; k < interviewerQuestions.length; k++) {
                generatedText.innerHTML += k + '. ' + interviewerQuestions[k] + '<br>';
              }
            }
          }
  
          // Append the new div element to the openai-response div on the page
          $('.openai-response').append(generatedText);
        },
      error: function(error) {
        // Display the error message in the console
        console.error(error);
      }
    });
  });
});