FROM nginx
RUN rm /etc/nginx/sites-enabled
ADD ./nginx /etc/nginx
COPY ./dist /usr/src/app
