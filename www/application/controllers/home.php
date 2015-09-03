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

		$this->load->view('includes/header', array(
				'og_title' => 'Adam Palmer : Some Photos I Took',
				'og_url' => base_url(),
				'og_image' => base_url('assets/img/photos/share/default.jpg')
		));

		$this->load->view('home', array('albumsList' => $albumsList));
		$this->load->view('includes/footer');
	}
}