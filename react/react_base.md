# React.JS


## 1. The Component Life Cycle and the Virtual DOM

##### Добавление компонента:
1. **constructor(props)**: конструктор, в котором происходит начальная инициализация компонента
2. **componentWillMount()**: вызывается непосредственно перед рендерингом компонента.
3. **render()**: рендеринг компонента
4. **componentDidMount()**: вызывается после рендеринга компонента. Здесь можно выполнять запросы к удаленным ресурсам

##### Обновление компонента:
1. **componentWillReceiveProps(nextProps)**: вызывается при обновлении объекта props. Как правило, в этой функции устанавливаются те свойства компонента, в том числе из this.state, которые зависят от значений из props.
2. **shouldComponentUpdate(nextProps, nextState)**: вызывается каждый раз при обновлении объекта props или state.Эта функция должна возвращать true (надо делать обновление) или false (игнорировать обновление).
3. **componentWillUpdate(nextProps, nextState)**: вызывается перед обновлением компонента (если shouldComponentUpdate возвращает true).
4. **render()**: рендеринг компонента (если shouldComponentUpdate возвращает true).
5. **componentDidUpdate(prevProps, prevState)**: вызывается сразу после обновления компонента (если shouldComponentUpdate возвращает true). 

##### Удаление компонента:
1. **componentWillUnmount()**: вызывается перед удалением компонента из DOM

## 2. State of component

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

## 3. JSX

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


## 4. Structure of the React Convention
## 5. Type checking with React.PropTypes
## 6. Uncontrolled Components (pros and cons)
## 7. ReactDOM
## 8. React-router
## 9. Webpack, npm
## 10. State of application
