/* ===========================================================================

   YOUR PHOTOS. Two steps to add one:

     1. Put the photo file in the  images/  folder.
     2. Add one line to the list below (newest at the top):

        { src: "images/my-photo.jpg", caption: "What it is", date: "2026" },

   - src     : the photo's file name inside images/
   - caption : the words shown UNDER the photo (write whatever you like) — optional
   - date    : shown under the photo on the right — optional

   Only change the words inside the "quotes". Keep the commas and brackets.

   Photos are shown at full quality, and clicking one opens the original file.
   For best results keep your originals; they'll look sharp on any screen.

   HOSTING ELSEWHERE? You can paste a full link as the src instead:
        { src: "https://.../my-photo.jpg", caption: "Tokyo", date: "2025" },

   =========================================================================== */

const PHOTOS = [

  { src: "images/P1020941.JPG",    caption: "11:46",            date: "June 13, 2026" },
  { src: "images/middlefinger.JPG", caption: "",                date: "June 2026" },
  { src: "images/P1020965.JPG",    caption: "Brooklyn",         date: "2026" },
  { src: "images/DSC05039.JPG",    caption: "",                 date: "" },  /* ← bonus street shot: add a caption/date or delete this line */
  { src: "images/DSCN1083.JPG",    caption: "The American Man", date: "August 2023" },
  { src: "images/orange-buses.JPG", caption: "",                date: "June 2023" },

];

/* ---- render (used by photography.html) ---------------------------------- */
function renderGallery(el) {
  if (!el) return;
  function esc(s){ return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }
  if (!PHOTOS.length) {
    el.innerHTML = '<p class="empty">No photographs up yet — check back soon.</p>';
    return;
  }
  el.innerHTML = PHOTOS.map(function (p) {
    var cap = esc(p.caption), date = esc(p.date);
    return '<figure>' +
        '<a class="shot" href="' + esc(p.src) + '" target="_blank" rel="noopener">' +
          '<img src="' + esc(p.src) + '" alt="' + cap + '" loading="lazy" decoding="async">' +
        '</a>' +
        ((cap || date)
          ? '<figcaption><span class="cap">' + cap + '</span><span class="date">' + date + '</span></figcaption>'
          : '') +
      '</figure>';
  }).join("");
}
