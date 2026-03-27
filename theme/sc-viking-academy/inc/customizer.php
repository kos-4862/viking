<?php
/**
 * Multi Sports: Customizer
 *
 * @subpackage Multi Sports
 * @since 1.0
 */

use WPTRT\Customize\Section\Multi_Sports_Button;

add_action( 'customize_register', function( $manager ) {

	$manager->register_section_type( Multi_Sports_Button::class );

	$manager->add_section(
		new Multi_Sports_Button( $manager, 'multi_sports_pro', [
			'title'       => __( 'Multi Sports Pro', 'multi-sports' ),
			'priority'    => 0,
			'button_text' => __( 'Go Pro', 'multi-sports' ),
			'button_url'  => esc_url( 'https://www.luzuk.com/products/sports-wordpress-theme/', 'multi-sports')
		] )
	);

} );

// Load the JS and CSS.
add_action( 'customize_controls_enqueue_scripts', function() {

	$version = wp_get_theme()->get( 'Version' );

	wp_enqueue_script(
		'multi-sports-customize-section-button',
		get_theme_file_uri( 'vendor/wptrt/customize-section-button/public/js/customize-controls.js' ),
		[ 'customize-controls' ],
		$version,
		true
	);

	wp_enqueue_style(
		'multi-sports-customize-section-button',
		get_theme_file_uri( 'vendor/wptrt/customize-section-button/public/css/customize-controls.css' ),
		[ 'customize-controls' ],
 		$version
	);

} );

