# Kuberchatter
A chat application featuring microservices managed with kubernetes.
The application consist of:
  - frontend
  - backend: producer of messages distributed to the chat server via rabbitmq
  - chat server: websocket server consuming messages form a rabbitmq queue

Application is running at: https://35.188.32.24/
