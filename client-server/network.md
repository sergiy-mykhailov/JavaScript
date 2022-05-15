# Network

## Сетевая модель OSI

**Сетевая модель OSI** — сетевая модель стека (магазина) сетевых протоколов OSI/ISO. 
Посредством данной модели различные сетевые устройства могут взаимодействовать друг с другом.

### Уровни модели OSI
- **7** Прикладной (**application**)	- взаимодействие пользовательских приложений с сетью. Протоколы: RDP, HTTP, SMTP, SNMP, POP3, FTP, XMPP, OSCAR, Modbus, SIP, TELNET...
- **6** Представления (**presentation**) -	преобразование протоколов и кодирование/декодирование данных. Протоколы: ASCII, EBCDIC, JPEG, MIDI
- **5** Сеансовый (**session**)	- поддержание сеанса связи, управляет созданием/завершением сеанса, обменом информацией, синхронизацией задач, определением права на передачу данных и поддержанием сеанса в периоды неактивности приложений.	Протоколы: RPC, PAP, L2TP, gRPC 
- **4** Транспортный (**transport**) - Прямая связь между конечными пунктами и надёжность. Протоколы: TCP, UDP, SCTP
- **3** Сетевой (**network**) -	Пакеты (packet)	Определение маршрута и логической адресации. Протоколы: я	IPv4, IPv6, IPsec, AppleTalk, ICMP
- **2** Канальный (**data link**)	- Физическая адресация и контроль ошибок. Протоколы: PPP, IEEE 802.22, Ethernet, DSL, ARP
- **1** Физический (**physical**)	-	Работа со средой передачи, сигналами и двоичными данными.	Протоколы: USB, RJ («витая пара», коаксиальный, оптоволоконный), радиоканал.


## HTTP
Протокол передачи гипертекста **(Hypertext Transfer Protocol - HTTP**) - это прикладной протокол для передачи гипертекстовых документов, таких как `HTML`.
HTTP основан на `TCP/IP`, также может использовать любой другой протокол `транспортного уровня`.

### Структура HTTP-сообщения
- Стартовая строка (**Starting line**) — определяет тип сообщения;
- Заголовки (**Headers**) — характеризуют тело сообщения, параметры передачи и прочие сведения;
- Тело сообщения (**Body**) — данные сообщения. Обязательно должно отделяться от заголовков пустой строкой.

### HTTP Starting line

#### Request starting line
- `GET URI` — для версии протокола 0.9;
- `Method URI HTTP/Version` — для остальных версий.
##### Example
```
GET /wiki/some-article HTTP/1.0
```

#### Response starting line
- `HTTP/Version StatusCode ReasonPhrase`
```
HTTP/1.0 200 OK
```

### HTTP Headers
- General Headers («Основные заголовки») — могут включаться в любое сообщение клиента и сервера;
- Request Headers («Заголовки запроса») — используются только в запросах клиента, пример:
  - `Accept: text/html` - Media type(s) that is/are acceptable for the response
  - `Authorization: Basic QWxhZGR...lc2FtZQ==` - 	Authentication credentials for HTTP authentication
  - `Connection: keep-alive` - Control options for the current connection
  - `Content-Length: 348` - The length of the request body in octets (8-bit bytes)
  - `Content-Type: application/x-www-form-urlencoded` - The Media type of the body of the request (POST, PUT)
  - `Host: en.wikipedia.org:8080` - The domain name of the server and the TCP port number (optional)
  - `Origin: http://www.example-social-network.com` - Initiates a request for cross-origin resource sharing
- Response Headers («Заголовки ответа») — только для ответов от сервера, пример:
  - `Access-Control-Allow-Origin: *` - Specifying which web sites can participate in cross-origin resource sharing
  - `Allow: GET, HEAD` - Valid methods for a specified resource
  - `Content-Type: text/html; charset=utf-8` - The MIME type of this content
  - `Content-Encoding: gzip` - The type of encoding used on the data.
- Entity Headers («Заголовки сущности») — сопровождают каждую сущность сообщения.

