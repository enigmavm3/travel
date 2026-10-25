'use strict';
// 本機預覽不載入 GA，避免測試流量混入正式數據。
window.dataLayer = window.dataLayer || [];
function gtag(){ window.dataLayer.push(arguments); }
const isPreview = location.protocol === 'file:' || ['localhost','127.0.0.1','::1','[::1]'].includes(location.hostname);
if (!isPreview) {
  const analytics = document.createElement('script');
  analytics.async = true;
  analytics.src = 'https://www.googletagmanager.com/gtag/js?id=G-Z9PB2VHZMN';
  document.head.appendChild(analytics);
  gtag('js', new Date());
  gtag('config', 'G-Z9PB2VHZMN');
  gtag('config', 'AW-18387420345');
}

document.querySelectorAll('.line-cta').forEach(link => {
  link.addEventListener('click', () => {
    // Google Ads「LINE加好友」轉換，與其他頁共用同一個轉換動作。
    if (!isPreview) gtag('event', 'conversion', {'send_to': 'AW-18387420345/MrKQCIS7g-YcELmJ579E'});
    if (!isPreview) gtag('event', 'add_line_friend_travel', {
      event_category: 'engagement',
      event_label: 'add_line_friend_travel',
      cta_position: link.dataset.position,
      transport_type: 'beacon'
    });
  });
});
// 無 JavaScript 或減少動態效果時，內容仍完整呈現。
const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (!motion.matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(element => {
    element.classList.add('is-ready');
    observer.observe(element);
  });
}

// 對話示意影片：進入畫面才播放；減少動態效果時停在 poster，保留 controls 讓使用者自行播放。
const chatVideo = document.querySelector('.conversation-video');
if (chatVideo && !motion.matches) {
  chatVideo.removeAttribute('controls');
  const tryPlay = () => chatVideo.play().catch(() => chatVideo.setAttribute('controls', ''));
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      entries.forEach(entry => entry.isIntersecting ? tryPlay() : chatVideo.pause());
    }, { threshold: 0.25 }).observe(chatVideo);
  } else {
    tryPlay();
  }
}
