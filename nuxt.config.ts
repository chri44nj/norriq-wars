export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  css: ["@/assets/styles.css"],
  app: {
    head: {
      title: "Characters",
      meta: [
        { name: "description", content: "Ever wondered " },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "robots", content: "index, follow" },
      ],
      link: [
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" },
        { rel: "icon", href: "/favicon.ico" },
      ],
    },
  },
});
