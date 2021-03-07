# API

## COMMANDS/PACKAGES

- npm init
- npm install:
  - express: backend framework
  - body-parser: parse content from request
  - mongoose: lib to communicate with mongodb
  - cors: cross-origin resource sharing, multiple apps on different ports
  - morgan: request logger for development
  - jsonwebtoken: used for jwt only
  - express-jwt: build on top of jsonwebtoken with additional features (protected route also)
  - firebase-admin: used to process the token from front-end
  - nodemon: auto restart server when changed
  - dotenv: add, load variable to env file

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

## CONSTRAINTS/NEED TO IMPROVE

- Cant set customed password validator for firebase forgot password

## GENERALS

- React-router Route: need keyword "exact"
- React.StrictMode may cause bugs, remove it won't cause problems
- readonly: not editable, but submitable | disabled: not editable nor submitable
- localstorage: setItem(name, item), getItem(name), removeItem(name)
- Env variable naming convention prefix: `REACT_APP_`
- process.env gets vars from all files start with .env
- history is used as props for only the Route from react router dom
- Redux:
  - useDispatch: update the state
  - useSelector: get data from the redux

# MONGODB
