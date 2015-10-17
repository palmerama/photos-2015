</div>


<div class="overlay">
	<div class="cell">
		<div class="inner">
			<div class="title">Hello.</div>
			<div class="body">
				<p>I take photographs in my spare time. Actually, I only really bother on holiday. I should do it more. I enjoy it. I've made this site to house those I've already taken.<p>
				<p>In <a href="https://twitter.com/palmerama" target="_blank">real life</a>, I'm a co-founder of <a href="http://wehaverhythm.com" target="_blank">Rhythm</a>. We make fun interactive digital stuff.</p>
			</div>
		</div>
	</div>
</div>


<script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/1.11.8/TweenMax.min.js"></script>
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>

<script>
	$(".photo-solo").height( window.innerHeight - $(".nav-bar").innerHeight() );
</script>

<script>
	window.appInit = "main";
</script>

<?php
if(ENVIRONMENT != 'production') :
	/**
	 * DEVELOPMENT JS
	 */
	?>
	<script data-main="<?php echo base_url('assets/js/src/init.js?v='.SCRIPT_VERSION);?>" src="<?php echo base_url('assets/js/require.js?v='.SCRIPT_VERSION);?>"></script>
<?php
else :
	/**
	 * PRODUCTION JS
	 */
	?>

	<script data-main="<?php echo base_url('assets/js/build.min.js?v='.SCRIPT_VERSION);?>" src="<?php echo base_url('assets/js/require.js?v='.SCRIPT_VERSION);?>">
		// 'assets/js/build.min.js?v'.SCRIPT_VERSION
	</script>

	<!--
	<script data-main="<?php echo base_url('assets/js/src/init.js?v='.SCRIPT_VERSION);?>" src="<?php echo base_url('assets/js/require.js?v='.SCRIPT_VERSION);?>"></script>
	-->

<?php
endif;
?>

<?php $this->load->view('includes/ga'); ?>

</body>
</html>