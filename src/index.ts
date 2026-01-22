import type { MpSdk} from "@matterport/sdk";
import { setupSdk} from "@matterport/sdk";


// Initialize SDK
(async () => {
  const mpSdk: MpSdk = await setupSdk("5d0im3zfdpdercus6xwbzwrba");
  console.log("[MPSDK]", mpSdk);
})();

// TS import without using emitting js file.
export {};
