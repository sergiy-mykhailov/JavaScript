# Function


## Closures
### Using Closures for Private Variables
```javascript
function createAnimal(name, job) {
  // "Private" variables here:
  let _name = name;
  // Public variables here:
  return {
    // Getter Methods
    getName() {
      return _name;
    },
    // Setter Methods
    setName(newName) {
      _name = newName;
    },
  };
}

```

## declaration

## arguments array

## invocation

## this
`this` ссылается на контекст выполняемой функции.

### Global контекст
За пределами каких-либо функций `this` ссылается на глобальный объект вне зависимости от режима (строгий или нестрогий).
```javascript
this === window;  // true: window - глобальный объект в браузере
this === global;  // true: global - глобальный объект в Node
```

### Function контекст
по умолчанию будет использоваться объект global.
```javascript
function f1(){ return this; }
f1() === window;  // window - глобальный объект в браузере
f1() === global;  // global - глобальный объект в Node
```
В строгом режиме, если значение this не установлено в контексте выполнения, оно остаётся undefined
```javascript
function f2(){
  "use strict";
  return this;
}
f2() === undefined; // true
```
Вызов с привязкой this
```javascript
var obj = { a: 'Custom' };
var a = 'Global';

function whatsThis() { return this.a; }
var func = whatsThis.bind(obj);
whatsThis();               // 'Global'
whatsThis.call(obj);       // 'Custom'
whatsThis.apply(obj);      // 'Custom'
func(obj);                 // 'Custom'

var whatsThisArrow = () => { return this.a; }
var funcArrow = whatsThisArrow.bind(obj);
whatsThisArrow();          // 'Global'
whatsThisArrow.call(obj);  // 'Global'
whatsThisArrow.apply(obj); // 'Global'
funcArrow(obj);            // 'Global'
```

### Object контекст
```javascript
const test = {
  prop: 42,
  func: function() { return this.prop; },
};
console.log(test.func()); // expected output: 42
```

### Class контекст
Когда функция используется как конструктор (с ключевым словом `new`), `this` связано с создаваемым новым объектом.

## arrow functions
### Can arrow function be a constructor?
```
class ClassA {
  constructor() {}
}
const a = new ClassA()                 // ok

class ClassB {
  constructor = () => {}
}
const b = new ClassB()                 // SyntaxError: Classes may not have a field named 'constructor'

function FunctionConstructorC() {}
const c = new FunctionConstructorC()   // ok

const FunctionConstructorD = () => {}
const d = new FunctionConstructorD()   // TypeError: FunctionConstructorD is not a constructor
```

## decorators
```javascript
function decorator(func) {
  return function() {
    console.log('hello decorator')
    return Reflect.apply(func, this, arguments);
  }
}
const someFunction = function (a, b) { return a + b }
const decoratedFunction = decorator(someFunction);
decoratedFunction(1, 2) // 'hello decorator'
```

## recursion
The maximal recursion depth is limited by JavaScript engine.
- 10 000 - ok (browser, node)
- more then 10 000 - Uncaught InternalError: too much recursion (browser, node)
