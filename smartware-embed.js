/* SMARTWARE YC-A1325 / Sixshop common BODY loader */
(function () {
  'use strict';
  var originHost = location.hostname.replace(/^www\./, '').toLowerCase();
  var pathname = location.pathname.replace(/\/+$/, '').toLowerCase();
  if (originHost !== 'smartware.kr' || pathname !== '/product/yc-a1325') return;
  var ID = 'smartware-yc-a1325-embed';
  var PAGE = 'https://ycgroupcwsong-cmd.github.io/smartware_cnc/';
  var mounted = false;
  function mount() {
    if (document.getElementById(ID)) { mounted = true; return; }
    if (!document.body) return;
    var el = document.createElement('section');
    el.id = ID;
    el.setAttribute('aria-label', 'YC-A1325 제품 상세 콘텐츠');
    el.innerHTML = '<iframe title="SMARTWARE YC-A1325 상세페이지" src="' + PAGE + '" loading="eager" referrerpolicy="strict-origin-when-cross-origin"></iframe>' +
      '<p class="sw-embed-link">상세페이지가 표시되지 않으면 <a href="' + PAGE + '" target="_blank" rel="noopener noreferrer">원본 상세페이지 보기</a></p>';
    var selectorList = [
      '[data-product-detail-description]', '#product-description', '#productDescription',
      '.product-detail-description', '.product-description', '.product-detail__description',
      '.product-detail-content', '.product-detail__content'
    ];
    var host = null;
    for (var i = 0; i < selectorList.length; i++) {
      var candidate = document.querySelector(selectorList[i]);
      if (candidate && candidate !== document.body) { host = candidate; break; }
    }
    // Always mount somewhere, even if the Sixshop theme does not match our selectors.
    (host || document.querySelector('main') || document.body).appendChild(el);
    mounted = true;
    console.info('[SMARTWARE] YC-A1325 iframe mounted', el.parentElement);
  }
  function begin() {
    mount();
    if (!mounted) {
      var obs = new MutationObserver(function () {
        mount();
        if (mounted) obs.disconnect();
      });
      obs.observe(document.documentElement, {childList:true,subtree:true});
      window.setTimeout(function () { obs.disconnect(); }, 10000);
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', begin, {once:true});
  else begin();
})();
