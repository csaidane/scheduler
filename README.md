# Interview Scheduler

Interview Scheduler is a single page app I built during my time at the Lighthouse Labs Coding Bootcamp.

This project was build with a main focus of learning about React (components, hooks, rendering best practices...)
as well as testing (Jest for Unit and Integration tests, Cypress for automated browser E2E tests).

To allow for a narrow focus on those topics, the app utilizes a Lighthouse API that handles the postgreSQL persistence layer.
The calls to this API were handled using the Axios promised-based client for Node.js.

I used storybook to develop all the different components in isolation. The total app is packaged using Webpack and Babel.
It was created using Create React App. 

 


## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
