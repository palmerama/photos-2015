<?php

/**
 * Loop through array and echo JS imports
 *
 * @param $list
 * @param $suffix
 */
function importJS($list, $suffix) {

	foreach($list as $script) {
		$url = base_url('assets/js/'.$script.$suffix);

		echo "<script src='".$url."'></script>\n";
	}
}

?>