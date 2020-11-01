docker login docker.io
docker buildx build --platform linux/amd64,linux/arm64 -t heikkis/zyxelmodemrestart:latest --push .