image_name="nguyenkims/satellizer-demo:$(git rev-parse HEAD)"
echo "going to pull image $image_name"

docker pull $image_name
# ignore if container doesn't exist
docker rm -f satellizer-demo || true
docker run -p 5002:5002 -d --restart=always --name satellizer-demo $image_name