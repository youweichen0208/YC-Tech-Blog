---
cover: /assets/images/secondhand-project.jpg
icon: pen-to-square
date: 2024-02-05
category:
  - frontend
tag:
  - React
---

# React

## What is React?

- React is one of the most popular JavaScript libraries to build SPA (Single Page Applications)

  - Popular alternatives: Angular, VueJS

- Open-source project created by Facebook
- Component-based
- Mostly used to build front-end web SPA applications
  - Can also be used to create native apps for Android, iOS (React Native)

## Creating React App with Create React App

- Prerequisite: Latest version of Node JS
  - NPM - package manager: install, delete, and update JS packages
  - NPX - package executer: Execute JS packages directly, without installing
- Let's get started:
  - cd our_folder
  - npx create-react-app todo-app
  - cd todo-app
  - npm start

## Important Commands:

- **npm start:** runs the apps in development mode
- **npm test:** run unit tests
- **npm run build:** build a production deployable unit
- **npm install:** add a dependency to our projects

## Exploring Create React App Folder Structure

- **README.md**: documentation
- **package.json**: define dependencies (similar to pom.xml)
- **node_modules**: folder where all the dependencies are downloaded to
- **React Initialization**:
  - public/index.html: contains root div
  - src/index.js: intialize React App. Loads App component
    - src/index.css - styling for entire application
  - src/App.js: code for app component
    - src/App.css - styling for app component
    - src/App.test.js - unit tests for App component

## Why do we need React components?

- Web applications have complex structure

  - Menu, Header, Footer, Welcome Page, Login Page, Logout Page, Todo Page etc

- Components help us modularize React apps
  - Create separate components for each page element
    - Menu Component
    - Header Component
    - Footer Component
    - ...
  - Why?
    - Modularization
    - Reuse

## Understanding React Components

- First component typically loaded in React Apps: App Component
- Parts of a Component

  - View (JSX or JavaScript)
  - Logic (JavaScript)
  - Styling (CSS)
  - State (Internal Data Store)
  - Props (Pass Data)

- React component names must always start with a capital letter

![React Component](/assets/images/component.png)

## Understanding State in React

- **State**: Built-in React object used to contain data or information about the component
- **useState** hook allows adding state to Function Components
  - **useState** returns two things
    - 1: Current state
    - 2: A function to update state
  - Each instance of component has it's own state
  - How to share state between components?
    - move state "upwards" (to a parent component)

## Getting Started with JSX - Views with React

- React projects use JSX for presentation
- Stricter than HTML
  - **Close tags** are mandatory
  - **Only one top-level tag allowed:**
    - Cannot return multiple top-level JSX tags
    - Wrap into a shared parent

## Define CSS in JSX

Options of styling our React components:

1. style:

```jsx
<button style= {{borderRadius: "30px"}}>
```

2. className:

- import css file to the component file

## What's happening in the background with React?

- We updated the state => React updated the view
  - How can we update an HTML element?
    - A HTML page is represented by DOM (Document Object Model)
    - Each element in a HTML page is a node in the DOM
    - We need to update the DOM to update the element
    - However, writing code to update the DOM can be complex and slow
- React takes a different approach:
  - Virtual DOM: "virtual" representation of a UI (kept in memory)
    - React code updates virtual DOM
  - React identifies changes and synchronizes them to HTML page
    - 1. React creates virtual DOM v1 on load of page
    - 2. We perform an action
      - 3. React creates Virtual DOM v2 as a result of our action
      - 4. React performs a diff between v1 and v2
      - 5. React synchronizes changes (updates HTML page)
- Summary: We are NOT updating the DOM directly
- React identifies changes and efficiently updates the DOM

## Router in React

React Router enables navigation and handling of routes in a React application.

### `<BrowserRouter>`

The `<BrowserRouter>` component is the root component provided by React Router. It enables the use of client-side routing, allowing our React components to render based on the current URL.

### `<Routes>`

The `<Routes>` component is used to declare individual route configurations. It wraps the set of `<Route>` components and defines the route structure for our application.

### `<Route>`

Each `<Route>` component represents a route in our application. It has a `path` prop that specifies the URL for the route, and an `element` prop that defines the React component to render when the route matches.

```jsx
<BrowserRouter>
  <Routes>
    <Route path="/login" element={<LoginComponent />} />
    <Route path="/" element={<LoginComponent />} />
    <Route path="/welcome/:username" element={<WelcomeComponent />} />
    <Route path="*" element={<ErrorComponent />} />
    <Route path="/todos" element={<ListTodosComponent />} />
    <Route path="/logout" element={<LogoutComponent />} />
  </Routes>
</BrowserRouter>
```

