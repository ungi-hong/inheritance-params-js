"use strict";

var parameterInheritanceModule = (function () {
  // クエリパラメータを取得し配列に格納

  /**
   * urlのパラメータ
   */
  var query = window.location.search.replace("?", "");

  // 元のurlにクエリパラメータがなかった場合は何もしない
  if (query === "") {
    return;
  }

  // パラメータを{key: value, ...}に整形しparams配列にpushする
  var params = [];
  var paramsItem = query.split("&");
  paramsItem.forEach(function (param) {
    var splitParam = param.split("=");
    params.push({ key: splitParam[0], value: splitParam[1] });
  });

  // aタグの要素を全て取得
  var elementList = document.querySelectorAll("a");

  for (var i = 0; i < elementList.length; i++) {
    var element = elementList[i];

    // 要素のhrefの属性値を取得
    var elementHref = element.getAttribute("href");

    // href属性を持ってなかった場合はパスする
    if (!elementHref) {
      continue;
    }

    if (!elementHref.includes("?")) {
      // 要素のhrefの属性値にクエリパラメータが存在していない場合
      element.setAttribute("href", elementHref + "?" + paramsItem.join("&"));
    } else {
      // 要素のhrefの属性値にクエリパラメータが存在していた場合

      // クエリパラメータ以外のパスを取得
      var baseUrl = elementHref.slice(0, elementHref.indexOf("?"));

      // aタグのクエリパラメータを配列に格納
      var elementParamsItem = elementHref
        .slice(elementHref.indexOf("?"))
        .replace("?", "")
        .split("&");

      // aタグのクエリパラメータを{key: value, ...}に整形しelementParams配列にpushする
      var elementParams = [];
      elementParamsItem.forEach(function (param) {
        var elementSplitParam = param.split("=");
        elementParams.push({
          key: elementSplitParam[0],
          value: elementSplitParam[1],
        });
      });

      // aタグのクエリパラメータとurlのパラメータを統合
      // キーが重複した場合urlのパラメータを優先する。
      var concatParamsList = elementParams;
      params.forEach(function (paramsItem) {
        var exists = false;
        elementParams.forEach(function (elementParamsItem) {
          if (elementParamsItem.key === paramsItem.key) {
            exists = true;
          }
        });

        if (!exists) {
          concatParamsList.push(paramsItem);
        }
      });

      // urlを作成
      var url =
        baseUrl +
        "?" +
        concatParamsList
          .map(function (item) {
            return item.key + "=" + item.value;
          })
          .join("&");

      element.setAttribute("href", url);
    }
  }
})();
