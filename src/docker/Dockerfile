###
# build image
###
FROM oauth2-proxy/oauth2-proxy:latest AS intraweb

ENV TZ=Etc/UTC
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