### HTTP Methods
- `GET` - для запроса содержимого, можно также начать какой-либо процесс. Ответ: 200
- `HEAD` - для извлечения метаданных, проверки наличия ресурса. Аналогичен методу `GET`, но в ответе сервера отсутствует тело. Ответ: 200
- `POST` - для передачи данных, загрузки файла, создания ресурса. Ответ: 200, 201(создание ресурсе)
- `PUT` - для загрузки ресурса, если его нет, то сервер создаёт его и возвращает статус 201 (Created), если ресурс был изменён - 200 (Ok) или 204 (No Content).
- `PATCH` - Аналогично `PUT`, но применяется только к фрагменту ресурса.
- `DELETE` - Удаляет указанный ресурс.
- `TRACE` - Возвращает полученный запрос так, что клиент может увидеть, какую информацию промежуточные серверы добавляют или изменяют в запросе.
- `CONNECT` - Преобразует соединение запроса в прозрачный TCP/IP-туннель, для SSL-соединения через нешифрованный прокси.

### Http Status code
* **1xx**	Информационный (**informational**) - Информирование о процессе передачи.
* **2xx**	Успех (**Success**) - Информирование о случаях успешного принятия и обработки запроса клиента.
* **3xx**	Перенаправление (**Redirection**) - 301, 302, 303, 305 и 307 относятся непосредственно к перенаправлениям (редирект).
* **4xx**	Ошибка клиента (**Client Error**)
* **5xx**	Ошибка сервера (**Server Error**)

### HTTP Versions
* HTTP/0.9 - январь 1992 года.
* HTTP/1.0 - май 1996 года.
* HTTP/1.1 - июнь 1999 года. Добавлен режим «постоянного соединения». Клиент теперь обязан посылать информацию об имени хоста, к которому он обращается.
* HTTP/2 - февраль 2015 года.
  * Протокол HTTP/2 является бинарным
  * Расстановка приоритетов для запросов
  * Сжатия данных в заголовках HTTP
  * Использования push-технологий на серверной стороне
  * Конвейеризации запросов
  * Устранения проблемы блокировки «head-of-line» протоколов HTTP 1.0/1.1
  * Мультиплексирования множества запросов в одном соединении TCP
* HTTP/3 — сентябрь 2019 года. На основе UDP вместо TCP в качестве транспортного протокола.


## HTTPS
**HyperText Transfer Protocol Secure** — расширение протокола HTTP для поддержки шифрования в целях повышения безопасности. 
Данные в протоколе HTTPS передаются поверх криптографических протоколов `TLS` или устаревшего в 2015 году `SSL`. 
В отличие от HTTP с TCP-портом 80, для HTTPS по умолчанию используется TCP-порт 443.

**HTTPS** не является отдельным протоколом. 
Это обычный HTTP, работающий через шифрованные транспортные механизмы SSL и TLS.
Он обеспечивает защиту от атак, основанных на прослушивании сетевого соединения —
от снифферских атак и атак типа man-in-the-middle, при условии,
что будут использоваться шифрующие средства и сертификат сервера проверен и ему доверяют.


## Cookie

### Использование cookie
* Управления сеансом (логины, корзины для виртуальных покупок)
* Персонализации (пользовательские предпочтения)
* Трекинга (отслеживания поведения пользователей)

### Заголовки Set-Cookie и Cookie

Заголовок `Set-Cookie` HTTP-ответа используется для отправки куки с сервера в клиентское приложение (браузер)
```
Set-Cookie: <cookie-name>=<cookie-value>
```
C каждым новым запросом к серверу при помощи заголовка Cookie (en-US) браузер будет возвращать серверу все сохранённые ранее куки. 
```
Cookie: <cookie-name1>=<cookie-value1>; <cookie-name2>=<cookie-value2>
```

### Типы cookie
* Сессионные cookie - существуют только во временной памяти, пока пользователь находится на странице веб-сайта.
* Постоянные cookie - удаляются в определённую дату или через определённый промежуток времени. (атрибуты `Expires` или `Max-Age`)
* Сторонние cookie - используются для посещенных сайтов или рекламные банеры
* Супер-cookie — это cookie-файл с источником домена верхнего уровня (например, `.сom`)
* Зомби-cookie (evercookie, или persistent cookie) — неудаляемые или трудно удаляемые cookie, которые можно восстановить в браузере с помощью JavaScript.

