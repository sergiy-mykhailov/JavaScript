# React Component - Base Level


## JSX

### info
**JSX** - комбинация кода JavaScript и разметки XML:
* для установки класса применяется атрибут `className`, а не `class`
* атрибут `style` в качестве значения принимает объект json
* используется camelСase для определения стилевых свойств

```jsx
class Component extends React.Component {
  render() {
    const styleObj = {
      color:'red',
      fontFamily:'Verdana'
    };

    return (
      <div className="user-info"  style={styleObj}>
        <p>Полное имя: {this.props.fullName}</p>
        <p>Возраст: {this.props.age}</p>
      </div>
    );
  }
}
```

### Component names must begin with capital letters

-` <component />` compiles to `React.createElement('component')` (React thinks it is an HTML tag because it's not capitalized)
- `<Component /`> compiles to `React.createElement(Component)`
- `<obj.component />` compiles to `React.createElement(obj.component)`


## Virtual DOM
Virtual DOM is a virtual representation of the real DOM.

**Virtual DOM works in the following steps:**
* State change
* Compute diff (prev DOM and next DOM)
* Re-render (update the real DOM with only those nodes that have actually changed)

**Reconciliation** (Согласование) - процесс «виртуальный» DOM синхронизируется с «настоящим» DOM (при помощи ReactDOM)

**React Fiber** - новый механизм согласования в React 16, основная цель которого сделать рендеринг виртуального DOM инкрементным.


## Class vs Function components

### Function component:
```javascript
const Welcome = (props) => {
  return (<h1>Hello, {props.name}</h1>);
}
```

### Class component:
```javascript
class Welcome extends React.Component {
  render() {
    return (<h1>Hello, {this.props.name}</h1>);
  }
}
```


## props vs state

### Component state
```jsx
class Welcome extends React.Component {
  // Init state in constructor:
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }
  // Change state:
  changeState() {
    this.setState({ counter: 5 });
  }
  // Change state asynchronous:
  changeStateAsynchronous() {
    this.setState((prevState, props) => {
      return {
        counter: prevState.counter + props.increment
      };
    });
  }

  render() {}
}
```
React may batch multiple `setState()` calls into a single update for performance.
No matter how many `setState` calls you make inside a React event handler or synchronous lifecycle method,
it will be batched into a single update. That is only one single re-render will eventually happen.

### props with prop-types
```jsx
class Welcome extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    this.props.optionalProperty;      // 'default value'
    this.props.requiredProperty;      // undefined, can throws error/warning...
    return <div />
  }
}
Welcome.propTypes = {
  someProperty: PropTypes.string,
  requiredProperty: PropTypes.string.isRequired,
}
Welcome.defaultProps = { optionalProperty: 'default value' }
// rendering:
<Welcome />
```

### props with TypeScript
```tsx
interface IWelcome {
  requiredProperty: string
}
class Welcome extends React.Component {
  constructor(props: IWelcome) {
    super(props);
  }
  render() {
    this.props.requiredProperty;      // undefined, will not build - error!
    return <div />
  }
}
// rendering:
<Welcome />
```

### Static type checking (pros and cons)
#### pros
* More errors detected earlier in development.
* Fewer errors at runtime and in shipped code.
* Allows for compiler optimisation which yields faster code.
* No need to write entirely mechanical tests for type correctness.
* You get documentation (typedoc)
#### cons
* Can lead to verbose type declarations.
* Can lead to complex error messages.
* Can lead to boilerplate.
* Difficulty in expressing dynamic construct: self describing types etc.


## Life Cycle

### Монтирование:
* **constructor(props)**: конструктор, в котором происходит начальная инициализация компонента
* ~~**componentWillMount()**~~ (**_deprecated_**): вызывается непосредственно перед рендерингом компонента.
* static **getDerivedStateFromProps(props, state)**: вызывается непосредственно перед вызовом метода `render`.
  Он должен вернуть объект для обновления состояния или null, чтобы ничего не обновлять.
* **render()**: рендеринг компонента
* **componentDidMount()**: вызывается после рендеринга компонента. Здесь можно выполнять запросы к удаленным ресурсам

### Обновление:
* ~~**componentWillReceiveProps(nextProps)**~~ (**_deprecated_**): вызывается при обновлении объекта props. Как правило, в этой функции устанавливаются те свойства компонента, в том числе из this.state, которые зависят от значений из props.
* static **getDerivedStateFromProps(props, state)**: вызывается непосредственно перед вызовом метода `render`.
  Он должен вернуть объект для обновления состояния или null, чтобы ничего не обновлять.
* **shouldComponentUpdate(nextProps, nextState)**: вызывается каждый раз при обновлении объекта props или state.Эта функция должна возвращать true (надо делать обновление) или false (игнорировать обновление).
* ~~**componentWillUpdate(nextProps, nextState)**~~ (**_deprecated_**): вызывается перед обновлением компонента (если `shouldComponentUpdate` возвращает true).
* **render()**: рендеринг компонента (если `shouldComponentUpdate` возвращает true).
* **getSnapshotBeforeUpdate(prevProps, prevState)**: вызывается прямо перед этапом «фиксирования» (например, перед добавлением в DOM).
  Любое значение, возвращаемое этим методом, будет передано как параметр `componentDidUpdate()`.
* **componentDidUpdate(prevProps, prevState, snapshot)**: вызывается сразу после обновления компонента (если `shouldComponentUpdate` возвращает true).

### Размонтирование:
* **componentWillUnmount()**: вызывается перед удалением компонента из DOM

### Обработка ошибок:
* static **getDerivedStateFromError(error)**: вызывается после возникновения ошибки у компонента-потомка.
* **componentDidCatch(error, info)**: вызывается после возникновения ошибки у компонента-потомка.
    * error — перехваченная ошибка
    * info — объект с ключом `componentStack`, содержащий информацию о компоненте, в котором произошла ошибка.


## Data binding

```jsx
class App extends React.Component {
  constructor() {
    super();
    this.state = { value: 'Hello World' };
  }
  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };
  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.value}      // pass data to child via props
          onChange={this.handleChange}  // pass data from child via event handlers/callbacks
        />
      </div>
    );
  }
}
```


## Containers and components

### Container components
- purpose: **how things work** (data fetching, state updates)
- often stateful
- connected to a store
- responsible for providing data and behavior to their children

### Presentational components
- purpose: **how things look** (markup, styles)
- NOT connected to a store
- often stateless functional components
- renders data from props


## React.PureComponent

`React.PureComponent` похож на `React.Component`.
Отличие заключается в том, что `React.PureComponent` реализует `shouldComponentUpdate()` в виде поверхностного (не глубокого) сравнением пропсов и состояния.

### PureRenderMixin
Библиотека `react-addons-pure-render-mixin` - устаревший аналог `React.PureComponent`!


## Error Boundary

### Особенности
- Классовый компонент является предохранителем, если он включает хотя бы один из следующих методов жизненного цикла:
  `static getDerivedStateFromError()` или `componentDidCatch()`
- **предохранители отлавливают ошибки исключительно в своих дочерних компонентах.**
- Используйте `static getDerivedStateFromError()` при рендеринге запасного UI.
- Используйте `componentDidCatch()` при написании кода для журналирования информации об отловленной ошибке.

### Предохранители не поймают ошибки в:
- обработчиках событий - пользуйтесь обычной JavaScript-конструкцией try / catch:
- асинхронном коде (например колбэках из `setTimeout` или `requestAnimationFrame`);
- серверном рендеринге (Server-side rendering);
- самом предохранителе (а не в его дочерних компонентах).

### Example
```jsx
class ErrorBoundary extends React.Component {
  static getDerivedStateFromError(error) { /* update state, etc. */ }
  componentDidCatch(error, errorInfo) { /* log error info, etc. */ }
  render() { return this.props.children; }
}
// render method of another component:
<ErrorBoundary>
  <SomeComponentWithError />
</ErrorBoundary>
```


## Условный рендеринг

```jsx
function ParentComponent(props) {
  // Предотвращение рендеринга компонента:
  if (props.err) {
    return null;
  }
  
  return (
    <div>
      {props.condition ? <Component1 /> : <Component2 />}
      {props.condition2 && <Component3 />}
    </div>
  )
}
```


## SyntheticEvent

### Особенности:
- События в React именуются в стиле camelCase вместо нижнего регистра.
- С JSX вы передаёте функцию как обработчик события вместо строки.
- Начиная с версии v0.14, возврат `false` больше не приведёт к прекращению всплытия события.
  Вместо этого, следует вручную вызывать `e.stopPropagation()` или `e.preventDefault()`
- Начиная с 17 версии, вызов `e.persist()` не имеет смысла, потому что объекты событий SyntheticEvent больше не добавляются в пул.

```jsx
// HTML:
<button onclick="activateLasers()">Активировать лазеры</button>
// React:
const activateLasers = () => {}
<button onClick={activateLasers}>Активировать лазеры</button>
```

### Event pool

SyntheticEvent помещается в пул. Это означает, что объект SyntheticEvent будет повторно использован,
и все свойства будут аннулированы после того, как отработает коллбэк-обработчик события.
```jsx
function onClick(event) {
  console.log(event.type); // => "click"
  const eventType = event.type; // => "click"

  setTimeout(function() {
    console.log(event.type); // => null
    console.log(eventType); // => "click"
  }, 0);
 
  this.setState({ clickEvent: event });     // this.state.clickEvent будет иметь null
  this.setState({ eventType: event.type }); // Но вы можете сохранить свойства события
}
```
`event.persist()` - приведет к удалению синтетического события из пула и позволит ссылке на событие быть сохраненной пользовательским кодом.


## Composition or Inheritance
[Official docs](https://ru.reactjs.org/docs/composition-vs-inheritance.html) recommends composition!
