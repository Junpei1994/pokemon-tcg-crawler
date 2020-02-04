const client = require('cheerio-httpcli')
const pokemon_section = '.Section';
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
    do { 
        let url = getListURL(count);
        let ret = client.fetchSync(url);
        if (ret.error || !ret.response || ret.response.statusCode !== 200) {
            console.log('ERROR:' + url);
            return;  // Web アクセスに問題があればツールを即終了させる
        } else {
            let items = ret.$(pokemon_section);  // 今回対象としているカード要素を取得
            processListItems(ret, items);  // 要素の配列に対して処理を実行
            // console.log("名前：",items[0].children[0].data); // 名前表示テスト
            console.log("---start--")
            console.log("name：",getPokemonName(items)); // 名前表示テスト
            console.log("type：",getPokemonType(items)); // 名前表示テスト
            console.log("---finish--")
            count --;
        }
    } while(count > 0);
})();

function getPokemonName(items){
    try {
        return items[0].children[1].children[0].data;
    }catch{
        console.log("----- 名前取得で失敗 -----");
        return "名前取得失敗";
    }
}
function getPokemonType(items){
    try {
        const type =
        items[0]
        .children[2]
        .next.children[2]
        .next.children[0]
        .next.children[0]
        .next.children[0]
        .next.children[0]
        .next.children[0]
        .next.children[0].data;
    
        return type;
    }catch{
        console.log("----- タイプ取得で失敗 -----");
        return "タイプ取得失敗";
    }
}

async function processListItems(_ret, _items) {
  // ここに要素の配列に対するメイン処理を記述します
}