# Store


## createStore

### Info
```jsx
const store = createStore(reducer, [preloadedState], [enhancer])
```
###### Params:
- **reducer** (Function) - A reducing function `(state, action) => newState`
- **preloadedState** (any) - The initial state.
- **enhancer** (Function) - The store enhancer (third-party capabilities such as middleware, time travel, persistence, etc.)

### Tips:
- Don't create more than one store in an application!
- Redux state is normally plain JS objects and arrays.
- Never mutate state!
- Immutable updates (create new object): `return { ...state, ...newData }`

### Example
```jsx
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'
// ...other import...
const store = createStore(rootReducer)
return(
  <Provider store={store}>
    <App />
  </Provider>
)
```


## Store

### Info
A store holds the whole state tree of your application.

### Methods

#### getState()
`const state = store.getState()`
Returns the current state tree of your application

#### dispatch(action)
Dispatches an action.
The store's reducing function will be called with the current state and action object.
```jsx
store.dispatch({ type: 'SOME_TYPE', ...additionalData }) // type - required field!
```
if you wrap `createStore` with `applyMiddlewarethe` middleware can provide support for dispatching async actions.
```jsx
function asyncAction(data) {
  return { type: 'ADD_TODO', data }
}
store.dispatch(asyncAction('Read the docs'))
```

#### subscribe(listener)
Adds a change listener. 
It will be called any time an action is dispatched, and some part of the state tree may potentially have changed.
```jsx
let currentValue
function listener() {
  let previousValue = currentValue
  currentValue = store.getState()
  //...
}
const unsubscribe = store.subscribe(listener)
unsubscribe() // A function that unsubscribes the change listener.
```
###### Params:
- **listener** (Function) - The callback, you may call `dispatch()` and `getState()` here

#### replaceReducer(nextReducer)
You might need this if your app implements code splitting (example, React.lazy), and you want to load some of the reducers dynamically.
```jsx
replaceReducer(nextReducer)
```
####### Params
- **nextReducer** (Function) - The next reducer for the store to use.

### Example
```jsx
import { createStore } from 'redux'
function reducer(state = {}, action) {
  if (action.type === 'SOME_TYPE') {
    return { ...state, ...action.newData }
  }
  return state
}
const store = createStore(reducer, { initial: 'data' })
store.dispatch({ type: 'SOME_TYPE', newData: 'newData' })
console.log(store.getState()) // { initial: 'data', newData: 'newData' }
```


## combineReducers(reducers)

Split different reducers into one reducer.
You may call combineReducers at any level of the reducer hierarchy.
You may use it again to split the child reducers.
```jsx
const potatoReducer = (potatoState, action) => newPotatoState
const tomatoReducer = (tomatoState, action) => newTomatoState
rootReducer = combineReducers({ potato: potatoReducer, tomato: tomatoReducer })
// This would produce the following state object:
{
  potato: {}  // ... potatoes, and other state managed by the potatoReducer ...
  tomato: {}  // ... tomatoes, and other state managed by the tomatoReducer, maybe some nice sauce? ...
}
```


## applyMiddleware(...middlewares)

### Info
Middleware lets you wrap the store's `dispatch` method.
Multiple middleware can be combined together.

```jsx
const enhancer = applyMiddleware(...middlewares)
```
###### Params:
- **middlewares** (Function[]) -  `({ getState, dispatch }) => next => action => dispatchValue`
- **enhancer** (Function) -  store enhancer

### Example
```jsx
const reducer = (state, action) => newState
function middlware1({ getState, dispatch }) {
  return next => action => {
    //...
    const returnValue = next(action)
    //...
    return returnValue
  }
}
function middlware2({ getState, dispatch }) { /*...*/}
const store = createStore(reducer, ['Use Redux'], applyMiddleware(middlware1, middlware2))
```


## bindActionCreators(actionCreators, dispatch)

### Info
```jsx
bindActionCreators(actionCreators, dispatch)
```
###### Params:
- actionCreators (Function | Object): An action creator, or an object whose values are action creators.
- dispatch (Function): A dispatch function available on the Store instance.

### Example
```jsx
const actionCreators = {
  addTodo: (text) => ({ type: 'ADD_TODO', text }),
  removeTodo: (id) => ({ type: 'REMOVE_TODO', id })
}
const actions = bindActionCreators(actionCreators, dispatch) // dispatch from redux store
return <TodoList {...actions} />
```


## compose(...functions)

Composes functions from right to left.
Each function is expected to accept a single parameter. Its return value will be provided as an argument to the next function.
```jsx
const composedFunction = compose(...functions)
```
###### Params:
- **functions** (Function[]) - The functions to compose: `(value) => newValue`
- **composedFunction** (Function) - The final function obtained by composing the given functions from right to left.


## connect()

### Info
Connects a React component to a Redux store.
Returns a new, connected component class that wraps the component you passed in.

```jsx
const WrappedComponent = connect(mapStateToProps, mapDispatchToProps, mergeProps, options)(Component)
```
###### Params (all optional):
- **mapStateToProps** (Function) - `(state, ownProps?) => Object` - gets state from store
- **mapDispatchToProps** (Function | Object) - `Object | (dispatch, ownProps?) => Object` - returns actions
- **mergeProps** (Function) - `(stateProps, dispatchProps, ownProps) => Object`
- **options** (Object)

### mapStateToProps
```jsx
const mapStateToProps = (state, ownProps) => ({ todos: state.todos[ownProps.id], })
```
###### Params:
- **state** (Object) - current state
- **ownProps** (Object) -  wrapper components props

### mapDispatchToProps
```jsx
const mapDispatchToProps = (dispatch, ownProps) => ({
  reset: (someId) => dispatch({ type: 'RESET', data: someId }),
})
// inside the component:
return <button onClick={() => this.props.reset(this.props.someId)} />
```
###### Params:
- **dispatch** (Function) - dispatch function of your store
- **ownProps** (Object) - wrapper components props

### mergeProps
Defines how the final props for your own wrapped component are determined.
Default: `{ ...ownProps, ...stateProps, ...dispatchProps }`

```jsx
const mergeProps = (stateProps, dispatchProps, ownProps) => newMergedProps
```
###### Params:
- stateProps (Object)
- dispatchProps (Object)
- ownProps (Object)

### options
Options object
###### Params
- context (Object) - You need to pass the instance of your context to both `<Provider />` and your connected component (>= v6.0).
- areStatesEqual (Function) - `(next: Object, prev: Object) => boolean` - default: strictEqual - `(next, prev) => prev === next`
- areOwnPropsEqual (Function) - `(next: Object, prev: Object) => boolean` - default: shallowEqual - returns true when each field of the objects is equal
- areStatePropsEqual (Function) - `(next: Object, prev: Object) => boolean` - default: shallowEqual - Compares the result of `mapStateToProps` to its previous value
- areMergedPropsEqual (Function)  - `(next: Object, prev: Object) => boolean` - default: shallowEqual - Compares the result of `mergeProps` to its previous value.
- forwardRef (boolean) - if true will return the instance of the wrapped component (>= v6.0).


## batch()
React-Redux v7.0.0
If you're using **React 18, you do not need to use the batch API**. 
React 18 automatically batches all state updates, no matter where they're queued.

```jsx
import { batch } from 'react-redux'
function myThunk() {
  return (dispatch, getState) => {
    // should only result in one combined re-render, not two
    batch(() => {
      dispatch(increment())
      dispatch(increment())
    })
  }
}
```


