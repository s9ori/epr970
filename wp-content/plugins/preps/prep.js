var openai_data = window.openai_data || {};



jQuery(document).ready(function($) {
    // Listen for text input event on the prompt textarea

  $('form.prep-form').submit(function(event) {
    event.preventDefault();
    var api_key = openai_data.api_key;
    var subject = openai_data.subject;
    var intro = openai_data.intro;
    var interviewer_questions = openai_data.interviewer_questions;
    var listener_questions = openai_data.listener_questions;
    var prompt = subject + "\n" + intro + "\n" + interviewer_questions + "\n" + listener_questions;
      var model = "text-davinci-003";
      var max_tokens = 500;
      var temperature = .7;
      var url = "https://api.openai.com/v1/completions";
    
      var data = {
        "model": model,
        "prompt": prompt,
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
        },
        success: function(response) {
          // Get the generated text from the API response
          var text = response.choices[0].text;
        
          // Create a new div element to display the generated text
          var generatedText = document.createElement('div');
          generatedText.textContent = text;
        
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
