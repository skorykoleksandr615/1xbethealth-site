(() => {
  const OFFER = "https://dominatus830.online/Wj8dm1GW?sub_id_1=1xbet.health";
  const header = document.getElementById("siteHeader");
  const navToggle = document.getElementById("navToggle");
  const clock = document.getElementById("boardClock");

  document.querySelectorAll(".js-offer").forEach((el) => {
    if (el.tagName === "A") {
      el.setAttribute("href", OFFER);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer sponsored");
    }
  });

  if (navToggle) {
    navToggle.addEventListener("click", () => {
      const open = document.body.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  const onScroll = () => {
    if (header) header.classList.toggle("is-solid", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (clock) {
    const tick = () => {
      const d = new Date();
      clock.textContent = d.toTimeString().slice(0, 8);
    };
    tick();
    setInterval(tick, 1000);
  }
})();
