const header = document.querySelector(".site-header");
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#site-nav");
const form = document.querySelector("#contact-form");
const statusEl = document.querySelector("#form-status");

toggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "إغلاق القائمة" : "فتح القائمة");
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
  });
});

window.addEventListener("scroll", () => {
  header.style.boxShadow =
    window.scrollY > 8 ? "0 10px 30px rgba(8, 38, 44, 0.08)" : "none";
});

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const email = String(data.get("email") || "").trim();
  const phone = String(data.get("phone") || "").trim();
  const message = String(data.get("message") || "").trim();

  if (!name || !email || !phone || !message) {
    statusEl.textContent = "يرجى تعبئة الاسم، البريد، الهاتف، والرسالة.";
    statusEl.className = "form-status error";
    return;
  }

  if (!isValidEmail(email)) {
    statusEl.textContent = "يرجى إدخال بريد إلكتروني صحيح.";
    statusEl.className = "form-status error";
    return;
  }

  statusEl.textContent = "تم استلام طلبك. سنتواصل معك قريباً عبر البريد أو الهاتف.";
  statusEl.className = "form-status success";
  form.reset();
});
