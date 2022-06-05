# React.JS - Advanced Level


## HOC

### Компонент высшего порядка
**Компонент высшего порядка** — это функция, которая принимает компонент и возвращает новый компонент.

HOC добавляют компонентам функциональность, но они не должны менять их оригинальное предназначение.
Ожидается, что интерфейс компонента, который вы возвращаете из HOC, будет похож на интерфейс оборачиваемого компонента.

```jsx
function someHOC(WrappedComponent) {
  return class extends React.Component {
    componentDidUpdate(prevProps) {
      // extra logic
    }
    render() {
      // Отфильтруйте пропсы применимые только к этому HOC и которые не нужно передавать дальше
      const { extraProp, ...originalProps } = this.props;
      // Добавьте новые пропсы в оборачиваемый компонент:
      const injectedProp = someStateOrInstanceMethod;

      // Оборачиваем компонент в контейнер без мутаций исходного компонента
      return <WrappedComponent injectedProp={injectedProp} {...originalProps} />;
    }
  }
}
```

### Предостережения:
- Не используйте HOC внутри рендер-метода - Повторное монтирование компонента обнуляет его состояние.
- Копируйте статические методы
- Рефы не передаются - Реф элемента, созданного компонентом из HOC, будет указывать на экземпляр ближайшего в иерархии контейнера, а не на оборачиваемый компонент.


## Portals

Порталы позволяют рендерить дочерние элементы в DOM-узел, который находится вне DOM-иерархии родительского компонента.
```jsx
class Component extends React.Component {
  render() {
    // React НЕ создаёт новый div. Он рендерит дочерние элементы в `domNode`.
    // `domNode` — это любой валидный DOM-узел, находящийся в любом месте в DOM.
    return ReactDOM.createPortal(this.props.children, domNode);
  }
}
```
Несмотря на его расположение в DOM-дереве, сам портал всё ещё находится в React-дереве:
- контекст работают привычным образом
- всплытие событий работают привычным образом


## Context

Контекст позволяет передавать данные через дерево компонентов без необходимости передавать пропсы на промежуточных уровнях.

### Передача props всем дочерним компонентам:
```jsx
<Page user={user} avatarSize={avatarSize} />
// Page render() method:
<PageLayout user={user} avatarSize={avatarSize} />
// PageLayout render() method:
<NavigationBar user={user} avatarSize={avatarSize} />
// NavigationBar render() method:
<Avatar user={user} size={avatarSize} />
```

### Композиция компонентов:
```jsx
function Page(props) {
  const userLink = (<Avatar user={props.user} size={props.avatarSize} />);
  return <PageLayout userLink={userLink} />;
}
<Page avatarSize={avatarSize} />
// Page render() method:
<PageLayout userLink={userLink} />
// PageLayout render() method:
<NavigationBar userLink={userLink} />
// NavigationBar render() method:
{props.userLink}
```

### Context:
```jsx
const MyContext = React.createContext(defaultValue);
class App extends React.Component {
  render() {
    return (
      <MyContext.Provider value={avatarSize}>
        <Page/>
      </MyContext.Provider>
    );
  }
}

// Page render() method:
<PageLayout />
// PageLayout render() method:
<NavigationBar />

// v1 - contextType:
NavigationBar.contextType = MyContext;
class NavigationBar extends React.Component {
  render() {
    return <Avatar size={this.context} />;
  }
}
// v2 - MyContext.Consumer:
class NavigationBar extends React.Component {
  render() {
    return (
      <MyContext.Consumer>
        {value => <Avatar size={value} />}
      </MyContext.Consumer>
    )
  }
}
```


## Ref

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return <div ref={this.myRef} />;
  }
}
```

Значение рефа отличается в зависимости от типа узла:
- Когда атрибут ref используется с HTML-элементом, свойство current созданного рефа в конструкторе с помощью React.createRef() получает соответствующий DOM-элемент.
- Когда атрибут ref используется с классовым компонентом, свойство current объекта-рефа получает экземпляр смонтированного компонента.
- Нельзя использовать ref атрибут с функциональными компонентами, потому что для них не создаётся экземпляров.


## React.lazy

### Разделение кода
- `React.lazy` позволяет рендерить динамический импорт как обычный компонент.
- Она автоматически загрузит бандл, содержащий `OtherComponent`, когда этот компонент будет впервые отрендерен.
- `React.lazy` в настоящее время поддерживает только экспорт по умолчанию (`export default`)

### Example
```jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import Home from './Home'

