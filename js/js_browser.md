# **JavaScript - browser**

## DOM

### document
- `document.activeElement` - Returns the Element that currently has focus.
- `document.body` - Returns the <body> or <frameset> node of the current document.
- `document.forms` - Returns an HTMLCollection of the <form> elements in the document.
- `document.head` - Returns the <head> element of the current document.
- `document.location` - Returns the URI of the current document.
- `document.createElement(name)` - Creates a new element with the given tag name.
- `document.getElementById(id)` - Returns an object reference to the identified element.
- `document.getElementsByTagName(name)` - Returns a list of elements with the given tag name.
- `document.getElementsByClassName(names)` - Returns a list of elements with the given class name.
- `document.querySelector(selectors)` - Returns the first Element node within the document, in document order, that matches the specified selectors.
- `document.querySelectorAll(selectors)` - Returns a list of all the Element nodes within the document that match the specified selectors.
- `document.cookie` - Returns a semicolon-separated list of the cookies for that document or sets a single cookie.
- `element.innerHTML` - устанавливает или получает HTML или XML разметку дочерних элементов.
- `element.addEventListener(type, listener, options)` - регистрирует обработчик события
  - `type` - Чувствительная к регистру строка, представляющая тип обрабатываемого события.
  - `listener` - Обработчик события. Это должен быть объект, реализующий интерфейс `EventListener` или просто функция JavaScript.
  - `options`
    - `capture`: Boolean - события будут отправлены зарегистрированному обработчику listener перед отправкой на `EventTarget`, расположенный ниже в дереве DOM.
    - `once`: Boolean - обработчик должен быть вызван не более одного раза после добавления.
    - `passive`: Boolean - обработчик никогда не вызовет `preventDefault()`.


## FormData API
```html
<form id="formElem">
  <input type="text" name="firstName" value="John">
  <input type="file" name="picture" accept="image/*">
  <input type="submit">
</form>
<script>
  formElem.onsubmit = async (e) => {
    e.preventDefault();
    let response = await fetch('/article/formdata/post/user-avatar', {
      method: 'POST',
      body: new FormData(formElem)
    });
    let result = await response.json();
  };
</script>
```
### Methods
* `formData.append(name, value)` – добавляет к объекту поле с именем name и значением `value`,
* `formData.append(name, blob, fileName)` – добавляет поле, как будто в форме имеется элемент `<input type="file">`, третий аргумент `fileName` устанавливает имя файла (не имя поля формы), как будто это имя из файловой системы пользователя,
* `formData.delete(name)` – удаляет поле с заданным именем name,
* `formData.get(name)` – получает значение поля с именем name,
* `formData.getAll(name)` - Возвращает массив всех значений ассоциированных с переданным ключом `name`.
* `formData.has(name)` – если существует поле с именем name, то возвращает `true`, иначе `false`
* `formData.set(name, value)` - аналог `append()`, но удаляет все уже имеющиеся поля с именем `name` и только затем добавляет новое.
* `formData.set(name, blob, fileName)`
* `formData.keys()` - возвращает iterator со списком всех ключей объекта FormData
* `formData.entries()` - возвращает iterator со списком пар `[key, value]` объекта FormData
* `formData.values()` - возвращает iterator со списком всех значений объекта FormData


## Events

### Creating and triggering events
#### Trigger event
```js
const event = new Event('build');
elem.addEventListener('build', function (e) { /* ... */ }, false);
elem.dispatchEvent(event);
```
#### Custom event
```js
const event = new CustomEvent('build', { detail: elem.dataset.time });
elem.addEventListener('build', function (e) { e.detail }, false);
elem.dispatchEvent(event);
```
#### The old-fashioned way
```js
const event = document.createEvent('Event');
event.initEvent('build', true, true); // Define that the event name is 'build'.
elem.addEventListener('build', function (e) {}, false); // e.target matches elem
elem.dispatchEvent(event);
```
#### Triggering built-in events
```js
const event = new MouseEvent('click', {
  view: window,
  bubbles: true,
  cancelable: true
});
const cb = document.getElementById('checkbox');
const cancelled = !cb.dispatchEvent(event);
```
#### Call built-in events directly
```js
elem.addEventListener('click', function (e) {})
elem.click()
```

### Methods and props
#### Проверить, является ли событие отменяемым:
```javascript
event.cancelable
```
#### preventDefault()
```javascript
event.preventDefault();
```
#### stopPropagation()
Остановка всплытия (препятствует продвижению события дальше, но на текущем элементе все обработчики отработают):
```javascript
event.stopPropagation();
```
#### stopImmediatePropagation() 
Остановка всплытия (останавливает обработку событий на текущем элементе):
```javascript
event.stopImmediatePropagation();
```


## BOM
### window
The Window interface represents a window containing a DOM document.
- `window.navigator` - represents the state and the identity of the user agent (browser).
  - `navigator.userAgent` - Returns the user agent string for the current browser.
  - `navigator.cookieEnabled` - Returns false if setting a cookie will be ignored and true otherwise.
