FROM oraclelinux:7-slim

RUN  yum -y install oracle-release-el7 oracle-nodejs-release-el7 && \
     yum-config-manager --disable ol7_developer_EPEL && \
     yum -y install oracle-instantclient19.3-basiclite  nodejs && \
     yum -y install bash netstat && \
     rm -rf /var/cache/yum

ENV ORACLE_HOME=/usr/lib/oracle/19.3/client64
ENV LD_LIBRARY_PATH=/usr/lib/oracle/19.3/client64/lib
ENV TNS_ADMIN=/wallet
RUN mkdir -p /app
RUN mkdir -p /app/dist
RUN chmod -R 777 /app/dist
WORKDIR /app
COPY . /app

