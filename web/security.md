# Security


## OWASP

**Open Web Application Security Project** — это открытый проект обеспечения безопасности веб-приложений,
набор статей, учебных пособий, документации, инструментов и технологий, находящихся в свободном доступе.

### OWASP TOP-10
1. Инъекционные атаки (Injections)
2. Нарушенная аутентификация (Broken Authentication)
3. Незащищённость критичных данных (Sensitive Data Exposure)
4. Внешние объекты XML (XXE) (XML External Entities (XXE))
5. Нарушение контроля доступа (Broken Access control)
6. Небезопасная конфигурация (Security misconfigurations)
7. Межсайтовый скриптинг (XSS) (Cross Site Scripting (XSS))
8. Небезопасная десериализация (Insecure Deserialization)
9. Использование компонентов с известными уязвимостями (Using Components with known vulnerabilities)
10. Неэффективный мониторинг (Insufficient logging and monitoring)


## XSS

### Info
**XSS** (Cross-Site Scripting) — тип атаки на веб-системы, 
заключающийся во внедрении в веб-страницу вредоносного кода (который будет выполнен на компьютере пользователя при открытии им этой страницы) 
и взаимодействии этого кода с веб-сервером злоумышленника.

Токены могут храниться в браузере двумя способами:
- в DOM-хранилище - система может быть подвержена XSS-атаке, так как JavaScript имеет доступ к DOM-хранилищу и злоумышленник может извлечь оттуда токен
- в куки - можно выставить HttpOnly-флаг, который предотвращает доступ JavaScript к хранилищу. Таким образом, злоумышленник не сможет извлечь токен и приложение становится защищенным от XSS.

### Защита на стороне сервера
* Кодирование управляющих HTML-символов, JavaScript, CSS и URL перед отображением в браузере.
* Кодирование входных данных.
* Регулярный ручной и автоматизированный анализ безопасности кода и тестирование на проникновение.
* Указание кодировки на каждой web-странице (например, ISO-8859-1 или UTF-8) до каких-либо пользовательских полей.
* Обеспечение безопасности cookies, которая может быть реализована путём ограничения домена и пути для принимаемых cookies, установки параметра HttpOnly, использованием SSL.
* Использование заголовка Content Security Policy, позволяющего задавать список, в который заносятся желательные источники, с которых можно подгружать различные данные, например, JS, CSS, изображения и пр.

### Защита на стороне клиента
* Регулярное обновление браузера до новой версии
* Установка расширений для браузера, которые будут проверять поля форм, URL, JavaScript и POST-запросы, и, если встречаются скрипты, применять XSS-фильтры для предотвращения их запуска. 

### Content-Security-Policy
```
Content-Security-Policy: default-src 'self'; img-src *; media-src media1.com media2.com; script-src 'self' userscripts.example.com; frame-ancestors 'self';
```


## CSRF (XSRF)
CSRF (cross-site request forgery) — межсайтовая подделка запроса, вид атак на посетителей веб-сайтов, использующий недостатки протокола HTTP.

### Защита
- веб-сайты должны требовать подтверждения большинства действий пользователя и проверять поле HTTP_REFERER, если оно указано в запросе
- с каждой сессией пользователя ассоциируется дополнительный секретный уникальный ключ, предназначенный для выполнения запросов
- с каждым действием ассоциируется уникальный одноразовый ключ


## Clickjacking

### Example
```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>A malicious website</title>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <button>Just a button</button>
        <iframe id="banking-site-iframe" src="https://your-bank.com"></iframe>
    </body>
</html>
```
```css
/* style.css */
#banking-site-iframe {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0%;
}
```
The above CSS positions the iframe on top of the button. When the users click on the button, they click on the iframe instead.

### Защита
- Use header `X-Frame-Options`
  - `X-Frame-Options: sameorigin` - the same origin
  - `X-Frame-Options: deny` - disable embedding our page
- Use header `Content-Security-Policy`
  - `Content-Security-Policy: frame-ancestors 'self' https://secure-website.com` - the same origin or `secure-website.com`
  - `Content-Security-Policy: frame-ancestors 'none'` - disable embedding our page
- Use `helmet` - library that sets various (secure related) HTTP headers


## CORS

**Cross-origin resource sharing** — технология современных браузеров, которая позволяет предоставить веб-страницам доступ к ресурсам другого домена.

### Алгоритм:
- Браузер добавляет заголовок `Origin: www.a.com` (домен сайта, с которого происходит запрос) и `Host: www.b.com` (домен, на который происходит запрос).
- Сервер `www.b.com` разрешает получение данных и указывает список разрешенных доменов в заголовке `Access-Control-Allow-Origin: http://www.a.com`

### Простые запросы
Простые запросы не проходят проверку CORS если удовлетворяют следующим условиям:
- Допустимые методы для запроса: `GET` ,`HEAD`, `POST` 
- CORS-безопасные заголовки (кроме авто-генерируемых): `Accept`, `Accept-Language`, `Content-Language`, `Content-Type`
- Допустимыми значениями заголовка `Content-Type`: `application/x-www-form-urlencoded`, `multipart/form-data`, `text/plain`
- Не должны быть зарегистрированы обработчики событий на любой объект `XMLHttpRequestUpload` используемый в запросе (prop `XMLHttpRequest.upload`)
- В запросе не должен использоваться объект типа `ReadableStream`

