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
<meta name="viewport" content="width=device-width" />
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
<div id="site-description"<?php if ( !is_single() ) { echo ' itemprop="description"'; } ?>><?php bloginfo( 'description' ); ?></div>
<a id="logo-link" href="/"><img class="logo" src="https://lowfemme.com/wp-content/uploads/2023/02/tumblr_neqyicWGSs1u1nuzeo1_500.gif"></a>
<div class="pet">
        <div class="pet-image-container">
            <img class="pet-image" src="">
            <img class="pet-state" src="">
        </div>
        <h2 class="name"></h2>
        <ul>
            <li>Weight: <span class="weight"></span></li>
            <li>Happiness: <span class="happiness"></span></li>
        </ul>
        <p id="status"></p>
        <div id="actions" class="actions">
            <button class="treat-button">Treat</button>
            <button class="play-button">Play</button>
            <button class="exercise-button">Exercise</button>
        </div>
        <div id="adopt" class="button-container">
            <button class="adopt-button">Adopt Pet</button>
        </div>
        <div class="button-container active">
            <button class="abandon-button">Abandon Pet</button>
        </div>
    </div>
  </div>
<nav id="menu" role="navigation" itemscope itemtype="https://schema.org/SiteNavigationElement">
<?php wp_nav_menu( array( 'theme_location' => 'main-menu', 'link_before' => '<span itemprop="name">', 'link_after' => '</span>' ) ); ?>
<div id="search"><?php get_search_form(); ?></div>
</nav>
</header>
<div id="wrapper" class="hfeed">
<div id="container">
<main id="content" role="main">