


<?php foreach($albumsList as $album) { ?>
<a href="<?php echo base_url('album/'.$album['title']); ?>" class="album-button best-fit" style="" data-id="<?php echo $album['cover_id']; ?>" data-ratio="<?php echo $album['ratio']; ?>" data-fade-in="true">
	<div class="table">
		<div class="inner">
			<div class="title"><?php echo $album['title']; ?></div>
			<div class="photos"><?php echo $album['count']; ?> photographs ></div>
		</div>
	</div>
</a>
<?php }; ?>

<div class="nav-spacer"></div>

<div class="nav-bar home-screen">
	<div class="table">
		<div class="inner">
			<div class="title">Some Photos I Took</div>
		</div>
		<div class="inner">
			<a href="javascript:;" class="name" target="_blank">by ADAM PALMER</a>
		</div>
	</div>
</div>