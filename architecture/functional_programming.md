# Functional programming

**Функциона́льное программи́рование** — парадигма программирования, в которой процесс вычисления трактуется как вычисление значений функций в математическом понимании последних

## 1. Концепции

### Функции высших порядков
**Функции высших порядков** — это такие функции, которые могут принимать в качестве аргументов и возвращать другие функции.

### Чистые функции
- Одинаковые аргументы всегда дают одинаковый результат.
- Чистая функция не может зависеть от какой-либо переменной, объявленной за пределами своей области видимости.
- Функция не может вызывать побочных эффектов. То есть никаких изменений во внешних переменных, никаких вызовов к console.log и никакого запуска дополнительных процессов.

### Комбинаторы
Комбинаторы похожи на чистые функции, но еще более ограничены.
К комбинатору предъявляются те же требования, что и к чистой функции, но в комбинаторе отсутствуют свободные переменные.
Каждая переменная в комбинаторе должна передаваться через параметры.

### Подход к вычислению аргументов
```
print(len([2+1, 3*2, 1/0, 5-4]))
```
- При **строгом подходе** к вычислению - ошибка, так как в третьем элементе списка присутствует деление на ноль
- При **нестрогом подходе** - 4, для вычисления длины списка, значения его элементов не важны и могут вообще не вычисляться.

### Рекурсия
В функциональных языках цикл обычно реализуется в виде рекурсии.
Для использования цикла for нам, потребуются две свободные переменные (arr и i).
Из-за этого for не будет комбинатором.

### Контейнеры
Невозможно на 100% избавиться от запутанного кода с кучей состояний. 
Решение: изолировать нечистый код из кодовой базы.
Таким образом, весь видоизменяемый, «грязный» код с побочными эффектами будет храниться в одном месте, не «загрязняя» остальную базу. 
Чистая логика будет взаимодействовать с таким кодом с помощью мостов-методов, которые мы создаем для управляемого вызова побочных эффектов и видоизменяемых переменных.

## 2. Сильные стороны
- Повышение надёжности кода
  - чёткая структуризация и отсутствие необходимости отслеживания побочных эффектов
  - функция работает только с локальными данными и работает с ними всегда одинаково
  - Невозможность мутации данных при пользовании ими в разных местах программы
- Удобство организации модульного тестирования
  - Не может порождать побочные эффекты, менять объекты, только возвращает результат - удобство тестирования.
- Возможности оптимизации при компиляции
- Возможности параллелизма

## 3. Слабые стороны
- Отсутствие присваиваний и замена их на порождение новых данных приводят к необходимости постоянного выделения и автоматического освобождения памяти
- Нестрогая модель вычислений приводит к непредсказуемому порядку вызова функций, что создаёт проблемы при вводе-выводе, где порядок выполнения операций важен.

## 4. Функции
### Функция compose
**compose** - функция для объединения нескольких функций в одну
```javascript
const compose = (...fns) => x => fns.reduceRight((res, fn) => fn(res), x);

const centsToDollars = compose(
  addSeparators,
  addDollarSign,
  roundTo2dp,
  divideBy100,
);
```

### Функция pipeline
```javascript
const add = x => x + 10
const subtract = x => x - 5

let val1 = add(subtract(add(subtract(10))));
console.log(val1);

const pipeline = (...fns) => x => fns.reduce((res, fn) => fn(res), x);
const func = pipeline(subtract, add, subtract, add);
console.log(func(10));
```

### Функция tap
Функция tap запускает функцию с заданным объектом, а затем возвращает этот объект
```javascript
const tap = f => x => {
  f(x);
  return x;
};
```
Выполнять дополнительные функции, передаваемых в compose и не влиять при этом на результат.
`tap` является идеальным местом для логирования данных в консоль.

### Функция trace

```javascript
const trace = label => tap(console.log.bind(console, label + ':'));
```
Можно добавить функции trace и следить за передачей объекта между другими объектами:
```javascript
const centsToDollars = compose(
  trace('addSeparators'),
  addSeparators,
  trace('addDollarSign'),
  addDollarSign,
  trace('roundTo2dp'),
  roundTo2dp,
  trace('divideBy100'),
  divideBy100,
  trace('argument'),
);
```

### Каррирование
**Каррирование** – это трансформация функций таким образом, 
чтобы они принимали аргументы не как `f(a, b, c)`, а как `f(a)(b)(c)`.
Каррирование не вызывает функцию. Оно просто трансформирует её. 
```javascript
function curry(f) { // curry(f) выполняет каррирование
  return function(a) {
    return function(b) {
      return f(a, b);
    };
  };
}

// использование
function sum(a, b) {
  return a + b;
}
let curriedSum = curry(sum);
alert( curriedSum(1)(2) ); // 3
```
Универсальная функция каррирования:
```javascript
function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  };
}
function sum(a, b, c) {
  return a + b + c;
}
let curriedSum = curry(sum);
console.log( curriedSum(1, 2, 3) ); // 6
console.log( curriedSum(1)(2,3) );  // 6
console.log( curriedSum(1)(2)(3) ); // 6
```

### Partial application
Частичное применение - это применение к функции некоторых аргументов и возврат новой функции, 
в ожидании остальных аргументов. 
Примененные аргументы хранятся в замыкании.

```javascript
const getApiURL = (apiHostname, resourceName, resourceId) => {
  return `https://${apiHostname}/api/${resourceName}/${resourceId}`
}

const partial = (fn, ...argsToApply) => {
  return (...restArgsToApply) => {
    return fn(...argsToApply, ...restArgsToApply)
  }
}
const getResourceURL = partial(getApiURL, 'localhost:3000')
const getUserURL = partial(getResourceURL, 'users')

// alternatively:
const getResourceURL = getApiURL.bind(null, 'localhost:3000')
const getUserURL = getResourceURL.bind(null, 'users')
```

### Functor
Любой класс (или функция-конструктор) или тип данных, хранящий значение и реализующий метод map, называется функтором (Functor).
```javascript
const Functor = (v) => ({
  value: v,
  map: (f) => Functor(f(v))
});

var s =  Functor(2)
.map(x=>x*x)
.map(x=>x.toString());
 
console.log(s.value);
```

### Monad
Монады — это классы или функции-конструкторы, 
хранящие значение и реализующие методы map, ap, of и chain
```javascript
const Monad = (v) => ({
  value: v,
  map: (f) => Monad(f(v)),
  of: () => Monad(v),
  chain: (f) => f(x),
});
```
Monad types: Maybe, Either, List, Identity...

### Endofunctor
Endofunctor - functor that transforms a category into itself. 

### Tail recursion vs non-tail recursion
```javascript
// non-tail recursion - recursion call, then calculation
function factorial(number) {
  if(number === 1) {
    return number;
  } else {
    return number * factorial(number - 1);
  }
}

// tail recursion - calculation, then recursion call
function tailFactorial(number, result = 1) {
  if(number === 1) {
    return result;
  } else {
    return tailFactorial(number - 1, result * number);
  }
}
```