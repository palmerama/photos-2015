<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Data extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see http://codeigniter.com/user_guide/general/urls.html
	 */
	public function __construct()
	{
		parent::__construct();
	}

	public function submit()
	{
		$data = json_decode($this->input->post('data'));
		$this->db->insert('session_details', $data->details);
		$insert_id = $this->db->insert_id();

		foreach($data->answers as $answer)
		{
			$this->db->insert('session_answers', array(
				"session_details_id"=>$insert_id,
				"qid"=>$answer->qid,
				"answer"=>$answer->answer
			));
		}

		echo $insert_id;
	}

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */