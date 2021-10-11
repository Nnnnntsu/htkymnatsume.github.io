'use strict';



//↓文章をバラバラに表示させる設定

// TextRandomAnimeにappearRandomtextというクラス名を付ける定義
function TextRandomAnimeControl() {
  $('.TextRandomAnime').each(function () {
    var elemPos = $(this).offset().top - 50;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass("appearRandomtext");

    } else {
      $(this).removeClass("appearRandomtext");
    }
  });
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
  TextRandomAnimeControl(); /* アニメーション用の関数を呼ぶ*/
}); // ここまで画面をスクロールをしたら動かしたい場合の記述

// 画面が読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
  //spanタグを追加する
  var element = $(".TextRandomAnime");
  element.each(function () {
    var text = $(this).text();
    var textbox = '';
    text.split('').forEach(function (t) {
      textbox += '<span>' + t + '</span>';
    });
    $(this).html(textbox);
  });

  TextRandomAnimeControl(); /* アニメーション用の関数を呼ぶ*/
}); // ここまで画面が読み込まれたらすぐに動かしたい場合の記述

//↑文章をバラバラに表示させる設定ここまで




//↓ページトップのボタン設定ここから

//スクロールした際の動きを関数でまとめる
function PageTopAnime() {
  var scroll = $(window).scrollTop();
  if (scroll >= 800) { //上から200pxスクロールしたら
    $('#page-top').removeClass('DownMove'); //#page-topについているDownMoveというクラス名を除く
    $('#page-top').removeClass('hidden'); //#page-topについているDownMoveというクラス名を除く
    $('#page-top').addClass('UpMove'); //#page-topについているUpMoveというクラス名を付与
  } else {
    $('#page-top').addClass('hidden'); //#page-topについているUpMoveというクラス名を付与
    if ($('#page-top').hasClass('UpMove')) { //すでに#page-topにUpMoveというクラス名がついていたら
      $('#page-top').removeClass('UpMove'); //UpMoveというクラス名を除き
      $('#page-top').addClass('DownMove'); //DownMoveというクラス名を#page-topに付与
    }
  }
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
  PageTopAnime(); /* スクロールした際の動きの関数を呼ぶ*/
});

// ページが読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
  PageTopAnime(); /* スクロールした際の動きの関数を呼ぶ*/
});

// #page-topをクリックした際の設定
$('#page-top a').click(function () {
  $('body,html').animate({
    scrollTop: 0 //ページトップまでスクロール
  }, 500); //ページトップスクロールの速さ。数字が大きいほど遅くなる
  return false; //リンク自体の無効化
});
//↑ページトップのボタン設定ここまで



//↓スキルページの円グラフここから
//値をグラフに表示させる
Chart.plugins.register({
  afterDatasetsDraw: function (chart, easing) {
    var ctx = chart.ctx;

    chart.data.datasets.forEach(function (dataset, i) {
      var meta = chart.getDatasetMeta(i);
      if (!meta.hidden) {
        meta.data.forEach(function (element, index) {
          // 値の表示
          ctx.fillStyle = 'rgb(0, 0, 0,0.8)'; //文字の色
          var fontSize = 20; //フォントサイズ
          var fontStyle = 'Sawarabi Gothic'; //フォントスタイル
          var fontFamily = 'Sawarabi Gothic'; //フォントファミリー
          ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

          var dataString = dataset.data[index].toString();

          // 値の位置
          ctx.textAlign = 'center'; //テキストを中央寄せ
          ctx.textBaseline = 'middle'; //テキストベースラインの位置を中央揃え

          var padding = 8; //余白
          var position = element.tooltipPosition();
          ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);

        });
      }
    });
  }
});


//=========== 円グラフ ============//
$('#chart01').on('inview', function (event, isInView) { //画面上に入ったらグラフを描画
  if (isInView) {
    var ctx = document.getElementById("chart01"); //グラフを描画したい場所のid
    var chart = new Chart(ctx, {
      type: 'pie', //グラフのタイプ
      data: { //グラフのデータ
        labels: [ "HTML5,CSS3", "javascript","illustrator,Photoshop", "AfterEffects,premia", "wordpress"], //データの名前
        datasets: [{
          label: "職種別比率", //グラフのタイトル
          backgroundColor: ["#558949", "#A84492", " #692C8F", "#F7C303", "#D93723"], //グラフの背景色
          data: ["40", "30", "40", "20", "5"] //データ
        }]
      },

      options: { //グラフのオプション
        maintainAspectRatio: false, //CSSで大きさを調整するため、自動縮小をさせない
        legend: {
          display: true //グラフの説明を表示
        },
        tooltips: { //グラフへカーソルを合わせた際の詳細表示の設定
          callbacks: {
            label: function (tooltipItem, data) {
              return data.labels[tooltipItem.index] + ": " + data.datasets[0].data[tooltipItem.index] + "%"; //%を最後につける
            }
          },
        },
        title: { //上部タイトル表示の設定
          display: true,
          fontSize: 25.6,
          fontFamily:'Sawarabi Gothic',

        },
      }
    });

  }
});
//↑スキルページの円グラフここまで