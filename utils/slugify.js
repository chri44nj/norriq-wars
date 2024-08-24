export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD") // Decompose special characters into base characters and diacritics
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics (e.g., accents)
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Remove leading -
    .replace(/-+$/, ""); // Remove trailing -
}
