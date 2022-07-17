# REST

REST - архитектурный стиль взаимодействия компонентов распределённого приложения в сети.
REST представляет собой согласованный набор ограничений, учитываемых при проектировании распределённой системы.

## Требования к архитектуре REST

### 1. Модель клиент-сервер
Приведение архитектуры к модели клиент-сервер.
Отделение потребности интерфейса клиента от потребностей сервера, хранящего данные

### 2. Отсутствие состояния
В период между запросами клиента никакая информация о состоянии клиента на сервере не хранится.
Все запросы от клиента должны быть составлены так, чтобы сервер получил всю необходимую информацию для выполнения запроса.

### 3. Кэширование
Клиенты, а также промежуточные узлы, могут выполнять кэширование ответов сервера. 
Ответы сервера, в свою очередь, должны иметь явное или неявное обозначение как кэшируемые или некэшируемые с целью предотвращения получения клиентами устаревших или неверных данных в ответ на последующие запросы.

### 4. Единообразие интерфейса
Наличие унифицированного интерфейса является фундаментальным требованием дизайна REST-сервисов.

Ограничения к унифицированным интерфейсам:
- **Идентификация ресурсов** - Все ресурсы идентифицируются в запросах.
  Ресурсы концептуально отделены от представлений, которые возвращаются клиентам. 
- **Манипуляция ресурсами через представление**
- **«Самоописываемые» сообщения** - Каждое сообщение содержит достаточно информации, чтобы понять, каким образом его обрабатывать.
- **Гипермедиа как средство изменения состояния (HATEOAS)** - Клиенты изменяют состояние системы только через действия, которые динамически определены в гипермедиа на сервере.
  клиент не может предположить, что доступна какая-то операция над каким-то ресурсом, если не получил информацию об этом в предыдущих запросах к серверу.

### 5. Слои
Применение промежуточных серверов способно повысить масштабируемость за счёт балансировки нагрузки и распределённого кэширования. 

### 6. Код по требованию (необязательное ограничение)
REST может позволить расширить функциональность клиента за счёт загрузки кода с сервера в виде апплетов или сценариев.


## Преимущества
- Надёжность (за счёт отсутствия необходимости сохранять информацию о состоянии клиента, которая может быть утеряна);
- Производительность (за счёт использования кэша);
- Масштабируемость;
- Прозрачность системы взаимодействия (особенно необходимая для приложений обслуживания сети);
- Простота интерфейсов;
- Портативность компонентов;
- Лёгкость внесения изменений;
- Способность эволюционировать, приспосабливаясь к новым требованиям


## Пример ресурсного роутинга:

- `GET /articles/` — возвращает все статьи
- `GET /articles/1` — возвращает статью с идентификатором «1»
- `POST /articles/` — создаёт новую статью
- `PATCH /articles/1` — для частичного изменения ресурса с идентификатором «1»
- `PUT /articles/1` — для полной замены ресурса с идентификатором «1»
- `DELETE /articles/1` — удаляет статью с идентификатором «1»


## Идемпотентный метод

Метод HTTP является идемпотентным, если повторный идентичный запрос, сделанный один или несколько раз подряд, 
имеет один и тот же эффект, не изменяющий состояние сервера.

### Tips
- Корректно реализованные методы `GET`, `HEAD`, `PUT` и `DELETE` идемпотентны
- возвращаемые запросами коды статуса могут отличаться
- `DELETE` с функциональностью удалить последнюю запись - **НЕ идемпотентный**!


## REST API Versioning Strategies

### Path params
```
http://www.example.com/api/1/products
```
* **Pros**: Clients can cache resources easily
* **Cons**: This solution has a pretty big footprint in the code base as introducing breaking changes implies branching the entire API

### Query params
```
http://www.example.com/api/products?version=1
```
* **Pros**: It’s a straightforward way to version an API, and it’s easy to default to the latest version
* **Cons**: Query parameters are more difficult to use for routing requests to the proper API version

### Custom headers
```
curl -H “Accepts-version: 1.0”
http://www.example.com/api/products
```
* **Pros**: It doesn’t clutter the URI with versioning information
* **Cons**: It requires custom headers

### Content negotiation
```
curl -H “Accept: application/vnd.xm.device+json; version=1”
http://www.example.com/api/products
```
* **Pros**: Allows us to version a single resource representation instead of versioning the entire API, which gives us a more granular control over versioning. Creates a smaller footprint. Doesn’t require implementing URI routing rules.
* **Cons**: Requiring HTTP headers with media types makes it more difficult to test and explore the API using a browser


## Richardson Maturity Model

### Level 0: The Swamp of POX
- single URI over HTTP
- single HTTP method - usually `POST`, accepting all operations supported by the service.
- there is no well defined resources, and messaging is done in ‘xml’, ‘json’ or other text formats.

### Level 1: Resources
- many URIs
- single HTTP method (`POST`)
- each URI identify one resource, so each resource can be addressed individually

### Level 2: HTTP Verbs
- many URIs
- many HTTP methods (many HTTP status codes)

### Level 3: Hypermedia Controls
- many URIs
- many HTTP methods (many HTTP status codes)
- resource describes own capabilities (usually in the response)
- resource describes own interactions (usually in the response)
