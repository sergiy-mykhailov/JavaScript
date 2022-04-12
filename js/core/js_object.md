# Object
***

## Object info
Object:
- Property keys must be strings or symbols (usually strings).
- Values can be of any type.
- JavaScript automatically converts keys to a string a value

```javascript
var test = {
  true: 'True Boolean',
  false: 'False Boolean',
  null: 'Null data type',
  undefined: 'Undefined data type',
  1: 'Number One'
};

console.log(test[true]);      // 'True Boolean'
console.log(test.true);       // 'True Boolean'
console.log(test[false]);     // 'False Boolean'
console.log(test.false);      // 'False Boolean'
console.log(test[null]);      // 'Null data type'
console.log(test.null);       // 'Null data type'
console.log(test[undefined]); // 'Undefined data type'
console.log(test.undefined);  // 'Undefined data type'
console.log(test[1]);         // "Number One"
console.log(test['1']);       // it also displays "Number One"
console.log(test.1);          // it will fail
var { 1 } = test;             // it will fail as 1 it is not a correct identifier
var { 1: number } = test;     // it will succeed
console.log(number);          // it displays "Number One"
```

## Объект-Дескриптор (descriptor)
Объект, чьи собственные перечисляемые свойства представляют собой дескрипторы для создаваемых или изменяемых свойств.
###### Параметры:
* `configurable` - true если свойство может быть изменено или может быть удалено (Default: false).
* `enumerable` - true если это свойство можно увидеть через перечисление свойств (Default: false).
* `value` - Значение, ассоциированное со свойством. Может быть любым допустимым значением JavaScript
  (числом, объектом, функцией и т.д.). (Default: undefined).
* `writable` - true если значение может быть изменено с помощью оператора присваивания. (Default: false).
* `get` - Функция, используемая как геттер свойства, либо undefined, если свойство не имеет геттера. (Default: undefined).
* `set` - Функция, используемая как сеттер свойства, либо undefined, если свойство не имеет сеттера. (Default: undefined).

## Object methods
#### `Object.assign(target, ...sources)`
Создаёт новый объект путём копирования значений всех собственных перечислимых свойств из одного
или более исходных объектов в целевой объект.

#### `Object.create(proto[, descriptor])`
Создаёт новый объект с указанными объектом прототипа и свойствами.

#### `Object.defineProperties(obj, descriptor)`
Определяет новые или изменяет существующие свойства, непосредственно на объекте, возвращая этот объект.

#### `Object.defineProperty(obj, propName, descriptor)`
Определяет новое или изменяет существующее свойство непосредственно на объекте, возвращая этот объект.

#### `Object.freeze(obj)`
Замораживает объект: другой код не сможет удалить или изменить никакое свойство.

#### `Object.getOwnPropertyDescriptor(obj, propName)`
Возвращает дескриптор свойства для именованного свойства объекта.

#### `Object.getOwnPropertyNames(obj)`
Возвращает массив, содержащий имена всех переданных объекту собственных перечисляемых и не перечисляемых свойств.

#### `Object.getOwnPropertySymbols(obj)`
Возвращает массив всех символьных свойств, найденных непосредственно в переданном объекте.

#### `Object.getPrototypeOf(obj)`
Возвращает прототип указанного объекта.

#### `Object.is(value1, value2)`
Определяет, являются ли два значения одинаковыми

#### `Object.isExtensible(obj)`
Определяет, разрешено ли расширение объекта.

#### `Object.isFrozen(obj)`
Определяет, был ли объект заморожен.

#### `Object.isSealed(obj)`
Определяет, является ли объект запечатанным (sealed).
Объект является запечатанным, если он является не расширяемым и если все его свойства являются не настраиваемыми и,
следовательно, не удаляемыми (но не обязательно не записываемыми).

#### `Object.observe(obj, function calback(changes) {})`
Асинхронно наблюдает за изменениями в объекте.

#### `Object.preventExtensions(obj)`
Предотвращает любое расширение объекта.

#### `Object.seal(obj)`
Предотвращает удаление свойств объекта другим кодом.

