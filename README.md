# Showcase Embed SDK - Custom Overlays
Simple example of when a user hovers a tag, display your custom overlay

## Example 
https://stackblitz.com/edit/embed-sdk-custom-overlay?file=index.ts

## Latest Types
https://api.matterport.com/sdk/types/sdk.d.ts

## Getting Started
### INTEGRATION TYPE - Bootstrap (legacy)
See documentation, https://matterport.github.io/showcase-sdk/sdk_home.html#legacy-windowmp_sdk-support

`<script src="https://static.matterport.com/showcase-sdk/bootstrap/3.0.0-0-g0517b8d76c/sdk.js"></script>`

### Add your SDK Key
- Create `.env` file
- COPY & PASTE format from `.env.example`

### Step 1 - Create Elements
- Create a container
- Add Showcase Iframe
- Create Custom Overlay

### Step 2 - Add Style
- Container style - adjust the container's position to relative to its original location. Other elements on the page do not adjust to the new position, and the element continues to occupy its original space in the layout. 
- `#my-iot-overlay`- Hide the overlay, keep the position (position:absolute); ignore any pointer events

### Step 3 - Logic (Index.ts)
- L#96 - once you've connected to the SDK, setup your custom overlay for each Tag.
- L#50 - collect the Tag information into `tagLibrary`.
- L#69 - when user hovers the tag, call `displayOverlay()`.
- L#22 - Convert the 3d tag position into 2d position to display facing the you.
- L#36 - display your hidden custom overlay.
- L#77 & L#43 - hide the custom overlay if the tag is no longer hovered.

### OPTIONAL - never let the tags open
If you don't want the tags to open when you hover, add the code below after L#52
```
for (const [key, value] of collection) {
// Never let the open when hover
mpSdk.Tag.allowAction(key, {
    opening: false,
});
}
```
## Run
`npm install & npm run start`
