import { LinkTagElement } from "./types";
import { Message } from "../messaging";

/**
 * Get current location page url
 *
 * @returns string Page url
 */
export const getPageUrl = (): string => window.location.href;

/**
 * Checks if a string is valid
 *
 * @param string The string to check if is valid
 * @returns boolean Returns true or false if string is valid
 */
export const isValidString = (url: string): boolean => typeof url === 'string' && url?.trim()?.length > 0;

/**
 * Gets the url and checks if it has `?reverse=true` or `?reverse=false` or `no param` in the link so we can reverse colours
 *
 * @returns boolean Returns true or false
 */
export const hasReverseParam = (): boolean => new URLSearchParams(window.location.search).get('reverse') === 'true';

/**
 * Checks for valid chrome runtime
 *
 * @returns boolean Returns true or false
 */
export const isValidChromeRuntime = (): boolean => chrome.runtime && !!chrome.runtime.getManifest();

/**
 * Stores the data in extension local storage.
 * This method while works fine for the coding test, could be optimized to ignore duplicates
 *
 * @param pageUrl Page url as string
 * @param data Elements data
 * @returns void
 */
export const storeData = (pageUrl: string, data: LinkTagElement[]): void => {
  // --| First, we retrieve the existing data for the pageUrl
  chrome.storage.local.get(pageUrl, (result) => {
    // --| Get the existing data array or initialize it if it doesn't exist
    const existingData: LinkTagElement[] = result[pageUrl] || [];

    // --| Combine the existing data with the new data using spread operator
    const updatedData = [...existingData, ...data];

    // --| Store the updated data back in storage
    chrome.storage.local.set({ [pageUrl]: updatedData }, () => console.log(`📦 Stored/Updated data for ${pageUrl}`));
  });
};

/**
 * Pretty much `chrome.runtime.sendMessage` but with error checking and chrome runtime validation
 *
 * @param message Message from messaging.ts enum
 * @param payload any
 * @returns void
 */
export const chromeSendMessageData = async ({ message, payload }: { message: Message; payload: any }) => {
  // --| Check if chrome.runtime is available before sending the message
  if (isValidChromeRuntime()) {
    try {
      await chrome.runtime.sendMessage({ message, payload: { url: getPageUrl(), payload } });
    } catch (err) {
      console.error(err);
    }
  } else {
    console.warn("⚠️ chrome.runtime is not available");
  }
};

/**
 * Style the elements accordingly
 *
 * @param element An array of HTMLElement
 * @param isReverse Specify if is reversed as boolean
 * @returns void
 */
export const styleElement = (element: HTMLElement[], isReverse: boolean = false): void => {
  if (Array.isArray(element) && element) {
    // --| For loop will always be faster than forEach and will work fine with async functions, forEach does not
    for (let i = 0; i < element.length; i++) {
      const htmlElement = element[i];

      htmlElement.tagName?.toLowerCase() === "button"
        ? (htmlElement.style.backgroundColor = isReverse ? "orange" : "blue")
        : (htmlElement.style.backgroundColor = isReverse ? "blue" : "orange");

      // --| This is just some extra
      htmlElement.style.color = "white";
      htmlElement.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.2)";
      htmlElement.style.borderRadius = "4px";
    }
  }
};
