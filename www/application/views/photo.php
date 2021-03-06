
<script>
	window.data.photo = true;
	window.data.main = {id: <?php echo $photo->id; ?>, ratio: <?php echo $photo->ratio; ?>, position: <?php echo $photo->position; ?>, count:<?php echo $count; ?> };

	<?php if (isset($previous)) { ?>
	window.data.prev = {id: <?php echo $previous->id; ?>, ratio: <?php echo $previous->ratio; ?>};
	<?php }; ?>

	<?php if (isset($next)) { ?>
	window.data.next = {id: <?php echo $next->id; ?>, ratio: <?php echo $next->ratio; ?>};
	<?php }; ?>
</script>
<script src="<?php echo base_url('assets/js/vendor/hammer.min.js'); ?>"></script>

<div class="marker-position"></div>

<div class="photos-harness">
	<div class="photo-solo best-fit prev" data-id="" data-ratio=""></div>
	<div class="photo-solo best-fit middle" data-id="" data-ratio="" data-fade-in="true">
		<div class="marker-transform-origin"></div>
	</div>
	<div class="photo-solo best-fit next" data-id="" data-ratio=""></div>
</div>

<div class="social">
	<a href="javascript:;" target="_blank" class="share fb"></a>
	<a href="javascript:;" target="_blank" class="share twitter"></a>
</div>


<div class="nav-bar">
	<div class="table">
		<div class="inner">
			<a href="<?php echo base_url('album/'.$title); ?>" class="button">< view album</a>
		</div>
		<div class="inner middle">
			<div class="album">
				<span class="position" style="color:transparent;">(<?php echo $photo->position + 1; ?>/<?php echo $count; ?>)</span>
				<a href="<?php echo base_url('album/'.$title); ?>" class="album-title"><?php echo $title; ?></a>
				<span class="position">(<?php echo $photo->position + 1; ?>/<?php echo $count; ?>)</span>
			</div>
		</div>
		<div class="inner">
			<a href="javascript:;" class="name" target="_blank">by ADAM PALMER</a>
		</div>
	</div>
</div>