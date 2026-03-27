<?php
/**
 * Custom header implementation
 */

function multi_sports_custom_header_setup() {
	add_theme_support( 'custom-header', apply_filters( 'multi_sports_custom_header_args', array(
		'default-text-color'     => 'fff',
		'header-text' 			 =>	false,
		'width'                  => 1200,
		'height'                 => 120,
		'wp-head-callback'       => 'multi_sports_header_style',
	) ) );
}

add_action( 'after_setup_theme', 'multi_sports_custom_header_setup' );

if ( ! function_exists( 'multi_sports_header_style' ) ) :
/**
 * Styles the header image and text displayed on the blog
 *
 * @see multi_sports_custom_header_setup().
 */
add_action( 'wp_enqueue_scripts', 'multi_sports_header_style' );
function multi_sports_header_style() {
	//Check if user has defined any header image.
	if ( get_header_image() ) :
	$custom_css = "
        #header {
			background-image:url('".esc_url(get_header_image())."') !important;
			background-size: 100% 100% !important;
		}";
	   	wp_add_inline_style( 'multi-sports-basic-style', $custom_css );
	endif;
}
endif; // multi_sports_header_style