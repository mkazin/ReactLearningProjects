# Based on "The smallest Docker image to serve static websites" by Florin Lipan
# https://lipanski.com/posts/smallest-docker-image-static-website
FROM lipanski/docker-static-website:latest

COPY build .

CMD ["busybox", "httpd", "-f", "-v", "-p", "9000"]
EXPOSE 9000
