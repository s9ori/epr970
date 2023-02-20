var openai_data = window.openai_data || {};
var file_contents = file_data.file_contents;
var tense = "live segment"; // Default tense
var whatTense = "present tense";
var previousResponseArray = [];
const textarea = document.getElementById("prompt");

jQuery(document).ready(function($) {
  var cacheCounter = 0; // Initialize the counter
  var buttons = $('#past-tense-btn, #present-tense-btn, #future-tense-btn');
buttons.prop('disabled', true);

// Listen for text input event on the prompt textarea
$('#prompt').on('input', function() {
  var prompt = $(this).val();
  
  $('#author').on('input', function() {
    var author = $(this).val();
});

  // Enable/disable buttons based on the prompt length
  if (prompt.trim().length > 15) {
    buttons.prop('disabled', false);
  } else {
    buttons.prop('disabled', true);
  }
});

$("#prompt").focus();

textarea.addEventListener("input", () => {
  textarea.style.height = "auto";
  textarea.style.height = `${textarea.scrollHeight}px`;
});


$("form.openai").submit(function(e) {
  $('#past-tense-btn').click(function() {
    tense = "past segment";
    whatTense = "past tense";
  });
  
  $('#present-tense-btn').click(function() {
    tense = "live segment";
    whatTense = "present tense";
  });

  $('#future-tense-btn').click(function() {
    tense = "upcoming segment";
    whatTense = "future tense";
  });
  
e.preventDefault();
// Define an array of search terms to use for the Google image search
var searchTerms = ["lesserafim", "taemin", "kpop memes", "nct dream", "blackpink", "shinee kpop", "newjeans", "nct 127", "aespa", "boys planet 999"];

// Choose a random search term
var searchTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];

// Construct the Google image search URL using the Google Custom Search API key
var googleApiUrl = "https://www.googleapis.com/customsearch/v1?key=AIzaSyBJaO4vTUyyMacfdgK7Z2OoMRqNwfNQX1g&cx=b225efb1ed80c47aa&searchType=image&imgSize=medium&num=20&fileType=gif&q=" + searchTerm;
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
"prompt": "Inspired by the voice and tone of these tweets from The Brian Lehrer Show: \n" + file_contents + ", here is a numbered list of five original Tweets in " + whatTense + "\n with less than 280 characters and no hashtags about this " + tense + ":\n" + prompt + ": \n",
"max_tokens": max_tokens,
"temperature": temperature
};

$.ajax({
  url: googleApiUrl,
  dataType: "jsonp",
  success: function(response) {
    var gifResults = [];
    if (response && response.items && response.items.length) {
      // Filter the response to only include GIFs
      gifResults = response.items.filter(function(item) {
        return item.mime == "image/gif";
      });
    }
    if (gifResults.length) {
      // Use the first image from the filtered results
      var imageUrl = gifResults[Math.floor(Math.random() * gifResults.length)].link;
      // Set the source of the GIF container to the random image URL
      $('#gif-container').attr('src', imageUrl);
      // Show the GIF container
      $('#gif-container').show();
    } else {
      // No GIF images found in Google search results, try Giphy API
      $.ajax({
        url: giphyApiUrl,
        success: function(response) {
          var imageUrl = response.data.images.original.url;
          // Set the source of the GIF container to the Giphy URL
          $('#gif-container').attr('src', imageUrl);
          // Show the GIF container
          $('#gif-container').show();
        },
        error: function(jqXHR, textStatus, errorThrown) {
          // Handle errors
          console.log("Error: " + errorThrown);
        }
      });
    }
  },
  error: function(jqXHR, textStatus, errorThrown) {
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
      error: function(jqXHR, textStatus, errorThrown) {
        // Handle errors
        console.log("Error: " + errorThrown);
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
$('.rewrites').hide();
$('.input-btn').hide();
$('.texted').hide();
$('.input-btn').hide();
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
  $('.rewrites').show();
  $('.input-btn').show();
  $('.openai-input').show();
  $('.texted').show();
  $('.input-btn').show();
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
$('.rewrites').hide();
$('.prompt-tuning').show();
$('.input-btn').show();
$('.openai-input').show();
$('.texted').show();
$('.input-btn').show();
$('.openai-response').html("<p>Error: " + jqXHR.responseJSON.error.message + "</p>");
$('.openai-response').css({
    "opacity": "1",
    "display": "flex"
  });
}
});
});
$('#creative-btn').click(function() {
  var inputVariable = " more creative:";
  runRewrite(inputVariable);
});

$('#serious-btn').click(function() {
  var inputVariable = " more serious:";
  runRewrite(inputVariable);
});

$('#longer-btn').click(function() {
  var prompt3 = $("#prompt").val();
  var inputVariable = " more descriptive, more detailed, and longer (with a maximum length of 280 characters) using this reference" + prompt3 + ":";
  runRewrite(inputVariable);
});

function runRewrite(inputVariable) {
    var cacheKey = $('#prompt').val() + '-' + (cacheCounter - 1); // Get the cache key from the previous request
    var api_key = openai_data.api_key;
    var model = "text-davinci-003";
    var max_tokens = 420;
    var temperature = .7;
    var url = "https://api.openai.com/v1/completions";
    var prompt2 = previousResponseArray[previousResponseArray.length - 1]; // Get the last response from the array
    var prompt3 = $("#prompt").val();


    var data2 = {
      "model": model,
      "prompt": "Make the tweets in this list\n " + prompt2 + "\n" + inputVariable,
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
        $('.rewrites').hide();
        $('.prompt-tuning').hide();       
        $('.input-btn').hide();
        $('.texted').hide();
        $('.input-btn').hide();
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
        $('.rewrites').show();
        $('#prompt').show();
        $('.prompt-tuning').show();
        $('.texted').show();
        $('.input-btn').show();
        $('.openai-input').show();
        $('.input-btn').show();
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
        $('.input-btn').show();
        $('#gif-container').hide();
        $('.rewrites').hide();
        $('.prompt-tuning').show();
        $('.input-btn').show();
        $('.openai-input').show();
        $('.openai-response').html("<p>Error: " + jqXHR.responseJSON.error.message + "</p>");
        $('.openai-response').css({
          "opacity": "1",
          "display": "flex"
        });
      }
    });
  };


  $('#summarizeArticle').click(function() {
    var api_key = openai_data.api_key;
    var model = "text-davinci-003";
    var max_tokens = 500;
    var temperature = .7;
    var url = "https://api.openai.com/v1/completions";
    var prompt = $("#prompt").val();
    var author = $("#author").val();

  
    var data3 = {
      "model": model,
      "prompt": "Here is a detailed journalistic summary of this article written by " + author + ":\n " + prompt,
      "max_tokens": max_tokens,
      "temperature": temperature
    };
  
    $.ajax({
      type: "POST",
      url: url,
      data: JSON.stringify(data3),
      contentType: "application/json",
      beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "Bearer " + api_key);
        $('.navis-calling').show();
        $('label').hide();
        $('.rewrites').hide();
        $('.prompt-tuning').hide();       
        $('.input-btn').hide();
        $('.texted').hide();
        $('.input-btn').hide();
        $('#gif-container').show();
        $('#prompt').hide();
        $('.openai-input').hide();
        $('.openai-response').css({
          "opacity": "0",
          "display": "flex"
        });
      },
      success: function(result) {
        setTimeout(function() {
        var text1 = result.choices[0].text;
        var api_key = openai_data.api_key;
        var model = "text-davinci-003";
        var max_tokens = 420;
        var temperature = .7;
        var url = "https://api.openai.com/v1/completions";
        var cacheKey = prompt; // Only use the prompt to construct the cache key
        cacheCounter++; // Increment the counter
        var cachedResponse = localStorage.getItem(cacheKey);
        if (cachedResponse) {
          previousResponseArray = JSON.parse(cachedResponse);
        }
        var data4 = {
          "model": model,
          "prompt": "Inspired by the voice and tone of these tweets from The Brian Lehrer Show: \n" + file_contents + "\n, here is a numbered list of five original Tweets\n with less than 280 characters and no hashtags \n about this article written by our guest " + author + ": \n" + text1 + ": \n",
          "max_tokens": max_tokens,
          "temperature": temperature
        };
  
        $.ajax({
          type: "POST",
          url: url,
          data: JSON.stringify(data4),
          contentType: "application/json",
          beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + api_key);
            $('.navis-calling').show();
            $('label').hide();
            $('.prompt-tuning').hide();
            $('.rewrites').hide();
            $('.input-btn').hide();
            $('.texted').hide();
            $('.input-btn').hide();
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
          $('.rewrites').show();
          $('#prompt').show();
          $('.prompt-tuning').show();
          $('.texted').show();
          $('.input-btn').show();
          $('.openai-input').show();
          $('.input-btn').show();
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
$('.rewrites').hide();
$('.prompt-tuning').show();
$('.input-btn').show();
$('.openai-input').show();
$('.texted').show();
$('.input-btn').show();
$('.openai-response').html("<p>Error: " + jqXHR.responseJSON.error.message + "</p>");
$('.openai-response').css({
    "opacity": "1",
    "display": "flex"
  });
}
}),
    // Hide any empty tweet elements
    $(".tweet:empty").css("display", "none");
    $('.navis-calling').show();
          $('label').hide();
          $('.rewrites').hide();
          $('#prompt').hide();
          $('.prompt-tuning').hide();
          $('.texted').hide();
          $('.input-btn').hide();
          $('.openai-input').hide();
          $('.input-btn').hide();
          $('#gif-container').show();
          $('.openai-response').css({
            "opacity": "0",
            "display": "none"
          });
        }, 2000); // Set timeout to 1s (1000ms)
        },
        error: function(jqXHR, textStatus, errorThrown) {
          $('.navis-calling').hide();
          $('label').show();
          $('#prompt').show();
          $('.texted').show();
          $('.input-btn').show();
          $('#gif-container').hide();
          $('.rewrites').hide();
          $('.prompt-tuning').show();
          $('.input-btn').show();
          $('.openai-input').show();
          $('.openai-response').html("<p>Error: " + jqXHR.responseJSON.error.message + "</p>");
          $('.openai-response').css({
            "opacity": "1",
            "display": "flex"
          });
        }}
    )
      })
    });