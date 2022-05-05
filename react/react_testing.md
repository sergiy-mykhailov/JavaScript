# Testing

## react-testing-library

[docs](https://testing-library.com/docs/react-testing-library/cheatsheet)

```jsx
import React from 'react'
// import API mocking utilities from Mock Service Worker:
import {rest} from 'msw'
import {setupServer} from 'msw/node'
// import testing methods:
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
// the component to test:
import Fetch from '../fetch'

// mock API requests:
const server = setupServer(
  rest.get('/greeting', (req, res, ctx) => {
    return res(ctx.json({greeting: 'hello there'}))
  }),
)
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('loads and displays greeting', async () => {
  // Arrange:
  render(<Fetch url="/greeting" />)
  // Act:
  fireEvent.click(screen.getByText('Load Greeting'))
  await waitFor(() => screen.getByRole('heading'))
  // Assert:
  expect(screen.getByRole('heading')).toHaveTextContent('hello there')
  expect(screen.getByRole('button')).toBeDisabled()
})

test('handles server error', async () => {
  // override the initial "GET /greeting" request handler to return a 500 Server Error:
  server.use(
    rest.get('/greeting', (req, res, ctx) => {
      return res(ctx.status(500))
    }),
  )
  // Arrange:
  render(<Fetch url="/greeting" />)
  // Act:
  fireEvent.click(screen.getByText('Load Greeting'))
  await waitFor(() => screen.getByRole('alert'))
  // Assert:
  expect(screen.getByRole('alert')).toHaveTextContent('Oops, failed to fetch!')
  expect(screen.getByRole('button')).not.toBeDisabled()
})
```


## jest

[jest docs](https://jestjs.io/ru/docs/tutorial-react)
[react testing](https://ru.reactjs.org/docs/testing-recipes.html)

```jsx
import { unmountComponentAtNode } from "react-dom";

// the component to test:
import OtherComponent from './other-component'
function SomeComponent(props) {
  async function fetchUserData(id) {
    await fetch(someApiPath);
    //...
  }
  useEffect(/* timeout on 5 sec */)
  //...
  return (
    <div onClick={() => {}}>
      {/*...some staff...*/}
      <OtherComponent someProp={someValue}/>
    </div>
  )
} // component with async fetch, events...

let container = null;
// подготавливаем DOM-элемент, куда будем рендерить:
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});
// подчищаем после завершения
afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

// response object test data
const fakeUser = {
  name: "Joni Baez",
  age: "32",
  address: "123, Charming Avenue"
};

// mock global fetch
jest.spyOn(global, "fetch").mockImplementation(() =>
  Promise.resolve({
    json: () => Promise.resolve(fakeUser)
  })
);

// mock other components
jest.mock("./other-component", () => {
  return function DummyOtherComponent(props) {
    return (
      <div data-testid="some-field">
        other-component-mock-value
      </div>
    );
  };
});

it("should render data", async () => {
  // Используем act асинхронно, чтобы передать успешно завершённые промисы
  await act(async () => {
    render(<SomeComponent id="123" />, container);
  });

  expect(container.querySelector("some-name-selector").textContent).toBe(fakeUser.name);
  expect(container.textContent).toContain(fakeUser.address);

  // выключаем фиктивный fetch, чтобы убедиться, что тесты полностью изолированы
  global.fetch.mockRestore();
});

it("should render data from other component", async () => {
  await act(async () => {
    render(<SomeComponent id="123" />, container);
  });

  expect(container.querySelector('[data-testid="some-field"]').textContent).toEqual('other-component-mock-value')
});

it("should fire an event", async () => {
  const onChange = jest.fn();
  
  act(() => render(<SomeComponent onChange={onChange} />, container));
  const button = document.querySelector("[data-testid=toggle]");
  expect(button.innerHTML).toBe("Turn on");

  act(() => button.dispatchEvent(new MouseEvent("click", { bubbles: true })));
  expect(onChange).toHaveBeenCalledTimes(1);
});

it("should select null after timing out", () => {
  const onSelect = jest.fn();

  act(() => render(<SomeComponent onSelect={onSelect} />, container));

  // двигаемся вперёд во времени на 100 мс
  act(() => jest.advanceTimersByTime(100));
  expect(onSelect).not.toHaveBeenCalled();

  // теперь двигаемся вперёд ещё на 5 секунд
  act(() => jest.advanceTimersByTime(5000));
  expect(onSelect).toHaveBeenCalledWith(null);
});
```


## enzyme

[docs](https://enzymejs.github.io/enzyme/)

### Shallow Rendering
Testing a component as a unit (without child components)

```jsx
describe('<MyComponent />', () => {
  it('renders an `.icon-star`', () => {
    const wrapper = shallow(<MyComponent />);
    expect(wrapper.find('.icon-star')).to.have.lengthOf(1);
  });
  it('renders children when passed in', () => {
    const wrapper = shallow((<MyComponent><div className="unique" /></MyComponent>));
    expect(wrapper.contains(<div className="unique" />)).to.equal(true);
  });
  it('simulates click events', () => {
    const onButtonClick = sinon.spy();
    const wrapper = shallow(<Foo onButtonClick={onButtonClick} />);
    wrapper.find('button').simulate('click');
    expect(onButtonClick).to.have.property('callCount', 1);
  });
});
```

### Full DOM Rendering
Testing components that may interact with DOM APIs or need to test components that are wrapped in higher order components.

```jsx
describe('<Foo />', () => {
  it('allows us to set props', () => {
    const wrapper = mount(<Foo bar="baz" />);
    expect(wrapper.props().bar).to.equal('baz');
    wrapper.setProps({ bar: 'foo' });
    expect(wrapper.props().bar).to.equal('foo');
  });
  it('simulates click events', () => {
    const onButtonClick = sinon.spy();
    const wrapper = mount((<Foo onButtonClick={onButtonClick} />));
    wrapper.find('button').simulate('click');
    expect(onButtonClick).to.have.property('callCount', 1);
  });
  it('calls componentDidMount', () => {
    sinon.spy(Foo.prototype, 'componentDidMount');
    const wrapper = mount(<Foo />);
    expect(Foo.prototype.componentDidMount).to.have.property('callCount', 1);
    Foo.prototype.componentDidMount.restore();
  });
});
```

### Static Rendered Markup
`render` function generates HTML from your React tree, and you can analyze the resulting HTML structure.

```jsx
describe('<Foo />', () => {
  it('renders three `.foo-bar`s', () => {
    const wrapper = render(<Foo />);
    expect(wrapper.find('.foo-bar')).to.have.lengthOf(3);
  });
  it('renders the title', () => {
    const wrapper = render(<Foo title="unique" />);
    expect(wrapper.text()).to.contain('unique');
  });
});
```


## react-testing-library vs enzyme

**Enzyme** allows you to access the internal workings of your components. 
You can read and set the state, and you can mock children to make tests run faster.

**react-testing-library** doesn't give you any access to the implementation details. 
It renders the components and provides utility methods to interact with them. 
The idea is that you should communicate with your application in the same way a user would. 
So rather than set the state of a component you reproduce the actions a user would do to reach that state.


## Storybook vs Styleguidist

### Storybook
**Storybook** is an open source tool for building UI components and pages in isolation.
[docs](https://storybook.js.org/docs/react/get-started/introduction)

### styleguidist
**Styleguidist** uses to develop React components in isolation, document them and create a style guide to share documentation with your team.
[docs](https://react-styleguidist.js.org/docs/getting-started)

