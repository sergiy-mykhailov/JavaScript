# JavaScript

## 1. Data types

### 7 встроенных типов:
  null, undefined, boolean, number, string, object и symbol(ES6)

```
typeof 0              // number
typeof true           // boolean
typeof 'Hello'        // string
typeof Math           // object
typeof null           // object (ошибка в языке, сохраняется для совместимости, null – это отдельный тип данных)
typeof Symbol('Hi')   // symbol (New ES6)
typeof function(){}   // "function" (object Но typeof выделяет функции отдельно, возвращая для них "function")
```

## 2. Operators 

### 2.1 Arithmetic

#### Арифметические операции: + * / - %

Приоритет | Название 	  |Обозначение
:--------:|:-----------:|:---------:
15 	      |унарный плюс |	+
15 	      |унарный минус| -
14 	      |умножение    |	*
14 	      |деление 	    | /
13 	      |сложение     | +
13 	      |вычитание    | -
3 	      |присваивание | =


### 2.2. Assignment

```
var a, b, c;

a = b = c = 2 + 2;

alert( a ); // 4
alert( b ); // 4
alert( c ); // 4
```

#### Оператор "=" возвращает значение
```
var a = 1;
var b = 2;

var c = 3 - (a = b + 1);

alert( a ); // 3
alert( c ); // 0
```

#### Инкремент (более короткая запись для i = i + 1):
```
var i = 0;
alert( i++ );      // 0, Постфиксная форма, возвращает старое значение
alert( ++i );      // 2, Префиксная форма, возвращает новое значение
```

#### Декремент (более короткая запись для i = i - 1):
```
var i = 10;
alert( i-- );      // 10, Постфиксная форма, возвращает старое значение
alert( --i );      // 8, Префиксная форма, возвращает новое значение
```

#### Совмещённые операторы
```
var n = 2;
n += 5;     // теперь n=7 (работает как n = n + 5)
n *= 2;     // теперь n=14 (работает как n = n * 2)
```
Так можно сделать для операторов +,-,*,/,% и бинарных <<,>>,>>>,&,|,^

### 2.3. Comparison

Значения разных типов приводятся к числу при сравнении, за исключением строгого равенства === (!==).

#### Операторы сравнения
> < == !=  >= <= === !== >== <== !

#### Сравнение разных типов
```
alert( '2' > 1 );     // true, сравнивается как 2 > 1
alert( '01' == 1 );   // true, сравнивается как 1 == 1
alert( false == 0 );  // true, false становится числом 0
alert( true == 1 );   // true, так как true становится числом 1.
2 == '2'              // True
2 === '2'             // False
undefined == null     // True
undefined === null    // False
false == ""    // true
false == []    // true
false == {}    // false
"" == 0        // true
"" == []       // true
"" == {}       // false
0 == []        // true
0 == {}        // false
0 == null      // false
```
[Чит-лист](http://dorey.github.io/JavaScript-Equality-Table/)

#### Сравнение с null и undefined
1. Значения null и undefined равны == друг другу и не равны чему бы то ни было ещё
2. При преобразовании в число null становится 0, а undefined становится NaN.

```
alert( null > 0 );        // false
alert( null == 0 );       // false
alert(null >= 0);         // true
alert( undefined > 0 );   // false
alert( undefined < 0 );   // false
alert( undefined == 0 );  // false
```

### 2.4. Type Operators

#### Численное преобразование
```
var a = +"123";         // 123
var a = Number("123");  // 123
```
Значение     | Преобразуется в...
-------------|-------------------
undefined	   | NaN
null         | 0
true / false | 1 / 0
''           | 0
'25'         | 25
'abc'        | NaN

#### Логическое преобразование
```
alert( !!"0" ); // true
alert( !!" " ); // любые непустые строки, даже из пробелов - true!
```
Значение        | Преобразуется в...
----------------|-------------------
undefined, null	| false
Числа	          | Все true, кроме 0, NaN -- false.
Строки	        | Все true, кроме пустой строки "" -- false
Объекты	        | Всегда true

```
alert( null >= 0 );       // true, т.к. null преобразуется к 0
alert( null > 0 );        // false (не больше), т.к. null преобразуется к 0
alert( null == 0 );       // false (и не равен!), т.к. == рассматривает null особо.
alert( undefined > 0 );   // false, т.к. undefined -> NaN
alert( undefined == 0 );  // false, т.к. это undefined (без преобразования)
alert( undefined < 0 );   // false, т.к. undefined -> NaN
```

### 2.5. Bitwise

Значение        | Оператор
----------------|-------------------
AND(и)          | & 
OR(или)         | (вертикальная черта) 
XOR(побитовое исключающее или) | ^ 
NOT(не) | ~ 
LEFT SHIFT(левый сдвиг) | << 
RIGHT SHIFT(правый сдвиг) | >> 
ZERO-FILL RIGHT SHIFT(правый сдвиг с заполнением нулями) | >>> 
