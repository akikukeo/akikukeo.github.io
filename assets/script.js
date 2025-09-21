// スクロールでふわっと表示
document.addEventListener("scroll", () => {
  document.querySelectorAll(".fade-in-up").forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add("visible");
    }
  });
});
