﻿jQuery(document).ready(function($) {
  $('#prep-form').submit(function(event) {
    event.preventDefault();
    var prompt = file_data.prompt;
    var api_key = openai_data.api_key;
      var model = "text-davinci-003";
      var max_tokens = 500;
      var temperature = .7;
      var url = "https://api.openai.com/v1/completions";
    
      var data = {
        "model": model,
        "prompt": "Here is json file: \n " + prompt + ": \n\n",
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
        // Display the generated text in the console
        console.log(response.choices[0].text);
      },
      error: function(error) {
        // Display the error message in the console
        console.error(error);
      }
    });
  });
});
