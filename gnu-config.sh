#!/bin/bash

INITD='/etc/init.d/pad'
APP_PATH_DIR="`pwd`"
APP_PATH_VAR="`pwd`/desktop.js"
NODE_APP="`which node`"

echo "#!/bin/bash" > $INITD
echo "# /etc/init.d/pad" >> $INITD
echo "# Apicación PAD" >> $INITD

echo "APP_PATH=$APP_PATH_VAR" >> $INITD

echo "case \$1 in" >> $INITD
echo "  start)" >> $INITD
echo "    echo -n \$\"Starting pad: \"" >> $INITD
echo "    exec 2>&1 $NODE_APP $APP_PATH_VAR >> $APP_PATH_DIR/app.log &"  >> $INITD
echo "    echo \" [ OK ]\"" >> $INITD
echo "  ;;" >> $INITD
echo "  stop)" >> $INITD
echo "    echo -n \$\"Stoping pad: \"" >> $INITD
echo "    pkill -f 'node $APP_PATH_VAR'"  >> $INITD
echo "    echo \" [ OK ]\"" >> $INITD
echo "  ;;" >> $INITD

echo "esac" >> $INITD
echo "exit 0" >> $INITD

chmod a+x $INITD

update-rc.d pad defaults

echo "Servicio PAD Instalado"
