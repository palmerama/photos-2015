<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class data extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('photos_model');
		$this->load->library('SimpleImage');
	}

	public function createAlbumFromFolder($title)
	{
		$albumId = $this->photos_model->createAlbum($title);
		$this->createImages($title, $albumId);
	}

	public function updateAlbum($title, $albumId)
	{
		$this->createImages($title, $albumId);
	}

	public function createImages($title, $albumId)
	{
		$originalsFolder = "originals/".$title."/";
		$photosFolder = "assets/img/photos/";

		$filesOrig = scandir($originalsFolder);
		$imagesOrig = array();

		// scan for originals
		foreach($filesOrig as $file) {
			if(fnmatch('*.jpg',$file) || fnmatch('*.png',$file)) {
				array_push($imagesOrig, $file);
			}
		}

		// resize and save
		for($i = 0; $i < count($imagesOrig); $i++)
		{
			$this->simpleimage->load($originalsFolder.$imagesOrig[$i]);

			$ratio = $this->simpleimage->height / $this->simpleimage->width;
			$photoId = $this->photos_model->createPhotoInAlbum($albumId, $ratio);

			$this->createScaledImage($photosFolder, $photoId, 2000);
			$this->createScaledImage($photosFolder, $photoId, 1000);
			$this->createScaledImage($photosFolder, $photoId, 500);
			$this->createScaledImage($photosFolder, $photoId, 300);
			// $this->simpleimage->destroy();
		}
	}

	public function createScaledImage($folder, $photoId, $maxSide)
	{
		$si = $this->simpleimage;
		$si->best_fit($maxSide, $maxSide);
		$imgPath = $folder.$maxSide."/".$photoId.".jpg";
		$si->save($imgPath);
	}
}