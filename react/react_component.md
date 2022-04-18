# React Component
***

# Class vs Function components

## Function component:
```javascript
const Welcome = (props) => {
  return (<h1>Hello, {props.name}</h1>);
}
```

## Class component:
```javascript
class Welcome extends React.Component {
  render() {
    return (<h1>Hello, {this.props.name}</h1>);
  }
}
```


# props vs state

## Component state
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

## props with prop-types
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

## props with TypeScript
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


# The Component Life Cycle

## Монтирование:
* **constructor(props)**: конструктор, в котором происходит начальная инициализация компонента
* ~~**componentWillMount()**~~ (**_deprecated_**): вызывается непосредственно перед рендерингом компонента.
* static **getDerivedStateFromProps(props, state)**: вызывается непосредственно перед вызовом метода `render`.
  Он должен вернуть объект для обновления состояния или null, чтобы ничего не обновлять.
* **render()**: рендеринг компонента
* **componentDidMount()**: вызывается после рендеринга компонента. Здесь можно выполнять запросы к удаленным ресурсам

## Обновление:
* ~~**componentWillReceiveProps(nextProps)**~~ (**_deprecated_**): вызывается при обновлении объекта props. Как правило, в этой функции устанавливаются те свойства компонента, в том числе из this.state, которые зависят от значений из props.
* static **getDerivedStateFromProps(props, state)**: вызывается непосредственно перед вызовом метода `render`.
  Он должен вернуть объект для обновления состояния или null, чтобы ничего не обновлять.
* **shouldComponentUpdate(nextProps, nextState)**: вызывается каждый раз при обновлении объекта props или state.Эта функция должна возвращать true (надо делать обновление) или false (игнорировать обновление).
* ~~**componentWillUpdate(nextProps, nextState)**~~ (**_deprecated_**): вызывается перед обновлением компонента (если `shouldComponentUpdate` возвращает true).
* **render()**: рендеринг компонента (если `shouldComponentUpdate` возвращает true).
* **getSnapshotBeforeUpdate(prevProps, prevState)**: вызывается прямо перед этапом «фиксирования» (например, перед добавлением в DOM).
  Любое значение, возвращаемое этим методом, будет передано как параметр `componentDidUpdate()`.
* **componentDidUpdate(prevProps, prevState, snapshot)**: вызывается сразу после обновления компонента (если `shouldComponentUpdate` возвращает true).

## Размонтирование:
* **componentWillUnmount()**: вызывается перед удалением компонента из DOM

## Обработка ошибок:
* static **getDerivedStateFromError(error)**: вызывается после возникновения ошибки у компонента-потомка.
* **componentDidCatch(error, info)**: вызывается после возникновения ошибки у компонента-потомка.
    * error — перехваченная ошибка
    * info — объект с ключом `componentStack`, содержащий информацию о компоненте, в котором произошла ошибка.


# Data binding

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


# Controlled/uncontrolled components

## Controlled
В **управляемом компоненте**, данные формы обрабатываются React-компонентом.
Состояние обычно содержится в `state` и обновляется только через вызов `setState()` (в `callback` элемента формы).
```jsx
// Controlled:
<input type="text" value={this.state.value} onChange={(event) => this.setState({value: event.target.value})} />
```

## Uncontrolled
**Неуправляемые компоненты** хранят данные формы прямо в DOM. Чтение значений из DOM происходит через `ref`.
```jsx
// Uncontrolled:
<input type="text" defaultValue="foo" ref={inputRef} />
// Use `inputRef.current.value` to read the current value of <input>
```


#  Containers and components

## Container components
- purpose: **how things work** (data fetching, state updates)
- often stateful
- connected to a store
- responsible for providing data and behavior to their children

## Presentational components
- purpose: **how things look** (markup, styles)
- NOT connected to a store
- often stateless functional components
- renders data from props


# React.PureComponent

`React.PureComponent` похож на `React.Component`. 
Отличие заключается в том, что `React.PureComponent` реализует `shouldComponentUpdate()` в виде поверхностного (не глубокого) сравнением пропсов и состояния.


# Error Boundary

## Особенности
- Классовый компонент является предохранителем, если он включает хотя бы один из следующих методов жизненного цикла:
`static getDerivedStateFromError()` или `componentDidCatch()`
- **предохранители отлавливают ошибки исключительно в своих дочерних компонентах.**
- Используйте `static getDerivedStateFromError()` при рендеринге запасного UI.
- Используйте `componentDidCatch()` при написании кода для журналирования информации об отловленной ошибке.

## Предохранители не поймают ошибки в:
- обработчиках событий - пользуйтесь обычной JavaScript-конструкцией try / catch:
- асинхронном коде (например колбэках из `setTimeout` или `requestAnimationFrame`);
- серверном рендеринге (Server-side rendering);
- самом предохранителе (а не в его дочерних компонентах).


# Условный рендеринг

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


# HOC

## Компонент высшего порядка
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

## Предостережения:
- Не используйте HOC внутри рендер-метода - Повторное монтирование компонента обнуляет его состояние.
- Копируйте статические методы 
- Рефы не передаются - Реф элемента, созданного компонентом из HOC, будет указывать на экземпляр ближайшего в иерархии контейнера, а не на оборачиваемый компонент.


# Portals

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


# Context

Контекст позволяет передавать данные через дерево компонентов без необходимости передавать пропсы на промежуточных уровнях.

## Передача props всем дочерним компонентам:
```jsx
<Page user={user} avatarSize={avatarSize} />
// Page render() method:
<PageLayout user={user} avatarSize={avatarSize} />
// PageLayout render() method:
<NavigationBar user={user} avatarSize={avatarSize} />
// NavigationBar render() method:
<Avatar user={user} size={avatarSize} />
```

## Композиция компонентов:
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

## Context:
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


# SyntheticEvent

## Особенности:
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

## Event pool

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


# Ref

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



