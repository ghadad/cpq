FROM oraclelinux:8-slim

RUN  yum update && yum -y install oracle-release-el8 oracle-nodejs-release-el8 && \
     yum-config-manager --disable ol8_developer_EPEL && \
     yum -y install oracle-instantclient19.3-basiclite nodejs && \
     rm -rf /var/cache/yum

ENV ORACLE_HOME
ENV TNS_ADMIN
ENV LD_LIBRARY_PATH 
     
WORKDIR /myapp
ADD package.json /myapp/
ADD index.js /myapp/
RUN npm install

CMD exec node index.js