### Параметры cookie
- `name` - устанавливает имя cookie-файла.
- `value` - сохраняет значение cookie
- `expires` и `max-age` - определяют срок жизни cookie
- `path` - указывает путь к директории на сервере, для которой будут доступны cookie.
- `domain` - отмечает, какой домен или поддомен имеет доступ к этой cookie.
- `secure` - параметр указывает браузеру, что cookie должны передаваться на сервер только по защищённому https-соединению.
- `httponly` - параметр запрещает доступ к cookie посредством API document.cookie.
- `samesite` - указывает что не должны отсылаться с межсайтовыми запросами.
  - `samesite=none` - нет ограничений.
  - `samesite=lax` - разрешает передачу cookie только безопасными HTTP-методами (GET, HEAD, OPTIONS и TRACE).
  - `samesite=strict` или просто `samesite` является самым строгим вариантом безопасности и блокирует отправку cookie с любыми запросами от других ресурсов. Cookie будут передаваться только в пределах того домена, с которого они и были установлены.

### __Secure- и __Host-    
* Cookie с префиксом `__Secure-` должны устанавливаться
  - С параметром `secure`;
  - Через безопасное https-соединение.
* Cookie с префиксом `__Host-` должны устанавливаться:
  - С параметром `secure`;
  - Через безопасное https-соединение.
  - Без параметра `domain`;
  - С параметром `path=/`.


## Request flow
1. You enter a URL into a web browser
2. The browser checks the cache for a DNS record to find the corresponding IP address
3. If the requested URL is not in the cache, ISP’s DNS server initiates a DNS query to find the IP address of the server that hosts domain
4. The browser initiates a TCP connection with the server.
5. The browser sends an HTTP request to the webserver
6. The server handles the request and sends back a response.
7. The browser begins rendering the HTML
8. The browser sends requests for additional objects embedded in HTML (images, css, JavaScript) and repeats steps 4-6.


## DNS

Domain Name System - система доменных имён — компьютерная распределительная система для получения информации о доменах.
Чаще всего используется для получения IP-адреса по имени хоста.

### Ключевые характеристики DNS
* **Распределённость администрирования**. Ответственность за разные части иерархической структуры несут разные люди или организации.
* **Распределённость хранения информации**. Каждый узел сети в обязательном порядке должен хранить только те данные, которые входят в его зону ответственности, и (возможно) адреса корневых DNS-серверов.
* **Кэширование информации**. Узел может хранить некоторое количество данных не из своей зоны ответственности для уменьшения нагрузки на сеть.
* **Иерархическая структура**, в которой все узлы объединены в дерево, и каждый узел может или самостоятельно определять работу нижестоящих узлов, или делегировать (передавать) их другим узлам.
* **Резервирование**. За хранение и обслуживание своих узлов (зон) отвечают (обычно) несколько серверов, разделённые как физически, так и логически, что обеспечивает сохранность данных и продолжение работы даже в случае сбоя одного из узлов.

### Поля записи DNS (ресурсной записи)
- имя (**NAME**) — доменное имя, к которому привязана или которому «принадлежит» данная ресурсная запись,
- тип (**TYPE**) ресурсной записи — определяет формат и назначение данной ресурсной записи,
- класс (**CLASS**) ресурсной записи - тип сети (DNS может использоваться не только с TCP/IP)
- **TTL** (Time To Live) — допустимое время хранения данной ресурсной записи в кэше неответственного DNS-сервера,
- длина поля данных (**RDLEN**),
- поле данных (**RDATA**) - формат и содержание которого зависит от типа записи.

### Типы DNS-записей
- **Запись A** (address record) или **запись адреса** связывает имя хоста с адресом протокола IPv4.
- **Запись AAAA** (IPv6 address record) связывает имя хоста с адресом протокола IPv6.
- **Запись CNAME** (canonical name record) или **каноническая запись имени** (псевдоним) используется для перенаправления на другое имя.
- **Запись MX** (mail exchange) или **почтовый обменник** указывает сервер(ы) обмена почтой для данного домена.
- **Запись NS** (name server) указывает на DNS-сервер для данного домена.
- **Запись PTR** (pointer) обратная DNS-запись или запись указателя связывает IP-адрес хоста с его каноническим именем.
- **Запись SOA** (Start of Authority) или начальная запись зоны указывает, на каком сервере хранится эталонная информация о данном домене, содержит контактную информацию лица, ответственного за данную зону
- **Запись SRV** (server selection) указывает на серверы для сервисов, используется, в частности, для Jabber и Active Directory.


