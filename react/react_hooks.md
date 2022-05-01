# React Hooks


## Rules of Hooks

* Hooks only for function components!
* Do not use hooks in the react classes!
* Only call Hooks **at the top level**. Don’t call Hooks inside loops, conditions, or nested functions.
* Only call Hooks **from React function components**. Don’t call Hooks from regular JavaScript functions.
* Use `eslint-plugin-react-hooks`!


## react hooks
[react hooks](https://reactjs.org/docs/hooks-reference.html)

### useState - State Hook

`const [state, setState] = useState(initialState);` - add some local state to function component.

###### Params:
* `state` - current state value (similar to `this.state.value`)
* `setState` - function that updates the state (similar to `this.setState`)
* `initialState` - initial state or function that returns initial value

```jsx
// Lazy initial state:
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});
// sets a new state:
setState(newState);
// or update state:
setState(prevState => {
  // Object.assign would also work
  return {...prevState, ...updatedValues};
});
```


### useEffect - Effect Hook

```jsx
useEffect(function hookFunction() {
    // do something
    return function cleanupFunction() {
        // do some cleanup
    };
}, comparisonArray);
```
###### Params:
* `hookFunction` - function that runs after every render (similar to `componentDidMount` and `componentDidUpdate` and `componentWillUnmount`)
* `cleanupFunction` - cleanup function that runs after every re-render.
* `comparisonArray` - array with current state/props for comparison with previous state/props (similar to `shouldComponentUpdate`).


### useLayoutEffect

Идентичен useEffect, но этот хук запускается синхронно после всех изменений DOM. 
Используйте его для чтения макета из DOM и синхронного повторного рендеринга.


### useContext

`const value = useContext(ContextObject);` - lets you subscribe to React context without introducing nesting.


### useCallback

```jsx
const memoizedCallback = useCallback(() => {}, comparisonArray); // Возвращает мемоизированный колбэк.
```
вернёт мемоизированную версию колбэка, который изменяется только, если изменяются значения одной из зависимостей.


### useMemo

```jsx
const memoizedValue  = useMemo(() => {}, comparisonArray); // Возвращает мемоизированное значение.
```
будет повторно вычислять мемоизированное значение только тогда, когда значение какой-либо из зависимостей изменилось.
функция, переданная useMemo, запускается во время рендеринга.


### useRef

```jsx
const refContainer = useRef(initialValue);
return <input ref={refContainer} type="text" />
```
возвращает изменяемый ref-объект, свойство .current которого инициализируется переданным аргументом (initialValue)


### Custom Hooks

```jsx
import React, { useState, useEffect } from 'react';

function useSomeCustomHook(someParam) {
  const [value, setValue] = useState('some init value');
  useEffect(() => {
    // do something
    setValue(someParam);
    return () => {
      // cleanup function
    }
  }, [value]); // will re-run the effect if one of elements is different.
  return value;
}

function Component1(props) {
  const value = useSomeCustomHook(props.someProp);
  // do something with value
  return value;
}

function Component2(props) {
  const value = useSomeCustomHook(props.someOtherProp);
  // do something with value
  return value;
}
```


## redux hooks
[react-redux hooks](https://react-redux.js.org/api/hooks)


### useReducer

`const [state, dispatch] = useReducer(reducer, initialState, init);` - lets you manage local state of complex components with a reducer.

###### Params:
* `reducer` - (state, action) => newState
* `initialState` - any
* `init` - (initialArg) => initialState


### useSelector()
```tsx
const result = useSelector(selector, equality)
```
###### Params:
selector (Function) - `(state) => state.someData` (equivalent to the `mapStateToProps` argument to connect)
equality (Function) - optional comparison function (can be `shallowEqual` from  react-redux, or `isEqual` from lodash or Immutable.js's comparison capabilities).
result (any) - value from store

```jsx
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'
// usage:
const todos = useSelector((state) => state.todos)
// usage with reselect:
const completedTodosSelector = createSelector(
  (state) => state.todos,
  (todos) => todos.filter((todo) => todo.completed).length
)
const numCompletedTodos = useSelector(completedTodosSelector)
```


### useDispatch()
Returns a reference to the dispatch function from the Redux store.
```jsx
const dispatch = useDispatch()
```


### useStore()
Returns a reference to the same Redux store that was passed in to the `<Provider>` component.
```jsx
const store = useStore()
```


## router hooks (v6)
[react-router hooks](https://reactrouter.com/docs/en/v6/api)

### useOutletContext
```jsx
function Parent() {
  const [count, setCount] = React.useState(0);
  return <Outlet context={[count, setCount]} />;
}
function Child() {
  const [count, setCount] = useOutletContext();
  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;
}
```

### useOutlet()
Returns the element for the child route at this level of the route hierarchy.

### useHref(string)
Returns a URL that may be used to link to the given to location, even outside of React Router.

### useLocation()
Returns the current location object.
```jsx
let location = useLocation();
```

### useNavigationType()
Returns the current type of navigation or how the user came to the current page (returns: "POP" | "PUSH" | "REPLACE")

### useMatch(pattern: string)
Returns match data about a route at the given path relative to the current location.
Analog `matchPath`.

### useNavigate()
```jsx
 let navigate = useNavigate();
 navigate("../some-path", { replace: true });
```

### useParams
Returns an object of key/value pairs of the dynamic params from the current URL that were matched by the `<Route path>`
```jsx
function App() {
  return (
    <Routes>
      <Route path="/users/:userId" element={<ProfilePage />} />
      // ...
    </Routes>
  );
}
function ProfilePage() {
  let { userId } = useParams();
  // ...
}
```

### useRoutes
The `useRoutes` hook is the functional equivalent of `<Routes>`, but it uses JavaScript objects instead of `<Route>` elements.

```jsx
function App() {
  let element = useRoutes([
    {
      path: "/",
      element: <Dashboard />,
      children: [
        { path: "messages", element: <DashboardMessages /> },
        { path: "tasks", element: <DashboardTasks /> },
      ],
    },
    { path: "team", element: <AboutPage /> },
  ]);

  return element;
}
```

### useSearchParams

Analog of `useState`, but for current url.
The `setSearchParams` function works like `navigate()`, but only for the search portion of the URL.
```jsx
function App() {
  let [searchParams, setSearchParams] = useSearchParams();
  // ...
}
```

