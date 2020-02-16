# Todo App

A simple todo app in React

### Live Preview: https://todo-app-gefa.netlify.com/

<br />

## Main technologies
- React
- Redux
- Scss

<br />

## Helpful libraries used
- Redux-persist: To save the store in localstorage and rehydrate the app on browser refresh
- Dayjs: To format times
- React-icons: A bunch of free icons
- Teeheo: A tiny library to generate random numbers,strings,uuids (personally built)
- Fantoastic: A react library to show customizable toasts (personally built)

<br />

## What is missing (functionality)
This application was made in a weekend so there's few things missing.
- A functionality for restoring TODOs from the history would be great.
- Allowing for multiple TODO lists (categories) customly built by the user would be great too.

## What is missing (codebase)
- The redux store was made with simplicity in mind. In a larger application reducers, actions and types would be split in seperate files
to allow for better scalability. A library like redux-thunk or sagas might be also introduced for managing async tasks.
- Tests! A library like Jest and Enzyme or react-testing-library could be introduced to add some unit/integration/e2e testing. Testing would then become a part of the CI/CD to prevent faulty deployments.
