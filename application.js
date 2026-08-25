// When DOM is loaded, set the copyright year and add event listeners for the navbar burger
document.addEventListener("DOMContentLoaded", function() {

    /*============ system dark mode preference =============*/
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

    /*=============== HAMBURGER MENU ==================*/ 
    const hamburger = document.getElementById("hamburger");
    const menu = document.getElementById("mk-menu");
    hamburger.addEventListener("click", () => {
      const currentState = hamburger.getAttribute("data-state");

      if (!currentState || currentState === "closed") {
        hamburger.setAttribute("data-state", "opened");
        hamburger.setAttribute("aria-expanded", "true");
        menu.classList.toggle("mk-menu-open", true);
      } else {
        hamburger.setAttribute("data-state", "closed");
        hamburger.setAttribute("aria-expanded", "false");
        menu.classList.toggle("mk-menu-open", false);
      }
    });

    /*=============== SCROLL LISTENER ==================*/
    window.addEventListener('scroll', () => {
      const topScroll = window.scrollY; // Current scroll position

      // Set the background color
      document.getElementsByTagName('nav')[0].classList.toggle('scroll-bg', topScroll > 0);
    });

    /*=========== THEME TOGGLE ==============*/
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

      /*============ WORK FILTER BUTTONS ==============*/

      const work_buttons = section.querySelectorAll('.filter-btn.work');
      const work_cards = section.querySelectorAll('.card.work');

      work_buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
          work_buttons.forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
          const filter = btn.dataset.filter;

          work_cards.forEach((card) => {
            const match = filter === 'all' || card.dataset.category === filter;
            card.classList.toggle('hidden', !match);
          });
        });
      });

      /*============ WORK FILTER BUTTONS ==============*/

      const service_buttons = section.querySelectorAll('.filter-btn.service');
      const service_cards = section.querySelectorAll('.card.service');

      service_buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
          service_buttons.forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
          const filter = btn.dataset.filter;

          service_cards.forEach((card) => {
            const match = filter === 'all' || card.dataset.category === filter;
            card.classList.toggle('hidden', !match);
          });
        });
      });
    })();

    /*============ FILL MESSAGE FIELD ON CARD CLICK =============*/
    const card_links = section.querySelectorAll('a.card.service');

    card_links.forEach((card_link) => {
      const title = card_link.getElementsByTagName('h3')[0];
      const message_text = "I am interested in your " + title.innerText + " service. "
      card_link.addEventListener('click', () => {
        document.getElementById("message").value = message_text;
      });
    });

    /*============== FORM SUCCESS/ERROR ============*/
    const handleSubmit = event => {
        event.preventDefault();

        const myForm = event.target;
        const formData = new FormData(myForm);

        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString()
        })
        .then(() => {
            if (!response.ok) {
              return response.text().then(text => {
                  throw new Error(`Submission failed (${response.status}): ${text}`);
              });
            }
            else {
              alert("Submission received!");
              myForm.reset();
            }
        })
        .catch(error => alert(error));
    };

    document.querySelector("form").addEventListener("submit", handleSubmit);

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