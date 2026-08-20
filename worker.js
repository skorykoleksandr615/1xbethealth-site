const LEGACY = {
  "/login.html": "/gate.html",
  "/register.html": "/open-ticket.html",
  "/bonus.html": "/welcome-line.html",
  "/sports-betting.html": "/line-board.html",
  "/online-casino.html": "/reel-desk.html",
  "/slots.html": "/reel-desk.html",
  "/aviator-crash.html": "/climb-line.html",
  "/live-casino.html": "/studio-floor.html",
  "/mobile-app.html": "/pocket-line.html",
  "/payments.html": "/cash-window.html",
  "/help.html": "/desk-help.html"
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.protocol === "http:") {
      url.protocol = "https:";
      return Response.redirect(url.toString(), 301);
    }
    if (url.hostname.startsWith("www.")) {
      url.hostname = url.hostname.slice(4);
      return Response.redirect(url.toString(), 301);
    }
    const next = LEGACY[url.pathname];
    if (next) {
      url.pathname = next;
      return Response.redirect(url.toString(), 301);
    }
    const res = await env.ASSETS.fetch(request);
    const path = url.pathname;
    if (path === "/" || path.endsWith(".html") || path.endsWith(".css") || path.endsWith(".js") || path.endsWith(".webmanifest")) {
      const out = new Response(res.body, res);
      out.headers.set("Cache-Control", "public, max-age=0, must-revalidate");
      return out;
    }
    return res;
  }
};
