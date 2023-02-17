<?php
/*
 * Plugin Name: OpenAI API Request
 * Description: A WordPress plugin that makes requests to the OpenAI API and displays the response on screen
 * Version: 1.0
 * Author: Saori Uchida
 */

 add_action('wp_enqueue_scripts', 'openai_api_request_form_enqueue_scripts');
 function openai_api_request_form_enqueue_scripts() {
     wp_enqueue_script( 'jquery' );
     wp_enqueue_script( 'openai-api-request', plugin_dir_url(__FILE__) . '/openai-api-request.js', array( 'jquery' ), '1.0', true );
     $data = array(
         'api_key' => getenv('API_KEY')
     );
     wp_localize_script( 'openai-api-request', 'openai_data', $data );
     $file_contents = file_get_contents(plugin_dir_url(__FILE__) . "/context.txt");
     wp_localize_script( 'openai-api-request', 'file_data', array( 'file_contents' => $file_contents ) );}
 

 function openai_api_request_form() {
     ob_start();
     ?>
     <form class="openai" action="#" method="post">
         <div class="spinner-container" id="loading-container" style="display: none;">
            <div class="spinner" id="spinner01"></div>
            <div class="spinner" id="spinner02"></div>
            <div class="spinner" id="spinner03"></div>
            <div class="spinner" id="spinner04"></div>
            <div class="spinner" id="spinner05"></div>
          </div>
         <textarea name="prompt" id="prompt" placeholder="ask me stuff"></textarea>
         <input class="openai-input" type="submit" name="submit" value="Submit">
     </form>
     <?php
     return ob_get_clean();
 }
 
 add_shortcode('openai_api_request_form', 'openai_api_request_form');
 ?>