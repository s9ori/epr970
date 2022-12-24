<?php

// Replace these values with your own API key, API secret key, and Bearer token
$api_key = 'hqkNlE24A5BiKlyLxqDvBasAk';
$api_secret_key = '1TYvepd0sfGoSlGnW6BABCggeoCTV8oJ4ib2NoPvCpOdKnYOVK';
$bearer_token = 'AAAAAAAAAAAAAAAAAAAAAKIRkwEAAAAAeVhsMtlHxrov4PRP%2BFfKEofomyk%3DEi95GrqqmrkRqPzFvhn0PbzQW6CiEWx3LlHGzBDpNjfucjQ2jz';

// Replace this value with the user ID of the user whose Tweet timeline you want to retrieve
$user_id = '2819050825';

// Use the curl function to make a GET request to the user Tweet timeline endpoint
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://api.twitter.com/2/users/$user_id/tweets");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
  "Authorization: Bearer $bearer_token",
  "x-api-key: $api_key",
  "x-api-secret-key: $api_secret_key"
));
$response = curl_exec($ch);
curl_close($ch);

// Use json_decode to parse the response
$data = json_decode($response, true);

// Loop through the data and extract the values you need
foreach ($data['data'] as $tweet) {
  $tweet_id = $tweet['id'];
  $tweet_text = $tweet['text'];
  
  // Use the wp_insert_post function to create a new post with the tweet text as the content
  $post_id = wp_insert_post(array(
    'post_title' => 'Tweet',
    'post_content' => $tweet_text,
    'post_status' => 'publish',
    'post_type' => 'tweet'
  ));
  
  // Use the update_post_meta function to store the tweet ID as a custom field for the post
  update_post_meta($post_id, 'tweet_id', $tweet_id);
}

?>
