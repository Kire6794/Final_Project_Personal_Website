// ===== Theme toggle (saved in localStorage) =====
(function initTheme(){
  const saved = localStorage.getItem("theme");
  if(saved){
    document.documentElement.setAttribute("data-theme", saved);
  }
})();

function toggleTheme(){
  const current = document.documentElement.getAttribute("data-theme") || "dark";
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
}

// ===== Mobile nav =====
function toggleMobileNav(){
  const panel = document.getElementById("mobileNav");
  if(!panel) return;
  panel.hidden = !panel.hidden;
}

// ===== Active nav link highlight =====
(function markActiveNav(){
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(`[data-nav="${path}"]`).forEach(a => a.classList.add("active"));
})();

// ===== Cheat sheet filter/search =====
(function initCheatSheet(){
  const list = document.getElementById("cheatList");
  const q = document.getElementById("searchInput");
  const tags = document.querySelectorAll(".tag");
  if(!list || !q) return;

  let activeTag = "all";

  function apply(){
    const query = q.value.trim().toLowerCase();
    const items = list.querySelectorAll(".item");

    items.forEach(it => {
      const text = (it.dataset.title + " " + it.dataset.tags + " " + it.innerText).toLowerCase();
      const tagOk = (activeTag === "all") || it.dataset.tags.includes(activeTag);
      const queryOk = !query || text.includes(query);
      it.style.display = (tagOk && queryOk) ? "" : "none";
    });
  }

  q.addEventListener("input", apply);

  tags.forEach(t => {
    t.addEventListener("click", () => {
      tags.forEach(x => x.classList.remove("active"));
      t.classList.add("active");
      activeTag = t.dataset.tag;
      apply();
    });
  });

  apply();
})();

// ===== Hobby modal =====
function openModal(title, body){
  const modal = document.getElementById("modal");
  const mTitle = document.getElementById("modalTitle");
  const mBody = document.getElementById("modalBody");
  if(!modal || !mTitle || !mBody) return;
  mTitle.textContent = title;
  mBody.textContent = body;
  modal.hidden = false;
}

function closeModal(){
  const modal = document.getElementById("modal");
  if(!modal) return;
  modal.hidden = true;
}

(function modalUX(){
  const modal = document.getElementById("modal");
  if(!modal) return;

  modal.addEventListener("click", (e) => {
    if(e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if(e.key === "Escape") closeModal();
  });
})();

// ===== Back to Top button =====
(function initBackToTop(){
  const btn = document.getElementById("backToTop");
  if(!btn) return;

  function onScroll(){
    // show after scrolling down a bit
    if(window.scrollY > 150) btn.classList.add("show");
    else btn.classList.remove("show");
  }

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();






