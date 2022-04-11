# **Symbol**
***

**Symbol** — это уникальный и неизменяемый тип данных, который может быть использован как идентификатор для свойств объектов.

# `Object.getOwnPropertySymbols()`
возвращает массив символов и позволяет получить символьные свойства конкретного объекта.

# `Symbol.for(key)`
Ищет существующие символы по заданному ключу и возвращает его, если он найден.
В противном случае создаётся новый символ для данного ключа в глобальном реестре символов.

# `Symbol.keyFor(sym)`
Получает по разделяемому символу его ключ из глобального реестра символов.

```javascript
const sym = Symbol.for('valera')
const sym2 = Symbol('petro')
Symbol.keyFor(sym)          // valera - global!
Symbol.keyFor(sym2)         // undefined

var obj = {};
obj[Symbol("a")] = "a";
obj[Symbol.for("b")] = "b";
obj["c"] = "c";
obj.d = "d";
for (var i in obj) {
  console.log(i); // выведет "c" и "d"
}

Symbol("foo") === Symbol("foo"); // false
JSON.stringify({[Symbol("foo")]: "foo"});  // '{}'
```
