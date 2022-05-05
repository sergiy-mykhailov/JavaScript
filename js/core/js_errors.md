# Errors
***

##`new Error([message[, fileName[, lineNumber]]])`
```javascript
try {
  throw new Error('hello error', 'someFile.js', 10);
} catch (e) {
  console.log(e instanceof Error); // true
  console.log(e.message);              // "Привет"
  console.log(e.name);                 // "TypeError"
  console.log(e.fileName);             // "someFile.js"
  console.log(e.lineNumber);           // 10
  console.log(e.columnNumber);         // 0
  console.log(e.stack);                // "@Scratchpad/2:2:9\n"
}
```

## Error types
- **EvalError** - ошибка в глобальной функции `eval()`.
- **InternalError**- ошибка при выбрасывании внутренней ошибки в движке JavaScript. («too much recursion»).
- **RangeError** - ошибка при выходе числовой переменной или параметра за пределы допустимого диапазона.
- **ReferenceError** - ошибка при разыменовывании недопустимой ссылки.
- **SyntaxError** - ошибка при разборе исходного кода в функции `eval()`.
- **TypeError** - ошибка при недопустимом типе для переменной или параметра.
- **URIError** - ошибка при передаче в функции `encodeURI()` или `decodeURI()` недопустимых параметров. 

## GlobalEventHandlers.onerror
```javascript
window.onerror = function (message, fileName, lineNumber, columnNumber, error) {} // browser
process.on('uncaughtException', function (error) {})                              // node
```

## Handle errors asynchronously via callbacks
Error-first callback:
- error - first argument of callback should be an error
- no error - first argument = null

```javascript
function someAsyncFunction(number, callback) {
  setTimeout(() => {
    if (typeof number !== "number") {
      callback(new Error("Argument of type number is expected."));
      return;
    }
    const result = number * number;
    callback(null, result);
  }, 1000);
}
const callback = (error, result) => {
  if (error !== null) {
  console.log("Caught error: " + String(error));
  return;
  }
  console.log(result);
};
```

## Handle error events in EventEmitter
```javascript
var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();
emitter.on('error', (err) => {
  console.error('whoops! there was an error');
});
emitter.emit("error", new Error("Error occured while handling the request"));
```

## try catch
```javascript
try {
   // .. пробуем выполнить код ..
} catch(e) {
   // .. перехватываем исключение ..
} finally {
   // .. выполняем всегда ..
}
```
Блок finally срабатывает при любом выходе из try...catch, в том числе и return.

#### Объект ошибки
*  name - Тип ошибки. Например: "ReferenceError".
*  message - текстовое сообщение о деталях ошибки.
*  stack - содержит строку с информацией о последовательности вызовов, которая привела к ошибке.
