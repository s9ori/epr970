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

// Replace these values with your own API key, API secret key, and Bearer token
$api_key = 'hqkNlE24A5BiKlyLxqDvBasAk';
$api_secret_key = '1TYvepd0sfGoSlGnW6BABCggeoCTV8oJ4ib2NoPvCpOdKnYOVK';
$bearer_token = 'AAAAAAAAAAAAAAAAAAAAAKIRkwEAAAAAeVhsMtlHxrov4PRP%2BFfKEofomyk%3DEi95GrqqmrkRqPzFvhn0PbzQW6CiEWx3LlHGzBDpNjfucjQ2jz';

// Replace this value with the user ID of the user whose Tweet timeline you want to retrieve
$user_id = '2819050825';

// Set up the cURL resource for the user timeline API request
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://api.twitter.com/1.1/statuses/user_timeline.json?user_id=$user_id&count=1&tweet_mode=extended&expansions=attachments.media_keys&media.fields=preview_image_url");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
  "Authorization: Bearer $bearer_token",
  "x-api-key: $api_key",
  "x-api-secret-key: $api_secret_key"
));

// Send the request and parse the response
$response = curl_exec($ch);
$response_data = json_decode($response);
curl_close($ch);

// Get the first tweet in the response
$tweet = $response_data[0];

// Extract the relevant data from the tweet
$full_text = $tweet->full_text;
$preview_image_url = $tweet->entities->media[0]->media_url;
$created_at = $tweet->created_at;
$user_handle = $tweet->user->screen_name;

?>
<script>
  // Output the tweet data as a JavaScript object
  var tweetData = {
    full_text: '<?php echo $full_text; ?>',
    preview_image_url: '<?php echo $preview_image_url; ?>',
    created_at: '<?php echo $created_at; ?>',
    user_handle: '<?php echo $user_handle; ?>'
  };
</script>

<!-- Output the tweet data to the DOM -->
<div id="tweet-container">
  <p>Full text: <span id="full-text"></span></p>
  <img id="preview-image" src="" alt="">

<p>Date: <span id="date"></span></p>
<p>User handle: <span id="user-handle"></span></p>
</div>
<!-- Use JavaScript to output the tweet data to the DOM -->
<script>
// Set the inner HTML of the full-text element to the full_text field of the tweetData object
document.getElementById('full-text').innerHTML = tweetData.full_text;
// Set the src attribute of the preview-image element to the preview_image_url field of the tweetData object
document.getElementById('preview-image').src = tweetData.preview_image_url;
// Set the inner HTML of the date element to the created_at field of the tweetData object
document.getElementById('date').innerHTML = tweetData.created_at;
// Set the inner HTML of the user-handle element to the user_handle field of the tweetData object
document.getElementById('user-handle').innerHTML = tweetData.user_handle;
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