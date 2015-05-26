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
}
