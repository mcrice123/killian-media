// When DOM is loaded, set the copyright year and add event listeners for the navbar burger
document.addEventListener("DOMContentLoaded", function() {

    // Check for system dark mode preference and set the initial theme accordingly
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const section = document.getElementById('mk-page');
    const toggle = document.getElementById('theme-toggle');
    const toggleLabel = document.getElementById('theme-toggle-label');

    if (prefersDarkScheme.matches) {
        section.setAttribute('data-theme', 'dark');
        toggleLabel.textContent = '☾ dark';
        toggle.setAttribute('aria-pressed', 'true');
    } else {
        section.setAttribute('data-theme', 'light');
        toggleLabel.textContent = '☀ light';
        toggle.setAttribute('aria-pressed', 'false');
    }

    // Add event listeners for theme toggle and filter buttons
    (function() {
      const section = document.getElementById('mk-page');
      const toggle = document.getElementById('theme-toggle');
      const toggleLabel = document.getElementById('theme-toggle-label');

      toggle.addEventListener('click', () => {
        const isDark = section.getAttribute('data-theme') === 'dark';
        if (isDark) {
          section.setAttribute('data-theme', 'light');
          toggleLabel.textContent = '☀ light';
          toggle.setAttribute('aria-pressed', 'true');
        } else {
          section.setAttribute('data-theme', 'dark');
          toggleLabel.textContent = '☾ dark';
          toggle.setAttribute('aria-pressed', 'false');
        }
      });

      const buttons = section.querySelectorAll('.filter-btn');
      const cards = section.querySelectorAll('.card');

      buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
          buttons.forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
          const filter = btn.dataset.filter;

          cards.forEach((card) => {
            const match = filter === 'all' || card.dataset.category === filter;
            card.classList.toggle('hidden', !match);
          });
        });
      });
    })();

    /*=============== SHOW MODAL ===============*/
    const openBtn = document.querySelector(".mk__modal_btn");
    const modal = document.querySelector(".mk-modal");

    if (openBtn && modal) {
    openBtn.addEventListener("click", () => {
        modal.classList.add("show-modal");
    });
    }

    /*=============== CLOSE MODAL ===============*/
    const closeBtn = document.querySelector(".mk-modal__close");

    function closeModal() {
        modal.classList.remove("show-modal");
    }
    closeBtn.addEventListener("click", closeModal);

    /*====== ESC BUTTON TO CLOSE MODAL ======*/
    document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeModal();
    }
    });

    /*=============== SET COPYRIGHT YEAR ===============*/
    var copyright = document.getElementById("copyright-year");
    const year = new Date();
    copyright.innerHTML = year.getFullYear();

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
        el.addEventListener('click', () => {

            // Get the target from the "data-target" attribute
            const target = el.dataset.target;
            const $target = document.getElementById(target);

            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            el.classList.toggle('is-active');
            $target.classList.toggle('is-active');
        });
    });
});