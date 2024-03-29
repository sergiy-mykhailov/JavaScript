# CSS

[Справочник](https://webref.ru/css)

## Selectors

* `A` - любой элемент HTML (`div`, `span`, `h1`, ...)
* `#id` - Обращение по атрибуту `id`,
* `.class` - Обращение по атрибуту `class`,
* `.class1.class2` - для элементов, у которых одновременно заданы классы class1 и class2
* `*` - для всех элементов
* `A   B` - Применяется для элемента В вложенного в элемент А (произвольный уровень вложения)
* `A > B` - Стиль применяется к элементу B, только когда он является дочерним для элемента A.
* `A + B` - Стиль при такой записи применяется к элементу B, но только в том случае, 
если он является соседним для элемента A и следует сразу после него.
* `E ~ F` - применяется к элементу F в том случае, если он имеет того же родителя, что и элемент E и следует после него.
* `[attr]` - Стиль применяется к тем элементам, внутри которых добавлен указанный атрибут
* `[attr='value']` - применяется ко всем тегам, которые содержат указанное значение атрибута
* `[attr^='value']` - применяется ко всем элементам, у которых значение атрибута начинаются с указанного текста.
* `[attr$='value']` - применяется ко всем элементам у которых значение атрибута завершается заданным текстом. 
* `[attr*='value']` - применяется если значение атрибута содержит указанный текст
* `[attr~='value']` - применяется если значение атрибута (перечисляться через пробел) содержит указанный текст
* `[attr|='value']` - Стиль применяется к элементам, у которых атрибут точно равен указанному значению 
или начинается с указанного значения, после которого идёт дефис.


## 3. @-правила

### `@charset`
для задания кодировки внешнего CSS-файла
```css
@charset "utf-8";
```

### `@document` 
Устанавливает стилевые правила на основе адреса документа
```css
@document [url(<адрес>) [, url-prefix(<адрес>)][, domain(<адрес>)][, regexp(<адрес>)] ] {
   /* Стилевые правила */
}
```
###### Значения
* `url()` - Указывает точный адрес страницы, для которой применяются стилевые правила. Адрес пишется внутри скобок url().
* `url-prefix()` - Значение, с которого начинается адрес документа.
* `domain()` - Домен или поддомен сайта.
* `regexp()` - Регулярное выражение которому соответствует адрес.   

### `@font-face` 
Позволяет определить настройки шрифтов, а также загрузить специфичный шрифт
```css
@font-face { /* свойства шрифта */ }
```
###### Значения
* `src: url(<адрес>)` — относительный или абсолютный путь к файлу.
* параметры шрифта (font-family, font-size, font-style и др.)

### `@import` 
Позволяет импортировать содержимое CSS-файла в текущую стилевую таблицу
```
@import url("имя файла") [типы носителей];
```
**Типы носителей:**
* `all` - Все типы. Это значение используется по умолчанию.
* `print` - Печатающие устройства вроде принтера.
* `screen` - Экран монитора.

### `@keyframes` 
Устанавливает ключевые кадры при анимации элемента
```
@keyframes <переменная> { [ from | to | <проценты> ] [, from | to | <проценты> ]* }

```
###### Значения
* `<переменная>` - Уникальная переменная, которая связывает @keyframes с animation, 
через это свойство настраивается время анимации и другие её параметры.
* `from` - Первый ключевой кадр, аналогичен 0%.
* `to` - Последний ключевой кадр, аналогичен 100%.
* `<проценты>` -  Устанавливает ключевой кадр в процентах от времени всей анимации.
###### Пример
```css
@keyframes box {
 from { left: 0; }
 to { left: 300px; }
}
```

### `@media` 
Позволяет указать тип носителя, для которого будет применяться указанный стиль
```
@media <тип носителя> {
  <стилевые правила>
}
// examples:
@media (max-width: 12450px) { ... } //  ширина viewport меньше или равна 12450px
@media screen and (min-width: 1000px) and (orientation: landscape) { ...  }
```
**Типы носителей:**
* `all` -	Все типы. Это значение используется по умолчанию.
* `print` -	Принтеры и другие печатающие устройства.
* `screen` -	Экран монитора.
* `speech` -	Речевые синтезаторы, а также программы для воспроизведения текста вслух. Сюда, например, можно отнести речевые браузеры.

### `@page` 
Позволяет задать значение полей при печати документа или для страниц, у которых тип носителя задан как print
```
@page [ { :left | :right | :first } ] {
    /* стилевые правила */
}
```

### `@supports` 
Позволяет проверить, поддерживает браузер ту или иную возможность, и на основе этого создать набор стилевых правил
```
@supports <условие> {
  /* <стилевые правила> */
}
```
###### Пример
```css
@supports (perspective: 300px) or (transform: perspective(300px)) {
  /* Браузер поддерживает свойство perspective ИЛИ 
     свойство transform с функцией perspective() */
}
```

### `@viewport` 
Позволяет оптимизировать макет веб-страницы в зависимости от различных устройств и их размеров
```
@viewport {
 <дескриптор>: <значение>;
}
```
**Дескрипторы:**
* `min-width` -	Минимальная ширина области просмотра.
* `max-width` -	Максимальная ширина области просмотра.
* `width` - Одновременно устанавливает min-width и max-width.
* `min-height` - Минимальная высота области просмотра.
* `max-height` - Максимальная высота области просмотра.
* `height` - Одновременно устанавливает min-height и max-height.
* `zoom` - Устанавливает начальный масштаб документа, (auto, <число>, <проценты>)
* `min-zoom` - Устанавливает минимальный масштаб документа
* `max-zoom` - Устанавливает максимальный масштаб документа
* `user-zoom` - Определяет, может пользователь масштабировать документ или нет. (zoom, fixed)
* `orientation` - Управляет ориентацией документа (auto, portrait, landscape)


## 4. Псевдоклассы

* `:active` - определяет стиль активного элемента (между щелчком и отпусканием клавиши мыши)
* `:checked` - применяется к элементам интерфейса (checkbox, radio, option), когда они находятся в положение «включено».
* `:default` - применяет стиль к элементам форм, которые установлены по умолчанию в группе похожих элементов
* `:disabled` - используется для применения стиля к заблокированным элементам форм
* `:empty` - представляет пустые элементы (не содержат дочерних элементов, текста или пробелов)
* `:enabled` - используется для применения стиля к доступным (не заблокированным) элементам форм
* `:first-child` - применяет стилевое оформление к первому дочернему элементу своего родителя
* `:first-of-type` - для первого элемента в списке дочерних элементов своего родителя
* `:focus` - для элемента, получающего фокус
* `:fullscreen` - применяется к элементам, когда браузер находится в полноэкранном режиме
* `:hover` - Определяет стиль элемента при наведении на него курсора мыши
* `:in-range` - Применяется к элементам форм, у которых введённое пользователем значение находится в заранее заданном диапазоне
* `:indeterminate` - задаёт стиль для переключателей, когда они находятся в неопределённом состоянии
* `:invalid` - Применяется к полям формы, содержимое которых не соответствует указанному типу
* `:lang` - Определяет язык, который используется в документе или его фрагменте
* `:last-child` - задаёт стилевое оформление последнего элемента своего родителя
* `:last-of-type` - задаёт правила стилей для последнего элемента определённого типа в списке дочерних элементов своего родителя
* `:link` -  применяется к ссылкам, которые ещё не посещались пользователем
* `:not` - задаёт правила стилей для элементов, которые не содержат указанный селектор
* `:nth-child(odd | even | <число> | <выражение>)` - для элементов с нумерацией в дереве
* `:nth-last-child(odd | even | <число> | <выражение>)` - для элементов с нумерацией в дереве
* `:nth-last-of-type(odd | even | <число> | <выражение>) ` - для элементов с нумерацией в дереве
* `:nth-of-type(odd | even | <число> | <выражение>)` -  для элементов с нумерацией в дереве
* `:only-child` - применяется к дочернему элементу, только если он единственный у родителя
* `:only-of-type` - применяется к дочернему элементу указанного типа, только если он единственный у родителя
* `:optional` - к элементу `<input>`, у которого не задан атрибут required
* `:out-of-range` - Применяется к полям форм, у которых введённое пользователем значение выходит из заданного диапазона
* `:read-only` - Применяется к полям формы, у которых задан атрибут readonly
* `:read-write` - Применяется к полям формы, доступных для изменения
* `:required` - Для элемента `<input>`, у которого установлен атрибут required,
* `:root` - определяет корневой элемент документа
* `:target` - применяется к целевому элементу (к идентификатору, который указан в адресной строке браузера)
* `:valid` - Применяется к полям формы, содержимое которых проходит проверку в браузере на соответствие указанному типу
* `:visited` - применяется к ссылкам, уже посещённым пользователем


## 5. Псевдоэлементы

* `::after` - для вывода контента после содержимого элемента
* `::backdrop` - отображается ниже самого верхнего элемента в стеке по оси Z, но выше всех остальных 
элементов на странице, если они имеются. (для затемнения страницы)
* `::before` - для отображения контента до содержимого элемента
* `::first-letter` - определяет стиль первого символа в тексте элемента
* `::first-line` - задаёт стиль первой строки форматированного текста
* `::placeholder` - задаётся стилевое оформление подсказывающего текста, созданного атрибутом placeholder
* `::selection` - применяет стиль к выделенному пользователем тексту


## Box model

### 4 области
* margin (внешние отступы),
* border (рамка),
* padding (внутренние поля),
* content (контент или содержимое).

### box-sizing
* `content-box` - Свойства `width` и `height` включают исключительно контент, и не включают `padding` и `border`.
* `border-box` - Свойства `width` и `height` включают контент, `padding` и `border`, но не включают `margin`.


## flex

### `flex: none | [ flex-grow flex-shrink? || flex-basis ]`
Сокращённое свойство, которое позволяет указать параметры элемента, чтобы он эффективно заполнял доступное пространство.

### `flex-grow: <число>`
Определяет, сколько пространства может занимать флекс внутри контейнера.
В качестве значения принимаются числа, они задают пропорции каждого флекса.

### `flex-shrink: <число>`
Устанавливает коэффициент сжатия флексов в контейнере и задаёт, насколько элемент будет
уменьшаться по отношению к другим флексам, чтобы разместить все элементы в одну строку.

### `flex-basis: auto | <размер>`
Определяет основу флекса, которая является начальным размером элемента

### `flex-flow: flex-direction || flex-wrap`
Является сокращённым свойством для отдельных свойств flex-direction и flex-wrap.

### `flex-direction: row | row-reverse | column | column-reverse`
задаёт направление основных осей в контейнере и тем самым определяет положение флексов в контейнере
###### Значения
* `row` - слева направо. (Если dir == rtl, то справа налево.)
* `row-reverse` - справа налево. (Если dir == rtl, то слева направо.)
* `column` - сверху вниз.
* `column-reverse` - снизу вверх.

### `flex-wrap: nowrap | wrap | wrap-reverse`
Указывает, следует ли флексам располагаться в одну строку или можно занять несколько строк
###### Значения
* `nowrap` - Флексы выстраиваются в одну линию.
* `wrap` - Флексы выстраиваются в несколько строк, их направление задаётся свойством flex-direction.
* `wrap-reverse` - Флексы выстраиваются в несколько строк, в направлении, противоположном flex-direction.


## Grid Layout
[Grid docs](https://developer.mozilla.org/ru/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout)


## Animation

### transform
Трансформирует элемент
```
transform: rotate(15deg);
```
#### Функции трансформации
* `matrix` Задаёт двумерную матрицу преобразований.
* `matrix3d` Задаёт трёхмерную матрицу преобразований.
* `rotate()` Поворачивает элемент в двумерном пространстве на заданный угол относительно точки трансформации, задаваемой свойством transform-origin.
* `rotateX()` Поворачивает элемент на заданный угол относительно оси X.
* `rotateY()` Поворачивает элемент на заданный угол относительно оси Y.
* `rotateZ()` Поворачивает элемент на заданный угол относительно оси Z.
* `rotate3d` Поворачивает элемент в трёхмерном пространстве.
* `scale()` Масштабирует элемент по горизонтали и вертикали.
* `scaleX()` Масштабирует элемент по горизонтали.
* `scaleY()` Масштабирует элемент по вертикали.
* `scaleZ()` Масштабирует элемент по оси Z.
* `scale3d` Масштабирует элемент в трёхмерном пространстве.
* `skew()` Наклоняет элемент на заданный угол по горизонтали и вертикали.
* `skewX()` Наклоняет элемент на заданный угол по горизонтали.
* `skewY()` Наклоняет элемент на заданный угол по вертикали.
* `translate()` Сдвигает элемент на заданное значение по горизонтали и вертикали.
* `translateX()` Сдвигает элемент по горизонтали на указанное значение. Положительное значение сдвигает вправо, отрицательное влево.
* `translateY()` Сдвигает элемент по вертикали на указанное значение. Положительное значение сдвигает вниз, отрицательное вверх.
* `translateZ()` Сдвигает элемент по оси Z на указанное значение. Положительное значение сдвигает вперёд, отрицательное назад.
* `translate3d` Сдвигает элемент на заданное значение в трёхмерном пространстве.
* `perspective()` Задаёт перспективу.

### transition
Универсальное свойство, которое позволяет одновременно задать значения `transition-*`
```
transition: [ none | <transition-property> ] || <transition-duration> || <transition-timing-function> || <transition-delay>
```

### transition-duration
Задаёт время в секундах или миллисекундах, сколько должна длиться анимация перехода до её завершения. По умолчанию: 0s.
```
transition-duration: 2s;
```

### transition-delay
Устанавливает время ожидания перед запуском эффекта перехода. По умолчанию: 0s
```
transition-delay: 0.5s;
```

### transition-property
Устанавливает имя стилевого свойства, значение которого будет отслеживаться для создания эффекта перехода. По умолчанию:  all
```
transition-property: top;
```

### transition-timing-function
Представляет собой математическую функцию, показывающую, как быстро по времени меняется указанное через transition-property значение свойства. 
```
transition-timing-function: ease | ease-in | ease-out | ease-in-out | linear | step-start | step-end | steps | cubic-bezier
```
