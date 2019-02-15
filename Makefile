all:
	docker run -p 80:80 -d kuberchatter-web
	docker run -p 5000:5000 -d kuberchatter-api
	docker run -p 8080:8080 -d kuberchatter-chat

build:
	docker build -t kuberchatter-web ./frontend
	docker build -t kuberchatter-api ./backend
	docker build -t kuberchatter-chat ./chat-service
