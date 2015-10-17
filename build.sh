#!/bin/bash
echo ""
echo ""
echo ""
echo ""
echo ""
echo "********************"
echo "Building..."
echo "********************"
r.js -o www/assets/js/app.build.js
echo "********************"
echo "Minifying & Concatenating..."
echo "********************"
remove-console-logs www/assets/js/build.min.js
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