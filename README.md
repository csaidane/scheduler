# Interview Scheduler

Interview Scheduler is a single page app I built during my time at the Lighthouse Labs Coding Bootcamp.
This app allows the user to open a calendar, and schedule interviews with different mock "mentors" on a given day and time.

This project was build with a main focus of learning about React (components, hooks, rendering best practices...)
as well as testing for React (Jest for unit and integration tests, Cypress for automated browser E2E tests).

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

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Use the lighthouse API which can be found !["here"](https://github.com/lighthouse-labs/scheduler-api). The app will be served at <http://localhost:8000/>.
4. After having set up and launched the API, run the 'npm start' command
5. Go to <http://localhost:8000/> in your browser (should happen automatically).


## Final Product

!["Screenshot of the final product"](https://github.com/csaidane/scheduler/blob/master/public/images/Screenshot%20from%202020-08-12%2019-55-03.png)
