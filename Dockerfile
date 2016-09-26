FROM nginx
ADD ./nginx /etc/nginx
COPY ./dist /usr/src/app
