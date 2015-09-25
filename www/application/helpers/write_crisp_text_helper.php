<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if (!function_exists('imagettftextblur'))
{
	function imagettftextblur(&$image,$size,$angle,$x,$y,$color,$fontfile,$text,$blur_intensity = null)
	{
		$blur_intensity = !is_null($blur_intensity) && is_numeric($blur_intensity) ? (int)$blur_intensity : 0;
		if ($blur_intensity > 0)
		{
			$text_shadow_image = imagecreatetruecolor(imagesx($image),imagesy($image));
			imagefill($text_shadow_image,0,0,imagecolorallocate($text_shadow_image,0x00,0x00,0x00));
			imagettftext($text_shadow_image,$size,$angle,$x,$y,imagecolorallocate($text_shadow_image,0xFF,0xFF,0xFF),$fontfile,$text);
			for ($blur = 1;$blur <= $blur_intensity;$blur++)
				imagefilter($text_shadow_image,IMG_FILTER_GAUSSIAN_BLUR);
			for ($x_offset = 0;$x_offset < imagesx($text_shadow_image);$x_offset++)
			{
				for ($y_offset = 0;$y_offset < imagesy($text_shadow_image);$y_offset++)
				{
					$visibility = (imagecolorat($text_shadow_image,$x_offset,$y_offset) & 0xFF) / 255;
					if ($visibility > 0)
						imagesetpixel($image,$x_offset,$y_offset,imagecolorallocatealpha($image,($color >> 16) & 0xFF,($color >> 8) & 0xFF,$color & 0xFF,(1 - $visibility) * 127));
				}
			}
			imagedestroy($text_shadow_image);
		}
		else
			return imagettftext($image,$size,$angle,$x,$y,$color,$fontfile,$text);
	}
}

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
		$temp = imagecreatetruecolor(2500, 200);
		imagesavealpha($temp, true);
		imagefill($temp, 0, 0, imagecolorallocatealpha($temp, 255,255,255,127));
		imagealphablending($temp,true);

		$tx = 0;
		$ty = $size*2;
		$xPadding = 10;
		$yPadding = 15;

		imagealphablending($temp, true);
		$bounds = imagettfbbox ( $size*2, 0, $font, $text );

		// draw text
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