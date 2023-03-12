// Scroll fade-in animation
(function () { // 即時実行関数（グローバル汚染対策）
    let i = 0; // for文用変数の定義
    let el = {}; // 配列・変数用（巻き上げ防止の為、冒頭にて宣言）
  
    // DOM読み込み後のタイミングで処理
    document.addEventListener('DOMContentLoaded', function () {
      el.targetElement = document.querySelectorAll('.js-fadeAnimation'); // フェードアニメーション表示させる要素のセレクタ指定
      el.firstDisplayOnlyFlag = false; // フェードアニメーション表示を1回のみにするかの判定フラグ（true：1回のみ、false：複数回）
    }, false);
  
    // スクロール時の処理
    window.addEventListener('scroll', function () {
      scrollAnimationFnc(); // スクロールアニメーション用関数の実行
    }, false);
  
    // 向き切り替え（リサイズ）時の処理
    window.addEventListener('resize', function () {
      scrollAnimationFnc(); // スクロールアニメーション用関数の実行
    }, false);
  
    // スクロールアニメーション用関数
    function scrollAnimationFnc () {
      el.scrollValue = window.pageYOffset || document.documentElement.scrollTop; // 現在のスクロール量の取得
      el.documentHeight = document.documentElement.clientHeight; // ドキュメント全体の高さ（スクロールバー含ない）を取得（表示領域部分の高さ）
  
      for (i = 0; i < el.targetElement.length; ++i) {
        el.clientRect = el.targetElement[i].getBoundingClientRect(); // 対象要素のViewpor（ビューポート）に対する相対位置に関する情報を取得
        el.targetPosition = el.clientRect.top + el.scrollValue; // 対象要素の位置座標を取得
        el.targetHeight = el.targetElement[i].offsetHeight; // 対象要素のborder、paddingを含んだ高さを取得
  
        if (el.scrollValue < el.targetPosition - el.documentHeight || el.scrollValue > el.targetPosition + el.targetHeight) {
          // ドキュメント全体の高さ（スクロールバー含ない）内（表示領域）に対象要素の位置が入っていなければ処理
          if (!el.firstDisplayOnlyFlag) {
            // 判定フラグが「false（複数回）」の場合に処理
            //el.targetElement[i].classList.remove('is-animated'); // 対象要素から「is-animated」classを削除する
          } else {
            // 判定フラグが「true（1回のみ）」の場合に処理
            return false; // 処理を中断
          }
        } else {
          // ドキュメント全体の高さ（スクロールバー含ない）内（表示領域）に対象要素の位置が入っていれば処理
          el.targetElement[i].classList.add('is-animated'); // 対象要素に「is-animated」classを付与する
        }
      }
    }
  }());