#### `Object.setPrototypeOf(obj, prototype)`
Устанавливает прототип (т.е. внутреннее свойство [[Prototype]])

#### `Object.keys(obj)`
возвращает массив из собственных перечисляемых свойств переданного объекта.
`for...in` (разница между циклом и методом в том, что цикл перечисляет свойства и из цепочки прототипов).

#### `Object.prototype.valueOf()`
возвращает примитивное значение указанного объекта
```javascript
var obj = new Object();
console.log(obj.valueOf());      // [object Object]

obj.__proto__.valueOf = () => 'Hello object!'
console.log(obj.valueOf());      // 'Hello object!'
```

#### `Object.prototype.toString()`
Строка, представляющая объект
```javascript
var obj = new Object();
console.log(obj.toString());      // [object Object]

obj.__proto__.toString = () => 'Hello object!'
console.log(obj.toString());      // 'Hello object!'

var toString = Object.prototype.toString;
console.log(toString.call(new Date));    // [object Date]
console.log(toString.call(new String));  // [object String]
console.log(toString.call(Math));        // [object Math]
console.log(toString.call(undefined));   // [object Undefined]
console.log(toString.call(null));        // [object Null]
console.log(toString.call({}));          // [object Object]
class SomeClass {}
console.log(toString.call(new SomeClass));  // [object Object]
```

#### `obj[Symbol.toPrimitive]`
описывает свойство объекта как функцию, которая вызывается при преобразовании объекта в соответствующее примитивное значение.
```javascript
var obj1 = {};
console.log(+obj1);     // NaN
console.log(`${obj1}`); // "[object Object]"
console.log(obj1 + ''); // "[object Object]"

var obj2 = {
  [Symbol.toPrimitive](hint) {
    if (hint == 'number') return 10;
    if (hint == 'string') return 'hello';
    return true;
  }
};
console.log(+obj2);     // 10        -- желаемый тип (hint) - "number"
console.log(`${obj2}`); // "hello"   -- желаемый тип (hint) - "string"
console.log(obj2 + ''); // "true"    -- желаемый тип (hint) - "default"
```

# Math

# Reflect
## Reflect info
**Reflect** - это встроенный объект, который предоставляет методы для перехватываемых JavaScript операций.
это API, который предоставляет возможность проводить реверс-инжиниринг объектов.

## Reflect methods
#### `Reflect.apply(target, this, args)`
вызывает переданную ему функцию с указанными аргументами.

#### `Reflect.construct(obj, args[, newTarget])`
Оператор `new` как функция.

#### `Reflect.defineProperty(obj, propName, descriptor)`
Похож на `Object.defineProperty()`. Возвращает Boolean.

#### `Reflect.deleteProperty(obj, propName)`
Оператор `delete` как функция. Аналогично `delete target[name]`.

#### `Reflect.enumerate(obj)`
Похож на цикл for...in. Возвращает итератор с собственными перечисляемыми и наследуемыми свойствами целевого объекта.

#### `Reflect.get(obj, propName[, this])`
Функция, которая возвращает значение свойств.

#### `Reflect.getOwnPropertyDescriptor(obj, propName)`
Аналогично `Object.getOwnPropertyDescriptor()`. 
Возвращает дескриптор указанного свойства если присутствует в объекте, иначе `undefined`.

#### `Reflect.getPrototypeOf(obj)`
Аналогично `Object.getPrototypeOf()`.

#### `Reflect.has(obj, propName)`
Оператор `in` как функция. 
Возвращает значение `Boolean` в зависимости от факта наличия собственного или наследованного свойства.

#### `Reflect.isExtensible(obj)`
Аналогично `Object.isExtensible()`.

#### `Reflect.ownKeys(obj)`
Возвращает массив строк с именами собственных (не наследованных) свойств.

#### `Reflect.preventExtensions(obj)`
Аналогично `Object.preventExtensions()`. Возвращает `Boolean`.

#### `Reflect.set(obj, propName, value, this)`
Функция, присваивающая значения свойствам. Возвращает `Boolean` значение `true` при успешном выполнении.

#### `Reflect.setPrototypeOf(obj, prototype)`
Функция, присваивающая прототип целевому объекту.

