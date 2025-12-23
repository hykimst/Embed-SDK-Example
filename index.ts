import { MpSdk } from './sdk.d.ts';

const iframe = document.getElementById('showcase-iframe') as HTMLIFrameElement;
const createTagButton = document.getElementById(
  'create-tag-btn'
) as HTMLButtonElement;
const deleteTagButton = document.getElementById(
  'delete-tag-btn'
) as HTMLButtonElement;
let newTagPosition:MpSdk.Vector3;
let mpSdk: MpSdk;
let count = 0;
let deleteTag:string = "";

// Delete tag
const deleteTagFunction = async () => {
  console.log('=== deletetag', deleteTag);
  (await mpSdk) && mpSdk.Tag.remove(deleteTag);
};

// Create a tag
const createTag = async () => {
  console.log('=== createTag', newTagPosition);
  (await mpSdk) &&
    mpSdk.Tag.add({
      label: `New tag ${count++}`,
      description: 'This tag was added through the Matterport SDK',
      anchorPosition: newTagPosition,
      stemVector: {
        x: 0,
        y: 0,
        z: 0,
      },
      color: {
        // blue disc
        r: 0.0,
        g: 0.0,
        b: 1.0,
      },
    });
};

/**
 * Initialize SDK
 */
const main = async () => {
  mpSdk = await window.MP_SDK.connect(iframe);
  console.log('=== [MPSDK]', window.MP_SDK, mpSdk);

  // When Matterport App State is ready & playing
  const appStateSubscription = await mpSdk.App.state.subscribe((state: any) => {
    // If App is playing
    if (state.phase === mpSdk.App.Phase.PLAYING) {
      // Create a Custom Tag wherever I point
      mpSdk.Pointer.intersection.subscribe(function (intersectionData) {
        // After I click on "Create Tag" -> click "t" -> create a Tag.
        if (intersectionData.object === mpSdk.Pointer.Colliders.MODEL) {
          newTagPosition = intersectionData.position;
        }
      });
    }
  });

  // MpSdk.openTags
  // Description: Delete button Clicked & Delete Tag
  // @see - https://matterport.github.io/showcase-sdk/docs/reference/current/modules/tag.html#opentags-1
  await mpSdk.Tag.openTags.subscribe({
    prevState: {
      hovered: null,
      docked: null,
      selected: null,
    },
    onChanged(newState) {
      // only compare the first 'selected' since only one tag is currently supported
      const [selected = null] = newState.selected; // destructure and coerce the first Set element to null
      if (selected !== this.prevState.selected) {
        if (selected) {
          deleteTag = selected;
          console.log(selected, 'was selected to delete');
        }
      }
      // clone and store the new state
      this.prevState = {
        ...newState,
        selected,
      };
    },
  });
};
/**
 * When Iframe fully loads
 */
iframe.addEventListener('load', (event) => {
  // Start
  main().catch((err) => console.error('MAIN ERROR', err));

  // Create Tag listener
  createTagButton.addEventListener('click', function () {
    // Focus on my window key event
    window.focus();
  });

  // Delete a Tag listener after I click
  deleteTagButton.addEventListener('click', function () {
    deleteTagFunction();
  });

  // Listen for the 'T' key on the parent window
  window.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() === 't' || event.key.toUpperCase() === 'T') {
      createTag();
    }
  });
});

// TS import without using emitting js file.
export {};
