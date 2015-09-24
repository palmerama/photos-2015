<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class photo_maker extends CI_Controller
{
	public function __construct()
	{
		parent::__construct();

		$this->CI = &get_instance();
		$this->CI->load->helper('write_crisp_text');
		$this->load->model('photos_model');
	}

	public function getPhoto($photoId, $size, $uuid)
	{
		ini_set('memory_limit', '512M');

		$imgPath = "assets/img/photos/".$size."/".$photoId.".jpg";

//		echo "<pre>";
//		var_dump($imgPath);
//		echo "</pre>";

		if ( !file_exists($imgPath) )
		{
			// draw photo into img
			$photo = imagecreatefromjpeg("assets/img/photos/4000/".$photoId.".jpg");

//			echo "<pre>";
//			var_dump($photo);
//			echo "</pre>";

			$src_width = imagesx($photo);
			$src_height = imagesy($photo);
			$ratio = $src_height / $src_width;

//			echo "<pre>";
//			var_dump($ratio);
//			echo "</pre>";

			if ($src_width > $src_height)
			{
				$w = $size;
				$h = floor($size*$ratio);
			}
			else {
				$h = $size;
				$w = floor($size/$ratio);
			}

//			echo "<pre>";
//			echo "width: ".$w.", height:".$h;
//			echo "</pre>";

			$img = imagecreatetruecolor($w, $h);
			imagecopyresampled($img, $photo, 0, 0, 0, 0, $w, $h, $src_width, $src_height);

			imagejpeg($img, $imgPath, 85);
		}

		$json = json_encode(array(
				'id' => $photoId,
				'uuid' => $uuid,
				'url' => base_url($imgPath),
		));

		header('Content-Type: application/json');
		echo $json;
	}

	public function test($photoId)
	{
		$imgUrl = $this->share($photoId);
		$this->load->view('photo_maker', array("imgUrl"=>$imgUrl));
	}
}