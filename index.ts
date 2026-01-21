// Latest types - https://api.matterport.com/sdk/types/sdk.d.ts
import type { MP_SDK, MpSdk, ShowcaseEmbedWindow } from './sdk';

// Global variable
const showcaseIframe = document.querySelector('iframe#showcase') as HTMLIFrameElement;
const overlayDiv = document.querySelector('div#my-iot-overlay') as HTMLDivElement;
const sdk_key:string|undefined=process.env.SDK_KEY||"";
let mpSdk: MpSdk | null = null;
let tagLibrary: any = null;

declare global {
  interface Window {
    MP_SDK: MP_SDK
  }
}

// Open overlay
const displayOverlay = async (tagId:string) => {
  console.log('=== displayOverlay', tagId);

  if (tagId && mpSdk) {
    await mpSdk.Camera.pose.subscribe(async (pose:any) => {
      // Convert Tag position in the 3d showcase model to display correctly in your 2D screen pixels
      // https://matterport.github.io/showcase-sdk/docs/reference/current/modules/conversion.html#worldtoscreen
      const showcaseSize = {
        w: showcaseIframe.clientWidth,
        h: showcaseIframe.clientHeight,
      };
      const tagPosition = tagLibrary[tagId].anchorPosition;
      // Conversion that maps 3D world coordinates to 2D screen coordinates
      const screenCoordinate = mpSdk && mpSdk.Conversion.worldToScreen(
        tagPosition,
        pose,
        showcaseSize
      );
      if (screenCoordinate) {
        overlayDiv.style.left = `${screenCoordinate.x / 2}px`;
        overlayDiv.style.top = `${screenCoordinate.y / 2}px`;
        overlayDiv.style.display = 'inline-block';
      }
    });
  } else {
    overlayDiv.style.display = 'none'; // Hide if point is behind the camera
  }
};

// Display Overlay for each Tag location
const setupTag = async () => {
  // Wait until the tag collection is fully loaded
  mpSdk && await mpSdk.Tag.data.waitUntil({
    waitUntil(collection:any) {
      tagLibrary = collection;
      console.log('The full collection of Tags looks like', tagLibrary);
      return collection != null;
    },
  });

  // MpSdk.Tag.openTags
  // @see - https://matterport.github.io/showcase-sdk/docs/reference/current/modules/tag.html#opentags-1
  const prevState: {
    hovered: string | null;
    docked: string | null;
    selected: string | null;
  } = {
    hovered: null,
    docked: null,
    selected: null,
  };
  mpSdk && mpSdk.Tag.openTags.subscribe({
    onChanged(newState:any) {
      if (newState.hovered !== prevState.hovered && newState.hovered) {
        prevState.hovered = newState.hovered;
        console.log(newState.hovered, 'was hovered');
        displayOverlay(newState.hovered);
      } else {
        console.log(prevState.hovered, 'is no longer hovered');
        prevState.hovered = null;
        displayOverlay("");
      }
    },
  });
}
/**
 * Initializes the Matterport SDK
 * @see - https://www.npmjs.com/package/@matterport/sdk
 */
const main = async () => {
  console.log('=== [MAIN] Initializing Matterport SDK with key',sdk_key);

  // Connect to the Matterport SDK
  const embeddingWindow = window as ShowcaseEmbedWindow;
  mpSdk = await embeddingWindow.MP_SDK.connect(showcaseIframe);
  console.log('=== [MPSDK]', mpSdk);

  // Custom Overlay
  setupTag();
};

// Add SDK Application Key
showcaseIframe.setAttribute('src', `https://my.matterport.com/show/?m=76VYD7xqkCb&qs=1&play=1&applicationKey=${sdk_key}`);

// When Iframe is ready to load, initialize the Matterport SDK
showcaseIframe.addEventListener('load', () => {
  main().catch((err) => console.error('[MAIN ERROR]', err));
});
// TS import without using emitting js file.
export {};
