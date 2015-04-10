#!/bin/bash
source env.sh
kill `cat ${PID_DIR}/node.pid`
rm -f ${PID_DIR}/node.pid
kill `cat ${PID_DIR}/mongo.pid`
rm -f ${PID_DIR}/mongo.pid
