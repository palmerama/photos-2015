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


	/*
		MAIN ALBUM VIEW
	*/
	public function menu($title, $admin = null)
	{
		$album = $this->generateAlbum($title);

		$this->load->view('includes/header');

		$this->load->view('album', array(
				'rows' => $album['rows'],
				'title' => $title,
				'admin' => $admin
		));

		$this->load->view('includes/footer');
	}


	/*
		INDIVIDUAL PHOTO VIEW
	*/
	public function photo($title, $photoId)
	{
		$album = $this->generateAlbum($title);
		$position = $this->getPositionInPhotoList($photoId);

		$this->load->view('includes/header');

		$this->load->view('photo', array(
				'album' => $album['rows'],
				'title' => $title,
				'photoId' => $photoId,
				'count' => $album['count'],
				'position' => $position
		));

		$this->load->view('includes/footer');
	}

	public function generateAlbum($title)
	{
		$photos = $this->photos_model->getAlbumPhotos($title);

		$rows = array();
		$row = array();
		$rowCounter = 0;

		foreach($photos as $photo)
		{
			array_push($row, $photo);
			$rowCounter++;

			if ($rowCounter == 2 || $photo->full_width == 1)
			{
				// bank row
				array_push($rows, $row);

				// start next row
				$row = array();
				$rowCounter = 0;
			}
		}

		return array(
			'rows' => $rows,
			'count' => count($photos)
		);
	}

	public function reOrderAlbum($title)
	{
		$this->photos_model->reOrderAlbum($title);
	}

	public function getPositionInPhotoList()
	{
		// hmmm
	}
}