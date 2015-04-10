#!/bin/bash
source env.sh
cd ${SERVER_BASE}
mongod &
echo $! > ${PID_DIR}/mongo.pid

node app.js &
echo $! > ${PID_DIR}/node.pid