function multi_sports_customize_register( $wp_customize ) {

	$wp_customize->add_setting('multi_sports_logo_size',array(
		'sanitize_callback'	=> 'multi_sports_sanitize_float'
	));
	$wp_customize->add_control('multi_sports_logo_size',array(
		'type' => 'range',
		'label' => __('Logo Size','multi-sports'),
		'section' => 'title_tagline'
	));

	$wp_customize->add_setting('multi_sports_logo_padding',array(
		'sanitize_callback'	=> 'esc_html'
	));
	$wp_customize->add_control('multi_sports_logo_padding',array(
		'label' => __('Logo Padding','multi-sports'),
		'section' => 'title_tagline'
	));

	$wp_customize->add_setting('multi_sports_logo_top_padding',array(
		'default' => '',
		'sanitize_callback'	=> 'multi_sports_sanitize_float'
	));
	$wp_customize->add_control('multi_sports_logo_top_padding',array(
		'type' => 'number',
		'description' => __('Top','multi-sports'),
		'section' => 'title_tagline',
	));

	$wp_customize->add_setting('multi_sports_logo_bottom_padding',array(
		'default' => '',
		'sanitize_callback'	=> 'multi_sports_sanitize_float'
	));
	$wp_customize->add_control('multi_sports_logo_bottom_padding',array(
		'type' => 'number',
		'description' => __('Bottom','multi-sports'),
		'section' => 'title_tagline',
	));

	$wp_customize->add_setting('multi_sports_logo_left_padding',array(
		'default' => '',
		'sanitize_callback'	=> 'multi_sports_sanitize_float'
	));
	$wp_customize->add_control('multi_sports_logo_left_padding',array(
		'type' => 'number',
		'description' => __('Left','multi-sports'),
		'section' => 'title_tagline',
	));

	$wp_customize->add_setting('multi_sports_logo_right_padding',array(
		'default' => '',
		'sanitize_callback'	=> 'multi_sports_sanitize_float'
	));
	$wp_customize->add_control('multi_sports_logo_right_padding',array(
		'type' => 'number',
		'description' => __('Right','multi-sports'),
		'section' => 'title_tagline',
	));

	$wp_customize->add_setting('multi_sports_show_site_title',array(
		'default' => true,
		'sanitize_callback'	=> 'multi_sports_sanitize_checkbox'
 	));
 	$wp_customize->add_control('multi_sports_show_site_title',array(
		'type' => 'checkbox',
		'label' => __('Show / Hide Site Title','multi-sports'),
		'section' => 'title_tagline'
 	));

	$wp_customize->add_setting('multi_sports_site_title_font_size',array(
		'default' => '',
		'sanitize_callback'	=> 'multi_sports_sanitize_float'
	));
	$wp_customize->add_control('multi_sports_site_title_font_size',array(
		'type' => 'number',
		'label' => __('Site Title Font Size','multi-sports'),
		'section' => 'title_tagline',
	));

 	$wp_customize->add_setting('multi_sports_show_tagline',array(
    	'default' => true,
    	'sanitize_callback'	=> 'multi_sports_sanitize_checkbox'
 	));
 	$wp_customize->add_control('multi_sports_show_tagline',array(
    	'type' => 'checkbox',
    	'label' => __('Show / Hide Site Tagline','multi-sports'),
    	'section' => 'title_tagline'
 	));

	$wp_customize->add_setting('multi_sports_site_tagline_font_size',array(
		'default' => '',
		'sanitize_callback'	=> 'multi_sports_sanitize_float'
	));
	$wp_customize->add_control('multi_sports_site_tagline_font_size',array(
		'type' => 'number',
		'label' => __('Site Tagline Font Size','multi-sports'),
		'section' => 'title_tagline',
	));

	$wp_customize->add_panel( 'multi_sports_panel_id', array(
		'priority' => 10,
		'capability' => 'edit_theme_options',
		'theme_supports' => '',
		'title' => __( 'Theme Settings', 'multi-sports' ),
		'description' => __('Description of what this panel does.', 'multi-sports' ),
	) );

	$wp_customize->add_section( 'multi_sports_theme_options_section', array(
    	'title'      => __( 'General Settings', 'multi-sports' ),
		'priority'   => 30,
		'panel' => 'multi_sports_panel_id'
	) );
	$wp_customize->add_setting('multi_sports_theme_options',array(
      'default' => 'Right Sidebar',
      'sanitize_callback' => 'multi_sports_sanitize_choices'	        
	));
	$wp_customize->add_control('multi_sports_theme_options',array(
      'type' => 'radio',
      'label' => __('Do you want this section','multi-sports'),
      'section' => 'multi_sports_theme_options_section',
      'choices' => array(
         'Left Sidebar' => __('Left Sidebar','multi-sports'),
         'Right Sidebar' => __('Right Sidebar','multi-sports'),
         'One Column' => __('One Column','multi-sports'),
         'Three Columns' => __('Three Columns','multi-sports'),
         'Four Columns' => __('Four Columns','multi-sports'),
         'Grid Layout' => __('Grid Layout','multi-sports')
      ),
	));

	$wp_customize->add_setting( 'multi_sports_boxfull_width', array(
		'default'           => '',
		'sanitize_callback' => 'multi_sports_sanitize_choices'
	));
	
	$wp_customize->add_control( 'multi_sports_boxfull_width', array(
		'label'    => __( 'Section Width', 'multi-sports' ),
		'section'  => 'multi_sports_theme_options_section',
		'type'     => 'select',
		'choices'  => array(
			'container'  => __('Box Width', 'multi-sports'),
			'container-fluid' => __('Full Width', 'multi-sports'),
			'none' => __('None', 'multi-sports')
		),
	));

	$wp_customize->add_setting( 'multi_sports_dropdown_anim', array(
		'default'           => 'None',
		'sanitize_callback' => 'multi_sports_sanitize_choices'
	));
	$wp_customize->add_control( 'multi_sports_dropdown_anim', array(
		'label'    => __( 'Menu Dropdown Animations', 'multi-sports' ),
		'section'  => 'multi_sports_theme_options_section',
		'type'     => 'select',
		'choices'  => array(
			'bounceInUp'  => __('bounceInUp', 'multi-sports'),
			'fadeInUp' => __('fadeInUp', 'multi-sports'),
			'zoomIn'    => __('zoomIn', 'multi-sports'),
			'None'    => __('None', 'multi-sports')
		),
	));

	//Topbar section
	$wp_customize->add_section( 'multi_sports_social_icons' , array(
    	'title'      => __( 'Top Settings', 'multi-sports' ),
		'priority'   => null,
		'panel' => 'multi_sports_panel_id'
	) );

	$wp_customize->add_setting('multi_sports_facebook',array(
		'default'	=> '',
		'sanitize_callback'	=> 'esc_url_raw'
	));	
	$wp_customize->add_control('multi_sports_facebook',array(
		'label'	=> __('Add Facebook Link','multi-sports'),
		'section'	=> 'multi_sports_social_icons',
		'type'		=> 'url'
	));

	$wp_customize->add_setting('multi_sports_twitter',array(
		'default'	=> '',
		'sanitize_callback'	=> 'esc_url_raw'
	));	
	$wp_customize->add_control('multi_sports_twitter',array(
		'label'	=> __('Add Twitter Link','multi-sports'),
		'section'	=> 'multi_sports_social_icons',
		'type'		=> 'url'
	));

	$wp_customize->add_setting('multi_sports_linkedin',array(
		'default'	=> '',
		'sanitize_callback'	=> 'esc_url_raw'
	));	
	$wp_customize->add_control('multi_sports_linkedin',array(
		'label'	=> __('Add Linkedin Link','multi-sports'),
		'section'	=> 'multi_sports_social_icons',
		'type'		=> 'url'
	));

	$wp_customize->add_setting('multi_sports_rss',array(
		'default'	=> '',
		'sanitize_callback'	=> 'esc_url_raw'
	));	
	$wp_customize->add_control('multi_sports_rss',array(
		'label'	=> __('Add RSS Link','multi-sports'),
		'section'	=> 'multi_sports_social_icons',
		'type'		=> 'url'
	));

	$wp_customize->add_setting('multi_sports_youtube',array(
		'default'	=> '',
		'sanitize_callback'	=> 'esc_url_raw'
	));	
	$wp_customize->add_control('multi_sports_youtube',array(
		'label'	=> __('Add Youtube Link','multi-sports'),
		'section'	=> 'multi_sports_social_icons',
		'type'		=> 'url'
	));

	$wp_customize->add_setting('multi_sports_social_font_size',array(
		'default' => '',
		'sanitize_callback'	=> 'multi_sports_sanitize_float'
	));
	$wp_customize->add_control('multi_sports_social_font_size',array(
		'type' => 'number',
		'label' => __('Icon Size','multi-sports'),
		'section' => 'multi_sports_social_icons',
	));

	$wp_customize->add_setting( 'multi_sports_social_color', array(
		'default' => '',
		'sanitize_callback'	=> 'sanitize_hex_color'
	));
	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'multi_sports_social_color', array(
		'label' => __('Social Icons Color', 'multi-sports'),
		'section' => 'multi_sports_social_icons',
	)));

	$wp_customize->add_setting( 'multi_sports_menu_color', array(
		'default' => '',
		'sanitize_callback'	=> 'sanitize_hex_color'
	));
	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'multi_sports_menu_color', array(
		'label' => __('Menu Color', 'multi-sports'),
		'section' => 'multi_sports_social_icons',
	)));

	$wp_customize->add_setting( 'multi_sports_headerbg_color1', array(
		'default' => '',
		'sanitize_callback'	=> 'sanitize_hex_color'
	));
	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'multi_sports_headerbg_color1', array(
		'label' => __('Header Background Color 1', 'multi-sports'),
		'section' => 'multi_sports_social_icons',
	)));

	$wp_customize->add_setting( 'multi_sports_headerbg_color2', array(
		'default' => '',
		'sanitize_callback'	=> 'sanitize_hex_color'
	));
	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'multi_sports_headerbg_color2', array(
		'label' => __('Header Background Color 2', 'multi-sports'),
		'section' => 'multi_sports_social_icons',
	)));

	//home page slider
	$wp_customize->add_section( 'multi_sports_slider_section' , array(
    	'title'      => __( 'Slider Settings', 'multi-sports' ),
		'priority'   => null,
		'panel' => 'multi_sports_panel_id'
	) );

	$wp_customize->add_setting('multi_sports_slider_hide_show',array(
       	'default' => false,
       	'sanitize_callback'	=> 'multi_sports_sanitize_checkbox'
	));
	$wp_customize->add_control('multi_sports_slider_hide_show',array(
	   	'type' => 'checkbox',
	   	'label' => __('Show / Hide slider','multi-sports'),
	   	'section' => 'multi_sports_slider_section',
	));

	$wp_customize->add_setting( 'multi_sports_slider_effect', array(
		'default'           => '',
		'sanitize_callback' => 'multi_sports_sanitize_choices'
	));
	$wp_customize->add_control( 'multi_sports_slider_effect', array(
		'label'    => __( 'Onload Transactions Effects', 'multi-sports' ),
		'section'  => 'multi_sports_slider_section',
		'type'     => 'select',
		'choices'  => array(
			'bounceInLeft'  => __('bounceInLeft', 'multi-sports'),
			'bounceInRight' => __('bounceInRight', 'multi-sports'),
			'bounceInUp'    => __('bounceInUp', 'multi-sports'),
			'bounceInDown'    => __('bounceInDown', 'multi-sports'),
			'zoomIn'  => __('zoomIn', 'multi-sports'),
			'zoomOut' => __('zoomOut', 'multi-sports'),
			'fadeInDown'    => __('fadeInDown', 'multi-sports'),
			'fadeInUp'    => __('fadeInUp', 'multi-sports'),
			'fadeInLeft'  => __('fadeInLeft', 'multi-sports'),
			'fadeInRight' => __('fadeInRight', 'multi-sports'),
			'flip-up'    => __('flip-up', 'multi-sports'),
			'none'    => __('none', 'multi-sports')
		),
	));

	for ( $count = 1; $count <= 4; $count++ ) {
		$wp_customize->add_setting( 'multi_sports_slider' . $count, array(
			'default'           => '',
			'sanitize_callback' => 'multi_sports_sanitize_dropdown_pages'
		) );
		$wp_customize->add_control( 'multi_sports_slider' . $count, array(
			'label' => __( 'Select Slide Image Page', 'multi-sports' ),
			'description' => __('Image Size (950px 500px)', 'multi-sports'),
			'section' => 'multi_sports_slider_section',
			'type' => 'dropdown-pages'
		) );
	}

	$wp_customize->add_setting('multi_sports_slider_excerpt_length',array(
		'default' => '15',
		'sanitize_callback'	=> 'multi_sports_sanitize_float'
	));
	$wp_customize->add_control('multi_sports_slider_excerpt_length',array(
		'type' => 'number',
		'label' => __('Slider Excerpt Length','multi-sports'),
		'section' => 'multi_sports_slider_section',
	));

	$wp_customize->add_setting('multi_sports_slider_title_font_size',array(
		'default' => '',
		'sanitize_callback'	=> 'multi_sports_sanitize_float'
	));
	$wp_customize->add_control('multi_sports_slider_title_font_size',array(
		'type' => 'number',
		'label' => __('Title Font Size','multi-sports'),
		'section' => 'multi_sports_slider_section',
	));

	$wp_customize->add_setting('multi_sports_slider_text_font_size',array(
		'default' => '',
		'sanitize_callback'	=> 'multi_sports_sanitize_float'
	));
	$wp_customize->add_control('multi_sports_slider_text_font_size',array(
		'type' => 'number',
		'label' => __('Text Font Size','multi-sports'),
		'section' => 'multi_sports_slider_section',
	));

	$wp_customize->add_setting('multi_sports_slider_opacity',array(
		'default' => '',
		'sanitize_callback'	=> 'multi_sports_sanitize_float'
	));
	$wp_customize->add_control('multi_sports_slider_opacity',array(
		'type' => 'range',
		'label' => __('Image Opacity','multi-sports'),
		'section' => 'multi_sports_slider_section',
		'input_attrs' => array(
			'min' => 0,
			'max' => 1,
			'step' => 0.1,
		),
	));

	$wp_customize->add_setting( 'multi_sports_slider_color', array(
		'default' => '',
		'sanitize_callback'	=> 'sanitize_hex_color'
	));
	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'multi_sports_slider_color', array(
		'label' => __('Title Color', 'multi-sports'),
		'section' => 'multi_sports_slider_section',
	)));

	$wp_customize->add_setting( 'multi_sports_slider_text_color', array(
		'default' => '',
		'sanitize_callback'	=> 'sanitize_hex_color'
	));
	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'multi_sports_slider_text_color', array(
		'label' => __('Text Color', 'multi-sports'),
		'section' => 'multi_sports_slider_section',
	)));

	$wp_customize->add_setting( 'multi_sports_slider_bg_color', array(
		'default' => '',
		'sanitize_callback'	=> 'sanitize_hex_color'
	));
	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'multi_sports_slider_bg_color', array(
		'label' => __('Background Color', 'multi-sports'),
		'section' => 'multi_sports_slider_section',
	)));

	$wp_customize->add_setting( 'multi_sports_slidernpicon_color', array(
		'default' => '',
		'sanitize_callback'	=> 'sanitize_hex_color'
	));
	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'multi_sports_slidernpicon_color', array(
		'label' => __('Next/Pre Button Icon Color', 'multi-sports'),
		'section' => 'multi_sports_slider_section',
	)));

	$wp_customize->add_setting( 'multi_sports_slidernpiconbg_color', array(
		'default' => '',
		'sanitize_callback'	=> 'sanitize_hex_color'
	));
	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'multi_sports_slidernpiconbg_color', array(
		'label' => __('Next/Pre Button Bg Color', 'multi-sports'),
		'section' => 'multi_sports_slider_section',
	)));

	$wp_customize->add_setting( 'multi_sports_slideroverlay_color1', array(
		'default' => '',
		'sanitize_callback'	=> 'sanitize_hex_color'
	));
	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'multi_sports_slideroverlay_color1', array(
		'label' => __('Overlay Color 1', 'multi-sports'),
		'section' => 'multi_sports_slider_section',
	)));

	$wp_customize->add_setting( 'multi_sports_slideroverlay_color2', array(
		'default' => '',
		'sanitize_callback'	=> 'sanitize_hex_color'
	));
	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'multi_sports_slideroverlay_color2', array(
		'label' => __('Overlay Color 2', 'multi-sports'),
		'section' => 'multi_sports_slider_section',
	)));

	// Services Section 
	$wp_customize->add_section('multi_sports_services_section',array(
		'title'	=> __('Services Section','multi-sports'),
		'description'=> __('<b>Note :</b> This section will appear below the Slider section.','multi-sports'),
		'panel' => 'multi_sports_panel_id',
	));

	$wp_customize->add_setting('multi_sports_service_title',array(
		'default'	=> '',
		'sanitize_callback'	=> 'sanitize_text_field'
	));	
	$wp_customize->add_control('multi_sports_service_title',array(
		'label'	=> __('Section Title','multi-sports'),
		'section'	=> 'multi_sports_services_section',
		'type'		=> 'text'
	));

	$wp_customize->add_setting('multi_sports_service_title_font_size',array(
		'default' => '',
		'sanitize_callback'	=> 'multi_sports_sanitize_float'
	));
	$wp_customize->add_control('multi_sports_service_title_font_size',array(
		'type' => 'number',
		'label' => __('Font Size','multi-sports'),
		'section' => 'multi_sports_services_section',
	));

	$wp_customize->add_setting( 'multi_sports_servicetitle_color', array(
		'default' => '',
		'sanitize_callback'	=> 'sanitize_hex_color'
	));
	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'multi_sports_servicetitle_color', array(
		'label' => __('Title Color', 'multi-sports'),
		'section' => 'multi_sports_services_section',
	)));
	
	$wp_customize->add_setting( 'multi_sports_services_page', array(
		'default'           => '',
		'sanitize_callback' => 'multi_sports_sanitize_dropdown_pages'
	));
	$wp_customize->add_control( 'multi_sports_services_page', array(
		'label'    => __( 'Select Service Page', 'multi-sports' ),
		'section'  => 'multi_sports_services_section',
		'type'     => 'dropdown-pages'
	));

	$wp_customize->add_setting('multi_sports_services_page_font_size',array(
		'default' => '',
		'sanitize_callback'	=> 'multi_sports_sanitize_float'
	));
	$wp_customize->add_control('multi_sports_services_page_font_size',array(
		'type' => 'number',
		'label' => __('Title Font Size','multi-sports'),
		'section' => 'multi_sports_services_section',
	));

	$wp_customize->add_setting('multi_sports_services_page_text_font_size',array(
		'default' => '',
		'sanitize_callback'	=> 'multi_sports_sanitize_float'
	));
	$wp_customize->add_control('multi_sports_services_page_text_font_size',array(
		'type' => 'number',
		'label' => __('Text Font Size','multi-sports'),
		'section' => 'multi_sports_services_section',
	));

	$categories = get_categories();
	$cats = array();
	$i = 0;
	foreach($categories as $category){
	if($i==0){
	$default = $category->slug;
	$i++;
	}
	$cats[$category->slug] = $category->name;
	}

	$wp_customize->add_setting('multi_sports_services_cat',array(
		'default'	=> 'select',
		'sanitize_callback' => 'multi_sports_sanitize_choices',
	));
	$wp_customize->add_control('multi_sports_services_cat',array(
		'type'    => 'select',
		'choices' => $cats,
		'label' => __('Select Category To Display Services Post','multi-sports'),
		'section' => 'multi_sports_services_section',
	));

	$wp_customize->add_setting('multi_sports_service_img_size',array(
		'default' => '',
		'sanitize_callback'	=> 'multi_sports_sanitize_float'
	));
	$wp_customize->add_control('multi_sports_service_img_size',array(
		'type' => 'number',
		'label' => __('Image Size','multi-sports'),
		'section' => 'multi_sports_services_section',
	));

	$wp_customize->add_setting('multi_sports_service_section_padding',array(
      'default' => '',
      'sanitize_callback'	=> 'multi_sports_sanitize_float'
	));
	$wp_customize->add_control('multi_sports_service_section_padding',array(
		'type' => 'number',
		'label' => __('Section Top Bottom Padding','multi-sports'),
		'section' => 'multi_sports_services_section',
	));

   $wp_customize->add_setting( 'multi_sports_servicesubtitle_color', array(
		'default' => '',
		'sanitize_callback'	=> 'sanitize_hex_color'
	));
	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'multi_sports_servicesubtitle_color', array(
		'label' => __('Subtitle Color', 'multi-sports'),
		'section' => 'multi_sports_services_section',
	)));

	$wp_customize->add_setting( 'multi_sports_servicetext_color', array(
		'default' => '',
		'sanitize_callback'	=> 'sanitize_hex_color'
	));
	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'multi_sports_servicetext_color', array(
		'label' => __('Text Color', 'multi-sports'),
		'section' => 'multi_sports_services_section',
	)));

   $wp_customize->add_setting( 'multi_sports_servicebtn_color', array(
	'default' => '',
	'sanitize_callback'	=> 'sanitize_hex_color'
	));
	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'multi_sports_servicebtn_color', array(
		'label' => __('Button Text Color', 'multi-sports'),
		'section' => 'multi_sports_services_section',
	)));

	$wp_customize->add_setting( 'multi_sports_servicebtnbg_color', array(
		'default' => '',
		'sanitize_callback'	=> 'sanitize_hex_color'
	));
	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'multi_sports_servicebtnbg_color', array(
		'label' => __('Button Bg Color', 'multi-sports'),
		'section' => 'multi_sports_services_section',
	)));

	$wp_customize->add_setting( 'multi_sports_servicebtnhvr_color', array(
		'default' => '',
		'sanitize_callback'	=> 'sanitize_hex_color'
	));
	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'multi_sports_servicebtnhvr_color', array(
		'label' => __('Button Hover Text Color', 'multi-sports'),
		'section' => 'multi_sports_services_section',
	)));

	$wp_customize->add_setting( 'multi_sports_servicebtnbghvr_color', array(
		'default' => '',
		'sanitize_callback'	=> 'sanitize_hex_color'
	));
	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'multi_sports_servicebtnbghvr_color', array(
		'label' => __('Button Hover Bg Color', 'multi-sports'),
		'section' => 'multi_sports_services_section',
	)));

	$wp_customize->add_setting( 'multi_sports_serviceboxtitle_color', array(
		'default' => '',
		'sanitize_callback'	=> 'sanitize_hex_color'
	));
	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'multi_sports_serviceboxtitle_color', array(
		'label' => __('Box Title Color', 'multi-sports'),
		'section' => 'multi_sports_services_section',
	)));

	$wp_customize->add_setting( 'multi_sports_serviceboxtext_color', array(
		'default' => '',
		'sanitize_callback'	=> 'sanitize_hex_color'
	));
	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'multi_sports_serviceboxtext_color', array(
		'label' => __('Box Text Color', 'multi-sports'),
		'section' => 'multi_sports_services_section',
	)));

	$wp_customize->add_setting( 'multi_sports_serviceboxoverlay_color1', array(
		'default' => '',
		'sanitize_callback'	=> 'sanitize_hex_color'
	));
	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'multi_sports_serviceboxoverlay_color1', array(
		'label' => __('Overlay Color 1', 'multi-sports'),
		'section' => 'multi_sports_services_section',
	)));

	$wp_customize->add_setting( 'multi_sports_serviceboxoverlay_color2', array(
		'default' => '',
		'sanitize_callback'	=> 'sanitize_hex_color'
	));
	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'multi_sports_serviceboxoverlay_color2', array(
		'label' => __('Overlay Color 2', 'multi-sports'),
		'section' => 'multi_sports_services_section',
	)));

	//Footer
   $wp_customize->add_section( 'multi_sports_footer', array(
    	'title'      => __( 'Footer Setting', 'multi-sports' ),
		'priority'   => null,
		'panel' => 'multi_sports_panel_id'
	) );

	$wp_customize->add_setting('multi_sports_show_back_totop',array(
 		'default' => true,
   	'sanitize_callback'	=> 'multi_sports_sanitize_checkbox'
	));
	$wp_customize->add_control('multi_sports_show_back_totop',array(
   	'type' => 'checkbox',
   	'label' => __('Show / Hide Back to Top','multi-sports'),
   	'section' => 'multi_sports_footer'
	));

   	$wp_customize->add_setting('multi_sports_footer_link',array(
		'default'	=> 'https://www.luzuk.com/products/free-sports-wordpress-theme/',
		'sanitize_callback'	=> 'sanitize_text_field'
	));	
	$wp_customize->add_control('multi_sports_footer_link',array(
		'label'	=> __('Copyright Link','multi-sports'),
		'section'	=> 'multi_sports_footer',
		'setting'	=> 'multi_sports_footer_link',
		'type'		=> 'text'
	));

	$wp_customize->add_setting('multi_sports_footer_copy',array(
		'default'	=> 'Sports WordPress Theme By Luzuk',
		'sanitize_callback'	=> 'sanitize_text_field'
	));	
	$wp_customize->add_control('multi_sports_footer_copy',array(
		'label'	=> __('Copyright Text','multi-sports'),
		'section'	=> 'multi_sports_footer',
		'setting'	=> 'multi_sports_footer_copy',
		'type'		=> 'text'
	));
	
	$wp_customize->add_setting('multi_sports_footer_copy_font_size',array(
		'default' => '',
		'sanitize_callback'	=> 'multi_sports_sanitize_float'
	));
	$wp_customize->add_control('multi_sports_footer_copy_font_size',array(
		'type' => 'number',
		'label' => __('Font Size','multi-sports'),
		'section' => 'multi_sports_footer',
	));

	$wp_customize->add_setting('multi_sports_copyright_padding',array(
		'default' => '',
		'sanitize_callback'	=> 'multi_sports_sanitize_float'
 	));
 	$wp_customize->add_control('multi_sports_copyright_padding',array(
		'type' => 'number',
		'label' => __('Copyright Top Bottom Padding','multi-sports'),
		'section' => 'multi_sports_footer',
	));

	$wp_customize->add_setting( 'multi_sports_copyright_color', array(
		'default' => '',
		'sanitize_callback'	=> 'sanitize_hex_color'
	));
	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'multi_sports_copyright_color', array(
		'label' => __('Copyright Text Color', 'multi-sports'),
		'section' => 'multi_sports_footer',
	)));

	$wp_customize->add_setting( 'multi_sports_copyrightbg_color', array(
		'default' => '',
		'sanitize_callback'	=> 'sanitize_hex_color'
	));
	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'multi_sports_copyrightbg_color', array(
		'label' => __('Copyright Bg Color', 'multi-sports'),
		'section' => 'multi_sports_footer',
	)));

	$wp_customize->add_setting( 'multi_sports_backtext_color', array(
		'default' => '',
		'sanitize_callback'	=> 'sanitize_hex_color'
	));
	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'multi_sports_backtext_color', array(
		'label' => __('Back To Top Text Color', 'multi-sports'),
		'section' => 'multi_sports_footer',
	)));

	$wp_customize->add_setting( 'multi_sports_backbg_color', array(
		'default' => '',
		'sanitize_callback'	=> 'sanitize_hex_color'
	));
	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'multi_sports_backbg_color', array(
		'label' => __('Back To Top Bg Color', 'multi-sports'),
		'section' => 'multi_sports_footer',
	)));

	$wp_customize->get_setting( 'blogname' )->transport          = 'postMessage';
	$wp_customize->get_setting( 'blogdescription' )->transport   = 'postMessage';
	$wp_customize->get_setting( 'header_textcolor' )->transport  = 'postMessage';

	$wp_customize->selective_refresh->add_partial( 'blogname', array(
		'selector' => '.site-title a',
		'render_callback' => 'multi_sports_customize_partial_blogname',
	) );
	$wp_customize->selective_refresh->add_partial( 'blogdescription', array(
		'selector' => '.site-description',
		'render_callback' => 'multi_sports_customize_partial_blogdescription',
	) );
}
add_action( 'customize_register', 'multi_sports_customize_register' );

function multi_sports_customize_partial_blogname() {
	bloginfo( 'name' );
}

function multi_sports_customize_partial_blogdescription() {
	bloginfo( 'description' );
}

function multi_sports_is_static_front_page() {
	return ( is_front_page() && ! is_home() );
}

function multi_sports_is_view_with_layout_option() {
	// This option is available on all pages. It's also available on archives when there isn't a sidebar.
	return ( is_page() || ( is_archive() && ! is_active_sidebar( 'sidebar-1' ) ) );
}