<!DOCTYPE html>
<html <?php language_attributes(); ?> <?php blankslate_schema_type(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<meta name="viewport" content="width=device-width" />
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div id="wrapper" class="hfeed">
<header id="header" role="banner">
<div id="branding">
<div id="site-title" itemprop="publisher" itemscope itemtype="https://schema.org/Organization">
<?php
if ( is_front_page() || is_home() || is_front_page() && is_home() ) { echo ''; }
echo '<a href="' . esc_url( home_url( '/' ) ) . '" title="' . esc_attr( get_bloginfo( 'name' ) ) . '" rel="home" itemprop="url"><span itemprop="name">' . esc_html( get_bloginfo( 'name' ) ) . '</span></a>';
if ( is_front_page() || is_home() || is_front_page() && is_home() ) { echo ''; }
?>
</div>
<div id="site-description"<?php if ( !is_single() ) { echo ' itemprop="description"'; } ?>><?php bloginfo( 'description' ); ?></div>
<img class="logo" src="http://0nx.17b.myftpupload.com/wp-content/uploads/2022/12/cropped-DALL·E-2022-12-17-22.21.36-a-lady-dior-hand-bag-a-journal-and-a-lip-stick-on-a-table-oil-painting-by-matisse.png">
</div>
<nav id="menu" role="navigation" itemscope itemtype="https://schema.org/SiteNavigationElement">
<?php wp_nav_menu( array( 'theme_location' => 'main-menu', 'link_before' => '<span itemprop="name">', 'link_after' => '</span>' ) ); ?>
<div id="search"><?php get_search_form(); ?></div>
</nav>
</header>
<div id="container">
    <div id="subcontainer">
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
      'numberposts' => 2,
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

      // Output the HTML structure for each post
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
</div>

</aside>
<main id="content" role="main">