# Avion School Assessment

## Usage

- create a `.env` file at root dir, copy contents of `.env.example` and replace with your Challonge API Key.

```bash
# install dependencies
yarn install

# start development server
yarn dev
```

## Tech Stack

| Name        | Description             | Version   |
| ----------- | ----------------------- | --------- |
| nextjs      | React Framework         | `^12.2.0` |
| tailwindcss | Styling                 | `^3.1.4`  |
| axios       | Api fetching            | `^0.27.2` |
| react-query | Client-side api caching | `^3.39.1` |
| zod         | Validation              | `^3.17.3` |

---

## Journey

### Challenges

1. NOT Standard format REST Api

- All endpoints in the documentation regardless of the method passes data in url query parameters. Usually, POST requests data are put in the request body so that value types are retained like booleans and numbers.

2. CORS

- The Api endpoint isn't callable in client-side javascript. You will get a CORS error and so you would need a backend to call it for you as it doesnt allow client-side javascript to call it. Luckily I am using NextJS so I took advatage of its api routes that run on the server (edge).

3. Design

- I don't specialize in UI/UX so I took inspiration from Challonge itself.

### Fun fact

I've created the internal services such that it is end-to-end typesafe at runtime. Using typescript already gives you a huge advatage by defining shapes of inputs and outpus; but this is only beneficial at compile time. Since we are interacting with an external API, we do not know and cannot assure that the data coming back is what we expect.

My implementation uses [zod](https://github.com/colinhacks/zod) as a validator for the apis input and output. It is responsible for validating the input we give and the response we get from the api and does a great job at converting zod schemas to typescript interfaces; this lets me reuse a lot of code throughout the app. The zod schemas are the main source of truth, meaning if I change a property in the schema, all typescript interfaces are updated as it is infered from the schema. This makes debugging and refactoring very easy.

---

Made with ☕ by [Prince Carlo Juguilon](https://joogie.link/)
