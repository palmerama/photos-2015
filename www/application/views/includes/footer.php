</div>


<script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/1.11.8/TweenMax.min.js"></script>
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>

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

<?php
endif;
?>

<?php $this->load->view('includes/ga'); ?>

</body>
</html>