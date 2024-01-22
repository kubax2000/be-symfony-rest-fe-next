CONTAINER_NAME := backend

### DOCKER ###

build:
	@docker compose build

up:
	@docker compose up -d

down:
	@docker compose down

clean:
	@docker system prune --all --force

php:
	@docker exec -it $(CONTAINER_NAME) bash


### DOCTRINE ###

migration:
	@docker exec -it $(CONTAINER_NAME) php bin/console make:migration

migrate:
	@docker exec -it $(CONTAINER_NAME) php bin/console d:m:m


### ANALYSIS ###

phpstan:
	@docker exec -e APP_ENV=test -it $(CONTAINER_NAME) composer phpstan

ccs:
	@docker exec -e APP_ENV=test -it $(CONTAINER_NAME) composer ccs

fcs:
	@docker exec -e APP_ENV=test -it $(CONTAINER_NAME) composer fcs


### TESTING ###

fixtures:
	@docker exec -e APP_ENV=test -it $(CONTAINER_NAME) composer test-prepare

test:
	@docker exec -e APP_ENV=test -it $(CONTAINER_NAME) composer test-full

ci:
	@docker exec -e APP_ENV=test -it $(CONTAINER_NAME) composer ci