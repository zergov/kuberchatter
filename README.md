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
  `$ helm install stable/nginx-ingress`
- start everything:
  ```
  $ kubectl apply -f application-manifests/kuberchatter-api.yml
  $ kubectl apply -f application-manifests/kuberchatter-chat.yml
  $ kubectl apply -f application-manifests/kuberchatter-web.yml
  $ kubectl apply -f application-manifests/loadbalancer-ingress.yml
  $ kubectl apply -f application-manifests/rabbitmq.yml
  ```
- Launch the app
  ```
  $ open http://$(minikube ip)
  ```
