const client = require('cheerio-httpcli')
const pokemon_name_query = '.Heading1.mt20';
const smStartCardId = 35888;


if (process.argv.length !== 2) {
    console.log('list-ibmjp-patterns.js');
    console.log('  Simple crawler tool to list patterns from IBM Code JP site.');
    console.log('  -----------------');
    return;
}

function getListURL(count) {
    // SM環境始まりIDから順番にクローリング
    const cardId = smStartCardId + count;
    return "https://www.pokemon-card.com/card-search/details.php/card/" + cardId + "/regu/XY";
}


// ----- Main Loop -----
(async () => {
    let count = 10;  // 何件読み込むか
    let number_of_items = 0;
    let count_of_items = 0;
    do { 
        let url = getListURL(count);
        let ret = client.fetchSync(url);
        if (ret.error || !ret.response || ret.response.statusCode !== 200) {
            console.log('ERROR:' + url);
            return;  // Web アクセスに問題があればツールを即終了させる
        } else {
            let items = ret.$(pokemon_name_query);  // 今回対象としているカード要素を取得
            processListItems(ret, items);  // 要素の配列に対して処理を実行
            console.log("名前：",items[0].children[0].data); // 名前表示テスト
            count --;
        }
    } while(count > 0);
})();

async function processListItems(_ret, _items) {
  // ここに要素の配列に対するメイン処理を記述します
}