<?php
/*
Template Name: Saori Uchida Prepbot EPR970
*/

get_header();
?>
<style>
  #content {
    max-width: 562px !important
  }
</style>
<div class="landing-frame"><?php echo prep_openai_api_request_form(); ?></div>
<div class="openai-response"></div>
<?php get_footer(); ?>
