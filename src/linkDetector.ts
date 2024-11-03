import { Message } from "./messaging";
import { chromeSendMessageData, hasReverseParam, isValidString, styleElement } from "./utils/utils";
import { LinkTagElement } from "./utils/types";

/**
 * Detect any links on the page, and also styles them accordingly
 *
 * @param pageUrl The page url as string
 * @returns void
 */
export const detectLinksAndStyleThem = async (pageUrl: string) => {
  if (!isValidString(pageUrl)) {
    console.log("⚠️ No pageUrl param specified");
    return;
  }

  // --| Get the <a> tags or any possible use case scenarios where it might be a link from the page using query selector
  const queryLinks = document.querySelectorAll('a, area, link[rel="stylesheet"], [role="link"], [tabindex="0"]');
  const links = Array.from(queryLinks) as HTMLElement[];

  // --| Style the element accordingly
  styleElement(links, hasReverseParam());

  // --| Collect data on detected links to send to background
  const detectedLinks: LinkTagElement[] = links.map((link) => ({
    tag: link?.tagName?.trim()?.toLowerCase(),
    href: link?.getAttribute("href") || null
  }));

  await chromeSendMessageData({ message: Message.LINK_DETECTED, payload: detectedLinks });
  await chromeSendMessageData({ message: Message.STORED_DATA, payload: detectedLinks });
};
