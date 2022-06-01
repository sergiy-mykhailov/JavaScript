# Number
***

[Numbers on MDN](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Number)

## Converting

### parseInt(string[, radix])
**parseInt()** принимает строку в качестве аргумента и возвращает целое число в соответствии с указанным основанием системы счисления.
* `string` - строка.
* `radix` - основание системы счисления. (Целое число между 2 и 36. По умолчанию: 10)

```JavaScript
parseInt("015", 10);            // 15
parseInt(" 0xF", 16);           // 15
parseInt("1111", 2);            // 15
parseInt("15px", 10);           // 15
parseInt("15e2", 10);           // 15
parseInt("Hello", 8);           // NaN
parseInt(-15.1, 10);            // -15
parseInt(0.00000000000434, 10); // 4
```

### parseFloat(string)
**parseFloat()** принимает строку в качестве аргумента и возвращает десятичное число (число с плавающей точкой)
* `string` - строка.
```javascript
parseFloat("3.14");   // 3.14
parseFloat("314e-2"); // 3.14
parseFloat("2.5km");  // 2.5 
parseFloat("FF2");    // NaN
```

### isNaN(value)
**isNaN()** определяет является ли литерал или переменная нечисловым значением (NaN) или нет.
* `value` - литерал или переменная.

```javascript
isNaN(NaN);       // true
isNaN(undefined); // true
isNaN({});        // true
isNaN(true);      // false
isNaN(null);      // false
isNaN(37);        // false
isNaN("37.37");   // false: "37.37" преобразуется в число 37.37 которое не NaN
isNaN("");        // false: пустая строка преобразуется в 0 которое не NaN
isNaN("37,5");    // true
isNaN(new Date());                // false
isNaN(new Date().toString());     // true
// Пример почему использование isNaN не всегда уместно:
isNaN("blabla")   // true: "blabla" преобразованно в число. 
```
**P.S.** Более надёжный метод для проверки: `Number.isNaN()`

### Number.isNaN()
```javascript
Number.isNaN(NaN);                    // true
Number.isNaN(undefined);              // false
Number.isNaN({});                     // false
Number.isNaN(true);                   // false
Number.isNaN(null);                   // false
Number.isNaN(37);                     // false
Number.isNaN("37.37");                // false
Number.isNaN("");                     // false
Number.isNaN("37,5");                 // false
Number.isNaN(new Date());             // false
Number.isNaN(new Date().toString());  // false
Number.isNaN("blabla");               // false
```

### isFinite(testValue)
**isFinite()** определяет, является ли переданное значение конечным числом.
* `testValue` - литерал или переменная.

```javascript
isFinite(Infinity);   // false
isFinite(NaN);        // false
isFinite(-Infinity);  // false
isFinite(0);          // true
isFinite(2e64);       // true
isFinite("0");        // true
Number.isFinite("0"); // false
```
**P.S.** Более надёжный метод для проверки: `Number.isFinite()`

## Properties

* **Number.EPSILON** - Наименьший интервал между двумя представимыми числами.
* **Number.MAX_SAFE_INTEGER** - Максимальное целое число, которое можно безопасно использовать в JavaScript (253 - 1).
* **Number.MAX_VALUE** - Наибольшее представимое положительное число.
* **Number.MIN_SAFE_INTEGER** - Минимальное целое число, которое можно безопасно использовать в (-(253 - 1)).
* **Number.MIN_VALUE** - Наименьшее представимое положительное число — то есть, самое близкое к нулю положительное число (которое ещё не является нулём).
* **Number.NaN** - Специальное значение для представления «не числа».
* **Number.NEGATIVE_INFINITY** - Специальное значение для представления отрицательной бесконечности; возвращается при переполнении.
* **Number.POSITIVE_INFINITY** - Специальное значение для представления положительной бесконечности; возвращается при переполнении.
* **Number.prototype** - прототип объекта Number. 

## Methods
* **Number.isNaN(value)** - Определяет, является ли переданнное значение значением NaN.
* **Number.isFinite(value)** - Определяет, является ли переданное значение конечным числом.
* **Number.isInteger(value)** - Определяет, является ли тип переданного значения «числом», а само число — целым значением.
* **Number.isSafeInteger(value)** - Определяет, является ли переданное значение безопасным целым числом (числом в диапазоне от -(253 - 1) до 253 - 1).
* **Number.parseFloat(string)** - Представляет собой тот же самый метод, что и метод parseFloat глобального объекта.
* **Number.parseInt(string[, radix])** - Представляет собой тот же самый метод, что и метод parseInt глобального объекта.
* **Number.prototype.toExponential([digits])** - Возвращает строку, представляющую число в экспоненциальной записи.
  * `digits` - Количество цифр после десятичной запятой.
* **Number.prototype.toFixed([digits])** - Возвращает строку, представляющую число в записи с фиксированной запятой.
  * `digits` - Количество цифр после десятичной запятой.
* **Number.prototype.toLocaleString([locales[, options]])** - Возвращает строку с языко-зависимым представлением числа.
  * `locales` - Строка с языковой меткой BCP 47, либо массив таких строк.
  * `options` - Объект с некоторыми или всеми из следующих свойств:
    * `localeMatcher` - Используемый алгоритм сопоставления локалей. Возможные значения "lookup", "best fit"; (Default: "best fit")
    * `style` - Используемый стиль форматирования. Возможные значения: "decimal", "currency", "percent" (Default: "decimal")
    * `currency` - Валюта, используемая при форматировании валют. Возможные значения: коды валют ISO 4217.
    * `currencyDisplay` - Отображение валюты. Возможные значения: "symbol", "code", "name" (Default: "symbol")
    * `useGrouping` - Определяет, использовать ли разделители групп разрядов (Default: true)
    * `minimumIntegerDigits` - Минимальное используемое количество цифр целой части числа. от 1 до 21 (Default: 1)
    * `minimumFractionDigits` - Минимальное используемое количество цифр дробной части числа. от 0 до 20  (Default: 0)
    * `maximumFractionDigits` - Максимальное используемое количество цифр дробной части числа. от 0 до 20 (Default: minimumFractionDigits)
    * `minimumSignificantDigits` - Минимальное используемое количество значащих цифр числа. от 1 до 21 (Default: 1)
    * `maximumSignificantDigits` - Максимальное используемое количество значащих цифр числа. от 1 до 21 (Default: minimumSignificantDigits)
* **Number.prototype.toPrecision([precision])** - Возвращает строку, представляющую число с указанной точностью в экспоненциальной записи, либо записи с фиксированной запятой.
  * `precision` - Количество значащих цифр.
* **Number.prototype.toSource()** - Возвращает объектный литерал, представляющий объект Number; вы можете использовать это значение для создания нового объекта.
* **Number.prototype.toString([radix])** - Возвращает строку, представляющую указанный объект по указанному основанию системы счисления.
  * `radix` - основание системы счисления.
* **Number.prototype.valueOf()** - Возвращает примитивное значение указанного объекта.

## Other

### What is the result of addition 1 to max value of integer?
```javascript
Number.MAX_VALUE === Number.MAX_VALUE + 1 // true
```
