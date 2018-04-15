# Greasy Spoon App

This is a demo UI that hits the Avero check API: [https://github.com/AveroLLC/check-api]().

**It is designed to exclusively run on small mobile devices like phones.** If run on a laptop browser, put it into phone mode (in Chrome, toggle device toolbar in the dev tools UI).

## Running

To run the app, you'll need `yarn` installed. Assuming you do, and starting from this directory:

```
cd gspoon
yarn
yarn start
```

You might also be able to hit the app with your actual phone, as long as your laptop and phone are on the same network. `yarn` will tell you what the LAN address is, such as `192.168.1.10:3000`.

## Design Rationale

I've chosen to target mobile devices because:

- They can wirelessly talk to the rest of the restaurant which reduces overhead for waitstaff to write orders down in one step and enter them into a computer bolted to the wall somewhere else.
- It is designed to be operated with one hand, using only a thumb. Waitstaff often have other things (trays, pints of beer) in their other hand, so single-handed operation seems critical to me.
- It is designed to be efficient for consistent use. It is not necessarily pretty.
- For more thoughts than you probably want or can handle reading, check out `dev-log.md`.