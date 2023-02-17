var openai_data = window.openai_data || {};
var file_contents = file_data.file_contents;

jQuery(document).ready(function($) {
$("form.openai").submit(function(e) {
e.preventDefault();
var prompt = $("#prompt").val();
var api_key = openai_data.api_key;
var model = "text-davinci-003";
var max_tokens = 300;
var temperature = .78;
var url = "https://api.openai.com/v1/completions";
var cacheKey = prompt;
var cachedResponse = localStorage.getItem(cacheKey);
var previousResponseArray = [];
if (cachedResponse) {
previousResponseArray = JSON.parse(cachedResponse);
}
var data = {
"model": model,
"prompt": "Mimicing the structure, voice, and tone of these previous tweets from the Brian Lehrer Show:" + file_contents + ", give me a list of five Tweets about:" + prompt,
"max_tokens": max_tokens,
"temperature": temperature
};
$.ajax({
type: "POST",
url: url,
data: JSON.stringify(data),
contentType: "application/json",
beforeSend: function(xhr) {
xhr.setRequestHeader("Authorization", "Bearer " + api_key);
$('#loading-container').show();
$('label').hide();
$('.openai').css('background', '#121212b5');
$('#prompt').hide();
$('input').hide();
$('.openai-response').css({
    "opacity": "0",
    "display": "none"
  });
},
success: function(result) {
  previousResponseArray.push(result.choices[0].text);
  localStorage.setItem(cacheKey, JSON.stringify(previousResponseArray));
  var text = result.choices[0].text;
  // Split the response into separate tweets by looking for instances of "\n\n"
  var tweets = text.split("\n\n");
  // Join the tweets back together with a line break between each one
  var formattedText = tweets.join("<br><br>");
  $(".openai-response").html("<p>" + formattedText + "</p>");
  $('#loading-container').hide();
  $('.openai').css('background', 'linear-gradient(180deg, #e4006dad 0%, #e6a600ba 100%)');
  $('label').show();
  $('#prompt').show();
  $('input').show();
  $('.openai-response').css({
      "opacity": "1",
      "display": "block"
  });
},
error: function(jqXHR, textStatus, errorThrown) {
$('#loading-container').hide();
$('label').show();
$('#prompt').show();
$('.openai').css('background', 'linear-gradient(180deg, #e4006dad 0%, #e6a600ba 100%)');
$('input').show();
$('.openai-response').html("<p>Error: " + jqXHR.responseJSON.error.message + "</p>");
$('.openai-response').css({
    "opacity": "1",
    "display": "block"
  });
}
});
});
});