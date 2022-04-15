# React.JS


## 1. JSX

**JSX** - комбинация кода JavaScript и разметки XML:
* для установки класса применяется атрибут `className`, а не `class`
* атрибут `style` в качестве значения принимает объект json
* используется camel-case для определения стилевых свойств
```jsx
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
```

## 2. Virtual DOM
Virtual DOM is a virtual representation of the real DOM.

**Virtual DOM works in the following steps:**
* State change
* Compute diff (prev DOM and next DOM)
* Re-render (update the real DOM with only those nodes that have actually changed)






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
