</main>
<?php get_sidebar(); ?>
</div>
<footer id="footer" role="contentinfo">
</div>
</footer>
</div>
<?php wp_footer(); ?>
<script>
const tab = document.querySelector('.tab');
const comments = document.querySelector('#comments'); // Update the ID of the div element
let isOpen = false;

tab.addEventListener('click', () => {
  // Check if the open class is already applied to the comments element
  if (!comments.classList.contains('open')) {
    // If the open class is not applied, add it and set the isOpen flag to true
    comments.classList.add('open');
    isOpen = true;
  } else {
    // If the open class is already applied, toggle it and flip the isOpen flag
    comments.classList.toggle('open');
    isOpen = !isOpen;
  }

  // Indent this block of code correctly and enclose it within curly braces
  if (isOpen) {
    sidebar.style.marginLeft = '575px';
  } else {
    sidebar.style.marginLeft = '0px';
  }
});



</script>

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


</body>
</html>