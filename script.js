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
}

document.querySelectorAll('.line-cta').forEach(link => {
  link.addEventListener('click', () => {
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
