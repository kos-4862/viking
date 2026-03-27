<?php
/**
 * The header for our theme
 *
 * @subpackage Multi Sports
 * @since 1.0
 * @version 0.1
 */

?><!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js no-svg">
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

<?php if ( function_exists( 'wp_body_open' ) ) {
	wp_body_open();
} else {
	do_action( 'wp_body_open' );
} ?>

<a class="screen-reader-text skip-link" href="#skip-content"><?php esc_html_e( 'Skip to content', 'multi-sports' ); ?></a>

<header id="header" class="academy-header">
	<div class="container-fluid">
		<div class="academy-header__inner">
			<div class="academy-brand">
				<?php if ( has_custom_logo() ) : ?>
					<div class="academy-brand__logo"><?php the_custom_logo(); ?></div>
				<?php else : ?>
					<div class="academy-brand__logo academy-brand__logo--fallback">
						<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
							<img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/sc-viking-emblem.jpg' ); ?>" alt="<?php echo esc_attr( get_bloginfo( 'name' ) ? get_bloginfo( 'name' ) : __( 'SC Viking', 'multi-sports' ) ); ?>">
						</a>
					</div>
				<?php endif; ?>

				<div class="academy-brand__copy">
					<?php $blog_info = get_bloginfo( 'name' ); ?>
					<?php if ( ! empty( $blog_info ) ) : ?>
						<?php if ( is_front_page() && is_home() ) : ?>
							<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
						<?php else : ?>
							<p class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p>
						<?php endif; ?>
					<?php endif; ?>

					<?php $description = get_bloginfo( 'description', 'display' ); ?>
					<?php if ( $description || is_customize_preview() ) : ?>
						<p class="site-description"><?php echo esc_html( $description ); ?></p>
					<?php endif; ?>
				</div>
			</div>

			<?php if ( has_nav_menu( 'primary' ) ) { ?>
				<button onclick="multi_sports_open()" role="tab" class="mobile-menu academy-mobile-toggle">
					<i class="fas fa-bars"></i>
					<span class="screen-reader-text"><?php esc_html_e( 'Open Menu', 'multi-sports' ); ?></span>
				</button>

				<div id="sidelong-menu" class="nav sidenav academy-sidenav">
					<nav id="primary-site-navigation" class="nav-menu academy-nav" role="navigation" aria-label="<?php esc_attr_e( 'Top Menu', 'multi-sports' ); ?>">
						<?php
						wp_nav_menu(
							array(
								'theme_location' => 'primary',
								'container_class' => 'main-menu-navigation clearfix',
								'menu_class'      => 'clearfix',
								'items_wrap'      => '<ul id="%1$s" class="%2$s mobile_nav">%3$s</ul>',
								'fallback_cb'     => 'wp_page_menu',
							)
						);
						?>
						<a href="javascript:void(0)" class="closebtn responsive-menu" onclick="multi_sports_close()">
							<i class="fas fa-times"></i>
							<span class="screen-reader-text"><?php esc_html_e( 'Close Menu', 'multi-sports' ); ?></span>
						</a>
					</nav>
				</div>
			<?php } ?>

			<div class="academy-header__meta">
				<a class="academy-header__phone" href="tel:+380000000000"><?php esc_html_e( 'Admissions line', 'multi-sports' ); ?></a>
				<div class="academy-social academy-social--header">
					<a href="https://www.facebook.com/sc.viking" target="_blank" rel="noopener noreferrer">FB</a>
					<a href="https://www.instagram.com/fcvb.2021/" target="_blank" rel="noopener noreferrer">IG</a>
					<a href="https://www.tiktok.com/@fcvb.2021" target="_blank" rel="noopener noreferrer">TT</a>
				</div>
				<a class="academy-header__cta" href="<?php echo esc_url( home_url( '/#academy-contact' ) ); ?>"><?php esc_html_e( 'Book a Trial', 'multi-sports' ); ?></a>
			</div>
		</div>
	</div>
</header>

<?php if ( is_singular() && ! is_page_template( 'page-template/custom-home-page.php' ) ) { ?>
	<div id="inner-pages-header">
		<div class="hex center">
			<div class="hex odd first one"></div>
			<div class="hex odd first three"></div>
			<div class="hex odd first five"></div>
			<div class="hex odd first seven"></div>
			<div class="hex odd first nine"></div>
			<div class="hex odd first eleven"></div>
		</div>
		<div class="header-content">
			<div class="container">
				<div class="row">
					<div class="col-lg-6 col-md-6 align-self-start">
						<div class="max-box">
							<h1><?php single_post_title(); ?></h1>
						</div>
					</div>
					<div class="col-lg-6 col-md-6 align-self-center">
						<div class="theme-breadcrumb text-md-right">
							<?php multi_sports_breadcrumb(); ?>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
<?php } ?>
