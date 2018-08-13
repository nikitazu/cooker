#!/bin/sh

# Deployment script.
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
put js/Controller.js
put js/DataStore.js
put js/Domain.js
put js/Logger.js
put js/Main.js
put js/UI.js
put js/View.js
quit
EOF

exit 0
