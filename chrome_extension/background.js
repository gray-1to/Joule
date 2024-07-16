chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "postForm") {
    console.log("postForm requested")
    postForm(request.text, request.body)
      .then((content) => {
        sendResponse({ success: true, content: content });
      })
      .catch((error) => {
        sendResponse({ success: false, error: error.message });
      });
    return true; // keep the message channel open for sendResponse
  }
});

async function postForm(text, body) {
  const response = await fetch("http://localhost:3000/api/parse_form", {
    method: "POST",
    mode: "cors",
    headers:{
      "Content-Type": "application/json",
    },
    body: JSON.stringify({title: text, body: body}),
  });

  if (!response.ok) {
    console.error('Error: ', response);
    throw new Error(`API request failed: ${response.status}`);
  }
  const res_json = await response.json()
  console.log('response', response)
  console.log('body', res_json)
  return res_json;
}
