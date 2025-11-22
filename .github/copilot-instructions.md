<!-- Copilot / AI instructions for contributors and automated agents -->
# Быстрое руководство для AI-ассистентов

Ниже — краткие, практические инструкции, которые помогают понять архитектуру проекта, команды запуска и проектные соглашения. Сосредоточьтесь на файлах и паттернах, перечисленных здесь — они покрывают почти все интеграции и рабочие потоки.

- Основной фреймворк: FastAPI. Асинхронных фоновых воркеров нет — синхронный SQLModel/SQLAlchemy для работы с БД.
- ORM / типы: SQLModel (модели лежат в `app/models/`), база — PostgreSQL (строка подключения в `app/database/database.py`).

## Коротко о структуре

- `app/main.py` — точка сборки приложения: FastAPI-инстанс, регистрация роутеров (`api.endpoints.all_routers`) и startup-хук `create_db_and_tables()`.
- `app/api/endpoints/` — REST-роутеры. Каждый файл вроде `clients_endpoints.py` экспортирует `router = APIRouter(prefix=..., tags=[...])` и типичный CRUD-эндпоинт. Список всех роутеров собирается в `app/api/endpoints/__init__.py` в переменной `all_routers`.
- `app/crud/` — модульная бизнес-логика доступа к БД (файлы `*_crud.py`). Эндпоинты импортируют их напрямую как `import crud.client_crud as client_crud`.
- `app/database/database.py` — engine, `get_db()` (синхронный Session yield) и `create_db_and_tables()`; здесь — строка подключения `SQLALCHEMY_DATABASE_URL`.
- `app/models/` — SQLModel-модели (Client, Deal и т.д.). Ответы эндпоинтов часто возвращают `response_model=...` на основе этих моделей.
- `migrations/` и `alembic.ini` — миграции Alembic. Проект поддерживает миграции (используйте Alembic из корня репо).

## Как запускать локально (PowerShell)

- Запустить dev-сервер (рекомендуется из корня репо):

  uvicorn app.main:app --reload

- При старте приложение вызывает `create_db_and_tables()` (в `app/database/database.py`) — это создаёт таблицы по моделям, если их ещё нет.
- Убедитесь, что PostgreSQL доступен и `SQLALCHEMY_DATABASE_URL` в `app/database/database.py` корректен. По умолчанию:

  `postgresql://postgres:igkirill23@localhost:5432/estate_agency`

  (Из соображений безопасности обычно замените на переменные окружения; в текущей кодовой базе строка прописана прямо в файле.)

## Типичные кодовые паттерны (конкретные примеры)

- Роутер + зависимость на сессию:

  `@router.post('/', response_model=Client)` — эндпоинт вызывает `db = Depends(get_db)` и далее функции из `crud/*.py`.

- CRUD-файлы возвращают модель или None. Эндпоинты проверяют `if db_client is None: raise HTTPException(404, ...)`.

- Сбор роутеров: `app/api/endpoints/__init__.py` формирует `all_routers` — регистрируйте новые роутеры туда, чтобы `app/main.py` их автоматически подключил.

## Миграции и БД

- Для миграций используйте Alembic из корня репозитория (есть `alembic.ini` и каталог `migrations/`). Примеры команд (PowerShell):

  alembic revision --autogenerate -m "msg"
  alembic upgrade head

  (Проверьте `alembic.ini` и `env.py` в `migrations/` при первом запуске; строка подключения сейчас хранится в `app/database/database.py` — при необходимости синхронизируйте конфиг.)

## Что важно для AI-ассистента (конкретные рекомендации)

1. Изменения в моделях обычно требуют миграций — не меняйте `app/models/*` без создания Alembic revision.
2. Добавляя новые API-эндпоинты, добавляйте `router` в `app/api/endpoints/__init__.py` (в `all_routers`) — это гарантирует автоподключение.
3. Для доступа к БД используйте `get_db()` из `app/database/database.py` и функции в `app/crud/*_crud.py` — следуйте существующим именованиям и сигнатурам.
4. Следуйте существующему стилю валидации: проверка уникальности (email/phone) выполняется в эндпоинтах до вызова create.

## Быстрые ссылки (файлы для обзора при изменениях)

- Точка входа: `app/main.py`
- Роутеры: `app/api/endpoints/*.py` и `app/api/endpoints/__init__.py`
- CRUD-слой: `app/crud/*.py`
- Модели: `app/models/*.py`
- DB + engine: `app/database/database.py`
- Миграции: `migrations/`, `alembic.ini`

Если какая-то секция неясна или нужно больше примеров (например, конкретный CRUD-файл или миграция), напишите, какие куски кода вы хотите, и я автоматически обновлю инструкции.

-- Конец инструкции
