# Greasy Spoon App

This is a demo UI that hits the Avero check API: [https://github.com/AveroLLC/check-api]().

**It is designed to exclusively run on small mobile devices like phones.** If run on a laptop browser, put it into phone mode and choose iPhone 6/7/8 (in Chrome, toggle device toolbar in the dev tools UI).

## Running

To run the app, you'll need `yarn` installed. Assuming you do, and starting from this directory:

```
cd gspoon
yarn
yarn start
```

It should then tell your browser to load the app at `localhost:3000` and you shouldn't need to do anything except go play with the app.

You might also be able to hit the little dev server with your physical phone, as long as your laptop and phone are on the same network. `yarn` will tell you what the LAN address is, such as `192.168.1.10:3000`.

## Design Rationale

I've chosen to target mobile devices because:

- They can wirelessly talk to the rest of the restaurant which reduces overhead for waitstaff to write orders down in one step and enter them into a computer bolted to the wall somewhere else.
- It is designed to be operated with one hand, using only a thumb. Waitstaff often have other things (trays, pints of beer) in their other hand, so single-handed operation seems critical to me.
- It is designed to be efficient for consistent use in the typically distracting context and bad-lighting levels of restaurants. The colors are intentionally high-contrast. There is little graphic subtlety here, and no animations.

## Implementation

This is implemented as a React.js app, and for what it is worth, this is my first React app. My last main frontend app was in Ember.js and I'm trying to get away from that so I thought this would be a good opportunity to learn something new.

For more thoughts than you probably want or can handle reading, check out `dev-log.md`. But get a drink first.