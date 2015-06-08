
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
					background-image: url('<?php echo base_url("assets/img/photos/300/".$photo->photo_id.".jpg"); ?>');
					width:<?php echo ((1/$photo->ratio)/$rowWidthTotal)*100; ?>%;
				" data-id="<?php echo $photo->photo_id; ?>" data-ratio="<?php echo $photo->ratio; ?>"></a>
		<?php }; ?>
	</div>
<?php }; ?>


<div id="nav-bar">
	<div class="table">
		<div class="inner">
			<div class="title">My Holiday Snaps</div>
		</div>
		<div class="inner">
			<div class="name">by ADAM PALMER</div>
		</div>
	</div>
</div>