all:
	docker run -p 80:80 kuberchatter-web

build:
	docker build -t kuberchatter-web ./frontend
