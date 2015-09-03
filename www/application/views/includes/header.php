<!DOCTYPE html>
<html xmlns:og="http://opengraphprotocol.org/schema/"
	  xmlns:fb="http://www.facebook.com/2008/fbml" lang="en">
<head>
	<meta charset="utf-8">
	<title>Adam Palmer : Some Photos I Took</title>

	<script src="//use.typekit.net/tor1peq.js"></script>
	<script>try{Typekit.load();}catch(e){}</script>

	<link rel="stylesheet" href="<?php echo base_url('assets/css/reset.css?v'.SCRIPT_VERSION); ?>">
	<link rel="stylesheet" href="<?php echo base_url('assets/css/fonts.css?v'.SCRIPT_VERSION); ?>">
	<link rel="stylesheet" href="<?php echo base_url('assets/css/main.css?v'.SCRIPT_VERSION); ?>">
	<link rel="stylesheet" href="<?php echo base_url('assets/css/nav.css?v'.SCRIPT_VERSION); ?>">

	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">

	<meta property="og:title" content="<?php echo $og_title;?>" />
	<meta property="og:type" content="article" />
	<meta property="og:url" content="<?php echo $og_url;?>" />
	<meta property="og:image" content="<?php echo $og_image;?>" />
	<meta property="og:image:width" content="1200">
	<meta property="og:image:height" content="630">
	<meta property="og:site_name" content="Adam Palmer: Some Photos I Took" />
	<meta property="og:description" content="I took some photos. I developed them. I made a website and put them on the internet. What do you want from me?" />

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

<div class="wrapper<?php if (isset($screen)) echo " ".$screen."-screen"; ?>">