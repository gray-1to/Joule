chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('bg start')
  if (request.type === "fetchGPT35Turbo_bg") {
    console.log('fetchGPT35Turbo_bg requested')
    fetchGPT35Turbo_bg(request.text)
      .then((content) => {
        console.log('fetch in bg success')
        sendResponse({ success: true, content: content });
      })
      .catch((error) => {
        console.log('fetch in bg fail')
        sendResponse({ success: false, error: error.message });
      });
    return true; // keep the message channel open for sendResponse
  }
});

async function fetchGPT35Turbo_bg(text) {
  console.log('before fetch')
  const response = await fetch("https://www.google.com");

  if (!response.ok) {
    console.error('Error: ', response);
    throw new Error(`API request failed: ${response.status}`);
  }
  console.log('fetch success', response.ok)
  console.log('response', response)
  console.log('body', response.body)
  return response.body;
}
