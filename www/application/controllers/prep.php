<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class prep extends CI_Controller
{
	var $photosFolder;
	var $original;
	var $ratio;
	var $photoId;
	var $config;


	public function __construct()
	{
		parent::__construct();
		$this->load->model('photos_model');

		if (ENVIRONMENT == "production") die();
	}

	public function createAlbumFromFolder($title)
	{
		ini_set('max_execution_time', 0);
		ini_set('memory_limit', '512M');
		// echo memory_get_usage();

		$albumId = $this->photos_model->createAlbum($title);
		$this->createImages($title, $albumId);
	}

	public function createImages($title, $albumId)
	{
		echo "<pre>";

		$originalsFolder = "originals/".$title."/";
		$this->photosFolder = "assets/img/photos/";

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
			$this->original = $originalsFolder.$imagesOrig[$i];

			// get ratio
			list($imgW, $imgH) = getimagesize($this->original);
			$this->ratio = $imgH / $imgW;

			// get id from db
			$this->photoId = $this->photos_model->createPhotoInAlbum($albumId, $this->ratio);

			echo "\n\nid: ".$this->photoId." file: ".$this->original;

			$this->createScaledImage(4000);
			$this->createScaledImage(3000);
			$this->createScaledImage(2000);
			$this->createScaledImage(1000);
			$this->createScaledImage(500);
			$this->createScaledImage(300);
		}

		echo "</pre>";
	}

	public function createScaledImage($edgeLength)
	{
		ini_set('memory_limit', '512M');

		$config = array(
			'image_library' => 'gd2',
			'source_image' => $this->original,
			'new_image'	=> $this->photosFolder.$edgeLength.'/'.$this->photoId.'.jpg',
			'maintain_ratio' => TRUE,
			'width' => $edgeLength,
			'height' => $edgeLength
		);

		echo "\n\tresizing to ".$edgeLength."...";

		$this->load->library('image_lib');
		$this->image_lib->initialize($config);

		if ( ! $this->image_lib->resize()) echo $this->image_lib->display_errors();
		else echo "\tsuccess!";

		$this->image_lib->clear();
		$config = null;
	}

	public function createShareImages()
	{

	}

}