# React.JS


## 1. The Component Life Cycle

##### Монтирование:
* **constructor(props)**: конструктор, в котором происходит начальная инициализация компонента
* ~~**componentWillMount()**~~ (**_deprecated_**): вызывается непосредственно перед рендерингом компонента.
* static **getDerivedStateFromProps(props, state)**: вызывается непосредственно перед вызовом метода `render`.
Он должен вернуть объект для обновления состояния или null, чтобы ничего не обновлять.
* **render()**: рендеринг компонента
* **componentDidMount()**: вызывается после рендеринга компонента. Здесь можно выполнять запросы к удаленным ресурсам

##### Обновление:
* ~~**componentWillReceiveProps(nextProps)**~~ (**_deprecated_**): вызывается при обновлении объекта props. Как правило, в этой функции устанавливаются те свойства компонента, в том числе из this.state, которые зависят от значений из props.
* static **getDerivedStateFromProps(props, state)**: вызывается непосредственно перед вызовом метода `render`.
  Он должен вернуть объект для обновления состояния или null, чтобы ничего не обновлять.
* **shouldComponentUpdate(nextProps, nextState)**: вызывается каждый раз при обновлении объекта props или state.Эта функция должна возвращать true (надо делать обновление) или false (игнорировать обновление).
* ~~**componentWillUpdate(nextProps, nextState)**~~ (**_deprecated_**): вызывается перед обновлением компонента (если `shouldComponentUpdate` возвращает true).
* **render()**: рендеринг компонента (если `shouldComponentUpdate` возвращает true).
* **getSnapshotBeforeUpdate(prevProps, prevState)**: вызывается прямо перед этапом «фиксирования» (например, перед добавлением в DOM). 
Любое значение, возвращаемое этим методом, будет передано как параметр `componentDidUpdate()`.
* **componentDidUpdate(prevProps, prevState, snapshot)**: вызывается сразу после обновления компонента (если `shouldComponentUpdate` возвращает true). 

##### Размонтирование:
* **componentWillUnmount()**: вызывается перед удалением компонента из DOM

##### Обработка ошибок:
* static **getDerivedStateFromError(error)**: вызывается после возникновения ошибки у компонента-потомка.
* **componentDidCatch(error, info)**: вызывается после возникновения ошибки у компонента-потомка.
  * error — перехваченная ошибка
  * info — объект с ключом `componentStack`, содержащий информацию о компоненте, в котором произошла ошибка.


## 2. Virtual DOM
Virtual DOM is a virtual representation of the real DOM.

**Virtual DOM works in the following steps:**
* State change
* Compute diff (prev DOM and next DOM)
* Re-render (update the real DOM with only those nodes that have actually changed)


## 3. State of component

Init state in constructor:
```jsx
constructor(props) {
  super(props);
  this.state = { counter: 0 };
}
```

Change state:
```jsx
this.setState({ counter: 5 });
```

Change state asynchronous:
```jsx
this.setState((prevState, props) => {
  return {
    counter: prevState.counter + props.increment
  };
});
```

## 4. JSX

**JSX** - комбинация кода JavaScript и разметки XML:
* для установки класса применяется атрибут `className`, а не `class`
* атрибут `style` в качестве значения принимает объект json
* используется camel-case для определения стилевых свойств

```jsx
render() {
  const userClassName = "user-info";
  const styleObj = {
    color:'red', 
    fontFamily:'Verdana'
  };

  return (
    <div className={userClassName}  style={styleObj}>
      <p>Полное имя: {this.props.fullName}</p>
      <p>Возраст: {this.props.age}</p>
    </div>
  );
}
```

## Refs
## Pure components

## 4. Structure of the React Convention
## 5. Type checking with React.PropTypes
## 6. Uncontrolled Components (pros and cons)
## 7. ReactDOM
## 8. React-router
## 9. Webpack, npm
## 10. State of application
Redux, MobX, RxJS, Apollo.Client + GraphQL

## React.Fragment
