<div class="admin-bar">

	<div class="controls">
		<a class="button shuffle-button" href="javascript:;">Shuffle</a>
		<a class="button save-button" href="javascript:;">Save Changes</a>
	</div>

	<div class="unused-photos">
		<?php if (count($unused) > 0) { ?><div class="title">Unused Photos:</div><?php }; ?>
		<?php
			foreach($unused as $photo) {
			?>
			<a href="javascript:;" class="photo best-fit" style="
					background-image: url('');
					width: 100%;
					" data-id="<?php echo $photo->photo_id; ?>" data-ratio="<?php echo $photo->ratio; ?>">

				<?php if ($admin != null) { ?>
					<div class="table">
						<div class="cell selected"><?php echo $photo->photo_id; ?></div>
					</div>
				<?php }; ?>

			</a	>
		<?php }; ?>

	</div>
</div>