const Dashboard = lazy(() => import('./routes/Dashboard'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <ErrorBoundary> // Если какой-то модуль не загружается (сбоя сети), это вызовет ошибку.
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />  // route with static imported component
          <Route                              // route with dynamic imported component
            path="about"
            element={
              <Suspense fallback={<>Loading...</>}> // fallback - любой React-элемент
                <About />                            // lazy-компонент должен рендериться внутри компонента Suspense
              </Suspense>
            }
          />
          <Route
            path="dashboard/*"
            element={
              <Suspense fallback={<>Loading...</>}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFountPage />} />
        </Route>
      </Routes>
    </Router>
  </ErrorBoundary>
);
```


## React.memo

React.memo - поверхностно сравнивает props, если изменений нет React будет использовать результат последнего рендера, 
избегая повторного рендеринга.
```jsx
function MyComponent(props) { /* рендер с использованием пропсов */ }
function areEqual(prevProps, nextProps) {
  /* возвращает true, если nextProps рендерит тот же результат что и prevProps,
  иначе возвращает false */
}
export default React.memo(MyComponent, areEqual); // areEqual - optional
```


## React.Fragment

Фрагменты позволяют формировать список дочерних элементов, не создавая лишних узлов в DOM
```jsx
function Component(props) {
  return (
    <React.Fragment>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </React.Fragment>
  );
}
```
`<React.Fragment key={key}>` - для списков


## Profiler

### info
`Profiler` измеряет то, как часто рендерится React-приложение и какова «стоимость» этого. `Profiler` может быть вложенным.
Принимает два пропа:
- id (string)
- onRender (function), вызывает когда компонент внутри дерева «фиксирует» обновление.

```jsx
render(
  <App>
    <Profiler id="Navigation" onRender={onRenderCallback}>
      <Navigation {...props} />
    </Profiler>
    <Main {...props} />
  </App>
);
```

### Колбэк onRender
```jsx
function onRenderCallback(
  id, // проп "id" из дерева компонента Profiler, для которого было зафиксировано изменение
  phase, // либо "mount" (если дерево было смонтировано), либо "update" (если дерево было повторно отрендерено)
  actualDuration, // время, затраченное на рендер зафиксированного обновления
  baseDuration, // предполагаемое время рендера всего поддерева без кеширования
  startTime, // когда React начал рендерить это обновление
  commitTime, // когда React зафиксировал это обновление
  interactions // Множество «взаимодействий» для данного обновления 
) {
  // Обработка или логирование результатов...
}
```

### Profiling in production

React предоставляет специальную продакшен-сборку с включенным профилированием, подробнее: https://fb.me/react-profiling

Add the following import aliases to your production Webpack 4 config:
```javascript
module.exports = {
  //...
  resolve: {
    alias: { 'react-dom$': 'react-dom/profiling' }
  }
};
```


## render-props
**render-props** - возможность компонентов React разделять код между собой с помощью пропа, значение которого является функцией.
```jsx
<DataProvider
  render={data => (
    <h1>Привет, {data.target}</h1>
  )}
/>

class DataProvider extends React.Component {
  // ...some logic...
  render() {
    return this.props.render({ target: 'Marry' })
  }
}
```


## concurrent mode - **experimental!**

- **concurrent rendering** - it lets React prepare multiple versions of the UI at the same time. (React 18)


## Server side rendering

### renderToString()
Рендерит React-элемент в исходный HTML и возвращает его в виде строки.
```jsx
ReactDOMServer.renderToString(element)
```
Доступен в окружении сервера и браузера.

### renderToStaticMarkup()
Похож на метод `renderToString`, но не создаёт дополнительных DOM-атрибутов, таких как `data-reactroot`, используемых внутри React. 
```jsx
ReactDOMServer.renderToStaticMarkup(element)
```
Доступен в окружении сервера и браузера.

### renderToNodeStream()
Рендерит React-элемент в исходный HTML. Возвращает поток для чтения, который выводит HTML-строку. 
HTML из потока идентичен тому, что возвращает `ReactDOMServer.renderToString`.
```jsx
ReactDOMServer.renderToNodeStream(element)
```
Метод используется только на сервере.

### renderToStaticNodeStream()
Похож на метод `renderToNodeStream`, но не создаёт дополнительных DOM-атрибутов, таких как `data-reactroot`, используемых внутри React.
```jsx
ReactDOMServer.renderToStaticNodeStream(element)
```
Метод используется только на сервере.

### hydrate()
То же, что и `render()`, но используется для гидратации контейнера, HTML-содержимое которого было отрендерено с помощью `ReactDOMServer`. 
React попытается присоединить обработчики событий к уже существующей разметке.
```
ReactDOM.hydrate(element, container[, callback])
```

### Initial state
#### The server side
```jsx
// some handler (example: Express)
function someRenderHandler(req, res) {
  // Compile an initial state
  let initialState = { some: 'data' }

  // Create a new Redux store instance
  const store = createStore(someReducer, initialState)

  // Render the component to a string
  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  )

  // Grab the initial state from our Redux store
  const finalState = store.getState()

  // Send the rendered page back to the client
  res.send(renderFullPage(html, finalState))
}
// function renders full html page with state:
function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // https://redux.js.org/usage/server-rendering#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `
}
```

#### The client side
```jsx
// Create Redux store with state injected by the server
const store = createStore(someReducer, window.__PRELOADED_STATE__)

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__

hydrate(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

### Advantages
- **Quick initial access**
- **Great for SEO**: the search engines don’t need to run your JavaScript to read and index your content. CSR gets indexed as well, but not as fast as SSR.

### Disadvantages
- **Slower page transitions**: browsing from page to page is often much slower with SSR than on CSR. With SSR you’re basically rendering your app twice.
- **Vulnerability**: SSR sites are harder to keep secure because they have a bigger surface to attack than CSR sites.
- **Complex caching**: configuring your cache is usually more complex on SSR sites than CSR sites.
- **Server cost**: SSR often needs a bigger and more powerful server to provide high-performance than CSR.
- **Higher latency**: SSR sites tend to get a high latency if you get lots of traffic at the same time, which delays/slows down the browsing experience for everyone.
- **More complicated to develop**