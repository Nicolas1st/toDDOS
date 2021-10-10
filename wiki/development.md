# Разработка

## Сборка для разработки

Чтобы пересобрать контейнер и запустить dev сервер приложения нужно выполнить команду:

```bash
docker-compose up --build <имя приложения>.dev
```

> Не используйте docker-compose up без указания сервиса, тк в конфиге есть дублирующиеся сервисы для одного приложения.

## Работа в контейнере

Если нужно запустить npm скрипт или выполнить любую консольную команду, затрагивающую приложение, это нужно сделать внутри контейнера. Это позволит избежать проблем с расхождением окружения.  

Войти в контейнер можно с помощью команды:

```bash
# Если контейнер не запущен
docker-compose run <имя приложения>.dev bash
# Если контейнер запущен
docker-compose exec <имя приложения>.dev bash
```

## Сборка подакшен версии

Иногда нужно локально протестировать продакшен сборку, сервер, да и в целом как будет работать полностью собранный контейнер.  

Это можно сделать следующей командой:

```bash
docker-compose up <имя приложения>.prod
```

## Список сервисов

Все приложения перечислены в разделе ["приложения"](./projects/index.md), где также можно ознакомиться с информацией, специфичной для каждого из них. Здесь же я перечислю сервисы, которые есть для этих приложений:

- **frontend.dev** - Dev сервер промки
- **frontend.prod** - Production-like сервер промки

## Настройка удобного окружения для разработки

Этот раздел можно пропустить, если нужно просто запустить проект, чтобы что-то протестить или сделать мелкую правку. Но если вы здесь надолго, то обязательно к прочтению!

### Настройка IDE

Если вы используете `vscode`, то у репозитория есть рекомендованные расширения, их желательно установить.

Но независимо от IDE, что вы собираетесь использовать, некоторые расширения и встроенный функционал IDE требуют наличия зависимостей в `node_modules` на локальной машине, а у нас они находятся в контейнере.  

Установить зависимости локально можно с помощью команды:

```bash
make <имя приложения>.deps
```

Из-за различий в системе они могут немного отличаться от того, что в контейнере, но тк они будут использоваться только для расширений IDE, это не большая проблема. _Конечно, если вы запускаете команды в контейнере (См. Работа в контейнере)_.

## Далее

- [Приложения](./projects/index.md)