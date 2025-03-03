# Getting Started with LINCtype

Quick start:
Install dependencies: npm install
Configure .env copying `.env.example`
Start the server: npm start
Start the DB server: npm run json-server
Build on production: npm run build

## Available Scripts

In the project directory, you can run several commands: `npm start`, `npm run json-server`, `npm test`, `npm run build`, and `npm run eject`.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run json-server`

Runs the JSON Server pseudo-db which can be found in the db.json file. JSON Server supports standard CRUD operations. To learn more about json-server, see its [npm page](https://www.npmjs.com/package/json-server) for more information.

### `npm test`

Launches the test runner and return the coverage when finished.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Project Structure

The core information will be found inside `src` folder:

```
src/
├── features/
│   └── typing-test/     # Feature module
│       ├── __tests__/      # Feature-specific tests
│       ├── api/            # Feature-specific API calls
│       ├── components/     # Feature-specific components
│       ├── hooks/          # Feature-specific typing logic hooks
│       └── store/          # Feature-specific Zustand stores
│       .
│       .
├── lib/                 # Third-party integrations
├── shared/              # Shared stores and logic
│   ├── __tests__/          # Shared folder tests
│   ├── api/                # API utilities
│   └── store/              # Zustand stores
├── testing/             # Test utilities
└── utils/               # Shared utilities
```

### Feature Organization

- **Features**: Each feature (like leaderboard, typing test) is isolated in its own directory
- **Components**: React components specific to each feature
- **Store**: State management using Zustand stores
- **Tests**: Co-located with their respective features
- **Shared**: Cross-feature utilities and types with their respective tests
- **Testing**: Centralized test utilities and helpers

### Key Conventions

- Feature-first organization
- Co-located tests

### Proposals applied

- Zustand for state management, so I can keep close the states to their usage and improve rerenders.
- ChakraUI for fast templating and styling
- MSW handlers for API calls, it makes so easy to handle mocks to the API calls
- Custom hook `useTyingTest.ts` to organize input-related changes
- Typing logs in `typingTestStore.ts` for easier calculations used in `testCalculations.ts`
- Toast notifications for successful saved score and alerts when errors occur. Loading states are handle in save button and `Leaderboard` fetch.
- Showcase Component/Presentation pattern with `TypingTestContainer.ts` and `TypingTestView.ts`