# Proxy
## Proxy info
**Proxy** позволяет создать прокси для другого объекта, может перехватывать и переопределить основные операции для данного объекта.

```javascript
var handler = {
    get: function(target, name){
        return (name in target) ? target[name] : 37;
    },
    set: function(obj, prop, value) {
        if (value > 200) {
            throw new RangeError('Invalid value');
        }
        obj[prop] = value;
    }
};
var p = new Proxy({}, handler);
p.a = 1;
p.b = undefined;
console.log(p.a, p.b);      // 1, undefined
console.log('c' in p, p.c); // false, 37
p.w = 100                   // 100
p.w = 300                   // Error: 'Invalid value'

var target = {};
var p = new Proxy(target, {});
p.a = 37; // операция перенаправлена прокси
console.log(target.a); // 37. Операция была успешно перенаправлена
```
More info: [mdn](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

# Generator
## Generator info
Генератор - это объект, возвращаемый функцией-генератором
```javascript
function* generator() {
  yield 1;
  yield 2;
}
const gen = generator();    // "Generator { }"
console.log(gen.next());    // { done: false, value: 1 }
console.log(gen.next());    // { done: true, value: 2 }
console.log(gen.return());  // { value: undefined, done: true }
console.log(gen.return(1)); // { value: 1, done: true }
gen.throw(new Error('Something went wrong')); // "Error caught!" - { value: 2, done: true }
```

## Generator methods
### `Generator.prototype.next(value)`
Возвращает значение, полученное выражением yield. `{ done: boolean, value: any }`
### `Generator.prototype.return(value)`
Возвращает заданное значение и заканчивает генератор. `{ done: boolean, value: any }`
### `Generator.prototype.throw(exception)`
Выдаёт ошибку генератора.

# Iterator
**Iterator** умеет обращаться к элементам коллекции по одному за раз, 
при этом отслеживая своё текущее положение внутри этой последовательности.
Имеет метод next(), возвращает: `{ done: boolean, value: any }`

# Promise
## Promise info
Promise может находиться в трёх состояниях:
- ожидание (pending): начальное состояние, не исполнен и не отклонён.
- исполнено (fulfilled): операция завершена успешно.
- отклонено (rejected): операция завершена с ошибкой.

```javascript
var promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('foo');
    // reject("failure reason");
  }, 300);
});

promise1.then(
  (value) => { console.log(value); }, // output: "foo"
  (reason) => { console.log(reason); }, // if error, output: "failure reason"
).then((value) => {
  console.log(value);  // output: "undefined"
  return 'new foo'
}).then((value) => {
  console.log(value);  // output: " new foo"
  return 'again foo'
}).catch((reason) => {
  console.log(reason);  // if error, output: "failure reason"
}).finally(() => {
  console.log('finally');
});

console.log(promise1);  // expected output: [object Promise]

Promise.resolve(2).finally(() => {}) // value = 2
Promise.reject(3).finally(() => {})  // reason = 3
```

## await in the top-level code
```javascript
let value
const func1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      value = 'hello';
      resolve(value);
    }, 2000);
  });
}
await func1()                 // SyntaxError: await is only valid in async function
console.log('value:', value)  // undefined

async function getData() {
  return await Promise.resolve('some data');
}
const data = getData();
console.log(data);            // Promise { <state>: "pending" }
```

## Methods
### `Promise.all(iterable)`
Ожидает исполнения всех промисов или отклонения любого из них.
Возвращает промис, который исполнится после исполнения всех промисов в iterable.
### `Promise.allSettled(iterable)`
Ожидает завершения всех полученных промисов (как исполнения так и отклонения).
Возвращает промис, который исполняется когда все полученные промисы завершены (исполнены или отклонены)
### `Promise.race(iterable)`
Ожидает исполнения или отклонения любого из полученных промисов.
Возвращает промис, который будет исполнен или отклонён с результатом исполнения первого исполненного или отклонённого промиса.
### `Promise.reject(reason)`
Возвращает промис, отклонённый из-за reason.
### `Promise.resolve(value)`
Возвращает промис, исполненный с результатом value.

