var asin = document.getElementById('ASIN').value;

if (!asin) {
  return;
}

var td = document.evaluate('//form[@id="handleBuy"]/table[last()]/tbody/tr[1]/td[1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);

var selected = document.evaluate('//select[@id="searchDropdownBox"]/option[@selected="selected"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);

var category = selected ? selected.innerText : undefined;

chrome.extension.sendRequest(
    {
      name: "getLinks",
      asin: asin,
      category: category
    },
    function(res) {
      var links = res.links;

      for ( var i = 0; i < links.length; i++ ) {
        var div = document.createElement('div');
        div.innerHTML = links[i];
        td.appendChild(div);
      }
    }
);

