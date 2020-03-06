'use strict';

const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');


userNameInput.onkeydown = (event) => {
    if (event.key === 'Enter') {
        // Todo ボタンのonclick処理を呼び出す
        assessmentButton.onclick()
    }
};

//指定した要素の子供を全て削除する
//@ param {HTMLElement} element HTMLの要素

function removeAllChildren(element){
    while (element.firstChild){
        //子供の要素が有る限り削除
        element.removeChild(element.firstChild)
    }
}

assessmentButton.onclick  = function(){
    console.log('ボタンが押されました');
    const userName = userNameInput.value;
    if (userName.length==0){//
        //名前が空の時は処理を終了する
        return;}
    console.log(userName);
    //Todo 診断結果表示エリアの作成
    removeAllChildren(resultDivided)
    const header = document.createElement('h3');
    header.innerText='診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    //Todo ツイートエリアの作成
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue ="https://twitter.com/intent/tweet?button_hashtag=" +
        encodeURIComponent('あなたのいいところ') +
        "&ref_src=twsrc%5Etfw";

    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ';

    tweetDivided.appendChild(anchor)

    const script = document.createElement('script')
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script)
}

//assessmentButton.onclick  = () => {
//    console.log('ボタンが押されました');
//    //Todo 診断結果表示エリアの作成
//    //Todo ツイートエリアの作成
//}



const answers = [
'{userName}のいいところは声です．{userName}の特徴的な声は皆を引きつけ，心に残ります．',
'{userName}のいいところは情熱です．{userName}の情熱に周りの人は感化されます．',
'{userName}のいいところは知識です．博識な{userName}を多くの人が頼りにしています．',
'{userName}のいいところはユニークさです．{userName}だけのその特徴が皆を楽しくさせます．',
'{userName}のいいところは厳しさです．{userName}の厳しさがものごとをいつも成功に導きます．',
'{userName}のいいところは用心深さです．{userName}の洞察に，多くの人が助けられます．',
'{userName}のいいところは見た目です．内側から溢れ出る{userName}の良さに皆が気を引かれます．',
'{userName}のいいところは決断力です．{userName}がする決断にいつも助けられる人がいます．',
'{userName}のいいところは思いやりです．{userName}に気にかけてもらった多くの人が感謝しています．',
'{userName}のいいところは感受性です．{userName}が感じたことに皆が共感し，わかりあることができます．',
'{userName}のいいところはまなざしです．{userName}に見つめられた人は，気になって仕方がない．',



]

// 名前の文字列を渡すと診断結果を返す関数
// @param {string} userName ユーザーの名前
// @return {string} 診断結果

function assessment(userName){
    // TODO 診断結果を実装する
    //全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i =0; i<userName.length; i++) {
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);

    }

    //文字のコード番号の合計を応答の数で割って添字の数値を求める．
    const index = sumOfCharCode % answers.length;

    let result = answers[index]
    result = result.replace(/{userName}/g, userName);
    return result;
}


console.log(assessment('太郎'))
console.log(assessment('次郎'))
console.log(assessment('太郎'))

//テストコード
console.assert(
assessment('太郎')　== '太郎のいいところは情熱です．太郎の情熱に周りの人は感化されます．',
    '診断結果の文の特定の部分を名前に置き換える処理が正しくありません'
);

console.assert(
assessment('太郎')　== assessment('太郎'),
    '同じ名前なら同じ文が帰ってくる処理が正しくありません'
);
