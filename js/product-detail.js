// 彩可 CHROMA COCOA — 單件商品頁動態載入。
// 依網址 ?id=N 從 window.CHROMA_PRODUCTS 取出商品，填入頁面並更新 SEO meta。
(function () {
  var LIST = window.CHROMA_PRODUCTS || [];
  if (!LIST.length) return;

  var params = new URLSearchParams(location.search);
  var id = parseInt(params.get('id'), 10);
  var p = LIST.filter(function (x) { return x.id === id; })[0] || LIST[0];

  var base = 'https://izzo24.github.io/chroma-cocoa/';
  var imgAbs = base + p.img.replace('./', '');
  var pageUrl = base + 'product.html?id=' + p.id;

  function set(idsel, fn) {
    var el = document.getElementById(idsel);
    if (el) fn(el);
  }
  function setAttr(sel, attr, val) {
    var el = document.querySelector(sel);
    if (el) el.setAttribute(attr, val);
  }

  // 主要內容
  set('pd-crumb', function (el) { el.textContent = p.name; });
  set('pd-img', function (el) { el.src = p.img; el.alt = p.name + ' ' + p.kicker + ' 商品照'; });
  set('pd-badge', function (el) {
    if (p.badge) { el.textContent = p.badge; el.style.background = 'var(' + p.colorVar + ')'; el.hidden = false; }
    else { el.hidden = true; }
  });
  set('pd-kicker', function (el) { el.textContent = p.kicker; });
  set('pd-name', function (el) { el.textContent = p.name; });
  set('pd-rating', function (el) { el.textContent = p.rating; });
  set('pd-price', function (el) { el.textContent = 'NT$' + p.price; });
  set('pd-lead', function (el) { el.textContent = p.lead; });

  set('pd-spec', function (el) {
    el.innerHTML = p.spec.map(function (row) {
      return '<li><b>' + row[0] + '</b><span>' + row[1] + '</span></li>';
    }).join('');
  });

  set('pd-story', function (el) {
    el.innerHTML = p.story.map(function (row) {
      return '<article><h2>' + row[0] + '</h2><p>' + row[1] + '</p></article>';
    }).join('');
  });

  // 相關推薦(同系列其他色票，最多 3 個)
  set('pd-related', function (wrap) {
    var grid = document.getElementById('pd-related-grid');
    if (!grid) return;
    var others = LIST.filter(function (x) { return x.id !== p.id; }).slice(0, 3);
    grid.innerHTML = others.map(function (o) {
      return '<article class="prod-card" data-color="' + o.color + '">'
        + '<div class="prod-media"><img src="' + o.img + '" alt="' + o.name + ' 商品照" loading="lazy" width="600" height="600">'
        + '<span class="prod-tag" style="background:var(' + o.colorVar + ')">' + o.kicker.split(' · ')[0] + '</span></div>'
        + '<div class="prod-body"><h3>' + o.name + '</h3><p>' + o.lead.slice(0, 38) + '…</p>'
        + '<div class="prod-foot"><span class="price">NT$' + o.price + '</span>'
        + '<a class="btn-mini" href="./product.html?id=' + o.id + '">看細節</a></div></div></article>';
    }).join('');
    wrap.hidden = false;
  });

  // SEO / 分享 meta
  document.title = p.name + ' ' + p.kicker.split(' · ')[0] + '｜彩可 CHROMA COCOA';
  setAttr('meta[name="description"]', 'content', p.lead);
  setAttr('link[rel="canonical"]', 'href', pageUrl);
  setAttr('meta[property="og:title"]', 'content', document.title);
  setAttr('meta[property="og:description"]', 'content', p.lead);
  setAttr('meta[property="og:url"]', 'content', pageUrl);
  setAttr('meta[property="og:image"]', 'content', imgAbs);
  setAttr('meta[name="twitter:title"]', 'content', document.title);
  setAttr('meta[name="twitter:description"]', 'content', p.lead);
  setAttr('meta[name="twitter:image"]', 'content', imgAbs);
})();
