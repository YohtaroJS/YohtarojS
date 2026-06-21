/* ===========================================================================

   THIS IS YOUR FRONT PAGE. EDIT THE WORDS HERE.

   Rules (only two):
     1. Only change the text INSIDE the "quotation marks".
     2. Keep the quotes, commas, and brackets where they are.

   To ADD a row to a list: copy one whole line that has  { ... },  in it,
   paste it underneath, and change the words. That's it.

   (Your ASCII portrait is NOT here — it's in index.html, clearly marked.)

   ===========================================================================*/

const PROFILE = {

  /* ---- The big stuff at the top ----------------------------------------- */
  name:  "Yohtaro Shimozawa",     // your name, big at the top
  kanji: "下澤陽太朗",              // shown small under your name (delete the text to hide)
  place: "Brooklyn, New York",    // where you are now

  // The short paragraph under your name. Write whatever you want here.
  intro: "Student, writer, and photographer. Born in London; raised across Tokyo, Singapore, and New York.",


  /* ---- The lists ---------------------------------------------------------
     Each section has a small label and a list of rows.
     A row is:   { yr: "the year(s)", tx: "the thing" },
     You can leave "label" empty ("") to hide a section's label.
  ------------------------------------------------------------------------- */
  sections: [

    {
      label: "lived",
      rows: [
        { yr: "2022 — now",  tx: "Brooklyn, New York" },
        { yr: "2020 — 2022", tx: "Singapore" },
        { yr: "2014 — 2020", tx: "Tokyo, Japan" },
        { yr: "born",        tx: "London, United Kingdom" },
      ]
    },

    {
      label: "work",
      rows: [
        { yr: "2025 — now",   tx: "Intern — Nepenthes New York" },
        { yr: "Jan–May 2026", tx: "Social Media Intern — The Met, @MetTeens" },
        { yr: "2024 — now",   tx: "Assistant Karate Instructor — Japanese American Budokan" },
        { yr: "summers",      tx: "Camp Volunteer — NYS Dept. of Environmental Conservation" },
      ]
    },

    {
      label: "school",
      rows: [
        { yr: "2022 — now",  tx: "BASIS Independent Brooklyn" },
        { yr: "2020 — 2022", tx: "Nexus International School, Singapore" },
        { yr: "2014 — 2020", tx: "Nishimachi International School, Tokyo" },
      ]
    },

  ],


  /* ---- Footer links ----------------------------------------------------- */
  email:     "yohtaroshimozawa@gmail.com",
  instagram: "yohtarojs",                  // just the handle, no @
  linkedin:  "yohtarojs",                  // just the part after /in/

};
