<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class album extends CI_Controller
{
	var $photos;
	var $album;
	var $fullWidthCounter;

	public function __construct()
	{
		parent::__construct();
		$this->CI = &get_instance();
		$this->CI->load->helper('write_crisp_text');
		$this->load->model('photos_model');
	}


	/*
		MAIN ALBUM VIEW
	*/
	public function menu($title, $admin = null)
	{
		$album = $this->generateAlbum($title);
		$shareImageUrl = $this->getAlbumShareImage($title);

		if (ENVIRONMENT == "production" && $admin == "admin") die();

		$this->load->view('includes/header', array(
				'admin' => $admin,
				'unused' => $album['unused'],
				'title' => $title,
				'og_title' => 'Adam Palmer : '.ucfirst($title).' album',
				'og_url' => base_url('album/'.$title),
				'og_image' => $shareImageUrl
		));

		$this->load->view('album', array(
				'rows' => $album['rows'],
				'title' => $title,
				'admin' => $admin
		));

		$this->load->view('includes/footer');
	}


	/*
		INDIVIDUAL PHOTO VIEW
	*/
	public function photo($title, $photoId)
	{
		$details = $this->photoGetPrevNext($title, $photoId);

		//echo "<pre>";
		// var_dump($title);
		//echo "</pre>";
		//die();

		$shareImageUrl = $this->getShareImage($photoId, $title, $details['photo']->position+1, $details['album']['count']);

		$this->load->view('includes/header', array(
				'title' => $title,
				'screen' => 'photo',
				'og_title' => 'Some Photos I Took : '.ucfirst($title).' ('.($details['photo']->position + 1).'/'.$details['album']['count'].')',
				'og_url' => base_url('photo/'.$title.'/'.$photoId),
				'og_image' => $shareImageUrl
		));

		$this->load->view('photo', array(
				'title' => $title,
				'photo' => $details['photo'],
				'count' => $details['album']['count'],
				'previous' => $details['previous'],
				'next' => $details['next']
		));

		$this->load->view('includes/footer');
	}

	public function testAlbumShareImage($title)
	{
		$imgUrl = $this->getAlbumShareImage($title);
		$this->load->view('test_share', array("imgUrl"=>$imgUrl));
	}

	public function getAlbumShareImage($title)
	{
		$imgPath = "assets/img/photos/share/album/".$title.".jpg";
		$photoId = $this->photos_model->getAlbumCoverIdFromTitle($title);

		if (file_exists($imgPath)) unlink($imgPath);

		if ( !file_exists($imgPath) )
		{
			ini_set('memory_limit', '512M');

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

			// Text colour (mid point = 382)
			$whiteText = 0xfcf9e8;
			$blackText = 0x33332e;
			$white = 0xffffff;
			$black = 0x000000;

			if ($r + $g + $b < 500)
			{
				$textColour = $whiteText;
				$gradImg = imagecreatefrompng("images/share_grad_dark.png");
			}
			else {
				$textColour = $blackText;
				$gradImg = imagecreatefrompng("images/share_grad_light.png");
			}

			// draw text grad bg
			imagecopyresampled($img, $gradImg, 0, 0, 0, 0, 1200, 630, 1200, 630);

			// get text bounds
			$top = 472;
			$bounds = imagettfbbox( 42, 0, $font, strtoupper($title) );

			// draw final text
			$this->drawAlbumShareText($img, $top, $textColour, $font, $title, $bounds);

			// make final image
			imagejpeg($img, $imgPath, 90);
		}

		return base_url($imgPath);
	}

	public function testShareImage($photoId)
	{
		$imgUrl = $this->getShareImage($photoId, "CALIFORNIA", 10, 47);
		$this->load->view('test_share', array("imgUrl"=>$imgUrl));
	}

	public function getShareImage($photoId, $title, $position, $count)
	{
		$imgPath = "assets/img/photos/share/".$photoId.".jpg";

		if (file_exists($imgPath)) unlink($imgPath);

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

			// Text colour (mid point = 382)
			$whiteText = 0xfcf9e8;
			$blackText = 0x33332e;
			$white = 0xffffff;
			$black = 0x000000;

			if ($r + $g + $b < 500)
			{
				$textColour = $whiteText;
				$gradImg = imagecreatefrompng("images/share_grad_dark.png");
			}
			else {
				$textColour = $blackText;
				$gradImg = imagecreatefrompng("images/share_grad_light.png");
			}

			// draw text grad bg
			imagecopyresampled($img, $gradImg, 0, 0, 0, 0, 1200, 630, 1200, 630);

			// get text bounds
			$top = 472;
			$bounds = imagettfbbox( 42, 0, $font, strtoupper($title) );

			// draw final text
			$this->drawShareText($img, $top, $textColour, $font, $title, $bounds, $position, $count);

			// make final image
			imagejpeg($img, $imgPath, 90);
		}

		return base_url($imgPath);
	}

	private function drawShareText($img, $top, $textColour, $font, $title, $bounds, $position, $count)
	{
		write_crisp_text($img, 42, 73, $top, 0, $textColour, $font, strtoupper($title));
		write_crisp_text($img, 24, 100 + $bounds[4], $top+19, 0, $textColour, $font, "(".$position."/".$count.")");
		write_crisp_text($img, 21, 75, $top+68, 0, $textColour, $font, "A photograph by Adam Palmer");
	}

	private function drawAlbumShareText($img, $top, $textColour, $font, $title, $bounds)
	{
		write_crisp_text($img, 42, 73, $top, 0, $textColour, $font, strtoupper($title));
		write_crisp_text($img, 21, 75, $top + 68, 0, $textColour, $font, "Some Photos by Adam Palmer");
	}

	public function getPhotoDetails($title, $photoId)
	{
		$details = $this->photoGetPrevNext($title, $photoId);
		$json = json_encode(array(
			'photo' => $details['photo'],
			'previous' => $details['previous'],
			'next' => $details['next'],
			'count' => $details['album']['count']
		));

		header('Content-Type: application/json');
		echo $json;
	}

	public function photoGetPrevNext($title, $photoId)
	{
		$album = $this->generateAlbum($title);
		$photo = $this->photos_model->getPhotoById($photoId);

		$next = null;
		$previous = null;

		// get next & previous
		foreach($album['photos'] as $albumPhoto)
		{
			if ($albumPhoto->position == $photo->position-1) $previous = $albumPhoto;
			else if ($albumPhoto->position == $photo->position+1) $next = $albumPhoto;
		}

		return array(
			'album' => $album,
			'photo' => $photo,
			'previous' => $previous,
			'next' => $next
		);
	}

	public function generateAlbum($title)
	{
		$photos = $this->photos_model->getAlbumPhotos($title);
		$unusedPhotos = $this->photos_model->getAlbumPhotos($title, 0);

		$rows = array();
		$row = array();
		$rowCounter = 0;
		$photoCounter = 0;

		foreach($photos as $photo)
		{
			array_push($row, $photo);
			$rowCounter++;
			$photoCounter++;

			if ($rowCounter == 2 || $photo->full_width == 1 || $photoCounter == count($photos)) // get last straggler!
			{
				// bank row
				array_push($rows, $row);

				// start next row
				$row = array();
				$rowCounter = 0;
			}
		}

//		echo '<pre>';
//		echo "photos in db: ".count($photos)." photos in rows: ".$photoCounter;
//		var_dump($rows);
//		echo '</pre>';
//		die();


		return array(
			'rows' => $rows,
			'count' => count($photos),
			'unused' => $unusedPhotos,
			'photos' => $photos
		);
	}

	/*
	private function drawImageTransparent($srcImage, $destImage, $color)
	{
		for ($x_offset = 0;$x_offset < imagesx($srcImage);$x_offset++)
		{
			for ($y_offset = 0;$y_offset < imagesy($srcImage);$y_offset++)
			{
				$visibility = (imagecolorat($srcImage,$x_offset,$y_offset) & 0xFF) / 255;
				if ($visibility > 0)
					imagesetpixel($destImage,$x_offset,$y_offset,imagecolorallocatealpha($destImage,($color >> 16) & 0xFF,($color >> 8) & 0xFF,$color & 0xFF,(1 - $visibility) * 127));
			}
		}
	}

	private function blurImage($image, $passes)
	{
		for ($i=0; $i<$passes; ++$i)
		{
			imagefilter($image, IMG_FILTER_GAUSSIAN_BLUR);
		}
	}
	*/
}