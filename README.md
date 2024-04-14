### Crab 2.0
#### Запуск

```sh
$ docker compose up --build
```
#### Запуск подсервисов(фронт, бек по отдельности)
##### Запустить фронт
```sh
$ docker compose -f compose.front.dev.yml up --build
```
##### Запустить бек
```sh
$ docker compose -f compose.back.dev.yml up --build
```

##### Поднять только БД (для запуска бека локально)
```sh
$ docker compose -f compose.back.postgresql-only.yml up --build
```
Для запуска бека локально также нужно указать следующие параметры VM:
* -DDB_HOST=localhost
* -DDB_PORT=5434
