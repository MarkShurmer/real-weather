# nginx state for serving content
FROM nginx:alpine
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx

RUN rm /etc/nginx/conf.d/default.conf

# Copy static assets from builder stage
COPY *.conf /etc/nginx/conf.d
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]