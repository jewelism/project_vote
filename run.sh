#!/bin/bash
echo 1.client 2.admin 3.status
read selectedNum

Message="all good"
case $selectedNum in
1)
  dev="client"
  ;;
2)
  dev="admin"
  ;;
3)
  dev="status"
  ;;
*)
  Message="wrong input"
  ;;
esac

echo $Message
echo "service=${dev}" > ./.env

eval "npm start"