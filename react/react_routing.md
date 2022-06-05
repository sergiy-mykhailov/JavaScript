# Routing

[v5 docs](https://v5.reactrouter.com/web/guides/quick-start)
[v6 docs](https://reactrouter.com/docs/en/v6/api)

## react router

### v4 and v5 before 5.1
```jsx
function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />  -> /
      <Route path="/about" component={About} />
      <Route path="/products" component={ProductsLayout} />                   -> /products, /products/123, /products/123/edit,
      <Route strict path="/products/:id/" component={ProductsEdit} />         -> /products/123/review, /products/123/edit
      <Route exact strict path="/products/:id" component={ProductsDetails} /> -> /products/123
      <Route
        path="/users/:id"
        render={({ match }) => (
          <User id={match.params.id} />
        )}
      />
      <Redirect from="about" to="about-us" />
      <Redirect exact from="contacts" to="our-contacts" />
    </Switch>
  );
}
function User({ id }) {
  // ...
}
```


### v5.1
```jsx
function App() {
  return (
    <Switch>
      <Route exact path="/"><Home /></Route>
      <Route path="/about"><About /></Route>
      <Route path="/users/:id" children={<User />} />
      <Route path="about" render={() => <Redirect to="about-us" />} />
    </Switch>
  );
}
function User() {
  let { id } = useParams();
  // ...
}
```


### v6

```jsx
import { render } from "react-dom";
import { BrowserRouter, Routes, Route, Outlet, useParams, GlobalNav, GlobalFooter } from "react-router-dom";
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>              
        <Route index element={<Home />} />               /  ->  App, Home
        <Route path="teams" element={<Teams />}>       
          <Route path=":teamId" element={<Team />} />    /teams/:teamId ->  App, Teams, Team
          <Route path="new" element={<NewTeamForm />} /> /teams/new     ->  App, Teams, NewTeamForm
          <Route index element={<LeagueStandings />} />  /teams         ->  App, Teams, LeagueStandings
        </Route>
      </Route>
      <Route element={<PageLayout />}>
        <Route path="/privacy" element={<Privacy />} />  /privacy    -> PageLayout, Privacy
        <Route path="/tos" element={<Tos />} />          /tos        -> PageLayout, Tos
      </Route>
      <Route path="contact-us" element={<Contact />} />  /contact-us -> Contact
      <Route path="*" element={<NotFound />} />          all other   -> NotFound
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);

// rendering index routes:
function App() {
  return (
    <div>
      <GlobalNav />
      <Outlet />       // here will be Home or Teams
      <GlobalFooter />
    </div>
  );
}

// rendering layout routes (doesn't participate in the matching, only for wrapping components)
function PageLayout() {}

// rendering nested routes:
function Teams() {
  return (
    <div>
      <h1>some header</h1>
      <div className="content">
        <Outlet />   // here will be nested routes
      </div>
    </div>
  );
}

// access to the url params:
function Team() {
  let params = useParams();
  return <div>params.teamId</div>;
}
```
###### Component Teams will render the following:
- for route `/` -> `<LeagueStandings />` (index route)
- for route `/teams/:teamId` -> `<Team />`
- for route `/teams/new` -> `<NewTeamForm />`


## history

### events

```jsx
window.addEventListener("popstate", () => {});
// with router:
let history = createBrowserHistory();
history.listen(({ location, action }) => {}); // the action is POP, PUSH, or REPLACE
```


## location

```jsx
import { useLocation } from 'react-router-dom';

// window:
window.location.pathname; // /bbq/pig-pickins
window.location.hash;     // #menu
window.location.reload(); // force a refresh

// react router location:
let location = useLocation()
location.pathname // "/bbq/pig-pickins",
location.search   // "?campaign=instagram",
location.hash     // "#menu",
location.state    // null,
location.key      // "aefz24ie"

// window.location equals:
location.pathname + location.search + location.hash; // /bbq/pig-pickins?campaign=instagram#menu

// location.search into URLSearchParams
let params = new URLSearchParams(location.search);
params.get("campaign"); // "instagram"
params.toString();      // "campaign=instagram&popular=true",
```


## `<BrowserRouter>`

### Tips
- recommended for browsers
- stores the current location in the browser's address bar using clean URLs and navigates using the browser's built-in history stack.

### Props
- `window?: object` - `document.defaultView` (returns the `window` object)


## `<HashRouter>`

### Tips
- recommended for browsers
- use when the URL should not (or cannot) be sent to the server for some reason
- stores the current location in the hash portion of the current URL, so it is never sent to the server

### Props
- `window?: object` - `document.defaultView` (returns the `window` object)


## `<NativeRouter>`

### Tips
- recommended for React Native app

### Props
- `initialEntries?: InitialEntry[]` - defaults to `["/"]`
- `initialIndex?: number;` - defaults to the last index of `initialEntries`


## `<MemoryRouter>`

### Tips
- recommended for testing
- stores its locations internally in an array
- does not use standard history stack

### Props
- `initialEntries?: InitialEntry[]` - defaults to `["/"]`
- `initialIndex?: number;` - defaults to the last index of `initialEntries`


## `<Router>`

### Tips
- You don't need `<Router>` instead, you should use one of the higher-level routers (`<BrowserRouter>`, `<HashRouter>`, `<StaticRouter>`, `<NativeRouter>`, and `<MemoryRouter>`).


## `<StaticRouter>`

`<StaticRouter>` is used to render a React Router web app in node (Server side rendering)

### Props
- `location?: string` - defaults to `"/"`


## `<Link>`

### Props
```tsx
type LinkProps = {
  replace?: boolean;
  state?: any;
  to: string;
  reloadDocument?: boolean;
}
```

### Example
```jsx
return (<>
  <Link to="/">Home</Link>
  <Link to="about">About</Link>
  <Link to="/pins/123" state={{ fromDashboard: true }} />
</>)

// with navigate:
let navigate = useNavigate();
navigate("/users/123", { state: partialUser });

// reading state on the next page:
let location = useLocation();
location.state;
```


## `<NavLink>`

A `<NavLink>` is a special kind of `<Link>` that knows whether or not it is "active"

### Props
```tsx
type NavLinkProps = {
  // Link props:
  replace?: boolean;
  state?: any;
  to: string;
  reloadDocument?: boolean;
  // NavLink props:
  caseSensitive?: boolean;
  children?: ReactNode | (({ isActive: boolean }) => ReactNode);
  className?: string | (({ isActive: boolean }) => string | undefined);
  end?: boolean;
  style?: object | (({ isActive: boolean }) => object | undefined);
}
```

### Example
```jsx
<NavLink to="messages" style={({ isActive }) => isActive ? { textDecoration: "underline" } : undefined}>
  Messages
</NavLink>
```


## `<Navigate>`

A `<Navigate>` element changes the current location when it is rendered.

### Example
```jsx
function Component(props) {
  return <Navigate to="/dashboard" replace={true} state={{ some: 'value' }}/>
}
```


## `<Outlet>`

An `<Outlet>` should be used in parent route elements to render their child route elements

```jsx
function App() {
  return (
    <Routes>
      <Route path="/" element={<ParentRouteComponent />}>
        <Route path="messages" element={<Messages />} />
        <Route path="tasks" element={<Tasks />} />
      </Route>
    </Routes>
  );
}
function ParentRouteComponent() {
  return (
    <div>
      <h1>some header</h1>
      <div className="here-will-render-child-routes">
        <Outlet /> // Messages or Tasks will render here
      </div>
    </div>
  );
}
```


## `<Routes>`

### Props
```tsx
interface RoutesProps {
  children?: ReactNode;
  location?: Partial<Location> | string;
}
```


## `<Route>`

`<Route>` like an `if` statement, if its `path` matches the current URL, it renders its `element`.

### Props
```tsx
interface RoutesProps {
  caseSensitive?: boolean;
  children?: ReactNode;
  element?: ReactNode | null;
  index?: boolean;
  path?: string;
}
```


## generatePath

```jsx
generatePath("/users/:id", { id: 42 });                           // "/users/42"
generatePath("/files/:type/*", { type: "img", "*": "cat.jpg" });  // "/files/img/cat.jpg"
```


## Auth

```jsx
function App(props) {
  return (
    <Routes>
      <Route path="/" element={<PublicPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/protected" element={<RequireAuth><ProtectedPage /></RequireAuth>} />
    </Routes>
  )
}

function LoginPage() {
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";   // get page to redirect
  // ...some login process...
  navigate(from, {replace: true}); // redirect to desired page
}

function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation(); // desired page
  if (!auth.user) {
    // not loggedin - redirect to the /login page
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
```


## withRouter (v5 only)
```jsx
class Component extends React.Component {
  render() {
    const { match, location, history } = this.props;

    return <div>...</div>;
  }
}
const ComponentWithRouter = withRouter(Component);
```
