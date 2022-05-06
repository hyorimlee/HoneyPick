#!/bin/bash
## tag version ++
IMG_NAME=`sed -n -e "7p" ./docker-compose.yml`
TAG_EX_VERSION=`echo ${IMG_NAME} | cut -d '.' -f2`
TAG_NEW_VERSION=`expr "$TAG_EX_VERSION" "+" "1"`
echo ${TAG_EX_VERSION}
sed -i "7s/$TAG_EX_VERSION/$TAG_NEW_VERSION/g" docker-compose.yml
sed -i "15s/$TAG_EX_VERSION/$TAG_NEW_VERSION/g" docker-compose.yml

##docker-comopse push
sudo docker-compose pull
sudo docker-compose up -d

sudo docker ps