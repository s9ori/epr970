<?php
/*
Template Name: Saori Uchida Homepage EPR970
*/

get_header();
?>

<div class="latest-post-block-container">
  <?php
    // Retrieve the most recent post
    $latest_post = get_posts( array(
      'numberposts' => 3,
      'orderby' => 'post_date',
      'order' => 'DESC',
      'post_type' => 'post',
      'post_status' => 'publish'
    ) );

    // Loop through the posts
    foreach ( $latest_post as $post ) {
      // Get the featured image URL
      $featured_image_url = get_the_post_thumbnail_url( $post->ID );
      // Get the post title
      $title = $post->post_title;
      // Get the post URL
      $post_url = get_permalink( $post->ID );

      // Output the HTML structure for the post
      ?>
      <a href="<?php echo $post_url; ?>" class="latest-post-block-link">
        <div class="latest-post-block">
          <div class="latest-post-block__featured-image-container">
            <img src="<?php echo $featured_image_url; ?>" alt="Featured image" class="latest-post-block__featured-image">
          </div>
          <div class="latest-post-block__title-container">
            <h3 class="latest-post-block__title"><?php echo $title; ?></h3>
          </div>
        </div>
      </a>
    <?php } ?>
</div>

<!-- wp:html -->
<div class="entry-socials">
<div class="wp-block-embed">
<a data-pin-do="embedBoard" data-pin-board-width="550" data-pin-scale-height="650" data-pin-scale-width="250" href="https://www.pinterest.com/esper_anza_/website/"></a>
</div>
<div class="twitter-entry">
<div id="tweet-container"></div>

<?php

// Replace these values with your own API key and secret
$api_key = 'hqkNlE24A5BiKlyLxqDvBasAk';
$api_secret = '1TYvepd0sfGoSlGnW6BABCggeoCTV8oJ4ib2NoPvCpOdKnYOVK';

// Use the API key and secret to get a Bearer token
$bearer_token = base64_encode("$api_key:$api_secret");
$response = file_get_contents("https://api.twitter.com/oauth2/token", false, stream_context_create(array(
  'http' => array(
    'method' => 'POST',
    'header' => "Authorization: Basic $bearer_token\r\nContent-type: application/x-www-form-urlencoded;charset=UTF-8",
    'content' => 'grant_type=client_credentials',
  ),
)));
$response = json_decode($response, true);
$bearer_token = $response['access_token'];

// Replace this value with the user ID of the user whose Tweet timeline you want to retrieve
$user_id = '2819050825';

// Make a GET request to the user Tweet timeline endpoint
$response = file_get_contents("https://api.twitter.com/2/users/$user_id/tweets", false, stream_context_create(array(
  'http' => array(
    'method' => 'GET',
    'header' => "Authorization: Bearer $bearer_token",
  ),
)));
$tweets = json_decode($response, true);

// Output the tweets as a JavaScript array
echo '<script>';
echo 'var tweets = ' . json_encode($tweets) . ';';
echo '</script>';

?>

<script>
// Select the element where the tweets will be displayed
const tweetContainer = document.querySelector('.tweet-container');

// Iterate over the properties of the tweets object
for (const tweet of tweets) {
  // Create a new div element for the tweet
  const tweetElement = document.createElement('div');
  tweetElement.classList.add('tweet');

  // Display the full text of the tweet
  const tweetTextElement = document.createElement('h2');
  tweetTextElement.innerText = tweet.text;
  tweetElement.appendChild(tweetTextElement);

  // Display the creation date of the tweet
  const tweetDateElement = document.createElement('p');
  tweetDateElement.innerText = tweet.created_at;
  tweetElement.appendChild(tweetDateElement);

  // Check if the tweet has a preview image
  if (tweet.attachments && tweet.attachments.media_keys) {
    // If the tweet has a preview image, display it
    const tweetImageElement = document.createElement('img');
    tweetImageElement.src = tweet.attachments.media_keys[0].url;
    tweetElement.appendChild(tweetImageElement);
  }

  // Add the tweet element to the tweet container
  tweetContainer.appendChild(tweetElement);
}

</script>

<!-- /wp:html -->

<!-- wp:html -->
<div class="wp-block-spotify">
<!-- wp:embed {"url":"https://open.spotify.com/show/39nL5PQP2w5PBhnN9wGmHG?si=0fd4f212595d499d","type":"rich","providerNameSlug":"spotify","responsive":true,"className":"wp-embed-aspect-21-9 wp-has-aspect-ratio","animation":"fadeIn"} -->	 
<iframe style="border-radius:12px" src="https://open.spotify.com/embed/show/39nL5PQP2w5PBhnN9wGmHG?utm_source=generator&t=0" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>	 
<!-- /wp:embed -->	 
</div>
</div>
<!-- /wp:html -->

<?php
get_footer();