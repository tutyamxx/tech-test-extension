import { Message } from "./messaging";
import { chromeSendMessageData, hasReverseParam, isValidString, styleElement } from "./utils/utils";
import { LinkTagElement } from "./utils/types";

/**
 * Detect any buttons on the page, and also styles them accordingly
 *
 * @param pageUrl The page url as string
 * @returns void
 */
export const detectButtonsAndStyleThem = async (pageUrl: string) => {
  if (!isValidString(pageUrl)) {
    console.log("⚠️ No pageUrl param specified");
    return;
  }

  // --| Get the <button> and input type button tags from the page using query selector
  // --| button, input[type="button"], input[type="submit"], input[type="reset"], a[href], [role="button"], [tabindex="0"] could catch false positives
  const queryButtons = document.querySelectorAll('button, input[type="button"]');
  const buttons = Array.from(queryButtons) as HTMLElement[];

  // --| Style the element accordingly
  styleElement(buttons, hasReverseParam());

  // --| Collect data on detected buttons to send to background
  const detectedButtons: LinkTagElement[] = buttons.map((button) => ({ tag: button?.tagName?.trim()?.toLowerCase() }));

  await chromeSendMessageData({ message: Message.BUTTON_DETECTED, payload: detectedButtons });
  await chromeSendMessageData({ message: Message.STORED_DATA, payload: detectedButtons });
};
