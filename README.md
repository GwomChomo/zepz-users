## Running the Project

In the project directory, you can run:

### `npm install`
Installs all the needed dependencies to run the project

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Versions
The project was built and tested with npm v9.3.1 and node v14.21.2


## Project Description, Design and Limitations
The project is simple React application that fetches users from the Stackoverflow API,\
sorted by their Stackoverflow reputation. 
### Main Features
- Basic information about the users, ie their name and their reputation and profile picture. 
- The application simulates follow/unfollow, blocking functionalities.
- Basic storage with local storage, for blocked/followed users  
- Infinite scrolling (pagination).
- can search and view blocked users on a separate section as well as see the number of blocked and users that are being followed.

### Design Decisions
The main design decisions were as follows:
- Code separation: The application is broken down into smaller, reusable components for better readability and maintainability. Also, a
  consistent folder structure is kept to make things easier to find and to separate concerns.
- Context API usage: The application uses the Context API to pass down shared state, and the respective update functions, used in different components to \
  avoid prop drilling and to reduce the complication of passing state around and updating it in multiple components.
- Custom hooks for data fetching and event listening: Data fetching is encapsulated into different custom hooks to make it reusable,
  and extensible, should the application grow. Also makes error handling easier.
- Data Persistence: Local storage is used to persist data for followed and blocked users, for better user experience.
- Testing: Added some baseline unit test to verify behaviour of the data fetching hook, and the follow/block operations, with mocked data.  
- Styling and Responsiveness: React-Bootstrap was used to make the application responsive on the web, on a wide range of devices.

### Limitations
 - Styling: Although the application layout is responsive, the styling starts to break on very small screens. Given a bit more time this could easily be
   solved with more bootstrap/css settings.
 - Testing: Only key parts of the application have unit tests. Ideally, test coverage should be >80% of the application, where possible.
 - Component Reuse: Some components, for example, the search input could be made more reusable.
 - Documentation: Although good naming conventions were followed, little to no documentation is added, due to time constraints.

### Time Allocation
- Design: 1 hour
- Implementation - 3 hours
- Testing - 1 hour
- Review - 30 minutes
- Documentation - 30 minutes
