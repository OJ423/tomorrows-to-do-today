# Front-end - Tomorrow's To-Do Today

Here's a brief overview of the front-end and how to set it up. For full instructions, see the repo's [main readme](../README.md).

```json
  "dependencies": {
    "@react-icons/all-files": "^4.1.0",
    "@types/jest": "^29.5.12",
    "@types/react-icons": "^3.0.0",
    "axios": "^1.7.2",
    "dotenv": "^16.4.5",
    "jest": "^29.7.0",
    "next": "14.2.4",
    "react": "^18",
    "react-dom": "^18",
    "react-hook-form": "^7.52.0",
    "ts-node": "^10.9.2"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.4.6",
    "@testing-library/react": "^16.0.0",
    "@types/node": "^20",
    "@types/react-dom": "^18",
    "eslint": "^8",
    "eslint-config-next": "14.2.4",
    "jest-environment-jsdom": "^29.7.0",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
```

## Front-end setup

First navigate to the front-end folder:

`cd frontend` or if your in the backend folder `cd ../frontend`

Install the dependencies:

`npm install`

### Setup Environment

The .env file contains the base URL for the API calls. Set this up (as we're not a real app, I'll add the correct implementation below assuming you don't change ports)

`NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api/`

## Run App

Assuming you have the server running - 

```bash
cd ../backend
npm run start
```

Start your app with -

`npm run dev`

Go ahead and play. 

If you have added the seed data, you can login with either:

```
karlk@karlsworld.com
dr3amp1pe5
```

or

```
bobby@bobbys.com
pass123pass
```

## Testing

There's only one test for the front-end, again using Jest. Run it with -

`npm test`
