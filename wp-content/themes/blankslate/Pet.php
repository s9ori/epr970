<?php
/*
Template Name: Saori Uchida Pet EPR970
*/

get_header();
?>
<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

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

  .pet-stats {
    display: flex!important;
    flex-direction: column!important;
    align-items: center!important;
    justify-content: center!important;
    font-size: 14px!important;
    gap: 4px!important;
}

#site-description {
    font-family: "bitcount-mono-single-circle", sans-serif!important;
    font-weight: 500!important;
    font-style: normal!important;
    display: flex!important;
    flex-direction: column!important;
    gap: 20px!important;
    text-align: center!important;
    align-items: center!important;
}

  .pet-interactions button {
    padding: 10px!important;
    text-transform: uppercase!important;
    background: #feddde!important;
    font-weight: bold!important;
    transition: all 0.2s ease-in-out!important;
    font-family: 'bitcount-mono-single-circle'!important;
    font-size: 12px!important;

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
<?php get_footer(); ?>