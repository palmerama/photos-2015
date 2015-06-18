<!DOCTYPE html>
<!--[if lt IE 9]><html class="lt-ie9"><![endif]-->
<html>
<head>
	<meta charset="utf-8">
	<title>Adam Palmer : Holiday Snaps</title>

	<script src="//use.typekit.net/tor1peq.js"></script>
	<script>try{Typekit.load();}catch(e){}</script>

	<link rel="stylesheet" href="<?php echo base_url('assets/css/reset.css?v'.SCRIPT_VERSION); ?>">
	<link rel="stylesheet" href="<?php echo base_url('assets/css/fonts.css?v'.SCRIPT_VERSION); ?>">
	<link rel="stylesheet" href="<?php echo base_url('assets/css/main.css?v'.SCRIPT_VERSION); ?>">
	<link rel="stylesheet" href="<?php echo base_url('assets/css/nav.css?v'.SCRIPT_VERSION); ?>">

	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">

	<script>
		window.data = {
			baseUrl: "<?php echo base_url(); ?>",
			admin: <?php if (isset($admin)) echo 'true'; else echo 'false'; ?>
			<?php if (isset($title)) { ?>, albumTitle: "<?php echo $title; ?>"<?php }; ?>
		}
	</script>
</head>

<body<?php if (isset($admin)) echo ' class="admin"'; ?>>
<?php if (isset($admin)) $this->load->view('includes/admin_bar'); ?>

<div class="wrapper">