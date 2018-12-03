<?php
/**
 * Plugin Name: Template Image
 * Plugin URI: ''
 * Description: Imitate template image block on Learn posts
 * Version: 1.0.0
 * Author: Louise
 *
 * @package gutenberg-blocks
 */
defined( 'ABSPATH' ) || exit;

/**
 * Registers all block assets so that they can be enqueued through Gutenberg in
 * the corresponding context.
 */
function gutenberg_blocks_template_image_register_block() {
	if ( ! function_exists( 'register_block_type' ) ) {
		// Gutenberg is not active.
		return;
	}
	wp_register_script(
		'gutenberg_blocks_template_image_script',
		plugins_url( 'block.build.js', __FILE__ ),
		array( 'wp-blocks', 'wp-element', 'wp-editor' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'block.build.js' )
	);
	wp_register_style(
		'gutenberg_blocks_template_image_style',
		plugins_url( 'style.css', __FILE__ ),
		array( ),
		filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
	);
	register_block_type( 'gutenberg-blocks/template-image', array(
		'style' => 'gutenberg_blocks_template_image_style',
		'editor_script' => 'gutenberg_blocks_template_image_script',
	) );
}
add_action( 'init', 'gutenberg_blocks_template_image_register_block' );