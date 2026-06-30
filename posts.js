/* ===========================================================================

   YOUR WRITING. Two kinds of entries — use whichever you want:

   (A) LINK to something you published somewhere else (like The Grizzly).
       Give it a title, a date, the link, and a one-line description:

         {
           title:   "My article",
           date:    "2026-02-05",
           link:    "https://thegrizzlynews.org/.../my-article/",
           source:  "The Grizzly",
           excerpt: "One line about it."
         },

   (B) WRITE a post right here on your site. Same, but use "body" instead of
       "link" (Markdown: ## heading, **bold**, *italic*, > quote, - bullet):

         {
           title: "My post",
           date:  "2026-06-21",
           body: `
   Write here. Blank line between paragraphs.
           `
         },

   Newest at the top. Only change the words inside the "quotes". Keep the
   commas and brackets.

   ===========================================================================*/

const POSTS = [

  {
    title:   "The City on My Shoulders",
    date:    "2026-02-05",
    link:    "https://thegrizzlynews.org/2699/showcase/the-everlasting-shadow-of-hiroshima-2/",
    source:  "The Grizzly",
  
  },

  {
    title:   "Ven.Space",
    date:    "2025-11-21",
    link:    "https://thegrizzlynews.org/2648/showcase/ven-space/",
    source:  "The Grizzly",
  
  },

  {
    title:   "Bedtime Stories",
    date:    "2025-10-10",
    link:    "https://thegrizzlynews.org/2599/literature-and-arts/bedtime-stories/",
    source:  "The Grizzly",
 
  }

];

/* ===========================================================================
   Machinery below. You don't need to touch any of this to add writing.
   ===========================================================================*/

function slugify(s) {
  return String(s).toLowerCase().trim()
    .replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
}
function postSlug(p) { return p.slug ? p.slug : slugify(p.title); }

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

/* ---- tiny markdown -> html (for posts you write here) ------------------- */
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
  if (!POSTS.length) { el.innerHTML = '<li class="empty">No writing yet.</li>'; return; }
  el.innerHTML = POSTS.map(function (p) {
    var ex = postExcerpt(p);
    var external = !!p.link;
    var href = external ? p.link : ("post.html?p=" + encodeURIComponent(postSlug(p)));
    var attrs = external ? ' target="_blank" rel="noopener"' : "";
    var tag = external ? ' <span class="ext">&#8599; ' + (p.source || "link") + "</span>" : "";
    return '<li><a href="' + href + '"' + attrs + ">" +
      '<span class="date">' + fmtDate(p.date) + "</span>" +
      "<span><h2>" + p.title + tag + "</h2>" +
      (ex ? '<p class="excerpt">' + ex + "</p>" : "") +
      "</span></a></li>";
  }).join("");
}

/* ---- render a single post (post.html) — for posts you write here -------- */
function renderPost(el) {
  if (!el) return;
  var slug = new URLSearchParams(location.search).get("p");
  var post = POSTS.find(function (p) { return !p.link && postSlug(p) === slug; });

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
