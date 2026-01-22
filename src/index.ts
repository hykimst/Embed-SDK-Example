import type { MpSdk} from "@matterport/sdk";
import { setupSdk} from "@matterport/sdk";


// Initialize SDK
(async () => {
  const mpSdk: MpSdk = await setupSdk("");
  console.log("[MPSDK]", mpSdk);
})();

// TS import without using emitting js file.
export {};
