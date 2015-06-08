
<?php foreach($albumsList as $album) { ?>
<a href="<?php echo base_url('album/'.$album['title']); ?>" class="album-button best-fit" style="background-image: url(<?php echo base_url('assets/img/photos/1000/'.$album['cover_id'].'.jpg'); ?>)"  data-id="<?php echo $album['cover_id']; ?>" data-ratio="<?php echo $album['ratio']; ?>">
	<div class="table">
		<div class="inner">
			<div class="title"><?php echo $album['title']; ?></div>
			<div class="photos"><?php echo $album['count']; ?> photographs ></div>
		</div>
	</div>
</a>
<?php }; ?>

<div id="nav-bar">
	<div class="table">
		<div class="inner">
			<div class="title">Some Photos I Took</div>
		</div>
		<div class="inner">
			<div class="name">by ADAM PALMER</div>
		</div>
	</div>
</div>