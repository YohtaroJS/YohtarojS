/* ===========================================================================

   YOUR WRITING BLOG. To post, copy the block below, paste it at the TOP of
   the list, and change the three things: title, date, and your writing.

       {
         title: "My new post",
         date:  "2026-06-21",          // year-month-day
         body: `

   Write here. Leave a blank line between paragraphs.

   You can use:  ## a heading   **bold**   *italic*   [a link](https://...)
                 > a quote      - a bullet point

         `
       },

   That's everything. Newest post goes at the top. Keep the quotes, commas
   and the backticks (`) around the body where they are.

   ===========================================================================*/

const POSTS = [

     {
         title: "My new post",
         date:  "2026-06-21",          // year-month-day
         body: `

   Write here. Leave a blank line between paragraphs.

   You can use:  ## a heading   **bold**   *italic*   [a link](https://...)
                 > a quote      - a bullet point

         `
       },


/* ===========================================================================
   Machinery below. You don't need to touch any of this to write posts.
   ===========================================================================*/

/* turn a title into a url-friendly slug, e.g. "My Post!" -> "my-post" */
function slugify(s) {
  return String(s).toLowerCase().trim()
    .replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
}
function postSlug(p) { return p.slug ? p.slug : slugify(p.title); }

/* first sentence-ish of the body, used on the index when no excerpt is set */
function postExcerpt(p) {
  if (p.excerpt) return p.excerpt;
  var line = String(p.body || "").replace(/\r\n/g, "\n").split("\n")
    .map(function (l) { return l.trim(); })
    .find(function (l) { return l && !/^[#>*\-!\[]/.test(l); }) || "";
  return line.length > 120 ? line.slice(0, 117) + "…" : line;
}

function fmtDate(iso) {
  var d = new Date(iso + "T00:00:00");
  return isNaN(d) ? iso :
    d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

/* ---- tiny markdown -> html ---------------------------------------------- */
function md(src) {
  var esc = function (s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  };
  var inline = function (s) {
    return esc(s)
      .replace(/`([^`]+)`/g, function (_, c) { return "<code>" + c + "</code>"; })
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, function (_, a, h) {
        return '<img src="' + h + '" alt="' + a + '" loading="lazy">';
      })
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, function (_, t, h) {
        var ext = /^https?:/.test(h);
        return '<a href="' + h + '"' + (ext ? ' target="_blank" rel="noopener"' : "") + ">" + t + "</a>";
      })
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>");
  };

  var lines = src.replace(/\r\n/g, "\n").split("\n");
  var html = "", para = [], list = null, m;

  var flushPara = function () { if (para.length) { html += "<p>" + inline(para.join(" ").trim()) + "</p>"; para = []; } };
  var flushList = function () { if (list) { html += "</" + list + ">"; list = null; } };

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].trim();
    if (line === "") { flushPara(); flushList(); continue; }
    if (line === "---" || line === "***") { flushPara(); flushList(); html += "<hr>"; continue; }
    if ((m = line.match(/^(#{1,3})\s+(.*)$/))) { flushPara(); flushList(); var lv = m[1].length; html += "<h" + lv + ">" + inline(m[2]) + "</h" + lv + ">"; continue; }
    if ((m = line.match(/^>\s?(.*)$/))) { flushPara(); flushList(); html += "<blockquote><p>" + inline(m[1]) + "</p></blockquote>"; continue; }
    if ((m = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/))) {
      flushPara(); flushList();
      html += '<figure><img src="' + m[2] + '" alt="' + m[1] + '" loading="lazy">' +
              (m[1] ? "<figcaption>" + esc(m[1]) + "</figcaption>" : "") + "</figure>";
      continue;
    }
    if ((m = line.match(/^[-*]\s+(.*)$/))) { flushPara(); if (list !== "ul") { flushList(); html += "<ul>"; list = "ul"; } html += "<li>" + inline(m[1]) + "</li>"; continue; }
    if ((m = line.match(/^\d+\.\s+(.*)$/))) { flushPara(); if (list !== "ol") { flushList(); html += "<ol>"; list = "ol"; } html += "<li>" + inline(m[1]) + "</li>"; continue; }
    para.push(line);
  }
  flushPara(); flushList();
  return html;
}

/* ---- render the index list (blog.html) ---------------------------------- */
function renderPostList(el) {
  if (!el) return;
  if (!POSTS.length) { el.innerHTML = '<li class="empty">No posts yet.</li>'; return; }
  el.innerHTML = POSTS.map(function (p) {
    var ex = postExcerpt(p);
    return '<li><a href="post.html?p=' + encodeURIComponent(postSlug(p)) + '">' +
      '<span class="date">' + fmtDate(p.date) + '</span>' +
      '<span><h2>' + p.title + '</h2>' +
      (ex ? '<p class="excerpt">' + ex + '</p>' : '') +
      '</span></a></li>';
  }).join("");
}

/* ---- render a single post (post.html) ----------------------------------- */
function renderPost(el) {
  if (!el) return;
  var slug = new URLSearchParams(location.search).get("p");
  var post = POSTS.find(function (p) { return postSlug(p) === slug; });

  if (!post) {
    document.title = "Not found — Yohtaro Shimozawa";
    el.innerHTML =
      '<div class="article-head"><h1>Post not found</h1></div>' +
      '<div class="prose"><p>That post doesn’t exist (yet). Try the ' +
      '<a href="blog.html">writing index</a>.</p></div>' +
      '<a class="back" href="blog.html">&larr; all writing</a>';
    return;
  }

  document.title = post.title + " — Yohtaro Shimozawa";
  el.innerHTML =
    '<div class="article-head"><div class="date">' + fmtDate(post.date) + '</div>' +
    '<h1>' + post.title + '</h1></div>' +
    '<div class="prose">' + md(post.body) + '</div>' +
    '<a class="back" href="blog.html">&larr; all writing</a>';
}
