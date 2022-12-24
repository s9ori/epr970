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

<script>
const API_KEY = 'hqkNlE24A5BiKlyLxqDvBasAk';
const API_SECRET_KEY = '1TYvepd0sfGoSlGnW6BABCggeoCTV8oJ4ib2NoPvCpOdKnYOVK';

// Generate a base64-encoded bearer token from the API key and secret key
const bearerToken ='AAAAAAAAAAAAAAAAAAAAAKIRkwEAAAAAeVhsMtlHxrov4PRP%2BFfKEofomyk%3DEi95GrqqmrkRqPzFvhn0PbzQW6CiEWx3LlHGzBDpNjfucjQ2jz';

// Replace USER_ID with the user ID of the user whose Tweets you want to retrieve
const userId = '2819050825';

// Make the request to the user Tweet timeline endpoint
fetch(`https://api.twitter.com/2/users/${userId}/tweets`, bearerToken)
  .then((response) => response.json())
  .then((data) => {
    // Extract the full text of the latest user tweet from the response
    const latestTweet = data.data[0];
    const fullText = latestTweet.text;
    const date = latestTweet.created_at;

    // Extract the preview image URL if it exists
    let previewImageUrl;
    if (latestTweet.attachments && latestTweet.attachments.media) {
      const media = latestTweet.attachments.media[0];
      previewImageUrl = media.preview_image_url;
    }

    // Display the full text, date, and preview image on the page
    const tweetContainer = document.getElementById('tweet-container');
    tweetContainer.innerHTML = `
      <p>${fullText}</p>
      <p>${date}</p>
      ${previewImageUrl ? `<img src="${previewImageUrl}" alt="Tweet preview image">` : ''}
    `;
  })
  .catch((error) => {
    console.error(error);
  });

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