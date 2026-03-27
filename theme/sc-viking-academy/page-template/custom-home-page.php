<?php
/**
 * Template Name: SC Viking Home
 */

get_header();
?>

<main id="skip-content" role="main" class="academy-home">
	<?php while ( have_posts() ) : the_post(); ?>
		<?php
		$academy_name = get_bloginfo( 'name' );
		if ( empty( $academy_name ) ) {
			$academy_name = __( 'SC Viking', 'multi-sports' );
		}

		$hero_image = has_post_thumbnail() ? get_the_post_thumbnail_url( get_the_ID(), 'full' ) : '';
		?>

		<section class="academy-hero">
			<div class="academy-hero__backdrop">
				<span class="academy-hero__glow academy-hero__glow--left"></span>
				<span class="academy-hero__glow academy-hero__glow--right"></span>
				<span class="academy-hero__gridline"></span>
			</div>

			<div class="container">
				<div class="academy-hero__layout">
					<div class="academy-hero__copy">
						<p class="academy-kicker"><?php esc_html_e( 'Structure inspired by the Juventus Academy site', 'multi-sports' ); ?></p>
						<h1><?php echo esc_html( $academy_name ); ?></h1>
						<p class="academy-hero__lead"><?php esc_html_e( 'A premium football club front page with a strong hero block, clear program pathways, training philosophy, and an enrollment-first flow.', 'multi-sports' ); ?></p>

						<div class="academy-hero__actions">
							<a href="#academy-programs" class="academy-button academy-button--light"><?php esc_html_e( 'Explore Programs', 'multi-sports' ); ?></a>
							<a href="#academy-contact" class="academy-button academy-button--ghost"><?php esc_html_e( 'Join a Trial Session', 'multi-sports' ); ?></a>
						</div>

						<div class="academy-stat-strip">
							<div class="academy-stat">
								<strong>4+</strong>
								<span><?php esc_html_e( 'age groups', 'multi-sports' ); ?></span>
							</div>
							<div class="academy-stat">
								<strong>12</strong>
								<span><?php esc_html_e( 'month pathway', 'multi-sports' ); ?></span>
							</div>
							<div class="academy-stat">
								<strong>360°</strong>
								<span><?php esc_html_e( 'player development', 'multi-sports' ); ?></span>
							</div>
						</div>
					</div>

					<div class="academy-hero__media">
						<div class="academy-media-card<?php echo $hero_image ? ' has-image' : ' is-placeholder'; ?>"<?php if ( $hero_image ) { echo ' style="background-image:url(' . esc_url( $hero_image ) . ')"'; } ?>>
							<div class="academy-media-card__inner">
								<p><?php esc_html_e( 'Hero Media Area', 'multi-sports' ); ?></p>
								<h2><?php esc_html_e( 'Swap this block for SC Viking video, match footage, or a strong training image.', 'multi-sports' ); ?></h2>
							</div>
						</div>

						<div class="academy-quick-links">
							<a href="#academy-programs" class="academy-quick-link">
								<span><?php esc_html_e( 'Programs', 'multi-sports' ); ?></span>
								<strong><?php esc_html_e( 'Age-based tracks', 'multi-sports' ); ?></strong>
							</a>
							<a href="#academy-philosophy" class="academy-quick-link">
								<span><?php esc_html_e( 'Methodology', 'multi-sports' ); ?></span>
								<strong><?php esc_html_e( 'Discipline, intensity, technique', 'multi-sports' ); ?></strong>
							</a>
							<a href="#academy-contact" class="academy-quick-link">
								<span><?php esc_html_e( 'Enrollment', 'multi-sports' ); ?></span>
								<strong><?php esc_html_e( 'Clear conversion path', 'multi-sports' ); ?></strong>
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section class="academy-section academy-section--light" id="academy-overview">
			<div class="container">
				<div class="academy-section__heading">
					<p class="academy-kicker"><?php esc_html_e( 'What this homepage now does', 'multi-sports' ); ?></p>
					<h2><?php esc_html_e( 'It mirrors the Juventus-style page architecture without copying the brand', 'multi-sports' ); ?></h2>
				</div>

				<div class="academy-grid academy-grid--four">
					<article class="academy-panel">
						<h3><?php esc_html_e( 'Hero First', 'multi-sports' ); ?></h3>
						<p><?php esc_html_e( 'A cinematic first screen sets the tone before the user scrolls into programs and club proof.', 'multi-sports' ); ?></p>
					</article>
					<article class="academy-panel">
						<h3><?php esc_html_e( 'Program Cards', 'multi-sports' ); ?></h3>
						<p><?php esc_html_e( 'Training directions sit near the top, just like a strong academy funnel should.', 'multi-sports' ); ?></p>
					</article>
					<article class="academy-panel">
						<h3><?php esc_html_e( 'Coaching Story', 'multi-sports' ); ?></h3>
						<p><?php esc_html_e( 'The mid-page structure is ready for trainers, coaching principles, and trust-building sections.', 'multi-sports' ); ?></p>
					</article>
					<article class="academy-panel">
						<h3><?php esc_html_e( 'Enrollment Flow', 'multi-sports' ); ?></h3>
						<p><?php esc_html_e( 'Visible CTAs keep the page focused on trial bookings and contact conversion.', 'multi-sports' ); ?></p>
					</article>
				</div>
			</div>
		</section>

		<section class="academy-section academy-section--dark" id="academy-programs">
			<div class="container">
				<div class="academy-section__heading">
					<p class="academy-kicker"><?php esc_html_e( 'SC Viking Programs', 'multi-sports' ); ?></p>
					<h2><?php esc_html_e( 'Three pathways to anchor the main conversion flow', 'multi-sports' ); ?></h2>
				</div>

				<div class="academy-grid academy-grid--three">
					<article class="academy-program-card">
						<span><?php esc_html_e( 'Foundation', 'multi-sports' ); ?></span>
						<h3><?php esc_html_e( 'Ages 4 to 6', 'multi-sports' ); ?></h3>
						<p><?php esc_html_e( 'Early coordination, movement habits, confidence and love for the game.', 'multi-sports' ); ?></p>
					</article>
					<article class="academy-program-card">
						<span><?php esc_html_e( 'Development', 'multi-sports' ); ?></span>
						<h3><?php esc_html_e( 'Ages 7 to 10', 'multi-sports' ); ?></h3>
						<p><?php esc_html_e( 'Technical repetition, decision making and structured training rhythm.', 'multi-sports' ); ?></p>
					</article>
					<article class="academy-program-card">
						<span><?php esc_html_e( 'Performance', 'multi-sports' ); ?></span>
						<h3><?php esc_html_e( 'Ages 11 to 14', 'multi-sports' ); ?></h3>
						<p><?php esc_html_e( 'Competitive habits, tactical discipline and higher-intensity development blocks.', 'multi-sports' ); ?></p>
					</article>
				</div>
			</div>
		</section>

		<section class="academy-section academy-section--split" id="academy-philosophy">
			<div class="container">
				<div class="academy-split">
					<div class="academy-split__content">
						<p class="academy-kicker"><?php esc_html_e( 'Club Philosophy', 'multi-sports' ); ?></p>
						<h2><?php esc_html_e( 'Present SC Viking as a system, not just a schedule', 'multi-sports' ); ?></h2>
						<p><?php esc_html_e( 'This section is designed for the same job the Juventus site does well: explain standards, methodology, and why parents should trust the academy structure.', 'multi-sports' ); ?></p>
					</div>

					<div class="academy-checklist">
						<div class="academy-checklist__item"><?php esc_html_e( 'Technique-led development', 'multi-sports' ); ?></div>
						<div class="academy-checklist__item"><?php esc_html_e( 'Clear weekly rhythm and progression', 'multi-sports' ); ?></div>
						<div class="academy-checklist__item"><?php esc_html_e( 'Coach credibility and club standards', 'multi-sports' ); ?></div>
						<div class="academy-checklist__item"><?php esc_html_e( 'Simple path from visit to trial booking', 'multi-sports' ); ?></div>
					</div>
				</div>
			</div>
		</section>

		<section class="academy-section academy-section--content" id="academy-contact">
			<div class="container">
				<div class="academy-content-shell">
					<div class="academy-section__heading">
						<p class="academy-kicker"><?php esc_html_e( 'Editable Club Content', 'multi-sports' ); ?></p>
						<h2><?php esc_html_e( 'Fill this area with schedule, coaches, locations, pricing, and contact details', 'multi-sports' ); ?></h2>
					</div>

					<div class="academy-editor-content lz-content">
						<?php the_content(); ?>
					</div>
				</div>
			</div>
		</section>
	<?php endwhile; ?>
</main>

<?php get_footer(); ?>
