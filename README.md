# Digistar Frontend Engineering Test

This project is built using React. This README file outlines the standard way of working, including naming conventions, folder structure, and best practices to maintain a clean and scalable codebase.

## Running the Project

1. Clone the repository:

   ```sh
   git clone https://github.com/AzkaDzaki/digistar-fe-ceria.git
   cd digistar-fe-ceria
   ```

2. Fetch and Checkout to the `preferences` branch:

   ```sh
   git fetch
   git checkout `preferences`
   ```

3. Install the dependencies:

   ```sh
   npm install
   ```

4. Run the development server:

   ```sh
   npm run start
   ```

## Table of Contents

1. [Project Structure](#project-structure)
2. [Naming Conventions](#naming-conventions)
3. [Component Structure](#component-structure)
4. [State Management](#state-management)
5. [Styling](#styling)
6. [Testing](#testing)
7. [Linting and Formatting](#linting-and-formatting)
8. [Environment Variables](#environment-variables)

## Project Structure

The project follows a modular and feature-based folder structure. This makes the codebase easy to navigate and scale as the project grows.

```
/src
├── assets          # Static assets like images, fonts, etc.
├── components      # Reusable UI components
│   ├── Button      # Folder for Button component
│   │   ├── Button.js
│   │   ├── Button.test.js
│   │   ├── Button.css
│   │   └── index.js
│   └── ...
├── containers      # Container components (if applicable)
├── pages           # Page components, corresponding to routes
│   ├── Home
│   │   ├── Home.js
│   │   ├── Home.test.js
│   │   ├── Home.css
│   │   └── index.js
│   └── ...
├── hooks           # Custom React hooks
├── context         # Context providers for global state management
├── services        # API calls, utility functions
├── App.js          # Main application component
├── index.js        # Entry point of the application
└── ...
```

## Naming Conventions

- **Files & Folders**: Use `camelCase` for filenames and folder names except for components, which should use `PascalCase`.
- **Components**: Use `PascalCase` for component names, e.g., `UserProfile.js`.
- **Hooks**: Use `camelCase` and prefix with `use`, e.g., `useFetchData.js`.
- **CSS/SASS Files**: Use `kebab-case` for CSS/SASS files, e.g., `user-profile.module.css`.

## Component Structure

Components should be organized by feature or common usage:

- **Presentational Components**: Components that are purely for UI, without any business logic. Place them in the `components` directory.
- **Container Components**: Components that connect to the state management and handle business logic. Place them in the `features` directory.

Example structure for a feature:

```
features/
└── user/
    ├── UserProfile.js
    ├── UserList.js
    ├── userSlice.js  # Redux slice or Zustand store
    └── userAPI.js    # API calls related to the user feature
```

## State Management

State should be managed globally or locally depending on the need:

- **Global State**: Use a state management library like Redux or Zustand. Organize the state by feature in the `store` directory.
- **Local State**: Use React's `useState` or `useReducer` for state that is specific to a component.

## Styling

Use a consistent styling approach across the project:

- **CSS Modules**: Scoped CSS using `*.module.css` or `*.module.scss`.
- **Styled Components**: For component-level styling using the `styled-components` library.
- **Global Styles**: Place global styles in the `styles` directory.

## Testing

Testing is essential for maintaining a reliable codebase. Use `Jest` and `React Testing Library` for unit and integration tests.

- **Test Files**: Place test files in the same directory as the component they are testing, with the `.test.js` suffix.
- **Test Structure**: Write separate tests for component rendering, logic, and edge cases.

```
components/
└── Button/
    ├── Button.js
    └── Button.test.js
```

## Linting and Formatting

Ensure consistent code style and formatting:

- **ESLint**: Use ESLint for code linting with a standard configuration (e.g., Airbnb, Prettier).
- **Prettier**: Use Prettier for code formatting. Configure Prettier to work with ESLint to avoid conflicts.
- **Husky & Lint-Staged**: Set up Husky and Lint-Staged to run linters and formatters before commits.

## Environment Variables

Environment variables should be stored in a `.env` file at the root of the project.

- **Security**: Never commit the `.env` file to the repository. Add it to `.gitignore`.
- **Access**: Access environment variables in your code using `process.env.REACT_APP_*`.

```
REACT_APP_API_URL=https://api.example.com
REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key_here
```

## Conclusion

Following these conventions and structures will help maintain a clean, scalable, and maintainable codebase. Adherence to these guidelines is encouraged for all contributors.
