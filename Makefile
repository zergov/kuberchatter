TAG 	:= $$(git log -1 --pretty=%h)
WEB_NAME := zergov/kuberchatter-web
API_NAME := zergov/kuberchatter-api
CHAT_NAME := zergov/kuberchatter-chat

build:
	build-web
	build-api
	build-chat

build-web:
	docker build -t ${WEB_NAME}:${TAG} ./frontend
	docker tag ${WEB_NAME}:${TAG} ${WEB_NAME}:latest

build-api:
	docker build -t ${API_NAME}:${TAG} ./backend
	docker tag ${API_NAME}:${TAG} ${API_NAME}:latest

build-chat:
	docker build -t ${CHAT_NAME}:${TAG} ./chat-service
	docker tag ${CHAT_NAME}:${TAG} ${CHAT_NAME}:latest

.PHONY: deploy
deploy:
	kubectl apply -f application-manifests/kuberchatter-api.yml
	kubectl apply -f application-manifests/kuberchatter-chat.yml
	kubectl apply -f application-manifests/kuberchatter-web.yml
	kubectl apply -f application-manifests/loadbalancer-ingress.yml
	kubectl apply -f application-manifests/rabbitmq.yml

