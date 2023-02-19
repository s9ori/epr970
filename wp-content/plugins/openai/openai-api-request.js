var openai_data = window.openai_data || {};
var file_contents = file_data.file_contents;
var tense = "present tense"; // Default tense


jQuery(document).ready(function($) {
$("form.openai").submit(function(e) {
  $('#past-tense-btn').click(function() {
    tense = "past tense";
  });
  
  $('#present-tense-btn').click(function() {
    tense = "present tense";
  });

  $('#future-tense-btn').click(function() {
    tense = "future tense";
  });
  
e.preventDefault();
// Define an array of search terms to use for the Google image search
var searchTerms = ["lesserafim", "taemin", "kpop memes", "nct dream", "blackpink", "shinee kpop", "newjeans", "cute animals", "bernie sanders memes", "nct 127", "aespa", "boys planet 999"];

// Choose a random search term
var searchTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];

// Construct the Google image search URL using the Google Custom Search API key
var googleApiUrl = "https://www.googleapis.com/customsearch/v1?key=AIzaSyBJaO4vTUyyMacfdgK7Z2OoMRqNwfNQX1g&cx=b225efb1ed80c47aa&searchType=image&imgSize=medium&num=10&fileType=gif&q=" + searchTerm;
// Construct the Giphy API URL
var giphyApiUrl = "https://api.giphy.com/v1/gifs/random?api_key=rK1WsAXKWR1WXJMM5ODZdM3VNvhLWVxw&tag=" + searchTerm + "&rating=pg-13";

var prompt = $("#prompt").val();
var api_key = openai_data.api_key;
var model = "text-davinci-003";
var max_tokens = 420;
var temperature = .88;
var url = "https://api.openai.com/v1/completions";
var cacheKey = prompt;
var cachedResponse = localStorage.getItem(cacheKey);
var previousResponseArray = [];
if (cachedResponse) {
previousResponseArray = JSON.parse(cachedResponse);
}
var data = {
"model": model,
"prompt": "Inspired by the voice and style of these tweets: " + file_contents + ", here is a numbered list of five original Tweets with less than 280 characters in " + tense + " about: " + prompt + ":",
"max_tokens": max_tokens,
"temperature": temperature
};
$.ajax({
  url: googleApiUrl,
  dataType: "jsonp",
  success: function(response) {
    if (gifResults && gifResults.length) {
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
    } else {
// Make a call to the Giphy API to retrieve a random GIF
$.ajax({
  url: giphyApiUrl,
  success: function(response) {
    var imageUrl = response.data.images.original.url;
    // Set the source of the GIF container to the Giphy URL
    $('#gif-container').attr('src', imageUrl);
    // Show the GIF container
    $('#gif-container').show();
  },
  error: function() {
    // Handle errors
  }
});
}
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
$('.prompt-tuning').hide();
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
  $('.prompt-tuning').show();
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
$('.prompt-tuning').show();
$('.openai-input').show();
$('.openai-response').html("<p>Error: " + jqXHR.responseJSON.error.message + "</p>");
$('.openai-response').css({
    "opacity": "1",
    "display": "block"
  });
}
});
$('#rewrite-btn').click(function() {
  var input_variable = "more creative";
  var promptValue = $('#prompt').val();
  var cachedResponse = localStorage.getItem(lastCacheKey);
  var prompt2 = "";
  if (cachedResponse) {
    var responseArray = JSON.parse(cachedResponse);
    prompt2 = responseArray[responseArray.length - 1]; // Get the last response from the array
  }
  var data2 = {
    "model": model,
    "prompt": "Rewrite this list of five tweets to make them " + input_variable + ": " + prompt2,
    "max_tokens": max_tokens,
    "temperature": temperature
  };
  var cacheKey = promptValue + '-rewrite';
  lastCacheKey = cacheKey;
  $.ajax({
    type: "POST",
    url: url,
    data: JSON.stringify(data2),
    contentType: "application/json",
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "Bearer " + api_key);
      $('.navis-calling').show();
      $('label').hide();
      $('.prompt-tuning').hide();
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
      $('.prompt-tuning').show();
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
      $('.prompt-tuning').show();
      $('.openai-input').show();
      $('.openai-response').html("<p>Error: " + jqXHR.responseJSON.error.message + "</p>");
      $('.openai-response').css({
          "opacity": "1",
          "display": "block"
      });
    },
  });
});
});
});