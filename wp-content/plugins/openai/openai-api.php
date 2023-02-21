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
         <textarea name="prompt" id="prompt" placeholder="topic or summary of segment"></textarea>

<div class="prompt-tuning">
<button id="past-tense-btn">Past</button>
<button id="present-tense-btn">Live</button>
<button id="future-tense-btn">Upcoming</button>
 </div>
     </form>
<div class="advanced">
<label>
<input type="checkbox" id="summarizeArticle">Article?</label>
<textarea name="author" id="author" placeholder="guest name and @"></textarea>
</div>
     <?php
     return ob_get_clean();
 }
 
 add_shortcode('openai_api_request_form', 'openai_api_request_form');
 ?>
