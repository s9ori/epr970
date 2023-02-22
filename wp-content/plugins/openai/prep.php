<?php
// Enqueue the JS file that will make the API request
function openai_api_request_form_enqueue_scripts() {
  wp_enqueue_script( 'jquery' );
  wp_enqueue_script( 'openai-api-request', plugin_dir_url( __FILE__ ) . '/prompt.js', array( 'jquery' ), '1.0', true );
  $data = array(
    'api_key' => getenv('API_KEY')
  );
  wp_localize_script( 'openai-api-request', 'openai_data', $data );
  $file_contents = file_get_contents( plugin_dir_path( __FILE__ ) . 'prompt.json' );
  $prompt = json_decode( $file_contents );
  wp_localize_script( 'openai-api-request', 'file_data', array( 'prompt' => $prompt ) );
}

// Display the form that will trigger the API request
function openai_api_request_form() {
  ?>
  <form id="prep-form">
    <div>
      <label for="prompt">Prompt:</label>
      <textarea name="prompt" id="prompt"></textarea>
    </div>
    <div>
      <button type="submit">Make API Request</button>
    </div>
  </form>
  <?php
}
