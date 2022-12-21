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
    <img class="logo" src="http://0nx.17b.myftpupload.com/wp-content/uploads/2022/12/cropped-DALL·E-2022-12-17-22.21.36-a-lady-dior-hand-bag-a-journal-and-a-lip-stick-on-a-table-oil-painting-by-matisse.png">
<div id="site-title" itemprop="publisher" itemscope itemtype="https://schema.org/Organization">
</div>
<div id="site-description"<?php if ( !is_single() ) { echo ' itemprop="description"'; } ?>><?php bloginfo( 'description' ); ?></div>
</div>
<nav id="menu" role="navigation" itemscope itemtype="https://schema.org/SiteNavigationElement">
<?php wp_nav_menu( array( 'theme_location' => 'main-menu', 'link_before' => '<span itemprop="name">', 'link_after' => '</span>' ) ); ?>
<div id="search"><?php get_search_form(); ?></div>
</nav>
</header>
<div id="container">
<main id="content" role="main">