FROM  tomcat
MAINTAINER liulianjushi@126.com
ENV CATALINA_HOME /usr/local/tomcat
RUN mkdir /root/bambootattan_pc
ADD  ./ /root/bambootattan_pc
ADD ./server.xml $CATALINA_HOME/conf/server.xml
RUN rm /root/bambootattan_pc/server.xml
WORKDIR $CATALINA_HOME
EXPOSE 8080
CMD ["catalina.sh", "run"]
