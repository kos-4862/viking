<?php
/**
 * The template for displaying the footer
 *
 * @subpackage Multi Sports
 * @since 1.0
 * @version 0.1
 */

?>
	<footer id="colophon" class="site-footer academy-footer" role="contentinfo">
		<div class="container">
			<div class="academy-footer__grid">
				<div>
					<p class="academy-kicker"><?php esc_html_e( 'SC Viking Footer', 'multi-sports' ); ?></p>
					<h2><?php bloginfo( 'name' ); ?></h2>
					<p><?php esc_html_e( 'This simplified footer is built for a football academy landing flow and is ready for real contacts, policy links and sponsor blocks.', 'multi-sports' ); ?></p>
				</div>

				<div>
					<h3><?php esc_html_e( 'Quick Links', 'multi-sports' ); ?></h3>
					<ul class="academy-footer__links">
						<li><a href="<?php echo esc_url( home_url( '/#academy-programs' ) ); ?>"><?php esc_html_e( 'Programs', 'multi-sports' ); ?></a></li>
						<li><a href="<?php echo esc_url( home_url( '/#academy-philosophy' ) ); ?>"><?php esc_html_e( 'Methodology', 'multi-sports' ); ?></a></li>
						<li><a href="<?php echo esc_url( home_url( '/#academy-contact' ) ); ?>"><?php esc_html_e( 'Contact', 'multi-sports' ); ?></a></li>
					</ul>
					<div class="academy-social academy-social--footer">
						<a href="https://www.facebook.com/sc.viking" target="_blank" rel="noopener noreferrer">Facebook</a>
						<a href="https://www.instagram.com/fcvb.2021/" target="_blank" rel="noopener noreferrer">Instagram</a>
						<a href="https://www.tiktok.com/@fcvb.2021" target="_blank" rel="noopener noreferrer">TikTok</a>
					</div>
				</div>

				<div id="academy-contact">
					<h3><?php esc_html_e( 'Placeholder Contacts', 'multi-sports' ); ?></h3>
					<p><a href="tel:+380000000000">+380 00 000 0000</a></p>
					<p><a href="mailto:hello@scviking.example">hello@scviking.example</a></p>
					<p><?php esc_html_e( 'Add the real club address, map links and training campus details here.', 'multi-sports' ); ?></p>
				</div>
			</div>

			<div class="academy-footer__bottom">
				<p><?php esc_html_e( 'Customized locally from the Multi Sports theme for SC Viking.', 'multi-sports' ); ?></p>
			</div>
		</div>
	</footer>
	<?php if ( get_theme_mod( 'multi_sports_show_back_totop', true ) != '' ) { ?>
		<button role="tab" class="back-to-top"><span class="back-to-top-text"><?php echo esc_html( 'Top', 'multi-sports' ); ?></span></button>
	<?php } ?>

<?php wp_footer(); ?>
</body>
</html>
