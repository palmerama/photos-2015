<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class prep extends CI_Controller
{

	public function __construct()
	{
		parent::__construct();
		$this->load->model('photos_model');
	}

	public function createAlbumFromFolder($title)
	{
		$albumId = $this->photos_model->createAlbum($title);
		$this->createImages($title, $albumId);
	}

	public function createImages($title, $albumId)
	{
		ini_set('memory_limit', '1024M');

		$originalsFolder = "originals/".$title."/";
		$photosFolder = "assets/img/photos/";

		$filesOrig = scandir($originalsFolder);
		$imagesOrig = array();

		// scan for originals
		foreach ($filesOrig as $file)
		{
			if (fnmatch('*.jpg',$file) || fnmatch('*.png',$file)) array_push($imagesOrig, $file);
		}

		// resize and save
		for ($i = 0; $i < count($imagesOrig); $i++)
		{
			$original = $originalsFolder.$imagesOrig[$i];

			// get ratio
			list($imgW, $imgH) = getimagesize($original);
			$ratio = $imgH / $imgW;

			// get id from db
			$photoId = $this->photos_model->createPhotoInAlbum($albumId, $ratio);

			$this->createScaledImage($original, $photosFolder, $photoId, 4000);
			$this->createScaledImage($original, $photosFolder, $photoId, 3000);
			$this->createScaledImage($original, $photosFolder, $photoId, 2000);
			$this->createScaledImage($original, $photosFolder, $photoId, 1000);
			$this->createScaledImage($original, $photosFolder, $photoId, 500);
			$this->createScaledImage($original, $photosFolder, $photoId, 300);
		}
	}

	public function createScaledImage($original, $photosFolder, $photoId, $edgeLength)
	{
		ini_set('memory_limit', '1024M');
		$this->load->library('image_lib');

		$config['image_library'] = 'gd2';
		$config['source_image']	= $original;
		$config['new_image']	= $photosFolder.$edgeLength.'/'.$photoId.'.jpg';
		$config['maintain_ratio'] = TRUE;
		$config['width'] = $config['height'] = $edgeLength;

		$this->image_lib->initialize($config);

		if ( ! $this->image_lib->resize()) echo $this->image_lib->display_errors();

		$this->image_lib->clear();
	}

}