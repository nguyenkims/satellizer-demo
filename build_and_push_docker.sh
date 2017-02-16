echo "build docker nguyenkims/satellizer-demo with tag $(git rev-parse HEAD) ..."
docker build -t "nguyenkims/satellizer-demo:$(git rev-parse HEAD)" .
docker push nguyenkims/satellizer-demo
