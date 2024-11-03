import { Message } from "./messaging";

import { chromeSendMessageData, getPageUrl } from "./utils/utils";
import { detectButtonsAndStyleThem } from "./buttonDetector";
import { detectLinksAndStyleThem } from "./linkDetector";

(async () => {
  await chromeSendMessageData({ message: Message.LOADED, payload: { version: 1.0 } });

  // --| Cache the page url, we don't need to call it twice for 2 methods.
  const pageUrl: string = getPageUrl();

  // --| Run the button and styling method
  await detectLinksAndStyleThem(pageUrl);

  // --| Run the button and styling method
  await detectButtonsAndStyleThem(pageUrl);
})();
