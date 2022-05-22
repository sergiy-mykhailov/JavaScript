# HTML

[Справочник](https://webref.ru/html)

## Base info
HTML (Hypertext Markup Language) - это код, который используется для структурирования и отображения веб-страницы и её контента.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Title</title>
    <link rel="stylesheet" href="some-styles.css">
    <link rel="icon" href="https://some-icon.ico">
    <script type="text/javascript" src="some-script.js"></script>
    <script>/* some javascript here */</script>
    <style type="text/css">div { color: #336699; }</style>
  </head>
  <body>
    some content
  </body>
</html>
```


## <link>
### Атрибуты
* **charset** - Кодировка связываемого документа.
* **href** - Путь к связываемому файлу.
* **media** - Определяет устройство, для которого следует применять стилевое оформление. (`all | print | screen | speech`)
* **rel** - Определяет отношения между текущим документом и файлом, на который делается ссылка.
* **sizes** - Указывает размер иконок для визуального отображения.
* **type** - MIME-тип данных подключаемого файла.

#### rel
* alternate - Альтернативный тип, используется, к примеру, для указания ссылки на файл в формате XML для описания ленты новостей, анонсов статей.
* author - Указывает ссылку на автора текущего документа или статьи.
* help - Указывает ссылку на контекстно-зависимую справку.
* icon - Адрес картинки, которая символизирует текущий документ или сайт.
* license - Сообщает, что основное содержание текущего документа распространяется по лицензии, описанной в указанном документе.
* next - Сообщает, что текущий документ является частью связанных между собой документов, а ссылка указывает на следующий документ.
* prev - Сообщает, что текущий документ является частью связанных между собой документов, а ссылка указывает на предыдущий документ.
* search - Указывает ссылку на ресурс, который применяется для поиска по документу или сайту.
* stylesheet - Определяет, что подключаемый файл хранит таблицу стилей (CSS).


## <script>
### Атрибуты
* **async** - Загружает скрипт асинхронно.
* **defer** - Откладывает выполнение скрипта до тех пор, пока вся страница не будет загружена полностью.
* **src** - Адрес скрипта из внешнего файла для импорта в текущий документ.
* **type** - Определяет тип содержимого <script>.


## <style>
### Атрибуты
* **media** - Определяет устройство вывода, для работы с которым предназначена таблица стилей. (`all | print | screen | speech`)
* **type** - Сообщает браузеру, какой синтаксис использовать, чтобы правильно интерпретировать стили.


## <table>
```html
<table>
  <tr>
    <th>Column header</th>
    <th>Column header</th>
    <th>Column header</th>
  </tr>
  <tr>
    <th>Row header</th>
    <td>...</td>
    <td>...</td>
  </tr>
</table>
```
```html
<table>
    <caption>table title</caption>
    <thead>
    <tr>
     <td> ... </td>
     <td> ... </td> 
    </tr> 
  </thead>
  <tbody>
    <tr>
     <td> ... </td>
     <td> ... </td> 
    </tr> 
  </tbody>
  <tfoot>
    <tr>
      <td> ... </td>
      <td> ... </td>
    </tr>
  </tfoot>
</table>
```


## <form>
```html
<form method="post" action="/some-resource/some-form-handler">
  <label for="first-name-id">First name:</label>
  <input id="first-name-id" type="text" size="40" name="firstname">
  <p>
    <input type="radio" name="answer" value="a1">Option 1<Br>
    <input type="radio" name="answer" value="a2">Option 2<Br>
  </p>
  <textarea name="comment" cols="40" rows="3"></textarea>
  <select multiple name="hero[]">
    <option value="value1">Option 1</option>
    <option value="value2">Option 2</option>
  </select>
  <input type="file" id="file" name="file" accept=".jpg, .jpeg, .png" multiple>
  <p><input type="submit"></p>
 </form>
```

### Атрибуты
* **accept-charset** - Устанавливает кодировку, в которой сервер может принимать и обрабатывать данные.
* **action** - Адрес программы или документа, который обрабатывает данные формы.
* **autocomplete** - Включает автозаполнение полей формы.
* **enctype** - Способ кодирования данных формы.
* **method** - Метод протокола HTTP.
* **name** - Имя формы.
* **novalidate** - Отменяет встроенную проверку данных формы на корректность ввода.
* **target** - Имя окна или фрейма, куда обработчик будет загружать возвращаемый результат.

### input types:
* **button**	Кнопка.
* **checkbox**	Флажки. Позволяют выбрать более одного варианта из предложенных.
* **file**	Поле для ввода имени файла, который пересылается на сервер.
* **hidden**	Скрытое поле. Оно никак не отображается на веб-странице.	 
* **image**	Поле с изображением. При нажатии на рисунок данные формы отправляются на сервер.
* **password**	Обычное текстовое поле, но отличается от него тем, что все символы показываются звездочками. Предназначено для того, чтобы никто не подглядел вводимый пароль.
* **radio**	Переключатели. Используются, когда следует выбрать один вариант из нескольких предложенных.
* **reset**	Кнопка для возвращения данных формы в первоначальное значение.
* **submit**	Кнопка для отправки данных формы на сервер.
* **text**	Текстовое поле. Предназначено для ввода символов с помощью клавиатуры.
* **color**	Виджет для выбора цвета.
* **date**	Поле для выбора календарной даты.
* **datetime**	Указание даты и времени.
* **datetime-local**	Указание местной даты и времени.
* **email**	Для адресов электронной почты.
* **number**	Ввод чисел.
* **range**	Ползунок для выбора чисел в указанном диапазоне.
* **search**	Поле для поиска.
* **tel**	Для телефонных номеров.
* **time**	Для времени.
* **url**	Для веб-адресов.
* **month**	Выбор месяца.
* **week**	Выбор недели.

### Встроенная валидация форм
* **required**: Определяет, что для отправки формы данное поле предварительно должно быть заполнено.
* **minlength** и **maxlength**: Задаёт минимальную и максимальную длину текстовых данных (строк)
* **min** и **max**: Задаёт минимальное и максимальное значение для поля, расчитанного на числовой тип данных
* **type**: Определяет тип данных, на который рассчитано поле: число, email-адрес или какой-то другой предустановленный тип
* **pattern**: С помощью регулярного выражения, определяет шаблон, которому должны соответствовать вводимые данные.
* Атрибут формы **novalidate**: Отменяет проверку для полей с типом `email` и `url`, а также для полей с атрибутом `pattern` или `required`.


## <iframe>
```html
<iframe src="https://www.google.com/" height="500px" width="500px"></iframe>
<script> // Родительский документ
  const iframe = document.querySelector('iframe');
  iframe.onload = function() {}
  iframe.onerror = function() {}
  // отправка сообщений в iframe:
  iframe.contentWindow.postMessage('message', '*');
  // получение сообщений из iframe:
  window.onmessage = function(event){
    if (event.data === 'reply') {
      console('Reply received!');
    }
  };
  // Reload the iframe
  iframe.contentWindow.location.reload();
</script>
<script> // документ в iframe
  // отправка сообщений в iframe:
  window.top.postMessage('reply', '*')
  // получение сообщений:
  window.onmessage = function(event){
    if (event.data === 'message') {
      console('Message received!');
    }
  };
</script>
```


## Semantic Elements in HTML
Semantic HTML refers to syntax that makes the HTML more comprehensible by better defining the different sections and layout of web pages.
```html
<!--use this:-->
<header></header>
<nav></nav>
<section>
	<article>
		<figure>
			<img>
			<figcaption></figcaption>
		</figure>
	</article>
</section>
<aside></aside>
<footer></footer>
<!--instead of this:-->
<div id="header"></div>
<div id="navigation"></div>
<div class="section">
  <div class="article">
    <div class="figure">
      <img>
      <div class="figcaption"></div>
    </div>
  </div>
</div>
<div id="sidebar"></div>
<div id="footer"></div>
```


## Page loading flow
- Parsing - получаемые данные преобразуются в `DOM` и `CSSOM`
- Building the DOM tree - обработка разметки HTML и построение дерева DOM
- Preload scanner - обрабатывает доступное содержимое документа и запрашивает высокоприоритетные ресурсы (CSS, JavaScript и шрифты)
- Building the CSSOM - обработка CSS и построение CSSOM дерева
- JavaScript Compilation
- Building the Accessibility Tree - дерево доступности, которое используется устройствами-помощниками для понимания и интерпретирования контента
- Style - комбинирование DOM и CSSOM в дерево рендеринга
- Layout - вычисляется геометрия каждого узла, то есть ширина, высота, положение элементов
- Paint - отрисовка каждого отдельного узла на экране
- Composition - позволяет браузеру гарантировать, что каждый слой отрисован на экране в правильном порядке, а содержимое отображается корректно

