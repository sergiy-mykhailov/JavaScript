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