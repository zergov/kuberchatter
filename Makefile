all:
	docker run -p 80:80 -d kuberchatter-web
	docker run -p 5000:5000 -d kuberchatter-api

build:
	docker build -t kuberchatter-web ./frontend
	docker build -t kuberchatter-api ./backend
