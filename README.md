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
