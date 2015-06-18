
<div class="photo-solo best-fit" data-id="<?php echo $photo->id; ?>" data-ratio="<?php echo $photo->ratio; ?>"></div>

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