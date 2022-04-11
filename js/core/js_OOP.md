# **OOP**
***

# function as constructor
```javascript
function User(name) {
  // this = {};     // (неявно)
  this.name = name; // разработчик явно добавляет свойства к this
  // return this;   // (неявно)
}
const user = new User('Valera')
```

# `prototype` vs `__proto__ `
`prototype` - свойство класса, указывает на родительский объект.

`__proto__` - свойство класса/экземпляра, геттер/сеттер для `[[Prototype]]`

# Chain of prototypes
```javascript
var a = { a: 1 };// a ---> Object.prototype ---> null
var o = ["yo", "hello", "?"]; // o ---> Array.prototype ---> Object.prototype ---> null
function f(){ return 2; } // f ---> Function.prototype ---> Object.prototype ---> null

var b = { b: 2 }
b.__proto__ = a // b ---> a ---> Object.prototype ---> null
b     // { b: 2 }
b.a   // 1

const c = { c: 3 }
function Dog(){ this.b = 2 }
Dog.prototype = c       // b ---> c ---> Object.prototype ---> null
const dog = new Dog()
b     // { b: 2 }
dog.c // 3

var a = { a: 1 };           // a ---> Object.prototype ---> null
var b = Object.create(a);   // b ---> a ---> Object.prototype ---> null
var c = Object.create(b);   // c ---> b ---> a ---> Object.prototype ---> null
```

# ООП в функциональном стиле
```javascript
function ParentClass(param1, param2) {
  // локальные переменные и функции доступны только внутри
  var somePrivateProperty = 'value of private property';
  function privateMethod() {}
  
  // публичные доступны снаружи
  this.publicProperty = 'value of public property';
  this.publicMethod = function() {};
  
  // публичные геттеры, сеттеры
  this.getProperty = function() {
    return somePrivateProperty;
  };
  this.setProperty = function(newValue) {
    somePrivateProperty = newValue;
  };
  
  // публичный единый геттер-сеттер
  this.privateProperty = function(newValue) {
    if (!arguments.length) return somePrivateProperty;
    somePrivateProperty = newValue;
  };
 
  // условно защищённые приватные свойства и методы (для потомков)
  this._protectedProperty = 'protected value';
  this._protectedMethod = function() {};
}
 
function ChildClass(param3, param4) {
  // универсальный вызов с передачей любых аргументов
  ParentClass.apply(this, arguments);
  
  // собственные свойства
  this.childPublicProperty = 'child public value';
  
  // переопределение родительского свойства
  this._protectedProperty = 'new protected value';
  
  // переопределение(расширение) родительского метода
  var parentProtected = this._protectedMethod;
  this._protectedMethod = function(args) {
    parentProtected.apply(this, args);
    // ...
  };
}
  
var instanceClass = new ChildClass('value1', 'value2');
instanceClass.publicProperty = 'new value';
instanceClass.publicMethod();
instanceClass.childPublicProperty = 'other value';
```

# ООП в прототипном стиле
```javascript
// 1. конструктор Parent
function ParentClass(param1) {
  this.param1 = param1;
  this.param2 = 0;
}
  
// 2. методы в прототипе Parent
ParentClass.prototype.publicMethod = function() {};
ParentClass.prototype.otherPublicMethod = function() {};
  
// 3. конструктор Child
function ChildClass(param1) {
  this.param1 = param1;
  this.someProperty = 'value';
}
  
// 4. Наследование
ChildClass.prototype = Object.create(ParentClass.prototype);
ChildClass.prototype.constructor = ChildClass;
  
// 5. методы в прототипе Child
ChildClass.prototype.childPublicMethod = function() {};
  
// 6. переопределение(расширение) родительского метода
ChildClass.prototype.publicMethod = function() {
  // вызвать метод родителя, передав ему текущие аргументы
  ParentClass.prototype.publicMethod.apply(this, arguments);
  // ...
}
```

# ООП в ES6
```javascript
class ParentClass {
  // конструктор
  constructor(param1) {
    this.someProperty = param1;
  }
  
  // методы
  someMethod() {};
  
  // геттер
  get property() {
    return this.someProperty;
  }
  
  // сеттер
  set property(newValue) {
    this.someProperty = newValue;
  }
  
  // Статические свойства
  static getCurrentDate() {
    return new Date();
  }
}
  
class ChildClass extends ParentClass {
  // конструктор
  constructor(...args) {
    super(...args);
    this.param2 = 'value';
  }
  
  // переопределение
  someMethod() {
    super.someMethod();
    // ...
  }
}
```
