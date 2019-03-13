# Kuberchatter
A chat application featuring microservices on a kubernetes cluster.
The application consist of:
  - frontend
  - backend: producer of messages distributed to the chat server via rabbitmq
  - chat server: websocket server consuming messages from rabbitmq

Application is running on Google K8s engine at: https://35.188.32.24/

# Running locally
- Install Minikube.
- Install Helm.
- Install `nginx-ingress`
  ```
  $ helm install stable/nginx-ingress
  ```
- start everything:
  ```
  $ make deploy
  ```
- Launch the app
  ```
  $ open http://$(minikube ip)
  ```
