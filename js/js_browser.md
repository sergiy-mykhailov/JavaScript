# **JavaScript - browser**

## DOM


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

##### Проверить, является ли событие отменяемым:
```javascript
event.cancelable
```

##### preventDefault()
```javascript
event.preventDefault();
```
##### stopPropagation()
Остановка всплытия (препятствует продвижению события дальше, но на текущем элементе все обработчики отработают):
```javascript
event.stopPropagation();
```

##### stopImmediatePropagation() 
Остановка всплытия (останавливает обработку событий на текущем элементе):
```javascript
event.stopImmediatePropagation();
```


## BOM (window, screen, location, history, navigator, cookie)
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





