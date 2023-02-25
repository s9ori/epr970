<?php
/*
Template Name: Saori Uchida Pet EPR970
*/

get_header();
?>
<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
<div class="entry-basics">
<h1 class="entry-title" itemprop="name"><?php the_title(); ?></h1> <?php edit_post_link(); ?>
</div>
<style>
  body {
    display: flex !important;
    align-items: center !important;
    flex-direction: column !important;
    justify-content: center !important;
  }

  header {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
  }

  .pet-interactions {
    display: flex!important;
    flex-direction: row!important;
    gap: 10px!important;
  }

  .pet-interactions button {
    padding: 10px!important;
    text-transform: uppercase!important;
    background: #feddde!important;
    font-weight: bold!important;
    transition: all 0.2s ease-in-out!important;
    font-family: 'bitcount-mono-single-circle'!important;
    font-size: 10px!important;

  }
  .pet-interactions button {
    padding: 10px!important;
    text-transform: uppercase!important;
    background: #feddde!important;
    font-weight: bold!important;
    transition: all 0.2s ease-in-out!important;
    font-family: 'bitcount-mono-single-circle'!important;
    font-size: 10px!important;
  }

  #branding {
    display: flex!important;
    flex-direction: column-reverse!important;
    align-items: center!important;
    background-color: #f2f2f2!important;
    width: 100%!important;
    height: 100%!important;
}

  </style>
</article>