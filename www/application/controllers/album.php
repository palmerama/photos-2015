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

		$this->load->view('includes/header', array(
				'admin' => $admin,
				'unused' => $album['unused'],
				'title' => $title
		));

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
		$photo = $this->photos_model->getPhotoById($photoId);

		$next = null;
		$previous = null;

		// get next & previous
		foreach($album['photos'] as $albumPhoto)
		{
			if ($albumPhoto->position == $photo->position-1) $previous = $albumPhoto;
			else if ($albumPhoto->position == $photo->position+1) $next = $albumPhoto;
		}

		$this->load->view('includes/header', array('title' => $title));

		$this->load->view('photo', array(
				'title' => $title,
				'photo' => $photo,
				'count' => $album['count'],
				'previous' => $previous,
				'next' => $next
		));

		$this->load->view('includes/footer');
	}

	public function generateAlbum($title)
	{
		$photos = $this->photos_model->getAlbumPhotos($title);
		$unusedPhotos = $this->photos_model->getAlbumPhotos($title, 0);

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
			'count' => count($photos),
			'unused' => $unusedPhotos,
			'photos' => $photos
		);
	}

	public function getPositionInPhotoList()
	{
		// hmmm
	}
}