- `window.console` - reference to the console object.
- `window.crypto` - Returns the browser crypto object.
- `window.document` - Returns a reference to the document that the window contains.
- `window.history` - Returns a reference to the history object.
- `window.location` - Gets/sets the location, or current URL, of the window object.
- `window.localStorage` - Returns a reference to the local storage object.
- `window.window` - Returns a reference to the current window.
- `window.alert()` - Displays an alert dialog.
- `window.postMessage()` - Provides a secure means for one window to send a string of data to another window, which need not be within the same domain as the first.
- `window.scrollTo(x, y)` - Прокрутка документа до указанных координат.
- `window.screen` - Returns a reference to the screen object (height, width and other screen info)


## CSS Object Model
## Web Storages
## Regular expressions
## JSON
## AJAX


## Web Workers API
**Web Workers** makes it possible to run a script operation in a background thread separate 
from the main execution thread of a web application.

### Web Workers concepts:
- inside a worker you don't have access to DOM and some methods of the window object.
- `postMessage()` method - for sending data
- `onmessage` event - for receiving data

### Worker types (have their own contexts extended from `WorkerGlobalScope`)
- `DedicatedWorker` - workers that are utilized by a single script.
- `SharedWorker` - workers that can be utilized by multiple scripts running in different windows, IFrames, etc., as long as they are in the same domain
- `ServiceWorkers` - act as proxy servers that sit between web applications, the browser, and the network

### Web Worker interfaces:
- `Worker` - Represents a running worker thread, allowing you to pass messages to the running worker code.
- `WorkerLocation` - Defines the absolute location of the script executed by the Worker.
- `WorkerGlobalScope` - represents the global object of any worker (analog `Window`).
- `WorkerNavigator` - Represents the identity and state of the user agent (the client)


## Fetch API

```javascript
let response = await fetch(url, {
  method: "GET", // POST, PUT, DELETE, etc.
  headers: {
    // значение этого заголовка обычно ставится автоматически,
    // в зависимости от тела запроса
    "Content-Type": "text/plain;charset=UTF-8"
  },
  body: undefined, // string, FormData, Blob, BufferSource или URLSearchParams
  referrer: "about:client", // или "" для того, чтобы не послать заголовок Referer, или URL с текущего источника
  referrerPolicy: "no-referrer-when-downgrade", // no-referrer, origin, same-origin...
  mode: "cors", // same-origin, no-cors
  credentials: "same-origin", // omit, include
  cache: "default", // no-store, reload, no-cache, force-cache или only-if-cached
  redirect: "follow", // manual, error
  integrity: "", // контрольная сумма, например "sha256-abcdef1234567890"
  keepalive: false, // true
  signal: undefined, // AbortController, чтобы прервать запрос
  window: window // null
})
```
###### Params:
- url – URL для отправки запроса.
- options – дополнительные параметры
- response
  - response.status – HTTP-код ответа,
  - response.ok – true, если статус ответа в диапазоне 200-299.
  - response.headers – похожий на Map объект с HTTP-заголовками.
  - response.text() – возвращает ответ как обычный текст,
  - response.json() – преобразовывает ответ в JSON-объект,
  - response.formData() – возвращает ответ как объект FormData (кодировка form/multipart),
  - response.blob() – возвращает объект как Blob (бинарные данные с типом),
  - response.arrayBuffer() – возвращает ответ как ArrayBuffer (низкоуровневые бинарные данные),


## DOM loaded event

### DOMContentLoaded
Браузер полностью загрузил HTML, было построено DOM-дерево, но внешние ресурсы, такие как картинки и стили, могут быть ещё не загружены.
```jsx
document.addEventListener("DOMContentLoaded", function() {});
```
Tips:
- Скрипты `<script>` загружаются до `DOMContentLoaded`
- Скрипты с атрибутом `async`, не блокируют `DOMContentLoaded`.
- Скрипты, сгенерированные динамически при помощи `document.createElement('script')` и затем добавленные на страницу, не блокируют `DOMContentLoaded`.

### load
Браузер загрузил HTML и внешние ресурсы (картинки, стили и т.д.).
```jsx
 window.onload = function() {}
```

### beforeunload
Если посетитель собирается уйти со страницы или закрыть окно, обработчик beforeunload попросит дополнительное подтверждение.
```jsx
window.onbeforeunload = function() {
  return "Есть несохранённые изменения. Всё равно уходим?";
};
```

### unload
Пользователь покидает страницу.
```jsx
window.addEventListener("unload", function() {
  navigator.sendBeacon("/analytics", JSON.stringify(analyticsData)); // POST-запрос. Размер данных ограничен 64 Кб. 
});
```
Tips:
- `sendBeacon()` посылает данные в фоне. Переход к другой странице не задерживается: браузер покидает страницу, но всё равно выполняет sendBeacon.

### readyState
Показывает текущее состояние загрузки:
* "loading" – документ загружается.
* "interactive" – документ был полностью прочитан.
* "complete" – документ был полностью прочитан и все ресурсы (такие как изображения) были тоже загружены.
