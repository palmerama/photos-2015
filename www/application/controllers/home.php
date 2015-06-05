<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class home extends CI_Controller
{
	public function __construct()
	{
		parent::__construct();
		$this->load->model('photos_model');
	}

	public function index()
	{
		$albumsList = $this->photos_model->getAlbumsList();

		$this->load->view('includes/header');
		$this->load->view('home', array('albumsList' => $albumsList));
		$this->load->view('includes/footer');
	}
}