### Предварительные запросы (preflight request)
Отправляется HTTP-запрос методом `OPTIONS` к ресурсу на другом домене, если выполняется любое из следующих условий:
- **Если** используется методы: `PUT`, `DELETE`, `CONNECT`, `OPTIONS`, `TRACE`, `PATCH`
- **Или если**, запрос включает заголовки (кроме авто-генерируемых): `Accept`, `Accept-Language`, `Content-Language`, `Content-Type`, `Last-Event-ID`, `DPR`, `Save-Data`, `Viewport-Width`, `Width`
- **Или если** `Content-Type` содержит значение, отличное от следующих: `application/x-www-form-urlencoded`, `multipart/form-data`, `text/plain`
- **Или если** зарегистрированы обработчиков событий на объекте `XMLHttpRequestUpload`.
- **Или если** объект `ReadableStream` используется в запросе.

### Request headers
- `Origin: <origin>` - indicates the origin of the cross-site access request or preflight request.
- `Access-Control-Request-Method: <method>` - lets the server know what HTTP method will be used (preflight request)
- `Access-Control-Request-Headers: <header>[, <header>]` -  lets the server know what HTTP headers will be used (preflight request)

### Response headers
- `Access-Control-Allow-Origin: <origin> | *` - указывает браузеру разрешить этому источнику доступ к ресурсу
- `Access-Control-Expose-Headers: <header>[, <header>]` - lets a server whitelist headers that browsers are allowed to access.
- `Access-Control-Max-Age: <delta-seconds>` -  indicates how long the results of a preflight request can be cached.
- `Access-Control-Allow-Credentials: true` -  Indicates whether or not the response to the request can be exposed when the `credentials` flag is `true`.
- `Access-Control-Allow-Methods: <method>[, <method>]*` - specifies the method or methods allowed when accessing the resource.
- `Access-Control-Allow-Headers: <header>[, <header>]*` - indicates which HTTP headers can be used when making the actual request (preflight request).

### Same origin policy
**Правило ограничения домена** (Принцип одинакового источника) — это концепция безопасности.
Политика разрешает сценариям, находящимся на страницах одного сайта, доступ к методам и свойствам друг друга без ограничений, 
но предотвращает доступ к большинству методов и свойств для страниц на разных сайтах.

Определяет как документ или скрипт, загруженный из одного источника (origin), может взаимодействовать с ресурсом из другого источника.
Две страницы имеют одинаковый origin если протокол, порт (если указан), и хост одинаковы для обеих страниц.

#### Tips
* Свойства `window.location.*` нельзя читать, но можно менять.
* Домены третьего уровня с общим наддоменом могут поменять `document.domain` на их общий домен второго уровня, и тогда они смогут взаимодействовать без ограничений.
* IE не включает порт в понятие источника. Кроме того, он позволяет снять ограничения для конкретного сайта включением в доверенную зону.
* браузера не запрещает использовать HTML-элемент <script/> для обращения к серверам, отличным от сервера, с которого произошла загрузка страницы


## JSONP
**JSONP** — это дополнение к базовому формату JSON. Он предоставляет способ запросить данные с сервера, 
находящегося в другом домене — операцию, запрещённую в типичных веб-браузерах из-за политики ограничения домена.
```jsx
// функция для візова с JSON:
function parseResponse(response) {
  console.log('response:', response)
}
// добваление script в DOM:
var elem = document.createElement("script");
elem.src = "http://other.server.com/Users/1234?jsonp=parseResponse";
document.head.appendChild(elem);
// ответ сервера - данные JSON, обёрнутые в вызов функции parseResponse():
parseResponse({ name: "Jack", id: 1234 });
```


## Encryption

### Методы шифрования
* **Симметричное шифрование** использует один и тот же ключ и для зашифровывания, и для расшифровывания.
* **Асимметричное шифрование** использует два разных ключа: один для зашифровывания (который также называется открытым), другой для расшифровывания (называется закрытым).

### Симметричное шифрование
#### Схема реализации
- Генерация ключа - Собеседник1 выбирает ключ шифрования и алгоритмы.
- Передача ключа - Собеседник1 посылает ключ и алгоритм Собеседнику2.
- Шифрование - Собеседник2 шифрует сообщение с использованием полученного ключа.
- Передача сообщения - Собеседник2 передаёт шифротекст.
- Расшифровывание сообщения - Собеседник1, с помощью того же ключа расшифровывает шифротекст.

Недостатками симметричного шифрования является проблема передачи ключа собеседнику и невозможность установить подлинность или авторство текста.

### Асимметричное шифрование
#### Схема реализации
- Генерация ключевой пары - Собеседник1 выбирает алгоритм и пару открытый-закрытый ключи 
- Передача ключа -  Собеседник1 посылает открытый ключ Собеседнику2 по открытому каналу.
- Шифрование - Собеседник2 шифрует информацию с использованием открытого ключа
- Передача сообщения - Собеседник2 передаёт Собеседнику1 полученный шифротекст.
- Расшифровывание сообщения - Собеседник1, с помощью закрытого ключа, расшифровывает шифротекст.

Если необходимо наладить канал связи в обе стороны, то первые две операции необходимо проделать на обеих сторонах, 
таким образом, каждый будет знать свои закрытый, открытый ключи и открытый ключ собеседника. 
Закрытый ключ каждой стороны не передается по незащищенному каналу, тем самым оставаясь в секретности.
