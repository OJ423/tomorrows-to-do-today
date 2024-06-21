# Tomorrow's To-Do Today

A to-do list to end procrastination.

This repo features both the backend and front-end for the project.

<img src="./images/tomorrows-todo-today.png" alt="screen shots of the to-do list app"/>

In order to get it working in your local environment you need to do the following:

## Clone Repo

`git clone https://github.com/OJ423/tomorrows-to-do-today`

# Backend

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

`npm run setupsetup-dbs`

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

# Front-end

Thankfully the front-end is a little easier to set up as this readme is getting close to War and Peace length.

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

# More to do
Like with any project, there's more that could be done. Just so you know, given more time I would have:

## Backend

- Improved test environment - in all honesty it took me a while to figure out setting up the test environments with Prisma so the current setup is not ideal. But importantly, it let me test my endpoints.
- Better error handling - I would move error handling to their own routes and segregate them to specific errors
- More endpoints - namely editing lists/to-dos, profile view, delete user, forgot password.
- General refactoring - clean up the code somewhat!

## Frontend

- Meta data and SEO stuff - Favicon, meta description etc for each page using Helmut.
- Tidy the look and feel - I had a vision for the to-do lists, but they're currently a bit clunky.

