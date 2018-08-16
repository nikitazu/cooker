#!/bin/sh

# This file is part of Cooker.
#
# Cooker is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# Cooker is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with Cooker.  If not, see <https://www.gnu.org/licenses/>.


# Deployment script
# -----------------
#
# Uploads site data to hosting via ftp client.
#


# Read deploy environment variables.
#
. ./deploy.env.sh


# Upload site data
#
ftp -v -n $COOKER_HOST <<EOF
quote USER $COOKER_USER
quote PASS $COOKER_PASS
cd $COOKER_PATH
put index.html
mkdir dist
put dist/bundle.js
quit
EOF

exit 0

