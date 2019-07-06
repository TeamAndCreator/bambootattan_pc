if docker ps -a | grep bambootattan_pc
then
	docker rm -f bambootattan_pc
fi
if docker images | grep zhaoliu09/bambootattan_pc
then
	docker rmi -f zhaoliu09/bambootattan_pc
fi
docker build -t zhaoliu09/bambootattan_pc .
docker run --name bambootattan_pc -p 80:8080 -e JAVA_OPTS=-Duser.timezone=Asia/Shanghai --restart always -d zhaoliu09/bambootattan_pc
docker login --username=zhaoliu09 --password=Zhaoliu09
docker push zhaoliu09/bambootattan_pc
