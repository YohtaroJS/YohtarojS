# yohtarojs.com — the owner's guide

Everything you need to run this site yourself. No coding required. Written for
**you**, not a programmer.

**The one golden rule:** in any file, only change the words **inside the
"quotation marks."** Leave the quotes, commas, brackets and backticks where they
are. If something ever looks broken, undo your last change (Ctrl+Z) and you're
back to normal.

---

## Contents
1. [What the files are](#1-what-the-files-are)
2. [Edit the front-page text](#2-edit-the-front-page-text)
3. [Your ASCII portrait](#3-your-ascii-portrait)
4. [Write a blog post](#4-write-a-blog-post)
5. [Add & edit photos](#5-add--edit-photos)
6. [Change the colours](#6-change-the-colours)
7. [See your changes before publishing](#7-see-your-changes-before-publishing)
8. [Putting the site LIVE the first time](#8-putting-the-site-live-the-first-time)
9. [Connect yohtarojs.com](#9-connect-yohtarojscom)
10. [Editing after it's live](#10-editing-after-its-live)
11. [Getting found on Google (your name)](#11-getting-found-on-google-your-name)
12. [If something breaks](#12-if-something-breaks)

---

## 1. What the files are

You really only ever touch four files:

| File | What it holds |
|------|----------------|
| `content.js` | Your front page — name, intro, the lived / work / school lists, footer links |
| `posts.js` | Your blog posts |
| `photos.js` | Your photo captions (the photos themselves go in the `images/` folder) |
| `index.html` | Only one part of it: your ASCII portrait |

Everything else (`styles.css`, `site.js`, the `.html` pages) is the machinery —
you can ignore it.

Open these files in any plain text editor. On Windows, **Notepad** works, but
**VS Code** (free, code.visualstudio.com) is nicer and shows you if a quote is
missing.

---

## 2. Edit the front-page text

Open **`content.js`**. You'll see your name, a one-line intro, and three lists.

Change the words in quotes:

```js
name:  "Yohtaro Shimozawa",
intro: "Student, writer, and photographer. Born in London; raised across Tokyo, Singapore, and New York.",
place: "Brooklyn, New York",
```

Each list (lived / work / school) is made of rows like this:

```js
{ yr: "2025 — now", tx: "Intern — Nepenthes New York" },
```

- **To change a row:** edit the words in quotes.
- **To add a row:** copy a whole `{ ... },` line, paste it under, edit it.
- **To remove a row:** delete its whole line.
- **To hide a section's little label** (the word "lived", "work"…): set it to `""`.

The footer links are at the bottom — your email, and just the **handle** for
Instagram and LinkedIn (no `@`, no full link):

```js
email:     "yohtaroshimozawa@gmail.com",
instagram: "yohtarojs",
linkedin:  "yohtarojs",
```

---

## 3. Your ASCII portrait

This one lives in **`index.html`** (because ASCII art has slashes and symbols
that get mangled in the other files).

1. Open `index.html`, scroll to the block that says **YOUR ASCII PORTRAIT**.
2. Between the two `=====` lines, delete the placeholder face and paste your own.
3. Save. (Leave it empty if you don't want a portrait.)

**Making one:** take a clear, high-contrast photo of your face, then run it
through a free photo-to-ASCII converter and copy the text:
- https://asciiart.club
- https://www.text-image.com/convert/ascii.html

Tip: keep the width modest (it sits next to your name). If it looks too big or
too small on the page, that's normal — it auto-scales.

---

## 4. Write a blog post

Open **`posts.js`**. At the top there's an example post. To write a new one:

1. **Copy** the whole example block (from `{` to `},`).
2. **Paste** it at the very top of the list (newest first).
3. Change three things: `title`, `date` (like `"2026-06-21"`), and the `body`
   (your writing, between the backtick ` `` ` marks).

```js
{
  title: "My new post",
  date:  "2026-06-21",
  body: `
Write here. Leave a blank line between paragraphs.

## A heading
**bold**   *italic*   [a link](https://example.com)
> a quote
- a bullet point

![a caption for the photo](images/my-photo.jpg)
  `
},
```

You don't set a web address — the site makes one from your title automatically.
The post appears on the **writing** page instantly.

**To edit a post:** change its words. **To delete one:** remove its whole block.

---

## 5. Add & edit photos

Two steps to add a photo:

1. Put the image file in the **`images/`** folder.
2. Open **`photos.js`** and add one line at the top:

```js
{ src: "images/my-photo.jpg", loc: "Brooklyn", date: "2026" },
```

- `src` = the file's name inside `images/`
- `loc` and `date` = the little caption (both optional)
- **Edit** a caption by changing the words; **remove** a photo by deleting its line;
  **reorder** by moving lines up or down.

**Quality:** export your photos with the **long edge around 2000–2400 pixels**.
Sharp on any screen, not a giant file.

**Want to host photos somewhere else?** You can. Anywhere that gives you a direct
image link works — just paste the full link as `src`:

```js
{ src: "https://res.cloudinary.com/.../my-photo.jpg", loc: "Tokyo", date: "2025" },
```

My advice: **start by keeping them in `images/`.** It's the simplest, it's free,
and you own them. If you ever end up with hundreds of big files and want them off
the site's folder, **Cloudinary** (free tier, cloudinary.com) is the one to use —
it stores and optimizes images and gives you links to paste in. You can switch
any time without touching anything else.

---

## 6. Change the colours

Open **`styles.css`**. The top section (`:root`) has the whole palette:

```css
--bg:     #f0e6cd;   /* the cream background  */
--ink:    #2a2318;   /* the text colour       */
--accent: #c23a20;   /* the red — links, marks */
```

Change `--accent` to recolour all the links and accents at once. (Those `#xxxxxx`
codes are colours — pick new ones at a site like coolors.co.)

---

## 7. See your changes before publishing

Double-clicking `index.html` mostly works, but to see the blog and gallery
exactly right, run a tiny local preview. Open a terminal **in this folder** and:

```
python -m http.server 8000
```

Then open **http://localhost:8000** in your browser. Edit a file, save, refresh
the page to see it. Press Ctrl+C in the terminal to stop.

(No Python? Install it free from python.org, or use VS Code's "Live Server"
extension instead.)

---

## 8. Putting the site LIVE the first time

You'll host it free on **GitHub Pages**. One-time setup:

1. **Make a GitHub account** at github.com (free).
2. **Install GitHub Desktop** (desktop.github.com) — this is the friendly,
   no-typing way to put your files online.
3. In GitHub Desktop: **File → Add Local Repository** → choose this folder.
   It'll say it's not a repository yet — click **"create a repository"** → **Create**.
4. Click **Publish repository** (top right). Untick "Keep this code private" so the
   site can be public. Publish.
5. On github.com, open your new repository → **Settings → Pages**.
6. Under **Build and deployment**, set **Source: Deploy from a branch**, branch
   **main**, folder **/ (root)** → **Save**.
7. Wait ~1 minute. GitHub shows a link like `https://<you>.github.io/...`. That's
   your site, live. 🎉

(Prefer not to install anything? On github.com you can click **"+ → New
repository"**, then **"uploading an existing file"**, and drag in all the files
and folders. GitHub Desktop is easier for updating later, though.)

---

## 9. Connect yohtarojs.com

Your site works at the github.io link above. Now point your real domain at it.

**A. Tell GitHub the domain**
- Repo → **Settings → Pages → Custom domain** → type `yohtarojs.com` → **Save**.
  (This updates the `CNAME` file in your repo — that's expected.)

**B. Find where your domain's DNS is managed**
- Your domain currently points at **WordPress.com**. Log in wherever you bought /
  manage `yohtarojs.com` (that's your *registrar* — e.g. WordPress.com itself,
  GoDaddy, Namecheap, Google Domains/Squarespace…). You're looking for **DNS
  settings** / **DNS records**.
- If the domain is using **WordPress.com's nameservers**, you'll either edit the
  DNS records inside WordPress.com, or switch the nameservers back to your
  registrar's defaults first. (If you're unsure, tell me who the registrar is and
  I'll give you the exact clicks.)

**C. Set these DNS records**
- Four **A** records for `yohtarojs.com` (host `@`), pointing to GitHub:
  ```
  185.199.108.153
  185.199.109.153
  185.199.110.153
  185.199.111.153
  ```
- One **CNAME** record for `www` → `<your-github-username>.github.io`
- Delete any old A records that point at WordPress.com.

**D. Finish**
- DNS changes can take from minutes up to ~24 hours.
- Back in **Settings → Pages**, once it's ready, tick **Enforce HTTPS**.
- Visit https://yohtarojs.com — done.

---

## 10. Editing after it's live

Once it's on GitHub, you have two easy ways to make changes:

- **Quick text tweaks:** on github.com, click the file (e.g. `content.js`) →
  the **pencil ✏️** → edit → **Commit changes**. The live site updates in about a
  minute.
- **Adding photos / bigger changes:** edit the files on your computer, then in
  **GitHub Desktop** click **Commit**, then **Push**. Done.

That's the whole loop: edit → commit → it's live.

---

## 11. Getting found on Google (your name)

Good news: **"Yohtaro Shimozawa" is a rare name**, so ranking #1 for it is very
doable. The site is already built for it (your name is in the title, the heading,
and hidden "this is a person" data for Google). Here's how to actually get there:

**Do these first (biggest impact):**
1. **Google Search Console** — go to search.google.com/search-console, add
   `yohtarojs.com`, verify ownership (it gives you a TXT record to add in the same
   DNS settings as above), then submit your sitemap: `https://yohtarojs.com/sitemap.xml`.
   This tells Google your site exists and to crawl it.
2. **Link to it from everywhere that's already "you."** Put `yohtarojs.com` in your
   **Instagram bio**, **LinkedIn** (Contact info → Website), school paper bio,
   email signature. Google ranks pages partly by who links to them — and links
   from your own verified profiles also confirm it's really you.
3. **Bing too:** bing.com/webmasters — same idea, 5 minutes. (Powers Bing + others.)

**Keep it strong:**
4. **Be patient.** New sites take a few days to a few weeks to show up. Don't panic
   on day one.
5. **Publish writing.** Every blog post is another page with your name on it that
   Google can index. Posting now and then keeps the site "fresh," which helps.
6. **Use your full name** naturally in your About text and posts (it already is).
7. **One name, spelled the same** across every profile — consistency helps Google
   connect them all to one person (that's what can eventually produce a little
   "knowledge panel" about you).

**Don't bother with:** paying for "SEO services," keyword-stuffing, or buying
links. For a personal site under a unique name, the steps above are all you need.

**Traffic beyond your name:** realistically, most visitors will come from *you*
sharing the link (socials, signature) and from people searching your name. If you
want search traffic from strangers, write posts about specific things people look
up — street photography in a named neighborhood, being a "third culture kid,"
a camera or film you used — and give them clear, real titles.

---

## 12. If something breaks

- **A page looks blank or wrong after editing?** You probably deleted a quote,
  comma, or bracket. Press **Ctrl+Z** to undo until it works, then save.
- **An image doesn't show?** Check the file name in `photos.js` matches the file
  in `images/` exactly (capital letters count: `Photo.JPG` ≠ `photo.jpg`).
- **Changes not showing on the live site?** Give it a minute, then refresh with
  Ctrl+Shift+R. On GitHub, check the commit actually went through.
- **Stuck?** The whole site is just text files — nothing you do can truly break it.
  Worst case, undo, or ask me.
```
