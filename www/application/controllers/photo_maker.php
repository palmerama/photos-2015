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

	public function share($photoId)
	{
		$imgPath = "assets/img/photos/share/".$photoId.".jpg";

		/*
		echo "<pre>";
		var_dump(!file_exists($imgPath));
		echo "</pre>";
		*/

		// if (file_exists($imgPath)) unlink($imgPath);

		if ( !file_exists($imgPath) )
		{
			$font = "fonts/clarendon_wide_bold.otf";
			$img = imagecreatetruecolor(1200, 630);

			// draw photo in BG
			$photo = imagecreatefromjpeg("assets/img/photos/2000/".$photoId.".jpg");

			$src_width = imagesx($photo);
			$src_height = imagesy($photo);
			$ratio = $src_height / $src_width;
			$height = 1200*$ratio;

			imagecopyresampled($img, $photo, 0, -$height/2 + 315, 0, 0, 1200, $height, $src_width, $src_height);

			// find average brightness around text
			$colourPixel = imagecreatetruecolor(1, 1);
			imagecopyresampled($colourPixel, $img, 0, 0, 66, 467, 1, 1, 700, 120);
			$rgb = imagecolorat($colourPixel, 0, 0);

			$r = ($rgb >> 16) & 0xFF;
			$g = ($rgb >> 8) & 0xFF;
			$b = $rgb & 0xFF;

			// Text colour - mid point = 382
			if ($r + $g + $b < 500) $textColour = 0xFFFFFF;
			else $textColour = 0x000000;

			// TEXT
			$bounds = imagettfbbox ( 42, 0, $font, "CANADA" );
			$top = 472;

			write_crisp_text($img, 42, 73, $top, 0, $textColour, $font, "CANADA");
			write_crisp_text($img, 24, 100 + $bounds[4], $top+19, 0, $textColour, $font, "(10/47)");
			write_crisp_text($img, 21, 75, $top+68, 0, $textColour, $font, "by Adam Palmer");

			imagejpeg($img, $imgPath, 90);
		}

		echo base_url($imgPath);
	}

	public function test($photoId)
	{
		$imgUrl = $this->share($photoId);
		$this->load->view('photo_maker', array("imgUrl"=>$imgUrl));
	}
}