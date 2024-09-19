# For frontend
all:
	@cd frontend && npm install && cd .. && docker-compose up --build
