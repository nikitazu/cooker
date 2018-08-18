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
mkdir img
mkdir img/seed
put img/seed/Bakeberry.m.png
put img/seed/Cronerice.m.png
put img/seed/Everdaisy.m.png
put img/seed/Ichorpuff.m.png
put img/seed/Queenbeet.m.png
put img/seed/Whiskerbloom.m.png
put img/seed/Baker's_wheat.m.png
put img/seed/Crumbspore.m.png
put img/seed/Fool's_bolete.m.png
put img/seed/Juicy_queenbeet.m.png
put img/seed/Shimmerlily.m.png
put img/seed/White_Chocoroot.m.png
put img/seed/Brown_mold.m.png
put img/seed/Doughshroom.m.png
put img/seed/Gildmillet.m.png
put img/seed/Keenmoss.m.png
put img/seed/Shriekbulb.m.png
put img/seed/White_mildew.m.png
put img/seed/Cheapcap.m.png
put img/seed/Drowsyfern.m.png
put img/seed/Glovemorel.m.png
put img/seed/Meddleweed.m.png
put img/seed/Thumbcorn.m.png
put img/seed/Wrinklegill.m.png
put img/seed/Chimerose.m.png
put img/seed/Duketater.m.png
put img/seed/Golden_clover.m.png
put img/seed/Nursetulip.m.png
put img/seed/Tidygrass.m.png
put img/seed/Chocoroot.m.png
put img/seed/Elderwort.m.png
put img/seed/Green_rot.m.png
put img/seed/Ordinary_Clover.m.png
put img/seed/Wardlichen.m.png
quit
EOF

exit 0

