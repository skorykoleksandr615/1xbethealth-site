(() => {
  const OFFER_URL = "https://dominatus830.online/Wj8dm1GW?sub_id_1=1xbet.health";

  const header = document.getElementById("siteHeader") || document.getElementById("site-header");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const mobileNav = document.querySelector("[data-mobile-nav]");
  const navToggle = document.getElementById("navToggle");
  const siteNav = document.getElementById("siteNav");
  const offerLinks = document.querySelectorAll(".js-offer");
  const picks = document.querySelectorAll("[data-pick]");
  const sportChips = document.querySelectorAll("[data-sport]");
  const lineRows = document.querySelectorAll(".line-row, .odds-row[data-sport]");
  const filters = document.querySelectorAll("[data-filter]");
  const slots = document.querySelectorAll(".slot-card");
  const revealItems = document.querySelectorAll(".section, .footer, .ticker, .site-footer, .cta-band");

  offerLinks.forEach((link) => {
    if (link.tagName === "A") {
      link.setAttribute("href", OFFER_URL);
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer sponsored");
      return;
    }
    link.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = OFFER_URL;
    });
  });

  picks.forEach((pick) => {
    pick.addEventListener("click", () => {
      const group = pick.parentElement;
      group?.querySelectorAll("[data-pick]").forEach((item) => item.classList.remove("is-active"));
      pick.classList.add("is-active");
    });
  });

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-solid", window.scrollY > 10);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
      const open = document.body.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        document.body.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      const open = mobileNav.hasAttribute("hidden");
      if (open) mobileNav.removeAttribute("hidden");
      else mobileNav.setAttribute("hidden", "");
      menuToggle.setAttribute("aria-expanded", String(open));
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.setAttribute("hidden", "");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  sportChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const value = chip.getAttribute("data-sport") || "all";
      sportChips.forEach((item) => item.classList.toggle("is-active", item === chip));
      lineRows.forEach((row) => {
        const sport = row.getAttribute("data-sport");
        row.classList.toggle("is-hidden", value !== "all" && sport !== value);
      });
    });
  });

  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      const value = filter.getAttribute("data-filter") || "all";
      filters.forEach((item) => item.classList.toggle("is-active", item === filter));
      slots.forEach((slot) => {
        const cat = slot.getAttribute("data-cat");
        slot.classList.toggle("is-hidden", value !== "all" && cat !== value);
      });
    });
  });

  const clock = document.getElementById("boardClock");
  function tickClock() {
    if (!clock) return;
    const d = new Date();
    clock.textContent =
      String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
  }
  tickClock();
  setInterval(tickClock, 15000);

  revealItems.forEach((item) => item.classList.add("reveal-on-scroll"));

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );

  revealItems.forEach((item) => observer.observe(item));
})();
