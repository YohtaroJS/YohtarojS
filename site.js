/* =========================================================================
   site.js — shared, tiny. You don't need to edit this.
   Jobs: build the front page from content.js, put your social links in the
   top bar (on every page), and stamp the year in footers.
   ========================================================================= */
(function () {
  "use strict";

  /* ---- visitor analytics: GoatCounter (privacy-friendly, no cookies) ------
     See your stats at:  https://yohtarojs.goatcounter.com
     Counts a pageview on every page (loads on all pages via this file). */
  window.goatcounter = { endpoint: "https://yohtarojs.goatcounter.com/count" };
  (function () {
    var gc = document.createElement("script");
    gc.async = true;
    gc.src = "https://gc.zgo.at/count.js";
    gc.setAttribute("data-goatcounter", "https://yohtarojs.goatcounter.com/count");
    (document.head || document.documentElement).appendChild(gc);
  })();

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  /* the social links shown in the top bar */
  function socialLinks(p) {
    var out = [];
    if (p.email)     out.push('<a href="mailto:' + esc(p.email) + '">email</a>');
    if (p.instagram) out.push('<a href="https://instagram.com/' + esc(p.instagram) + '" target="_blank" rel="me noopener">instagram</a>');
    if (p.linkedin)  out.push('<a href="https://www.linkedin.com/in/' + esc(p.linkedin) + '" target="_blank" rel="me noopener">linkedin</a>');
    return out.join("");
  }

  /* grab the ASCII portrait pasted into index.html, trimmed of outer blank lines */
  function getAscii() {
    var node = document.getElementById("ascii-art");
    if (!node) return "";
    var t = node.textContent.replace(/^\n+/, "").replace(/\s+$/, "");
    return /\S/.test(t) ? t : "";
  }

  /* ---- build the front page from PROFILE (content.js) ----------------- */
  function renderProfile(el, p) {
    if (!el || !p) return;
    var ascii = getAscii();

    var sections = (p.sections || []).map(function (s) {
      var rows = (s.rows || []).map(function (r) {
        return '<li><span class="yr">' + esc(r.yr) + '</span>' +
               '<span class="tx">' + esc(r.tx) + '</span></li>';
      }).join("");
      return '<section class="block">' +
               (s.label ? '<p class="label">' + esc(s.label) + '</p>' : '') +
               '<ul class="rows">' + rows + '</ul>' +
             '</section>';
    }).join("");

    var skills = (p.skills && p.skills.length) ?
      '<section class="block">' +
        '<p class="label">skills</p>' +
        '<ul class="rows skillrows">' +
          p.skills.map(function (s) {
            var lines = (s.lines || []).map(function (l) {
              return '<span class="ln">' + esc(l) + '</span>';
            }).join("");
            var embed = "";
            if (s.embed) {
              var src = String(s.embed).replace(/\/?$/, "/") + "embed";
              embed = '<div class="embed"><iframe src="' + esc(src) +
                      '" loading="lazy" scrolling="no" allowtransparency="true" frameborder="0"></iframe></div>';
            }
            return '<li><span class="sk">' + esc(s.name) + '</span>' +
                   '<span class="desc">' + lines + embed + '</span></li>';
          }).join("") +
        '</ul>' +
      '</section>' : "";

    el.innerHTML =
      '<header class="masthead rule' + (ascii ? ' has-ascii' : '') + '">' +
        '<div class="mh-text">' +
          '<h1>' + esc(p.name) + '</h1>' +
          (p.kanji ? '<div class="kanji">' + esc(p.kanji) + '</div>' : '') +
          (p.intro ? '<p class="intro">' + esc(p.intro) + '</p>' : '') +
          (p.place ? '<div class="place">' + esc(p.place) + '<span class="caret"></span></div>' : '') +
        '</div>' +
        (ascii ? '<pre class="ascii" aria-hidden="true">' + esc(ascii) + '</pre>' : '') +
      '</header>' +
      sections +
      skills +
      '<footer class="foot">' +
        '<span class="copy">&copy; <span data-year></span> ' + esc(p.name) + '</span>' +
      '</footer>';

    if (p.name) document.title = p.name;
  }

  document.addEventListener("DOMContentLoaded", function () {
    var haveProfile = typeof PROFILE !== "undefined";

    var profileEl = document.getElementById("profile");
    if (profileEl && haveProfile) renderProfile(profileEl, PROFILE);

    // social links in the top bar (every page that loads content.js)
    var social = document.getElementById("social");
    if (social && haveProfile) social.innerHTML = socialLinks(PROFILE);

    // stamp the year wherever it's asked for
    var years = document.querySelectorAll("[data-year]");
    for (var i = 0; i < years.length; i++) years[i].textContent = new Date().getFullYear();
  });
})();
