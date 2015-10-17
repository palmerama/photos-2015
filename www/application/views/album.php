
<script>window.data.album = true;</script>

<?php
	foreach($rows as $row) {
		$rowWidthTotal = 0;
		foreach($row as $photo) { $rowWidthTotal += 1/$photo->ratio;};
	?>
	<div class="row">
		<?php foreach($row as $photo) { ?>
			<a href="javascript:;" class="photo best-fit" style="
				width:<?php echo ((1/$photo->ratio)/$rowWidthTotal)*100; ?>%;
			" data-id="<?php echo $photo->photo_id; ?>" data-ratio="<?php echo $photo->ratio; ?>" data-fade-in="true">

			<?php if ($admin != null) { ?>
				<div class="table">
					<div class="cell"><?php echo $photo->photo_id; ?></div>
				</div>

				<div class="admin-button full-width<?php if ($photo->full_width == 1) echo ' selected'; ?>">FULL</div>
			<?php }; ?>
			</a>
		<?php }; ?>
	</div>
<?php }; ?>

<div class="nav-spacer"></div>


<div class="nav-bar<?php if ($admin != null) echo ' admin'; ?>">
	<div class="table">
		<div class="inner">
			<a href="<?php echo base_url(); ?>" class="button">< albums</a>
		</div>
		<div class="inner middle">
			<div class="album"><?php echo $title; ?></div>
		</div>
		<div class="inner">
			<a href="javascript:;" class="name" target="_blank">by ADAM PALMER</a>
		</div>
	</div>
</div>