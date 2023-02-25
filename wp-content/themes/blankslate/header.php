<!DOCTYPE html>
<html <?php language_attributes(); ?> <?php blankslate_schema_type(); ?>>
<head>
  
    <!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-THNTCHTWYB"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-THNTCHTWYB');
</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.3/TweenMax.min.js"></script>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<meta name="viewport" content="width=device-width, user-scalable=no" />
<link rel="stylesheet" href="https://use.typekit.net/ojo1har.css">
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<header id="header" role="banner">
<div id="branding">
<div id="site-title" itemprop="publisher" itemscope itemtype="https://schema.org/Organization">
<?php
if ( is_front_page() || is_home() || is_front_page() && is_home() ) { echo ''; }
echo '<a href="' . esc_url( home_url( '/' ) ) . '" title="' . esc_attr( get_bloginfo( 'name' ) ) . '" rel="home" itemprop="url"><span itemprop="name">' . esc_html( get_bloginfo( 'name' ) ) . '</span></a>';
if ( is_front_page() || is_home() || is_front_page() && is_home() ) { echo ''; }
?>
</div>
<div id="site-description"<?php if ( !is_single() ) { echo ' itemprop="description"'; } ?>><?php bloginfo( 'description' ); ?>
<div class="pet-stats">
    <div class="mood">
      <span>Mood: </span>
      <span id="mood-state"></span>
    </div>
    <div class="fitness">
      <span>Fitness: </span>
      <span id="fitness-state"></span>
    </div>
    <div class="power-level">
      <span>Power Level: </span>
      <span id="power-level"></span>
    </div>
  </div>
  <div class="pet-interactions">
    <button id="play">Play</button>
    <button id="exercise">Train</button>
    <button id="adventure">Adventure</button>
  </div>
</div>
<a id="logo-link" href="/pet"><div id="level"></div>
<img class="logo" src="https://lowfemme.com/wp-content/uploads/2023/02/tumblr_neqyicWGSs1u1nuzeo1_500.gif" alt="Pet Image"></a>
<div id="response"></div>
</div>
<div id="monsters"></div>
<div id="drops"></div>
<div id="foods"></div>
<nav id="menu" role="navigation" itemscope itemtype="https://schema.org/SiteNavigationElement">
<?php wp_nav_menu( array( 'theme_location' => 'main-menu', 'link_before' => '<span itemprop="name">', 'link_after' => '</span>' ) ); ?>
<div id="search"><?php get_search_form(); ?></div>
</nav>
</header>
<div id="wrapper" class="hfeed">
<div id="container">
<main id="content" role="main">