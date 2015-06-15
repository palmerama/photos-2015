
<?php
	foreach($album as $row) {

		$rowWidthTotal = 0;
		foreach($row as $photo) { $rowWidthTotal += 1/$photo->ratio; };

	?>
	<div class="row">
		<?php
			foreach($row as $photo) {
		?>
				<a href="#" class="photo best-fit" style="
					background-image: url('');
					width:<?php echo ((1/$photo->ratio)/$rowWidthTotal)*100; ?>%;
				" data-id="<?php echo $photo->photo_id; ?>" data-ratio="<?php echo $photo->ratio; ?>"></a>
		<?php }; ?>
	</div>
<?php }; ?>


<div class="nav-bar">
	<div class="table">
		<div class="inner">
			<a href="<?php echo base_url(); ?>" class="button">< albums</a>
		</div>
		<div class="inner">
			<div class="album"><?php echo $title; ?></div>
		</div>
		<div class="inner">
			<div class="name">by ADAM PALMER</div>
		</div>
	</div>
</div>