<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class album extends CI_Controller
{
	var $photos;
	var $album;
	var $fullWidthCounter;

	public function __construct()
	{
		parent::__construct();
		$this->load->model('photos_model');
	}

	public function index($title)
	{
		$album = $this->generateAlbum($title);

		$this->load->view('includes/header');
		$this->load->view('album', array('album' => $this->album));
		$this->load->view('includes/footer');
	}

	public function generateAlbum($title)
	{
		$this->photos = $this->photos_model->getAlbumPhotos($title);
		$this->album = array();

		$row = array();
		$rowCounter = 0;

		$this->fullWidthCounter = 0;
		//$this->checkFullWidthPhoto();

		foreach($this->photos['pool'] as $photo)
		{
			array_push($row, $photo);
			$rowCounter++;

			// if ($rowCounter == 3 || $rowCounter == 2 && lcg_value() > .85)
			if ($rowCounter == 2)
			{
				// bank row
				array_push($this->album, $row);

				// start next row
				$rowCounter = 0;
				$row = array();

				// add full width one?
				$this->checkFullWidthPhoto();
			}
		}

		while ($this->fullWidthCounter < count($this->photos['fullWidth']))
		{
			$this->addFullWidthPhoto();
		}


		/*
		echo '<pre>';
		print_r($this->album);
		echo '</pre>';
		die();
		*/
	}

	public function checkFullWidthPhoto()
	{
		if ($this->fullWidthCounter < count($this->photos['fullWidth']) && lcg_value() > .5) $this->addFullWidthPhoto();
	}

	public function addFullWidthPhoto()
	{
		array_push($this->album, array($this->photos['fullWidth'][$this->fullWidthCounter]));
		$this->fullWidthCounter++;
	}
}