import { Message } from "./messaging";

chrome.runtime.onMessage.addListener(
  ({ message, payload }: { message: Message; payload: any }) => {
    switch (message) {
      case Message.LOADED:
        console.log("Content script loaded", payload);
        break;
    }
  }
);
