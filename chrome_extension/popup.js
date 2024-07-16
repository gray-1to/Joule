async function onClick() {
  //アクティブなタブを取得
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting
    .executeScript({
      target: { tabId: tab.id },
      function: async function () {
        async function saveForm(text, body) {
          return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage(
              { type: "postForm", text: text, body: body },
              (response) => {
                if (chrome.runtime.lastError) {
                  reject(chrome.runtime.lastError.message);
                  return;
                }
                if (response.success) {
                  resolve(response);
                } else {
                  reject(response.error);
                }
              }
            );
          }).then((res) => {
            return res;
          });
        }

        //ページのタイトルとHTMLを取得
        const title = document.title.toString();
        const body = document.body.innerHTML;
        const result = await saveForm(title, body);
        console.log("res in async", result);
        return result;
      },
    })
    .then((results) => {
      const result = results[0].result;
      document.getElementById("result").innerHTML = result.content["name"];
    })
    .catch((error) => {
      console.log("error", error);
    });
}

document.getElementById("btn").addEventListener("click", async () => {
  onClick();
});
