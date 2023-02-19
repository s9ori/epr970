var openai_data = window.openai_data || {};
var file_contents = file_data.file_contents;
var tense = "present tense"; // Default tense
var previousResponseArray = [];


jQuery(document).ready(function($) {
  var cacheCounter = 0; // Initialize the counter

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
var searchTerms = ["lesserafim", "taemin", "kpop memes", "nct dream", "blackpink", "shinee kpop", "newjeans", "cute animals", "bernie sanders memes", "nct 127", "" , "aespa", "boys planet 999"];

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
var cacheKey = prompt; // Only use the prompt to construct the cache key

cacheCounter++; // Increment the counter
var cachedResponse = localStorage.getItem(cacheKey);
if (cachedResponse) {
previousResponseArray = JSON.parse(cachedResponse);
}
var data = {
"model": model,
"prompt": "Inspired by the voice and style of these tweets from the Brian Lehrer Show: " + file_contents + ", here is a numbered list of five original Tweets from the Brian Lehrer Show with less than 280 characters in " + tense + " about: " + prompt + ":",
"max_tokens": max_tokens,
"temperature": temperature
};

$.ajax({
  url: googleApiUrl,
  dataType: "jsonp",
  success: function(response) {
    if (gifResults.length < 1) {
    var gifResults = response.items.filter(function(item) {
      return item.mime == "image/gif";
    });
      // Trigger the error function to fallback to Giphy API
      this.error();
    } else {
      // Use the first image from the filtered results
      var imageUrl = gifResults[Math.floor(Math.random() * gifResults.length)].link;
      // Set the source of the GIF container to the random image URL
      $('#gif-container').attr('src', imageUrl);
      // Show the GIF container
      $('#gif-container').show();
    }
  },
  error: function() {
    // Google API request failed, try Giphy API
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
$('.texted').hide();
$('#rewrite-btn').hide();
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

  // Create a div element for each tweet
  var tweetDivs = tweets.map(function(tweet) {
    if (tweet.trim() === '') {
      // If the tweet is empty, return an empty string
      return '';
    }
    // Otherwise, create a div for the tweet
    return "<div class='tweet'>" + tweet + "</div>";
  });

  // Join the tweet divs together and insert them into the DOM
  var formattedText = tweetDivs.join("");
  $(".openai-response").html(formattedText);
  
  // Hide any empty tweet elements
  $(".tweet:empty").css("display", "none");
  $('.navis-calling').hide();
  $('label').show();
  $('#prompt').show();
  $('.prompt-tuning').show();
  $('.openai-input').show();
  $('.texted').show();
  $('#rewrite-btn').show();
  $('#gif-container').hide();
  $('.openai-response').css({
      "opacity": "1",
      "display": "flex"
  });
},
error: function(jqXHR, textStatus, errorThrown) {
$('.navis-calling').hide();
$('label').show();
$('#prompt').show();
$('#gif-container').hide();
$('.prompt-tuning').show();
$('.openai-input').show();
$('.texted').show();
$('#rewrite-btn').show();
$('.openai-response').html("<p>Error: " + jqXHR.responseJSON.error.message + "</p>");
$('.openai-response').css({
    "opacity": "1",
    "display": "flex"
  });
}
});
});
 $('#rewrite-btn').click(function() {
    var input_variable = "slightly more creative";
    var cacheKey = $('#prompt').val() + '-' + (cacheCounter - 1); // Get the cache key from the previous request
    var prompt2 = "";
    var api_key = openai_data.api_key;
    var model = "text-davinci-003";
    var max_tokens = 420;
    var temperature = .88;
    var url = "https://api.openai.com/v1/completions";
    var prompt2 = previousResponseArray[previousResponseArray.length - 1]; // Get the last response from the array

    var data2 = {
      "model": model,
      "prompt": "Rewrite this list of five tweets to make them " + input_variable + ": " + prompt2,
      "max_tokens": max_tokens,
      "temperature": temperature
    };

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
        $('.prompt-tuning').hide();
        $('.texted').hide();
        $('#rewrite-btn').hide();
        $('#gif-container').show();
        $('#prompt').hide();
        $('.openai-input').hide();
        $('.openai-response').css({
          "opacity": "0",
          "display": "flex"
        });
      },
      success: function(result) {
        previousResponseArray.push(result.choices[0].text);
        localStorage.setItem(cacheKey, JSON.stringify(previousResponseArray));
        var text = result.choices[0].text;

       // Split the response into separate tweets by looking for instances of "\n\n"
        var tweets = text.split("\n");

       // Create a div element for each tweet
      var tweetDivs = tweets.map(function(tweet) {
      if (tweet.trim() === '') {
      // If the tweet is empty, return an empty string
      return '';
    }
    // Otherwise, create a div for the tweet
    return "<div class='tweet'>" + tweet + "</div>";
   });

  // Join the tweet divs together and insert them into the DOM
  var formattedText = tweetDivs.join("");
  $(".openai-response").html(formattedText);
  
  // Hide any empty tweet elements
  $(".tweet:empty").css("display", "none");
  $('.navis-calling').hide();
        $('label').show();
        $('#prompt').show();
        $('.prompt-tuning').show();
        $('.texted').show();
        $('#rewrite-btn').show();
        $('.openai-input').show();
        $('#gif-container').hide();
        $('.openai-response').css({
          "opacity": "1",
          "display": "flex"
        });
      },
      error: function(jqXHR, textStatus, errorThrown) {
        $('.navis-calling').hide();
        $('label').show();
        $('#prompt').show();
        $('.texted').show();
        $('#rewrite-btn').show();
        $('#gif-container').hide();
        $('.prompt-tuning').show();
        $('.openai-input').show();
        $('.openai-response').html("<p>Error: " + jqXHR.responseJSON.error.message + "</p>");
        $('.openai-response').css({
          "opacity": "1",
          "display": "flex"
        });
      }
    });
  });
});