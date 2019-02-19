# Kuberchatter
A chat application featuring microservices on a kubernetes cluster.
The application consist of:
  - frontend
  - backend: producer of messages distributed to the chat server via rabbitmq
  - chat server: websocket server consuming messages from rabbitmq

Application is running on Google K8s engine at: https://35.188.32.24/
