<?php
/**
 * Plugin Name:       Wis Latest Posts Block
 * Description:       A custom block for displaying the latest posts.
 * Requires at least: 6.6
 * Requires PHP:      7.2
 * Version:           0.1.0
 * Author:            adnnco
 * Author URI:        https://github.com/adnnco/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       wis-latest-posts-block
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Initialize the block.
 */
function create_block_wis_latest_posts_block_block_init() {
	register_block_type( __DIR__ . '/build' );
}

add_action( 'init', 'create_block_wis_latest_posts_block_block_init' );

/**
 * Register custom REST API routes.
 *
 * @return void
 */
function wis_register_rest_routes() {
	register_rest_route( 'wis/v1', '/latest-posts', array(
		'methods'  => 'GET',
		'callback' => 'wis_get_latest_posts',
	) );
}

add_action( 'rest_api_init', 'wis_register_rest_routes' );

/**
 * Get the latest posts.
 *
 * @param WP_REST_Request $data The REST API request data.
 *
 * @return WP_REST_Response The response containing the latest posts.
 */
function wis_get_latest_posts( $data ) {
	$args = array(
		'numberposts' => 5,
		'post_status' => 'publish',
	);

	$posts = get_posts( $args );
	$data  = array();

	foreach ( $posts as $post ) {
		$data[] = wis_format_post_data( $post );
	}

	return new WP_REST_Response( $data, 200 );
}

/**
 * Format post data for the REST API response.
 *
 * @param WP_Post $post The post object.
 *
 * @return array The formatted post data.
 */
function wis_format_post_data( $post ) {
	$featured_image_url = get_the_post_thumbnail_url( $post->ID, 'full' );

	return array(
		'id'             => $post->ID,
		'title'          => get_the_title( $post->ID ),
		'excerpt'        => get_the_excerpt( $post->ID ),
		'featured_image' => ( $featured_image_url ) ?: esc_url( 'https://picsum.photos/300/300' ),
	);
}
