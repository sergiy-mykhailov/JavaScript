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

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <ErrorBoundary> // Если какой-то модуль не загружается (сбоя сети), это вызовет ошибку.
    <Router>
    <Suspense fallback={<div>Loading...</div>}> // fallback - любой React-элемент
      <Routes>
        <Route path="/" element={<Home />} />   // lazy- компонент должен рендериться внутри компонента Suspense
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
    </Router>
  </ErrorBoundary>
);
```

## React.memo
## React.Fragment
