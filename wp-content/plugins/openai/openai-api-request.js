var openai_data = window.openai_data || {};
var file_contents = file_data.file_contents;
// Define an array of search terms to use for the Google image search

jQuery(document).ready(function($) {
$("form.openai").submit(function(e) {
e.preventDefault();
var prompt = $("#prompt").val();
var api_key = openai_data.api_key;
var model = "text-davinci-003";
var max_tokens = 420;
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

var searchTerms = ["lesserafim", "aoc girl boss", "nct 127", "shinee", "aespa", "boys planet 999"];
// Choose a random search term
var searchTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];
// Construct the Google image search URL using the Google Custom Search API key
var googleApiUrl = "https://www.googleapis.com/customsearch/v1?key=AIzaSyBJaO4vTUyyMacfdgK7Z2OoMRqNwfNQX1g&cx=b225efb1ed80c47aaq=" + searchTerm + "&searchType=image&imgSize=medium&num=10&fileType=gif";
// Send a request to the Google Custom Search API

  $.ajax({
      url: googleApiUrl,
      dataType: "jsonp",
      success: function(response) {
        // Filter the response to only include GIFs
        var gifResults = response.items.filter(function(item) {
          return item.mime == "image/gif";
        });
        // Choose a random image from the search results
        var imageIndex = Math.floor(Math.random() * gifResults.length);
        var imageUrl = gifResults[imageIndex].link;
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
$('#loading-container').show();
$('label').hide();
$('#gif-container').show();
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
  $('#gif-container').hide();
  $('.openai-response').css({
      "opacity": "1",
      "display": "block"
  });
},
error: function(jqXHR, textStatus, errorThrown) {
$('#loading-container').hide();
$('label').show();
$('#prompt').show();
$('#gif-container').hide();
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