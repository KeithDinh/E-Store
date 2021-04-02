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

## CONSTRAINTS/NEED TO IMPROVE

- Cant set customed password validator for firebase forgot password

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

  - ex: setState((s) => --s)

- useCallback: wrap around a function that call another function to avoid rerendering

# MONGODB
