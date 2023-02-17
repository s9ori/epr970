var openai_data = window.openai_data || {};
var file_contents = file_data.file_contents;
var tense = "present"; // Default tense

jQuery(document).ready(function($) {
$("form.openai").submit(function(e) {
  $('#past-tense-btn').click(function() {
    tense = "past";
  });
  
  $('#present-tense-btn').click(function() {
    tense = "present";
  });
  
e.preventDefault();
// Define an array of search terms to use for the Google image search
var searchTerms = ["lesserafim", "cardi b", "attack on titan", "blackpink", "funny memes", "shinee", "newjeans", "rupauls dragrace", "nct 127", "shinee", "aespa", "boys planet 999"];

// Choose a random search term
var searchTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];

// Construct the Google image search URL using the Google Custom Search API key
var googleApiUrl = "https://www.googleapis.com/customsearch/v1?key=AIzaSyBJaO4vTUyyMacfdgK7Z2OoMRqNwfNQX1g&cx=b225efb1ed80c47aa&searchType=image&imgSize=medium&num=10&fileType=gif&q=" + searchTerm;

var prompt = $("#prompt").val();
var api_key = openai_data.api_key;
var model = "text-davinci-003";
var max_tokens = 420;
var temperature = .8;
var url = "https://api.openai.com/v1/completions";
var cacheKey = prompt;
var cachedResponse = localStorage.getItem(cacheKey);
var previousResponseArray = [];
if (cachedResponse) {
previousResponseArray = JSON.parse(cachedResponse);
}
var data = {
"model": model,
"prompt": "Mimicking the structure, voice, and tone of these previous tweets from the Brian Lehrer Show: " + file_contents + ", here is a list of five engaging Tweets in " + tense + " with less than 280 characters and about: " + prompt + ":",
"max_tokens": max_tokens,
"temperature": temperature
};

$.ajax({
  url: googleApiUrl,
  dataType: "jsonp",
  success: function(response) {
      // Filter the response to only include GIFs
      var gifResults = response.items.filter(function(item) {
          return item.mime == "image/gif";
      });
      // Use the first image from the filtered results
      var imageUrl = gifResults[Math.floor(Math.random() * 10)].link;
      // Set the source of the GIF container to the random image URL
      $('#gif-container').attr('src', imageUrl);
      // Show the GIF container
      $('#gif-container').show();
  },
});

$.ajax({
type: "POST",
url: url,
data: JSON.stringify(data),
contentType: "application/json",
beforeSend: function(xhr) {
xhr.setRequestHeader("Authorization", "Bearer " + api_key);
$('.navis-calling').show();
$('label').hide();
$('#gif-container').show();
$('#prompt').hide();
$('.openai-input').hide();
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
  var tweets = text.split("\n");
// Join the tweets back together with a line break between each one
var formattedText = tweets.join("<br>");
  $(".openai-response").html("<p>" + formattedText + "</p>");
  $('.navis-calling').hide();
  $('label').show();
  $('#prompt').show();
  $('.openai-input').show();
  $('#gif-container').hide();
  $('.openai-response').css({
      "opacity": "1",
      "display": "block"
  });
},
error: function(jqXHR, textStatus, errorThrown) {
$('.navis-calling').hide();
$('label').show();
$('#prompt').show();
$('#gif-container').hide();
$('.openai-input').show();
$('.openai-response').html("<p>Error: " + jqXHR.responseJSON.error.message + "</p>");
$('.openai-response').css({
    "opacity": "1",
    "display": "block"
  });
}
});
});
});