// スクロールでふわっと表示
const checkAndFadeIn = () => {
  document.querySelectorAll(".fade-in-up").forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add("visible");
    }
  });
};

document.addEventListener("scroll", checkAndFadeIn);

// ページ読み込み完了後、少し遅れて実行
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(checkAndFadeIn, 100); // 0.1秒待ってから実行
});

// プログラミングの歩みセクションの開閉ロジック
const historySection = document.querySelector('#history');
const historyToggle = document.querySelector('.toggle-history');
const timelinePreview = document.querySelector('.timeline-preview');
const timelineFull = document.querySelector('.timeline-full');

if (historyToggle && timelinePreview && timelineFull) {
  historyToggle.addEventListener('click', () => {
    const isOpen = historySection.classList.contains('is-open');

    if (isOpen) {
      // --- 閉じる処理 ---
      // 高さと透明度を0にしてアニメーションさせる
      timelineFull.style.height = '0';
      timelineFull.style.opacity = '0';
      
      // アニメーション終了後にプレビューを表示し、完全版をdisplay:noneにする
      timelineFull.addEventListener('transitionend', () => {
        timelineFull.style.display = 'none';
        timelinePreview.style.display = 'block';
        // グラフの再描画をトリガー
        window.dispatchEvent(new Event('resize'));
      }, { once: true }); // イベントリスナーを一度だけ実行

      historySection.classList.remove('is-open');

    } else {
      // --- 開く処理 ---
      timelinePreview.style.display = 'none';
      timelineFull.style.display = 'block';
      
      // コンテンツの完全な高さを取得
      const fullHeight = timelineFull.scrollHeight;
      
      // 高さと透明度を設定してアニメーションを開始
      timelineFull.style.height = fullHeight + 'px';
      timelineFull.style.opacity = '1';

      // アニメーション終了後にグラフの再描画をトリガー
      timelineFull.addEventListener('transitionend', () => {
        window.dispatchEvent(new Event('resize'));
      }, { once: true });

      historySection.classList.add('is-open');
    }
  });
}