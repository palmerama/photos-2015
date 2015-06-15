
<?php

	//echo '<pre>';
	//print_r($rows);
	//echo '</pre>';

	//die();


	foreach($rows as $row) {

		$rowWidthTotal = 0;
		foreach($row as $photo) { $rowWidthTotal += 1/$photo->ratio; };

	?>
	<div class="row">
		<?php
			foreach($row as $photo) {
		?>
				<a href="javascript:;" class="photo best-fit" style="
					background-image: url('');
					width:<?php echo ((1/$photo->ratio)/$rowWidthTotal)*100; ?>%;
				" data-id="<?php echo $photo->photo_id; ?>" data-ratio="<?php echo $photo->ratio; ?>">

				<?php if ($admin != null) { ?>
						<div class="table">
							<div class="cell"><?php echo $photo->photo_id; ?></div>
						</div>
				<?php }; ?>

				</a>
		<?php }; ?>
	</div>
<?php }; ?>


<div class="nav-bar <?php if ($admin != null) echo 'admin'; ?>">
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