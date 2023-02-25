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
    background: #1d1d1d;
    color: #fff8f4;
    justify-content: center !important;
    touch-action: manipulation !important;
  }

  header {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    background-color: #1d1d1d;
    gap: 20px !important
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

  #foods {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: absolute;
    bottom: 60px;
    max-width: 300px;
    justify-content: center;
    gap: 5px;
}

#site-title {
  display: none;
}

  
  .pet-interactions button {
    padding: 10px!important;
    text-transform: uppercase!important;
    background: #feddde!important;
    font-weight: bold!important;
    transition: all 0.1s ease-in-out!important;
    font-family: 'bitcount-mono-single-circle'!important;
    font-size: 14px!important;
    color: black !important;
    border: none !important;

  }

  .pet-interactions button:active {
  transform: scale(0.9);
  transition: all 0.1s ease-in-out!important;
  }


  .pet-interactions button:hover {
    background: #5ECEFF !important;
    transition: all 0.1s ease-in-out!important;
  }

  #branding {
    display: flex!important;
    flex-direction: column-reverse!important;
    align-items: center!important;
    background-color: transparent!important;
    width: 100%!important;
    height: 100%!important;
}

#monsters, .monster {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

#monsters {
  position: absolute;
    bottom: 110px;
}

#level {
  color: #b5ffff
}

#monsters p {
  font-family: 'bitcount-mono-single-circle'!important;
    font-size: 10px!important;
    font-weight: bold;
    color: #fff8b2;
    text-align: center;
}

.monster-level {
  font-family: 'bitcount-mono-single-circle'!important;
    font-size: 8px!important;
    font-weight: bold;
    text-align: center;
    color: #f2f2f2
}

#response {
    font-family: 'bitcount-mono-single-circle'!important;
    font-size: 12px!important;
    width: 250px!important;
    line-height: 1.25!important;
    text-align: center!important;
    position: absolute !important;
    top: 120px!important;
}

.footer-s9ori, #site-description {
display: none
}

  </style>
  </article>
<?php get_footer(); ?>