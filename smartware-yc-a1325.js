/* SMARTWARE YC-A1325 product-only, non-destructive detail renderer */
(() => {
  'use strict';
  const TARGET_HOSTS = new Set(['smartware.kr', 'www.smartware.kr']);
  const TARGET_PATH = '/product/yc-a1325';
  const PREFIX = 'https://product.smartware.kr/';
  const path = location.pathname.replace(/\/+$/, '').toLowerCase();
  if (!TARGET_HOSTS.has(location.hostname.toLowerCase()) || path !== TARGET_PATH) return;

  function render() {
    if (document.getElementById('sw-yc-a1325-detail')) return;

    const section = document.createElement('section');
    section.id = 'sw-yc-a1325-detail';
    section.setAttribute('aria-label', 'SMARTWARE YC-A1325 상세 소개');
    section.innerHTML = `
      <div class="sw-panel">
        <div class="sw-hero">
          <p class="sw-eyebrow">SMARTWARE · PRODUCT DETAILS</p>
          <h2>YC-A1325</h2>
          <p class="sw-lead">SMARTWARE 제품 안내</p>
        </div>
        <div class="sw-section">
          <h3>YC-A1325 제품 소개</h3>
          <p class="sw-note">제품 이미지 및 검증된 사양을 업로드하면 이 영역에 상세 정보를 구성할 수 있습니다.</p>
        </div>
        <div class="sw-foot">※ 모델별 사양과 구성은 공식 상품 정보를 기준으로 확인해 주세요.</div>
      </div>`;

    // Prefer the actual product-description region when a known element exists.
    // These are intentionally conservative; they do not delete or overwrite Sixshop UI.
    const selectors = [
      '[data-product-description]',
      '#product-description',
      '.product-description',
      '.product-detail-description',
      '.productDetailDescription',
      '.product-detail__description'
    ];
    let target = null;
    for (const s of selectors) {
      const candidate = document.querySelector(s);
      if (candidate && candidate.getBoundingClientRect().width > 0) { target = candidate; break; }
    }
    if (target) {
      target.appendChild(section);
      return;
    }

    // Fallback without assuming undocumented Sixshop DOM: before footer if possible.
    // Use this only as a safe preview position; verify on the live product page.
    const footer = document.querySelector('footer');
    if (footer && footer.parentNode) footer.parentNode.insertBefore(section, footer);
    else (document.querySelector('main') || document.body).appendChild(section);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render, {once:true});
  else render();
})();
