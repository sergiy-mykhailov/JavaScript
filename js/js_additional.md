
# **JavaScript - additional info**

## Memory Management, Garbage collection
## Debug & benchmark (console, debug, performance)
## Strict mode
## ES 6
## File API
## WebSQL
## Indexed DB
## Web Audio API


## WebSockets

WebSocket – двунаправленный протокол для обмена данными между браузером и сервером через постоянное соединение.
* Нет ограничений, связанных с кросс-доменными запросами.
* Имеют хорошую поддержку браузерами.
* Могут отправлять/получать как строки, так и бинарные данные.

```javascript
let socket = new WebSocket("wss://some-websocket-service");

// Свойства
socket.readyState
// 0 – «CONNECTING»: соединение ещё не установлено,
// 1 – «OPEN»: обмен данными,
// 2 – «CLOSING»: соединение закрывается,
// 3 – «CLOSED»: соединение закрыто.

// События:
socket.onopen = function(event) {
  // Соединение установлено
};

socket.onmessage = function(event) {
  event.data // Данные получены
};

socket.onclose = function(event) {
  // event.code === 1000
  // event.reason === "работа закончена"
  // event.wasClean === true (закрыто чисто)
};

socket.onerror = function(error) {
  error.message
};

// Методы:
socket.send(data); // string, Blob, ArrayBuffer

socket.close([code], [reason]); // code: number, reason: string
```
[Коды закрытия](https://datatracker.ietf.org/doc/html/rfc6455#section-7.4.1)


## Long polling

### Частые опросы
1. Запрос отправляется на сервер.
2. Сервер помечает, что клиент онлайн, посылает весь пакет сообщений, накопившихся к данному моменту.
3. Повторить п\п 1-2 с заданной периодичностью.

### Длинные опросы
1. Запрос отправляется на сервер.
2. Сервер не закрывает соединение, пока у него не возникнет сообщение для отсылки.
3. Когда появляется сообщение – сервер отвечает на запрос, посылая его.
4. Браузер немедленно делает новый запрос.

### Example
```javascript
async function subscribe() {
  let response = await fetch("/subscribe");
  if (response.status == 502) {
    // Статус 502 - это таймаут соединения - переподключение
    await subscribe();
  } else if (response.status != 200) {
    // Ошибка - Подключимся снова через секунду.
    await new Promise(resolve => setTimeout(resolve, 1000));
    await subscribe();
  } else {
    // Получим  сообщение
    let message = await response.text();
    // И снова вызовем subscribe() для получения следующего сообщения
    await subscribe();
  }
}
subscribe();
```


## Socket.IO

**Socket.IO** - библиотека для веб-приложений и обмена данными в реальном времени.
Использует протокол WebSocket, Flash Socket, AJAX Long Polling, AJAX Multipart Stream.

* В отличие от веб-сокетов, Socket.IO позволяет отправлять сообщения всем подключенным клиентам.
* В веб-сокетах сложно использовать проксирование и балансировщики нагрузки. Socket.IO поддерживает эти технологии из коробки.
* Socket.IO поддерживает постепенную (изящную) деградацию.
* Socket.IO поддерживает автоматическое переподключение при разрыве соединения.
* Socket.IO проще в использовании.


## Server-Sent Events

**Server-Sent Event API** содержится в интерфейсе `EventSource`, который позволяет поддерживать соединение с сервером и получать от него события.

### SSE vs WebSocket
- Как и в случае с **WebSocket**, соединение постоянно.
- **WebSocket** - Двунаправленность, **SSE** - Однонаправленность: данные посылает только сервер
- **WebSocket** - Бинарные и текстовые данные, **SSE** - Только текст
- **WebSocket** - Протокол WebSocket, **SSE** - Обычный HTTP

### Tips
* Автоматическое переподключение с настраиваемой retry задержкой.
* Идентификаторы сообщений для восстановления соединения. Последний полученный идентификатор посылается в заголовке Last-Event-ID при пересоединении.
* Текущее состояние, записанное в свойстве readyState.
* поддерживает Кросс-доменные запросы, так же как `fetch`.

### Формат ответа сервера
Сервер посылает сообщения, разделённые двойным переносом строки `\n\n`.
* `data:` – тело сообщения, несколько data подряд интерпретируются как одно сообщение, разделённое переносами строк `\n`.
* `id:` – обновляет свойство `lastEventId`, отправляемое в `Last-Event-ID` при переподключении.
* `retry:` – рекомендованная задержка перед переподключением в миллисекундах. Не может быть установлена с помощью JavaScript.
* `event:` – имя пользовательского события, должно быть указано перед `data:`.

### Example
```javascript
let source = new EventSource("https://another-site.com/events", { // поддерживает Кросс-доменные запросы, так же как fetch
  withCredentials: true // чтобы послать авторизационные данные
});

// Свойства:
eventSource.lastEventId  // id последнего полученного сообщения. При переподключении браузер посылает его в заголовке Last-Event-ID.
eventSource.readyState         // Текущее состояние подключения: 
// EventSource.CONNECTING = 0; // подключение или переподключение
// EventSource.OPEN = 1;       // подключено
// EventSource.CLOSED = 2;     // подключение закрыто
  
// События:
eventSource.addEventListener('join', event => { event.data });
eventSource.addEventListener('message', event => { event.data });
eventSource.addEventListener('leave', event => { event.data });
eventSource.addEventListener('error', event => {});

// Методы:
eventSource.close();
```


## WebRTC
## Canvas
## SVG
## WebGL
