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
		$cover_id = $this->photos_model->getAlbumCoverIdFromTitle($title);

		$this->load->view('includes/header', array(
				'admin' => $admin,
				'unused' => $album['unused'],
				'title' => $title,
				'og_title' => 'Adam Palmer : '.ucfirst($title).' album',
				'og_url' => base_url('album/'.$title),
				'og_image' => base_url('assets/img/photos/share/'.$cover_id.'.jpg')
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
		$details = $this->photoGetPrevNext($title, $photoId);

		$this->load->view('includes/header', array(
				'title' => $title,
				'screen' => 'photo',
				'og_title' => 'Adam Palmer : '.ucfirst($title).' album ('.($details['photo']->position + 1).'/'.$details['album']['count'].')',
				'og_url' => base_url('photo/'.$title.'/'.$photoId),
				'og_image' => base_url('assets/img/photos/share/'.$photoId.'.jpg')
		));

		$this->load->view('photo', array(
				'title' => $title,
				'photo' => $details['photo'],
				'count' => $details['album']['count'],
				'previous' => $details['previous'],
				'next' => $details['next']
		));

		$this->load->view('includes/footer');
	}

	public function getPhotoDetails($title, $photoId)
	{
		$details = $this->photoGetPrevNext($title, $photoId);
		$json = json_encode(array(
			'photo' => $details['photo'],
			'previous' => $details['previous'],
			'next' => $details['next'],
			'count' => $details['album']['count']
		));

		header('Content-Type: application/json');
		echo $json;
	}

	public function photoGetPrevNext($title, $photoId)
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

		return array(
			'album' => $album,
			'photo' => $photo,
			'previous' => $previous,
			'next' => $next
		);
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