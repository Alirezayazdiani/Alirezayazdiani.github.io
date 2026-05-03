/**
 * @see https://purgecss.com/configuration.html
 *
 * GitHub Actions runs PurgeCSS *after* `jekyll build`. Static HTML does not
 * include `data-theme` / `data-theme-setting` (those are set in the browser
 * by assets/js/theme.js), and many classes appear only after JS runs. Without
 * a safelist, PurgeCSS strips that CSS — so the live site looks "plain" while
 * `jekyll serve` locally (no purge step) shows the full design.
 */
module.exports = {
  content: ["_site/**/*.html", "_site/**/*.js"],
  css: ["_site/assets/css/*.css"],
  output: "_site/assets/css/",
  skippedContentGlobs: ["_site/assets/**/*.html"],
  safelist: {
    // Keep any rule whose selector mentions these patterns (theme + JS states).
    greedy: [
      /data-theme/,
      /data-theme-setting/,
      /news-timeline-dragging/,
      /news-collapsed/,
      /news-extra/,
      /news-toggle/,
      /table-dark/,
      /hljs-/,
      /medium-zoom/,
      /html\.transition/,
    ],
    standard: [
      "show",
      "active",
      "open",
      "fade",
      "collapse",
      "collapsing",
      "dropdown-menu",
      "dropdown-toggle",
      "modal-backdrop",
      "modal-open",
      "popover",
      "tooltip",
      "bs-popover-top",
      "bs-popover-bottom",
    ],
  },
};
