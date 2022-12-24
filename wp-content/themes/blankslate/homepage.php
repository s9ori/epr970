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
<div class="entry-twit">
<div id="tweet-container"></div>

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

// Parse the JSON response
$tweets = json_decode($response, true);

// Output the tweets as a JavaScript array
echo '<script>';
echo 'var tweets = ' . json_encode($tweets) . ';';
echo '</script>';

?>
<script>
// Loop through the tweets and output them on the DOM
for (var i = 0; i < tweets.data.length; i++) {
  var tweet = tweets[i];
  var tweetElement = document.createElement('div');
  tweetElement.innerHTML = tweet['text'];

  // Set the background color of the element to blue
  tweetElement.style.backgroundColor = 'blue';
  // Set the font size to 24px
  tweetElement.style.fontSize = '24px';
  // Set the text color to white
  tweetElement.style.color = 'white';

  document.getElementById('tweet-container').appendChild(tweetElement);
}

</script>
</div>


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