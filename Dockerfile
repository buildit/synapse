FROM nginx
RUN rm /etc/nginx/sites-enabled/default
ADD ./nginx /etc/nginx
COPY ./dist /usr/src/app
