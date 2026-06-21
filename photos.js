/* =========================================================================

   YOUR PHOTOS. Two steps to add one:

     1. Put the photo file in the  images/  folder.
     2. Add one line to the list below (newest at the top):

        { src: "images/my-photo.jpg", loc: "Brooklyn", date: "2026" },

   That's it. Only change the words inside the "quotes".

   - src  : the photo's file name inside images/
   - loc  : short place label (bottom-left of the caption) — optional
   - date : year or month/year (bottom-right) — optional

   HOSTING ELSEWHERE? You don't have to keep photos in this folder. If you
   host them somewhere (Cloudinary, your Flickr, anywhere), just paste the
   full link as the src instead:
        { src: "https://.../my-photo.jpg", loc: "Tokyo", date: "2025" },

   TIP for quality: export the long edge around 2000–2400px. That looks sharp
   on screens without being a giant file.

   Replace the placeholder lines below with your real photos.
   ========================================================================= */

const PHOTOS = [
  { src: "images/P1020965.JPG", loc: "Brooklyn",  date: "2026", alt: "Replace me with a real photograph." },
  { src: "images/placeholder-2.svg", loc: "Tokyo",     date: "2025", alt: "Replace me with a real photograph." },
  { src: "images/placeholder-3.svg", loc: "Singapore", date: "2024", alt: "Replace me with a real photograph." },
  { src: "images/placeholder-4.svg", loc: "London",    date: "2024", alt: "Replace me with a real photograph." },
  { src: "images/placeholder-5.svg", loc: "Brooklyn",  date: "2026", alt: "Replace me with a real photograph." },
  { src: "images/placeholder-6.svg", loc: "Tokyo",     date: "2025", alt: "Replace me with a real photograph." }
];

/* ---- render (used by photography.html) ---------------------------------- */
function renderGallery(el) {
  if (!el) return;
  if (!PHOTOS.length) {
    el.innerHTML = `<p class="empty">No photographs up yet — check back soon.</p>`;
    return;
  }
  el.innerHTML = PHOTOS.map((p) => `
    <figure>
      <img src="${p.src}" alt="${p.alt || ""}" loading="lazy">
      <figcaption>
        <span class="loc">${p.loc || ""}</span>
        <span>${p.date || ""}</span>
      </figcaption>
    </figure>`).join("");
}
