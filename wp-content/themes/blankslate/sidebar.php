<aside id="sidebar" role="complementary">
<div id="primary" class="widget-area">
<ul class="xoxo">
<?php dynamic_sidebar( 'primary-widget-area' ); ?>
</ul>
</div>
<div class="latest-post-block-container">
  <?php
    // Retrieve the latest post
    $latest_post = get_posts( array(
      'numberposts' => 1,
      'orderby' => 'post_date',
      'order' => 'DESC',
      'post_type' => 'post',
      'post_status' => 'publish'
    ) );

    // Get the featured image URL
    $featured_image_url = get_the_post_thumbnail_url( $latest_post[0]->ID );
    // Get the post title
    $title = $latest_post[0]->post_title;
  ?>

  <!-- Use the values in the HTML structure -->
  <div class="latest-post-block">
    <div class="latest-post-block__featured-image-container">
      <img src="<?php echo $featured_image_url; ?>" alt="Featured image" class="latest-post-block__featured-image">
    </div>
    <div class="latest-post-block__title-container">
      <h3 class="latest-post-block__title"><?php echo $title; ?></h3>
    </div>
  </div>
</div>
</aside>