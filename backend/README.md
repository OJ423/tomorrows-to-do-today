# Backend - Tomorrow's To-Do Today

Here's a brief overview of the backend and how to set it up. For full instructions, see the repo's [main readme](../README.md).

## Dependencies

```json
"devDependencies": {
    "@types/bcryptjs": "^2.4.6",
    "@types/express": "^4.17.21",
    "@types/http-status-codes": "^1.2.0",
    "@types/jest": "^29.5.12",
    "@types/node": "^20.14.2",
    "@types/supertest": "^6.0.2",
    "dotenv": "^16.4.5",
    "jest": "^29.7.0",
    "supertest": "^7.0.0",
    "ts-jest": "^29.1.5"
  },
  "dependencies": {
    "@prisma/client": "^5.15.0",
    "@types/cors": "^2.8.17",
    "@types/jsonwebtoken": "^9.0.6",
    "@types/nodemailer": "^6.4.15",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "express": "^4.19.2",
    "http-status-codes": "^2.3.0",
    "install": "^0.13.0",
    "jsonwebtoken": "^9.0.2",
    "nodemailer": "^6.9.13",
    "npm": "^10.8.1",
    "prisma": "^5.15.0",
    "ts-node": "^10.9.2",
    "typescript": "^5.4.5",
    "zod": "^3.23.8"
  }
  ```

  ## Setup Backend

> To understand the backend. Checkout the [endpoints.json](./backend/endpoints.json) file. Comments can be found in the routes. Simply follow the function trial to see how each endpoint works

In your terminal, navigate to the backend folder:

`cd backend`

You will need to install the dependencies (details of which can be found in the [backend readme](./backend/README.md)):

`npm install`

### Setup ENVIRONMENTS

The project has two environments:

- `.env.test` is for testing
- `.env` is used by the frontend

Set the following up in your environments:

```bash
DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/DATABASE NAME?schema=public"
JWT_SECRET="GENERATE A JWT SECRET"
EMAIL_USER=EMAIL_ADDRESS_FOR_REGISTRATION_VALIDATION
EMAIL_PASS=EMAIL_PASSWORD
FRONTEND_URL=http://localhost:8080
```

*Note: The database set up file names the databases tomorrowstodotoday and tomorrowstodotoday_test*

> For simplicity - use [Etheral Email](https://ethereal.email/) to simulate email verification. You just need to check the Etheral inbox for verification emails and click on the link.

## Setup Database & Schema and Generate Client

Create your databases by running:

`npm run setup-dbs`

Migrate your schemas for both environments:

`npx prisma migrate dev --name init`

and for your test env:

`npm run migrate:test`

Finally, generate your client:

`npx prisma generate`

## Testing
The backend uses Jest for testing. Assuming you have set up the test environment, you can test the API ([tests are here](./backend/__tests__/endpoint-tests.ts)) with the following command:

`npm run test`

*There is no need to seed the test database*

## Run the server with data

If you want some data to test the front end. I've added a seed file to add a user and some further details. To run this enter:

`npm run seed`

To start the server, **which runs on port 3000**, run:

`npm run start`

## Improvements

- Improved test environment - in all honesty it took me a while to figure out setting up the test environments with Prisma so the current setup is not ideal. But importantly, it let me test my endpoints.
- Better error handling - I would move error handling to their own routes and segregate them to specific errors
- More endpoints - namely editing lists/to-dos, profile view, delete user, forgot password.
- General refactoring - clean up the code somewhat!