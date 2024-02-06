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

![React Component]('/assets/images/component.png')

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