## CDN
Content Delivery Network — географически распределённая сетевая инфраструктура, 
позволяющая оптимизировать доставку и дистрибуцию содержимого конечным пользователям в сети Интернет.

### Преимущества
- Ускоренный доступ к содержимому, меньше задержки на «узких местах» интернета
- При пропадании связности сети ресурс продолжает частично выполнять свою работу
- Улучшенная статистика и контроль популярности ресурсов
- Устойчивость к DDoS

### Недостатки
- Работает только со статическим содержимым
- Задержки кэширования


## Connection limits
### Max connections per host
- Firefox, Chrome, Safari, Opera, iOS, Android - 6
- IE8 - 6, IE10 - 8, IE11 - 13

### Max URL length
* IE: 2,083 characters
* Edge: 2,083 characters
* Google Chrome: 32,779 characters
* Mozilla Firefox: more than 64,000 characters
* Apple Safari: more than 64,000 characters
* Google Android: 8,192 characters

Maximum URL length for web servers and CDNs may differ from browsers.

### Max payload limit
No limits, depends on servers.

### Max response limit
No limits, depends on servers.

### Timeout limit
Depends on browsers/servers.


## Compression

### Three levels of compression:
#### File format compression
Some file formats(jpeg, gif...) are compressed with specific optimized methods 

#### End-to-end compression
On the path between the server and the client the compression occurs in the server:
- The browser sends an `Accept-Encoding` header with the algorithm it supports and its order of precedence.
- The server picks one, uses it to compress the body of the response and uses the `Content-Encoding` header to tell the browser the algorithm it has chosen.

#### Hop-by-hop compression
Similar to end-to-end compression, but the compression occurs between any two nodes on the path between the client and the server:
- The `node1` sends an `TE` header with the algorithm it supports.
- The `node2` picks one, uses it to compress the body of the response and uses the `Transfer-Encoding` header to tell the `node1` the algorithm it has chosen.


## Chunked transfer

- Отсутствует заголовок `Content-Length`
- Использование заголовка `Transfer-Encoding: chunked`
- Для отделения записей размеров блоков (частей) от их содержания используется разделитель CRLF (как строка: `\r\n`; как байты в формате HEX: `0x0D`, `0x0A`).
- Схематическое блока: `<длина блока в HEX><CRLF><содержание блока><CRLF>`
- Схематическое последнего блока: `0<CRLF><CRLF>`


## Cache

### Cache types
* Приватный (**private**) кеш браузера - Приватный кеш предназначен для отдельного пользователя.
* Общий (**shared**) прокси-кеш - Кеш совместного использования, который сохраняет ответы, чтобы их потом могли использовать разные пользователи.

### Примеры данных, которые могут кешироваться:
* Успешно загруженные ресурсы: ответ `200 OK` на запрос методом `GET` HTML-документов, изображений или файлов.
* Постоянные перенаправления: ответ `301 Moved Permanently` («перемещено навсегда»).
* Сообщения об ошибках: ответ `404 Not Found` («не найдено»).
* Неполные результаты: ответ `206 Partial Content` («частичное содержимое»).
* Ответы на запросы отличные от `GET`, если есть что-либо, подходящее для использования в качестве ключа кеша.

### Заголовки
```
Cache-Control: no-cache, no-store, must-revalidate  // Полное отсутствие кеширования
Cache-Control: no-cache                             // Кешировать, но проверять актуальность
Cache-Control: private                              // ответ предназначен отдельному пользователю и не должен храниться в кеше совместного использования
Cache-Control: public                               // ответ можно сохранять в любом кеше
Cache-Control: max-age=31536000                     // максимальное время(секунды), в течение которого ресурс считается "свежим"
Cache-Control: must-revalidate                      // кеш обязан проверять статус ресурсов с истёкшим сроком действия
```


## Performance testing tools
### PageSpeed
**PageSpeed Insights API** (PSI) позволяет получать отчеты о скорости загрузки страниц на мобильных устройствах и компьютерах, 
а также советы, как эту скорость увеличить.

### Dynatrace
Dynatrace APM – мониторинг приложений, полный end-to-end обзор производительности приложений или сайтов от пользователя до базы данных, 
автоматизация инфраструктуры.

### Lighthouse
Lighthouse is an open-source, automated tool for improving the performance, quality, and correctness of your web apps. 
