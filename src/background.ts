import { Message } from "./messaging";
import { storeData } from "./utils/utils";

// --| Just to see that it loaded/refreshed properly
chrome.runtime.onInstalled.addListener(() => console.log("Extension installed 🙏"));

chrome.runtime.onMessage.addListener(({ message, payload }: { message: Message; payload: any }) => {
  if (payload?.url && payload?.payload) {
    const validPayloadUrl = payload.url;
    const validPayload = payload.payload;

    switch (message) {
      case Message.LOADED:
        console.log("♻️ Content script loaded", validPayload);
        console.log("♻️ On page: ", validPayloadUrl);
        break;

      case Message.LINK_DETECTED:
        console.log("🔗 Detected links:", validPayload);
        break;

      case Message.BUTTON_DETECTED:
        console.log("▶️ Detected buttons:", validPayload);
        break;

      case Message.STORED_DATA:
        storeData(validPayloadUrl, validPayload);
        break;

      default:
        console.warn("⚠️ Unknown message:", message);
    }
  }
});
