# Rendering


## 1. JSX

**JSX** - комбинация кода JavaScript и разметки XML:
* для установки класса применяется атрибут `className`, а не `class`
* атрибут `style` в качестве значения принимает объект json
* используется camel-case для определения стилевых свойств
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

## 2. Virtual DOM
Virtual DOM is a virtual representation of the real DOM.

**Virtual DOM works in the following steps:**
* State change
* Compute diff (prev DOM and next DOM)
* Re-render (update the real DOM with only those nodes that have actually changed)

**Reconciliation** (Согласование) - процесс «виртуальный» DOM синхронизируется с «настоящим» DOM (при помощи ReactDOM)

**React Fiber** - новый механизм согласования в React 16, основная цель которого сделать рендеринг виртуального DOM инкрементным.

