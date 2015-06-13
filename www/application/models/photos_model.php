<?php

class photos_model extends CI_Model
{
	function __construct()
	{
		parent::__construct();
	}

	public function createAlbum($title)
	{
		$this->db->insert('albums', array( "title" => $title ));
		return $this->db->insert_id();
	}

	public function createPhotoInAlbum($albumId, $ratio)
	{
		$this->db->insert('photos', array( "ratio" => $ratio ));
		$photoId = $this->db->insert_id();

		$this->db->insert('album_photos', array(
				"photo_id" => $photoId,
				"album_id" => $albumId,
				"full_width" => 0
		));

		return $photoId;
	}

	public function getAlbumsList()
	{
		$albumsList = array();

		$q = $this->db->get_where('albums', array('active' => 1));
		$albums = $q->result();

		foreach ($albums as $album)
		{
			// get count of photos in album
			$q = $this->db->get_where('album_photos', array('album_id' => $album->id));
			$r = $q->result();
			$total = count($r);

			// get bg photo details
			$q = $this->db->get_where('photos', array('id' => $album->cover_id));
			$bg = $q->result();

			array_push($albumsList, array(
				'id' => $album->id,
				'title' => $album->title,
				'cover_id' => $album->cover_id,
				'ratio' => $bg[0]->ratio,
				'count' => $total
			));
		}

		return $albumsList;
	}

	public function getAlbumPhotos($title)
	{
		// get id
		$q = $this->db->get_where('albums', array('title' => $title));
		$album = $q->result();

		// get photos
		$this->db->join('photos', 'photos.id = photo_id');
		$this->db->order_by('position', 'asc');
		$q = $this->db->get_where('album_photos', array('album_id' => $album[0]->id));
		$photos = $q->result();

		//echo '<pre>';
		//print_r($photos);
		//echo '<pre>';

		return $photos;
	}

	public function reOrderAlbum($title)
	{
		// get album id
		$q = $this->db->get_where('albums', array('title' => $title));
		$album = $q->result();

		// get full width photos
		$this->db->join('photos', 'photos.id = photo_id');
		$q1 = $this->db->get_where('album_photos', array('album_id' => $album[0]->id, 'full_width' => 1));
		$fullWidthPhotos = $q1->result();

		// get normal photos
		$this->db->join('photos', 'photos.id = photo_id');
		$q2 = $this->db->get_where('album_photos', array('album_id' => $album[0]->id, 'full_width' => 0));
		$normalPhotos = $q2->result();

		// randomise
		shuffle($fullWidthPhotos);
		shuffle($normalPhotos);

		// set up
		$photos = array();
		$totalPhotos = count($fullWidthPhotos) + count($normalPhotos);

		$normalCounter = 0;
		$fullCounter = 0;
		$gapCounter = 0;

		// evenly space full width photos in list
		$fullFrequency = count($normalPhotos) / count($fullWidthPhotos);
		$fullFrequency = round($fullFrequency / 1.5) * 1.5;

		echo '<pre>';
		echo 'freq: '.$fullFrequency;

		// go through photos
		while ($fullCounter + $normalCounter < $totalPhotos)
		{
			$gapCounter++;

			// add full width photo?
			if ($gapCounter >= $fullFrequency)
			{
				$gapCounter = 0;

				if ($fullCounter < count($fullWidthPhotos))
				{
					array_push($photos, $fullWidthPhotos[$fullCounter]);
					$fullCounter++;
				}
			}
			else {
				// add normal photo
				array_push($photos, $normalPhotos[$normalCounter]);
				$normalCounter++;
			}
		}

		echo("\n\n==============\n\n");
		print_r($photos);

		echo '</pre>';
		// die();


		// save positions back in order
		$position = 0;

		foreach ($photos as $photo)
		{
			$this->db->update('photos', array('position' => $position), array('id' => $photo->id));
			$position++;
		}
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
