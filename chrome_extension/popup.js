async function main() {
  //アクティブなタブを取得
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting
    .executeScript({
      target: { tabId: tab.id },
      function: async function () {
        async function fetchGPT35Turbo(text) {
          console.log('excuting start')
          return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage(
              { type: "fetchGPT35Turbo_bg", text: text },
              (response) => {
                console.log('response back to popup.js', response)
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
          }).then((res)=>{
            console.log('success!')
            return res
          });
        };

        //titleタグのテキストを取得
        var title = document.title.toString();

        //titleをOpenAIに渡す
        var text = title;
        console.log('text', text);
        var result = await fetchGPT35Turbo(text);
        console.log('res in async', result);
        console.log(result.content['id'])

        return result;
      },
    })
    .then((results)=>{
      console.log('results:', results);
      const result = results[0].result
      //実行結果をポップアップウィンドウへ表示
      console.log('result', result.content['name'])
      document.getElementById("result").innerHTML = result.content['name'];
    })
    .catch((error)=>{
      console.log('error', error)
    });
  console.log('finish')
}

document.getElementById("btn").addEventListener("click", async () => {
  main();
});
