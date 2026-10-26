'use strict';
// 旅遊溝通指南：每句「複製泰文」。clipboard API 失敗時改為選取文字，讓使用者自行複製。
(function () {
  function selectText(el) {
    const range = document.createRange();
    range.selectNodeContents(el);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    return sel;
  }
  function legacyCopy(el) {
    selectText(el);
    try { return document.execCommand('copy'); } catch (e) { return false; }
  }
  function flash(btn, text) {
    const original = btn.dataset.label || btn.textContent;
    btn.dataset.label = original;
    btn.textContent = text;
    btn.classList.add('done');
    clearTimeout(btn._t);
    btn._t = setTimeout(() => { btn.textContent = original; btn.classList.remove('done'); }, 2200);
  }
  document.querySelectorAll('.copy-th').forEach(btn => {
    btn.addEventListener('click', () => {
      const el = document.getElementById(btn.dataset.target);
      if (!el) return;
      const text = el.textContent.trim();
      const fallback = () => flash(btn, legacyCopy(el) ? '已複製' : '已選取，請手動複製');
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => flash(btn, '已複製'), fallback);
      } else {
        fallback();
      }
    });
  });
})();