- The `<Route>` with `path="*"` is a catch-all route, meaning it will match any URL that hasn't matched previous routes.
- The route `/welcome/:username` demonstrates the usage of a dynamic route where `:username` is a parameter that can be accessed in the `WelcomeComponent` using the `useParams` hook.

## useNavigate()

The `useNavigate` hook is part of the React Router library and is used for programmatic navigation in React applications. It provides a function that allows us to navigate to different routes within our application.

```jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function MyComponent() {
  // Initialize the navigate function
  const navigate = useNavigate();

  // Example: Navigating on a button click
  const handleButtonClick = () => {
    // Use the navigate function to go to a specific route
    navigate("/welcome");
  };

  return (
    <div>
      <h1>My Component</h1>
      <button onClick={handleButtonClick}>Go to Welcome Page</button>
    </div>
  );
}

export default MyComponent;
```

In this example, when the button is clicked, the `handleButtonClick` function is called, and it uses the `navigate` function to navigate to the `/welcome` route.

### Navigating with Parameters

```jsx
const handleButtonClick = () => {
  const username = "John"; // You can get this dynamically
  navigate(`/welcome/${username}`);
};
```

This example navigates to the '/welcome/john' route, where 'John' is a dynamic parameter

## useParams()

The `useParams` hook is part of the React Router library and is used to access the parameters from the current route's path. This is particularly useful when dealing with dynamic routes where certain parts of the URL serve as placeholders for values.

```jsx
function WelcomeComponent() {
  const params = useParams();

  console.log(params.username);
  return (
    <div>
      <h1>Welcome {params.username}!</h1>
      <div>
        Manage Your todos - <Link to="/todos">Go here</Link>
      </div>
    </div>
  );
}
```

- `const params = useParams()`: this line uses the `useParams` hook to get the parameters from the current route. In our case, it extracts the username parameter.

## Link in React

The `Link` component is part of the `react-router-dom` library, and it's used in React applications to create navigation links that work with React Router. The purpose of the `Link` component is to provide a way to navigate between different views or pages without causing a full page upload.

```jsx
<Link to="/welcome">Go to Welcome Page</Link>
```

In this example, clicking the link will navigate to the "/welcome" route.

## Sharing React State with multiple components using Auth Context

**Contexts** in React are a way to share values, such as state or functions, between components without passing props through every level of the component tree.

### Create `AuthContext`:

The `createContext` function is called, and the result is stored in the constant `AuthContext`. This context can be used to share values across components.

```jsx
export const AuthContext = createContext();
```

### `AuthContext.Provider`

The `Provider` component is responsible for making the provided value accessible to all descendant components.

```jsx
//put some state in the context
//share the created context with other components
export default function AuthProvider({ children }) {
  const [number, setNumber] = useState(10);

  return (
    <AuthContext.Provider value={{ number }}>{children}</AuthContext.Provider>
  );
}
```

- `value` Prop:
  The `value` prop is used to pass the actual value that we want to share within the context. In this case, it's an object with a property named `number`. The value of `number` is being passed as a prop to the `Provider`.

- `{children}`:
  The `childrem` prop represents the content that is wrapped by the `Provider`. In React, the `children` prop is a special prop that contains the content between the opening and closing tags of a component.

### using a component that contains AuthContext.Provider to wrap its children and provide authentication-related context to its descendants is a common and correct pattern in React applications.

```jsx
<BrowserRouter>
  <AuthProvider>
    <HeaderComponent />
    <Routes>
      <Route path="/login" element={<LoginComponent />} />
      <Route path="/" element={<LoginComponent />} />
      <Route path="/welcome/:username" element={<WelcomeComponent />} />
      <Route path="*" element={<ErrorComponent />} />
      <Route path="/todos" element={<ListTodosComponent />} />
      <Route path="/logout" element={<LogoutComponent />} />
    </Routes>
  </AuthProvider>
</BrowserRouter>
```

- the `AuthProvider` component we just created in the previous section can be used to wrap its children and provide context to its descendants.

### Access the global value from using the context in other components

```jsx
// ExampleComponent.js
import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";

export default function ExampleComponent() {
  const authContext = useContext(AuthContext);

  console.log("AuthContext number:", authContext.number);

  return <div>{/* Your component rendering logic */}</div>;
}
```

In this example, `ExampleComponent` is using the `useContext` hook to access the `AuthContext` and log the `number` property.
