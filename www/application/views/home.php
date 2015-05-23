<!DOCTYPE html>
<!--[if lt IE 9]><html class="lt-ie9"><![endif]-->
<html>
<head>
	<meta charset="utf-8">
	<title>Adam Palmer – Holiday Snaps</title>

	<link rel="stylesheet" href="assets/css/reset.css?v<?php echo SCRIPT_VERSION; ?>">
	<link rel="stylesheet" href="assets/css/fonts.css?v<?php echo SCRIPT_VERSION; ?>">
	<link rel="stylesheet" href="assets/css/main.css?v<?php echo SCRIPT_VERSION; ?>">
	<link rel="stylesheet" href="assets/css/buttons.css?v<?php echo SCRIPT_VERSION; ?>">

	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
</head>

<body>

	<div id="wrapper">
		Boom!
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