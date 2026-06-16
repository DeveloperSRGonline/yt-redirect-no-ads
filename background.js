// Fires whenever any tab's URL changes
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (!changeInfo.url) return;

  const url = changeInfo.url;

  // Match youtube.com, www.youtube.com, and m.youtube.com watch/shorts/embed URLs
  if (/^https?:\/\/(www\.|m\.)?youtube\.com\/(watch|shorts|embed)/.test(url)) {
    const redirectUrl = url.replace("youtube.com", "yout-ube.com");
    chrome.tabs.update(tabId, { url: redirectUrl });
  }
});

// Also catch navigation events (handles address bar typing)
chrome.webNavigation.onBeforeNavigate.addListener(
  (details) => {
    if (details.frameId !== 0) return; // main frame only

    const url = details.url;

    if (/^https?:\/\/(www\.|m\.)?youtube\.com\/(watch|shorts|embed)/.test(url)) {
      const redirectUrl = url.replace("youtube.com", "yout-ube.com");
      chrome.tabs.update(details.tabId, { url: redirectUrl });
    }
  },
  { url: [{ hostSuffix: "youtube.com" }] }
);

