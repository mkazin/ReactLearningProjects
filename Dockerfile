FROM busybox:latest

COPY build .

CMD ["httpd", "-f", "-v", "-p", "3000"]
EXPOSE 3000
