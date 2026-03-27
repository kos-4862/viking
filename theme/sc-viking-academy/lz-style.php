<?php 

	$multi_sports_custom_style = '';

	// Logo Size
	$multi_sports_logo_top_padding = get_theme_mod('multi_sports_logo_top_padding');
	$multi_sports_logo_bottom_padding = get_theme_mod('multi_sports_logo_bottom_padding');
	$multi_sports_logo_left_padding = get_theme_mod('multi_sports_logo_left_padding');
	$multi_sports_logo_right_padding = get_theme_mod('multi_sports_logo_right_padding');

	if( $multi_sports_logo_top_padding != '' || $multi_sports_logo_bottom_padding != '' || $multi_sports_logo_left_padding != '' || $multi_sports_logo_right_padding != ''){
		$multi_sports_custom_style .=' .logo {';
			$multi_sports_custom_style .=' padding-top: '.esc_attr($multi_sports_logo_top_padding).'px;
			padding-bottom: '.esc_attr($multi_sports_logo_bottom_padding).'px;
			padding-left: '.esc_attr($multi_sports_logo_left_padding).'px;
			padding-right: '.esc_attr($multi_sports_logo_right_padding).'px;';
		$multi_sports_custom_style .=' }';
	}

	$multi_sports_logo_size = get_theme_mod('multi_sports_logo_size');
	if( $multi_sports_logo_size != '') {
		if($multi_sports_logo_size == 100) {
			$multi_sports_custom_style .=' .custom-logo-link img {';
				$multi_sports_custom_style .=' width: 350px;';
			$multi_sports_custom_style .=' }';
		} else if($multi_sports_logo_size >= 10 && $multi_sports_logo_size < 100) {
			$multi_sports_custom_style .=' .custom-logo-link img {';
				$multi_sports_custom_style .=' width: '.esc_attr($multi_sports_logo_size).'%;';
			$multi_sports_custom_style .=' }';
		}
	}

	// Service Section padding
	$multi_sports_service_section_padding = get_theme_mod('multi_sports_service_section_padding');

	if( $multi_sports_service_section_padding != ''){
		$multi_sports_custom_style .=' #our_service {';
			$multi_sports_custom_style .=' padding-top: '.esc_attr($multi_sports_service_section_padding).'px;
			padding-bottom: '.esc_attr($multi_sports_service_section_padding).'px;';
		$multi_sports_custom_style .=' }';
	}

	// Slider
	if( get_theme_mod('multi_sports_slider_hide_show',false) == false){
		$multi_sports_custom_style .=' .page-template-custom-home-page #header {';
			$multi_sports_custom_style .=' position: static; background: linear-gradient( #f5826d, #f96c96);';
		$multi_sports_custom_style .=' }';
	}

	// Site Title Font Size
	$multi_sports_site_title_font_size = get_theme_mod('multi_sports_site_title_font_size');
	if( $multi_sports_site_title_font_size != ''){
		$multi_sports_custom_style .=' .logo h1.site-title, .logo p.site-title {';
			$multi_sports_custom_style .=' font-size: '.esc_attr($multi_sports_site_title_font_size).'px;';
		$multi_sports_custom_style .=' }';
	}

	// Site Tagline Font Size
	$multi_sports_site_tagline_font_size = get_theme_mod('multi_sports_site_tagline_font_size');
	if( $multi_sports_site_tagline_font_size != ''){
		$multi_sports_custom_style .=' .logo p.site-description {';
			$multi_sports_custom_style .=' font-size: '.esc_attr($multi_sports_site_tagline_font_size).'px;';
		$multi_sports_custom_style .=' }';
	}

	//layout width
	$multi_sports_boxfull_width = get_theme_mod('multi_sports_boxfull_width');
	if ($multi_sports_boxfull_width !== '') {
		switch ($multi_sports_boxfull_width) {
			case 'container':
				$multi_sports_custom_style .= ' body {
					max-width: 1140px;
					width: 100%;
					padding-right: 15px;
					padding-left: 15px;
					margin-right: auto;
					margin-left: auto;
					}';
				break;
			case 'container-fluid':
				$multi_sports_custom_style .= ' body { 
					width: 100%;
					padding-right: 15px;
					padding-left: 15px;
					margin-right: auto;
					margin-left: auto;
				 }';
				break;
			case 'none':
				// No specific width specified, so no additional style needed.
				break;
			default:
				// Handle unexpected values.
				break;
		}
	}

	//Menu animation
	$multi_sports_dropdown_anim = get_theme_mod('multi_sports_dropdown_anim');

	if ( $multi_sports_dropdown_anim != '') {
		$multi_sports_custom_style .=' .nav-menu ul ul {';
			$multi_sports_custom_style .=' animation:'.esc_attr($multi_sports_dropdown_anim).' 1s ease;';
		$multi_sports_custom_style .=' }';
	}

	// Copyright padding
	$multi_sports_copyright_padding = get_theme_mod('multi_sports_copyright_padding');

	if( $multi_sports_copyright_padding != ''){
		$multi_sports_custom_style .=' .site-info {';
			$multi_sports_custom_style .=' padding-top: '.esc_attr($multi_sports_copyright_padding).'px; padding-bottom: '.esc_attr($multi_sports_copyright_padding).'px;';
		$multi_sports_custom_style .=' }';
	}

	// slider CSS
	$multi_sports_slider_hide_show = get_theme_mod('multi_sports_slider_hide_show',false);
	if( $multi_sports_slider_hide_show == true){
		$multi_sports_custom_style .=' .page-template-custom-home-page #inner-pages-header {';
			$multi_sports_custom_style .=' display:none;';
		$multi_sports_custom_style .=' }';
	} else {
		$multi_sports_custom_style .=' .page-template-custom-home-page #header {';
			$multi_sports_custom_style .=' background: #fb809f;';
		$multi_sports_custom_style .=' }';
		$multi_sports_custom_style .=' .page-template-custom-home-page p.site-description, .page-template-custom-home-page .site-title a {';
			$multi_sports_custom_style .=' color: #fff;';
		$multi_sports_custom_style .=' }';
	}

	$multi_sports_slider_title_font_size = get_theme_mod('multi_sports_slider_title_font_size');
	if( $multi_sports_slider_title_font_size != ''){
		$multi_sports_custom_style .=' #slider .slider-text h2{';
			$multi_sports_custom_style .=' font-size: '.esc_attr($multi_sports_slider_title_font_size).'px;';
		$multi_sports_custom_style .=' }';
	}

	$multi_sports_slider_text_font_size = get_theme_mod('multi_sports_slider_text_font_size');
	if( $multi_sports_slider_text_font_size != ''){
		$multi_sports_custom_style .=' #slider .slider-text p {';
			$multi_sports_custom_style .=' font-size: '.esc_attr($multi_sports_slider_text_font_size).'px;';
		$multi_sports_custom_style .=' }';
	}

	$multi_sports_slider_opacity = get_theme_mod('multi_sports_slider_opacity');
	if( $multi_sports_slider_opacity != ''){
		$multi_sports_custom_style .=' #slider img {';
			$multi_sports_custom_style .=' opacity: '.esc_attr($multi_sports_slider_opacity).';';
		$multi_sports_custom_style .=' }';
	}

	// Top Color
	$multi_sports_headerbg_color1 = get_theme_mod('multi_sports_headerbg_color1');
	$multi_sports_headerbg_color2 = get_theme_mod('multi_sports_headerbg_color2');

	if( $multi_sports_headerbg_color1 != ''){
		$multi_sports_custom_style .=' #header {';
			$multi_sports_custom_style .=' background: linear-gradient(to bottom, '.esc_attr($multi_sports_headerbg_color1).', '.esc_attr($multi_sports_headerbg_color2).');';
		$multi_sports_custom_style .=' }';
	}

	$multi_sports_social_font_size = get_theme_mod('multi_sports_social_font_size');
	if( $multi_sports_social_font_size != ''){
		$multi_sports_custom_style .=' .social-icons i{';
			$multi_sports_custom_style .=' font-size: '.esc_attr($multi_sports_social_font_size).'px;';
		$multi_sports_custom_style .=' }';
	}

	$multi_sports_social_color = get_theme_mod('multi_sports_social_color');
	if( $multi_sports_social_color != ''){
		$multi_sports_custom_style .=' .social-icons i {';
			$multi_sports_custom_style .=' color: '.esc_attr($multi_sports_social_color).';';
		$multi_sports_custom_style .=' }';
	}

	$multi_sports_menu_color = get_theme_mod('multi_sports_menu_color');
	if( $multi_sports_menu_color != ''){
		$multi_sports_custom_style .=' .nav-menu ul li a {';
			$multi_sports_custom_style .=' color: '.esc_attr($multi_sports_menu_color).';';
		$multi_sports_custom_style .=' }';
	}

	// Slider Color
	$multi_sports_slider_color = get_theme_mod('multi_sports_slider_color');
	if( $multi_sports_slider_color != ''){
		$multi_sports_custom_style .=' #slider .slider-text h2 a {';
			$multi_sports_custom_style .=' color: '.esc_attr($multi_sports_slider_color).';';
		$multi_sports_custom_style .=' }';
	}

	$multi_sports_slider_text_color = get_theme_mod('multi_sports_slider_text_color');
	if( $multi_sports_slider_text_color != ''){
		$multi_sports_custom_style .=' #slider .slider-text p {';
			$multi_sports_custom_style .=' color: '.esc_attr($multi_sports_slider_text_color).';';
		$multi_sports_custom_style .=' }';
	}

	$multi_sports_slider_bg_color = get_theme_mod('multi_sports_slider_bg_color');
	if( $multi_sports_slider_bg_color != ''){
		$multi_sports_custom_style .=' #slider{';
			$multi_sports_custom_style .=' background-color: '.esc_attr($multi_sports_slider_bg_color).';';
		$multi_sports_custom_style .=' }';
	}

	$multi_sports_slidernpicon_color = get_theme_mod('multi_sports_slidernpicon_color');
	$multi_sports_slidernpiconbg_color = get_theme_mod('multi_sports_slidernpiconbg_color');

	if( $multi_sports_slidernpicon_color != ''){
		$multi_sports_custom_style .=' .carousel-control-next-icon, .carousel-control-prev-icon {';
			$multi_sports_custom_style .=' color: '.esc_attr($multi_sports_slidernpicon_color).'; background-color: '.esc_attr($multi_sports_slidernpiconbg_color).';';
		$multi_sports_custom_style .=' }';
	}

	$multi_sports_slideroverlay_color1 = get_theme_mod('multi_sports_slideroverlay_color1');
	$multi_sports_slideroverlay_color2 = get_theme_mod('multi_sports_slideroverlay_color2');

	if( $multi_sports_slideroverlay_color1 != ''){
		$multi_sports_custom_style .=' .service-content {';
			$multi_sports_custom_style .='background: linear-gradient(to top, '.esc_attr($multi_sports_slideroverlay_color1).', '.esc_attr($multi_sports_slideroverlay_color2).', transparent);';
		$multi_sports_custom_style .=' }';
	}

	// Service Color
	$multi_sports_service_title_font_size = get_theme_mod('multi_sports_service_title_font_size');
	if( $multi_sports_service_title_font_size != ''){
		$multi_sports_custom_style .=' .service-page-box strong {';
			$multi_sports_custom_style .=' font-size: '.esc_attr($multi_sports_service_title_font_size).'px;';
		$multi_sports_custom_style .=' }';
	}

	$multi_sports_service_img_size = get_theme_mod('multi_sports_service_img_size');

	if( $multi_sports_service_img_size != ''){
		$multi_sports_custom_style .=' #our_service img{';
			$multi_sports_custom_style .=' width: '.esc_attr($multi_sports_service_img_size).'px; height: '.esc_attr($multi_sports_service_img_size).'px;';
		$multi_sports_custom_style .=' }';
	}

	$multi_sports_services_page_font_size = get_theme_mod('multi_sports_services_page_font_size');
	if( $multi_sports_services_page_font_size != ''){
		$multi_sports_custom_style .=' .service-page-box h3 {';
			$multi_sports_custom_style .=' font-size: '.esc_attr($multi_sports_services_page_font_size).'px;';
		$multi_sports_custom_style .=' }';
	}

	$multi_sports_services_page_text_font_size = get_theme_mod('multi_sports_services_page_text_font_size');
	if( $multi_sports_services_page_text_font_size != ''){
		$multi_sports_custom_style .=' .service-page-box p {';
			$multi_sports_custom_style .=' font-size: '.esc_attr($multi_sports_services_page_text_font_size).'px;';
		$multi_sports_custom_style .=' }';
	}

	$multi_sports_servicetitle_color = get_theme_mod('multi_sports_servicetitle_color');
	if( $multi_sports_servicetitle_color != ''){
		$multi_sports_custom_style .=' .service-page-box strong {';
			$multi_sports_custom_style .=' color: '.esc_attr($multi_sports_servicetitle_color).';';
		$multi_sports_custom_style .=' }';
	}

	$multi_sports_servicesubtitle_color = get_theme_mod('multi_sports_servicesubtitle_color');
	if( $multi_sports_servicesubtitle_color != ''){
		$multi_sports_custom_style .=' .service-page-box h3 a {';
			$multi_sports_custom_style .=' color: '.esc_attr($multi_sports_servicesubtitle_color).';';
		$multi_sports_custom_style .=' }';
	}

	$multi_sports_servicetext_color = get_theme_mod('multi_sports_servicetext_color');
	if( $multi_sports_servicetext_color != ''){
		$multi_sports_custom_style .=' .service-page-box p {';
			$multi_sports_custom_style .=' color: '.esc_attr($multi_sports_servicetext_color).';';
		$multi_sports_custom_style .=' }';
	}

	$multi_sports_servicebtn_color = get_theme_mod('multi_sports_servicebtn_color');
	if( $multi_sports_servicebtn_color != ''){
		$multi_sports_custom_style .=' .service-btn a {';
			$multi_sports_custom_style .=' color: '.esc_attr($multi_sports_servicebtn_color).';';
		$multi_sports_custom_style .=' }';
	}

	$multi_sports_servicebtnbg_color = get_theme_mod('multi_sports_servicebtnbg_color');
	if( $multi_sports_servicebtnbg_color != ''){
		$multi_sports_custom_style .=' .service-btn a {';
			$multi_sports_custom_style .=' background: '.esc_attr($multi_sports_servicebtnbg_color).';';
		$multi_sports_custom_style .=' }';
	}

	$multi_sports_servicebtnhvr_color = get_theme_mod('multi_sports_servicebtnhvr_color');
	$multi_sports_servicebtnbghvr_color = get_theme_mod('multi_sports_servicebtnbghvr_color');
	if( $multi_sports_servicebtnhvr_color != ''){
		$multi_sports_custom_style .=' .service-btn a:hover, .article_content .read-btn a:hover {';
			$multi_sports_custom_style .='background: linear-gradient(to left, '.esc_attr($multi_sports_servicebtnhvr_color).', '.esc_attr($multi_sports_servicebtnbghvr_color).', transparent);';
		$multi_sports_custom_style .=' }';
	}

	$multi_sports_serviceboxtitle_color = get_theme_mod('multi_sports_serviceboxtitle_color');
	if( $multi_sports_serviceboxtitle_color != ''){
		$multi_sports_custom_style .=' .service-content h4 a {';
			$multi_sports_custom_style .=' color: '.esc_attr($multi_sports_serviceboxtitle_color).';';
		$multi_sports_custom_style .=' }';
	}

	$multi_sports_serviceboxtext_color = get_theme_mod('multi_sports_serviceboxtext_color');
	if( $multi_sports_serviceboxtext_color != ''){
		$multi_sports_custom_style .=' .service-content p {';
			$multi_sports_custom_style .=' color: '.esc_attr($multi_sports_serviceboxtext_color).';';
		$multi_sports_custom_style .=' }';
	}

	$multi_sports_serviceboxoverlay_color1 = get_theme_mod('multi_sports_serviceboxoverlay_color1');
	$multi_sports_serviceboxoverlay_color2 = get_theme_mod('multi_sports_serviceboxoverlay_color2');

	if( $multi_sports_serviceboxoverlay_color1 != ''){
		$multi_sports_custom_style .=' .slider-bg {';
			$multi_sports_custom_style .='background: linear-gradient(to left, '.esc_attr($multi_sports_serviceboxoverlay_color1).', '.esc_attr($multi_sports_serviceboxoverlay_color2).', transparent);';
		$multi_sports_custom_style .=' }';
	}

	// Copyright Color
	$multi_sports_footer_copy_font_size = get_theme_mod('multi_sports_footer_copy_font_size');
	if( $multi_sports_footer_copy_font_size != ''){
		$multi_sports_custom_style .=' .site-info p {';
			$multi_sports_custom_style .=' font-size: '.esc_attr($multi_sports_footer_copy_font_size).'px;';
		$multi_sports_custom_style .=' }';
	}

	$multi_sports_copyright_color = get_theme_mod('multi_sports_copyright_color');
	if( $multi_sports_copyright_color != ''){
		$multi_sports_custom_style .=' .site-info p {';
			$multi_sports_custom_style .=' color: '.esc_attr($multi_sports_copyright_color).';';
		$multi_sports_custom_style .=' }';
	}

	$multi_sports_copyrightbg_color = get_theme_mod('multi_sports_copyrightbg_color');
	if( $multi_sports_copyrightbg_color != ''){
		$multi_sports_custom_style .=' .copyright {';
			$multi_sports_custom_style .=' background-color: '.esc_attr($multi_sports_copyrightbg_color).';';
		$multi_sports_custom_style .=' }';
	}

	$multi_sports_backtext_color = get_theme_mod('multi_sports_backtext_color');
	$multi_sports_backbg_color = get_theme_mod('multi_sports_backbg_color');
	if( $multi_sports_backtext_color != ''){
		$multi_sports_custom_style .=' .show-back-to-top {';
			$multi_sports_custom_style .=' color: '.esc_attr($multi_sports_backtext_color).'; background-color: '.esc_attr($multi_sports_backbg_color).';';
		$multi_sports_custom_style .=' }';
	}