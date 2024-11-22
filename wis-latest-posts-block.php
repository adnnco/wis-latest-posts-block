<?php
/**
 * Plugin Name:       Wis Latest Posts Block
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.6
 * Requires PHP:      7.2
 * Version:           0.1.0
 * Author:            The WordPress Contributors
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
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_wis_latest_posts_block_block_init() {
	register_block_type( __DIR__ . '/build' );
}

add_action( 'init', 'create_block_wis_latest_posts_block_block_init' );


function wis_register_rest_routes(): void {
	register_rest_route( 'wis/v1', '/latest-posts', array(
		'methods'  => 'GET',
		'callback' => 'wis_get_latest_posts',
	) );
}

function wis_get_latest_posts( $data ): WP_REST_Response {
	$args = array(
		'numberposts' => 5, // You can change this to the number of posts you want to retrieve
		'post_status' => 'publish',
	);

	$posts = get_posts( $args );
	$data  = array();

	foreach ( $posts as $post ) {
		$featured_image_url = get_the_post_thumbnail_url( $post->ID, 'full' );
		$data[]             = array(
			'id'             => $post->ID,
			'title'          => get_the_title( $post->ID ),
			'excerpt'        => get_the_excerpt( $post->ID ),
			'featured_image' => $featured_image_url,
		);
	}

	return new WP_REST_Response( $data, 200 );
}

add_action( 'rest_api_init', 'wis_register_rest_routes' );
