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
		$q1 = $this->db->get_where('album_photos', array('album_id' => $album[0]->id, "full_width" => 0));
		$pool = $q1->result();

		// get full width
		$this->db->join('photos', 'photos.id = photo_id');
		$q2 = $this->db->get_where('album_photos', array('album_id' => $album[0]->id, "full_width" => 1));
		$fullWidth = $q2->result();

		// mix up
		shuffle($pool);
		shuffle($fullWidth);

		// return
		return array(
			"pool" => $pool,
			"fullWidth" => $fullWidth
		);
	}
}
