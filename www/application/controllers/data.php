<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class data extends CI_Controller
{

	public function __construct()
	{
		parent::__construct();
		$this->load->model('photos_model');
	}

	public function setPhotosActive()
	{
		$data = $this->input->post();
		$this->photos_model->setPhotosActive($data);
	}

	public function reOrderAlbum($title, $shuffle = 1)
	{
		$this->photos_model->reOrderAlbum($title, $shuffle);
	}
}