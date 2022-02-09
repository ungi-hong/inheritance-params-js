# 概要
inheritanceParams.jsをhtmlで読み込むだけで
urlに付与されているパラメータを引き継げるようになります。

IE対応したかったためes５で実装しました。
エンジニア以外の方も見て理解できるよう、そして練習も兼ねてbabelは利用していません。

（いつもはes5で実装することがないのでconst,letなどes6の便利さを実感しました。）

## 例
// aタグのhref属性にパラメータが存在しない時

`www.sample.com/?param1=element1&param2=element2`

`<a href="www.sample.com/sample/">` => `<a href="www.sample.com/sample/?param1=element1&param2=element2">`

// aタグのhref属性にパラメータが存在するとき

`www.sample.com/?param1=hogehoge1&param2=hogehoge2`

`<a href="www.sample.com/sample/?param3=hogehoge3">` => `<a href="www.sample.com/sample/?param1=hogehoge1&param2=hogehoge2&param3=hogehoge3">`

// aタグのhref属性にパラメータが存在する&パラメータのキーがurlのパラメータのキーと重複した場合urlのパラメータを優先する。

`www.sample.com/?param1=hogehoge1&param2=hogehoge2`

`<a href="www.sample.com/sample/?param1=hogehoge5&param3=hogehoge3">` => `<a href="www.sample.com/sample/?param1=hogehoge1&param2=hogehoge2&param3=hogehoge3">`


# 利用方法
index.htmlの下記の部分のように適用させたいhtmlで読み込めば利用ができます。

`<script src="inheritanceParams.js" defer></script>`
