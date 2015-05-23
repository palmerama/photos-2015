#!/bin/bash
cd grunt
echo ""
echo ""
echo ""
echo ""
echo ""
echo "********************"
echo "Building..."
echo "********************"
grunt --gruntfile argos-grunt.js
grunt --gruntfile intel-video-grunt.js
grunt --gruntfile intel-personality-grunt.js
cd ..
echo ""
echo ""
echo ""
echo "********************"
echo "Done."
echo "********************"
echo ""
echo ""
echo ""
exit