import { Message } from "./messaging";

(() => {
  chrome.runtime.sendMessage({
    message: Message.LOADED,
    payload: { version: 1.0 },
  });
})();
