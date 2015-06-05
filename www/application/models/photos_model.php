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
			$q = $this->db->get_where('album_photos', array('album_id' => $album->id));
			$r = $q->result();
			$total = count($r);

			array_push($albumsList, array(
				'id' => $album->id,
				'title' => $album->title,
				'cover_id' => $album->cover_id,
				'count' => $total
			));
		}

		return $albumsList;
	}
}
