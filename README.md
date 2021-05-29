# BUG

- #1 Cant set customed password validator for firebase forgot password
- #2 /product/undefined bug
- #3 URL change but not component when click on Brands menu item multiple times.
- #4 menu item highlight resets when refresh page
- #5 spam clicking on different menu items freezes the app, have to wait for 1-2 minutes
- #6 antd avatar, when click on image, it disappears

## APPROACH

- #5 it's due to the shop page (too many calls to the filter api) Use setTimeout with 700ms can be a temporary solution?

## SOLUTIONS (fix BUG##)

- #3: listen to a state in useEffect
- #4: create a function to get the url, check for keyword, and match the menu item

# API

## COMMANDS/PACKAGES

- npm init
- npm install:
  - express: backend framework
  - body-parser(DEPRECATED: use express.json() instead): parse content from request
  - mongoose: lib to communicate with mongodb
  - cors: cross-origin resource sharing, multiple apps on different ports
  - morgan: request logger for development
  - jsonwebtoken: used for jwt only
  - express-jwt: build on top of jsonwebtoken with additional features (protected route also)
  - onAuthStateChanged: persist user after refresh
  - firebase-admin: used to process the token from front-end
  - nodemon: auto restart server when changed
  - dotenv: add, load variable from env file in case env file is not at root directory
  - slugify: trim all special characters and convert space to dash
    - ex: "mouse and keyboar" -> "mouse-and-keyboard"
  - setValues({ ...values, [e.target.name]: e.target.value })
  - cloudinary

## GENERALS

- next(): if passing any variable to next, server will asssume it is error
- 304 is not a problem. It simply means that your response is not modified and your browser turns to cache to fetch the resource

# CLIENT

## COMMANDS/PACKAGES

- npx create-react-app
- npm install:
  - react-router-dom
  - antd: for styling menu bar
  - @ant-design/icons: for menu item icons
  - firebase
  - react-toastify
  - redux
  - react-redux: connections btw react and redux
  - redux-devtools-extension: redux for chrome
  - axios: fetch data
  - react-image-file-resizer
  - react-responsive-carousel
  - react-star-ratings
  - lodash: provides utility functions for common programming tasks using functional programming paradigm
  - react-modal-image: show both small icon and modal images
  - react-quill: like a text editor

## GENERALS

- React-router Route: need keyword "exact"
- React.StrictMode may cause bugs, remove it won't cause problems
- readonly: not editable, but submitable | disabled: not editable nor submitable
- localstorage: setItem(name, item), getItem(name), removeItem(name)
- Env variable naming convention prefix: `REACT_APP_`
- process.env gets vars from all files start with .env
- history is passed as props if component is Route from react router dom
- Redux:
  - useDispatch: update the state
  - useSelector: get data from the redux
- Firebase:
  - onAuthStateChanges: used when users refresh page, it tells firebase to call
- clearInterval: remove the setInterval, if not removing, the setInterval will keep continuing infinitely
- [state, setState]: setState return a callback with default parameter state

  - ex: setState((s) => s)

- useCallback: wrap around a function that call another function to avoid rerendering

- to access route params from react router dom: 1. {match} match.params.slug 2. import useParams from react router dom, and {item} from useParams()

- Ignore warning `/* eslint-disable react-hooks/exhaustive-deps */ `

## REDUX

- Redux is needed when data is required in different pages/component
- Reducer is a function that takes in a state and an action, perform the action to update the state, then return new state
- To dispatch an action that needs to call an api or a promise, the app needs to install redux-thunks. It's not likely to be used in this app

# MONGODB

- populate: display referenced data, only for attribute with 'ref' in model
- {new: true}: // send the new updated to client instead of the old one
- findOneAndUpdate - $push in second arg to push data to array type property
