# Routing


## react router

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
// window:
window.location.pathname; // /bbq/pig-pickins
window.location.hash;     // #menu
window.location.reload(); // force a refresh

// react router location:
const location = {
  pathname: "/bbq/pig-pickins",
  search: "?campaign=instagram",
  hash: "#menu",
  state: null,
  key: "aefz24ie"
}

// window.location equals:
location.pathname + location.search + location.hash; // /bbq/pig-pickins?campaign=instagram#menu

// location.search into URLSearchParams
let params = new URLSearchParams(location.search);
params.get("campaign"); // "instagram"
params.toString();      // "campaign=instagram&popular=true",
```


## Link

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
