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
        wp_localize_script('openai-api-request', 'openai_data', $data);
        $jsonl_file_path = plugin_dir_path(__FILE__) . '/context.jsonl';
        $jsonl_file = fopen($jsonl_file_path, 'r');
        $jsonl_contents = '';
        while (!feof($jsonl_file)) {
            $jsonl_contents .= fgets($jsonl_file);
        }
        fclose($jsonl_file);
        wp_localize_script('openai-api-request', 'jsonl_data', array('jsonl_contents' => $jsonl_contents));
    }
 

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
     <?php
     return ob_get_clean();
 }
 
 add_shortcode('openai_api_request_form', 'openai_api_request_form');
 ?>
