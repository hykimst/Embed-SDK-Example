import type { MpSdk, ShowcaseEmbedWindow} from "./sdk.d.ts";

// Add attachment
const addAttachment = async (mpSdk: MpSdk, tagId: string) => {
  // Register Attachment
  await mpSdk.Tag.registerAttachment(
    "https://www.youtube.com/embed/r4wj3mnhhc4?&autoplay=0&autoplay=false"
  )
    .then((attachmentId: string[]) => {
      // Attach Video
      mpSdk.Tag.attach(tagId, ...attachmentId);
    })
    .catch((e: Error) => {
      console.error("Error with tag attachment", e);
    });

  // Start Tag Subcription
  await mpSdk.Tag.data.subscribe({
    onUpdated: function (
      index: string,
      item: MpSdk.Tag.TagData,
      collection: MpSdk.Dictionary<MpSdk.Tag.TagData>
    ) {
      console.log("[Tag] onUpdated: ", index, item, collection);
    },
  });
};
const isVideoAvailableInMobileView = async (mpSdk: MpSdk) => {
  mpSdk.Tag.openTags.subscribe({
    onChanged(newState: MpSdk.Tag.OpenTags) {
      // Docked
      if (newState.docked) {
        console.log(newState.docked, "was docked");
        addAttachment(mpSdk, newState.docked);
      }
    },
  });
};

/*===============
  Initialize SDK
================*/
const showcaseIframe = document.getElementById("showcase-iframe") as HTMLIFrameElement;
showcaseIframe.addEventListener("load", async function () {
  try {
    const embeddingWindow = window as ShowcaseEmbedWindow;
    const mpSdk: MpSdk = await embeddingWindow.MP_SDK.connect(
      showcaseIframe
    );
    console.log("MPSDK", mpSdk);

    // App State
    await mpSdk.App.state.subscribe((state: any) => {
      // If App is playing
      if (state.phase === mpSdk.App.Phase.PLAYING) {
        isVideoAvailableInMobileView(mpSdk);
      }
    });
  } catch (error) {
    console.error("MAIN ERROR", error);
  }
});

// TS import without using emitting js file.
export {};
