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
