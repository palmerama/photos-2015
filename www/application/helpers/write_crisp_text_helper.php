<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if ( ! function_exists('write_crisp_text'))
{
	/**
	 * Crisp Text PHP
	 * @param $targ
	 * @param $size
	 * @param $x
	 * @param $y
	 * @param $angle
	 * @param $color
	 * @param $font
	 * @param $text
	 */
	function write_crisp_text($targ, $size, $x, $y, $angle, $color, $font, $text, $centreBounds = null)
	{
		$temp = imagecreatetruecolor(1024, 200);
		imagesavealpha($temp, true);
		imagefill($temp, 0, 0, imagecolorallocatealpha($temp, 255,255,255,127));
		imagealphablending($temp,true);

		$tx = 0;
		$ty = $size*2;
		$xPadding = 10;
		$yPadding = 15;

		imagealphablending($temp, true);
		$bounds = imagettfbbox ( $size*2, 0, $font, $text );
		imagettftext($temp, $size*2, 0, $tx, $ty, $color, $font, $text);

		$tWidth = $bounds[4]+$xPadding;
		$tHeight = -$bounds[5]+$yPadding;

		$crop = imagecreatetruecolor($tWidth, $tHeight);
		imagesavealpha($crop, true);
		imagefill($crop, 0, 0, imagecolorallocatealpha($crop, 255,255,255,127));
		imagealphablending($crop,true);
		imagecopyresampled($crop, $temp, 0, 0, 0, 0, $tWidth, $tHeight, $tWidth, $tHeight);
		$rotated = imagerotate($crop, $angle, imagecolorallocatealpha($temp, 255,255,255,127));

		$rW = imagesx($rotated);
		$rH = imagesy($rotated);

		if(!($angle == 0 || $angle == 180)) $y+=$size;

		$offsetX = $x;
		$offsetY = $y;

		if($centreBounds != null) {
			$offsetX = $centreBounds['centerX'] - ($rW/4);
			$offsetY = $centreBounds['centerY'] - ($rH/4);
			//$offsetX = (-($rW/4))+($xPadding/2);
		}

		imagecopyresampled($targ, $rotated, $offsetX, $offsetY, 0, 0, $rW/2, $rH/2, $rW, $rH);

		return $bounds;
	}
}