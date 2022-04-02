# JavaScript - Advanced Level

## 1. DOM

## 2. JS Forms, Forms API

## 3. Events

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

## 4. BOM (window, screen, location, history, navigator, cookie)
## 5. CSS Object Model
## 6. Web Storages
## 7. Regular expressions
## 8. JSON
## 9. AJAX

## 10. Web Workers API
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








