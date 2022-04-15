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

# Component state
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

# Component props

## Props with prop-types
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

