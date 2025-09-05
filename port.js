// f.js — sidebar hamburger + smooth scroll + active link highlighting + form handler
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const sidebar = document.getElementById('sidebar');
  const closeBtn = document.querySelector('.close-btn');
  const overlay = document.getElementById('overlay');
  const sidebarLinks = document.querySelectorAll('.sidebar-links a');
  const desktopLinks = document.querySelectorAll('.desktop-links a');
  const allNavLinks = document.querySelectorAll('.desktop-links a, .sidebar-links a');

  // helpers
  function openSidebar() {
    sidebar.classList.add('active');
    overlay.classList.add('visible');
    sidebar.setAttribute('aria-hidden', 'false');
    if (hamburger) hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // prevent background scroll
  }
  function closeSidebar() {
    sidebar.classList.remove('active');
    overlay.classList.remove('visible');
    sidebar.setAttribute('aria-hidden', 'true');
    if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  // attach events
  if (hamburger) hamburger.addEventListener('click', openSidebar);
  if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
  if (overlay) overlay.addEventListener('click', closeSidebar);

  // close when clicking any sidebar link and smooth scroll
  sidebarLinks.forEach(a => a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    closeSidebar();
  }));

  // smooth scroll for desktop links too
  desktopLinks.forEach(a => a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }));

  // active link highlight based on scroll
  const sections = document.querySelectorAll('main section[id]');
  function highlightOnScroll() {
    const scrollPos = window.scrollY || window.pageYOffset;
    let currentId = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 140; // offset for fixed header
      if (scrollPos >= top) currentId = sec.id;
    });
    allNavLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  }
  window.addEventListener('scroll', highlightOnScroll);
  highlightOnScroll(); // run on load

  // allow Escape key to close sidebar
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSidebar();
  });

  // contact form (simple client-side validation)
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector("input[type='text']").value.trim();
      const email = form.querySelector("input[type='email']").value.trim();
      const message = form.querySelector("textarea").value.trim();
      if (!name || !email || !message) {
        alert("Please fill in all fields!");
        return;
      }
      alert("Message sent successfully! ✅");
      form.reset();
    });
  }
});

const logo = document.getElementById("logo");
logo.addEventListener("click", () => {
    window.location.reload(); // this refreshes the page
});
