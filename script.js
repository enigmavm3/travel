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

const countries = {
  th: {title:'泰國｜從 LINE 開始認識彼此', copy:'LINE 在泰國使用普及。先問民宿主人或司機是否使用 LINE，取得同意後再邀請進群。', source:'LINE 官方公告', url:'https://www.linecorp.com/pr/news/th/2025/0304'},
  vn: {title:'越南｜先問對方是否也使用 LINE', copy:'Zalo 是越南主要通訊平台。即使支援越南語，也要先確認對方有 LINE、願意加入你們的群組，才能在這裡互譯。', source:'VNG 2025 年報', url:'https://ir.vng.com.vn/vi/business-report/zalo-ai'},
  id: {title:'印尼｜先確認，再一起開群', copy:'WhatsApp 在印尼相當常見。去峇里島換宿或旅行，請先確認主人也使用 LINE；翻譯小幫手提供印尼語翻譯，不代表支援峇里語。', source:'MEF 印尼通訊研究（商業訊息）', url:'https://mobileecosystemforum.com/mef_data_post/indonesia/'},
  ph: {title:'菲律賓｜Messenger 常見，LINE 要先問', copy:'Messenger 在菲律賓廣泛使用。請先和教練或當地朋友確認是否也用 LINE，並確認偏好英語或菲律賓語（Tagalog），再邀請進群。', source:'DataReportal Digital 2026（廣告觸及資料）', url:'https://datareportal.com/reports/digital-2026-philippines'}
};
document.querySelectorAll('[data-country]').forEach(button => {
  button.addEventListener('click', () => {
    const selected = countries[button.dataset.country];
    document.querySelectorAll('[data-country]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    document.getElementById('country-title').textContent = selected.title;
    document.getElementById('country-copy').textContent = selected.copy;
    const source = document.getElementById('country-source');
    source.textContent = '查證來源：' + selected.source + ' ↗';
    source.href = selected.url;
  });
});

document.querySelectorAll('.line-cta').forEach(link => {
  link.addEventListener('click', event => {
    // 保留指定佔位網址；尚未換上真實管道前，不跳往無效網址、不記轉換。
    if (link.getAttribute('href').includes('【旅遊管道待產品建立】')) {
      event.preventDefault();
      document.getElementById('preview-dialog').showModal();
      return;
    }
    if (!isPreview) gtag('event', 'add_line_friend_travel', {
      event_category: 'engagement',
      event_label: 'add_line_friend_travel',
      cta_position: link.dataset.position,
      transport_type: 'beacon'
    });
  });
});
