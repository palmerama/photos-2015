
<script>window.data.photo = true;</script>
<script src="<?php echo base_url('assets/js/vendor/hammer.min.js'); ?>"></script>

<div class="photos-harness">
	<div class="photo-solo best-fit prev" data-id="<?php echo $previous->id; ?>" data-ratio="<?php echo $previous->ratio; ?>"></div>
	<div class="photo-solo best-fit middle" data-id="<?php echo $photo->id; ?>" data-ratio="<?php echo $photo->ratio; ?>"></div>
	<div class="photo-solo best-fit next" data-id="<?php echo $next->id; ?>" data-ratio="<?php echo $next->ratio; ?>"></div>
</div>


<div class="nav-bar">
	<div class="table">
		<div class="inner">
			<a href="<?php echo base_url('album/'.$title); ?>" class="button">< view album</a>
		</div>
		<div class="inner middle">
			<div class="album">
				<span class="position" style="color:transparent;">(<?php echo $photo->position + 1; ?>/<?php echo $count; ?>)</span>
				<?php echo $title; ?>
				<span class="position">(<?php echo $photo->position + 1; ?>/<?php echo $count; ?>)</span>
			</div>
		</div>
		<div class="inner">
			<div class="name">by ADAM PALMER</div>
		</div>
	</div>
</div>