document.addEventListener("DOMContentLoaded", () => {
  const $search = document.getElementById("search");
  const $menu = document.createElement("div");
  let categories, tags, pages;
  $menu.className = "site-search";
  $search.parentElement.append($menu);
  $search.parentElement.style.position = "relative";
  const index = {
    status: "unloaded",
    categories: undefined,
    pages: undefined,
    tags: undefined,
  };

  function rebuildUi() {
    setTimeout(() => {
      if (!$search.value.trim()) {
        $menu.innerHTML = "";
        $menu.style.opacity = 0;
      } else {
        $menu.style.opacity = 1;
        if (index.status !== "ready") {
          $menu.innerHTML = `<center>building site index...</center>`;
          return;
        }
        const term = $search.value
          .trim()
          .replace(/[~^\-+*:]/g, (str) => `\\${str}`);

        const tagMatches = index.tags.search(`${term} *${term}*`);
        let tagsHTML = "";
        if (tagMatches.length) {
          tagMatches.forEach(({ ref }) => {
            tagsHTML += `<a href="${ref}"><code data-type=tag>tag</code><span>${
              tags.find((t) => t.permalink === ref).name
            }</span></a>`;
          });
        }
        const categoryMatches = index.categories.search(`${term} *${term}*`);
        let categoriesHTML = "";
        if (categoryMatches.length) {
          categoryMatches.forEach(({ ref }) => {
            categoriesHTML += `<a href="${ref}"><code data-type=category>category</code><span>${
              categories.find((t) => t.permalink === ref).name
            }</span></a>`;
          });
        }
        const pageMatches = index.pages.search(`${term} *${term}*`);
        let pagesHTML = "";
        if (pageMatches.length) {
          pageMatches.forEach(({ ref }) => {
            pagesHTML += `<a href="${ref}"><code data-type=page>page</code><span>${
              pages.find((t) => t.href === ref).title
            }</span></a>`;
          });
        }
        const results = `${categoriesHTML}${tagsHTML}${pagesHTML}`;
        $menu.innerHTML = `${results || "<br><center>no results</center><br>"}`;
      }
    }, 1);
  }

  $search.addEventListener("focus", async (e) => {
    if (index.status === "unloaded") {
      rebuildUi();
      index.status = "loading";
      const resp = await window.fetch("/index.json");
      const json = await resp.json();
      categories = json.categories;
      tags = json.tags;
      pages = json.pages;

      index.categories = lunr(function () {
        this.field("name");
        this.ref("permalink");
        categories.forEach((category) => this.add(category));
        index.status = "ready";
        rebuildUi();
      });
      index.tags = lunr(function () {
        this.field("name");
        this.ref("permalink");
        tags.forEach((tag) => this.add(tag));
        index.status = "ready";
        rebuildUi();
      });
      index.pages = lunr(function () {
        this.field("title");
        this.field("tags");
        this.field("categories");
        this.field("content");
        this.ref("href");
        pages.forEach((page) => this.add(page));
        index.status = "ready";
        rebuildUi();
      });
    }
  });
  $search.addEventListener("keydown", (e) => {
    rebuildUi();
  });
});
