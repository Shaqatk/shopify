/**
 * A24 Product Page - Phase 4
 *
 * Handles:
 * - Sticky product bar: Intersection Observer toggles .state-pinned
 * - Quantity selector: wires 1-9 buttons to hidden input, keyboard nav
 * - Add to Cart: fetch /cart/add.js, then "In Cart" state
 *
 * Only runs when [data-a24-product-bar] exists (A24 product template).
 */
(function () {
  const bar = document.querySelector('[data-a24-product-bar]');
  if (!bar) return;

  const form = bar.querySelector('form[data-product-form]') || bar.querySelector('form');
  const quantityButtons = bar.querySelectorAll('[data-quantity]');
  const quantityInput = bar.querySelector('[data-quantity-input]');
  const addToCartButton = bar.querySelector('[data-add-to-cart-button]');
  const addToCartText = bar.querySelector('[data-add-to-cart-text]');

  // ----- Sticky bar: pin state when bar sticks to top -----
  const observerOptions = {
    root: null,
    rootMargin: '1px 0px 0px 0px',
    threshold: [1]
  };
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
        bar.classList.add('state-pinned');
      } else {
        bar.classList.remove('state-pinned');
      }
    });
  }, observerOptions);
  observer.observe(bar);

  let scrollTicking = false;
  window.addEventListener('scroll', function () {
    if (!scrollTicking) {
      window.requestAnimationFrame(function () {
        const rect = bar.getBoundingClientRect();
        if (rect.top <= 0) {
          bar.classList.add('state-pinned');
        } else {
          bar.classList.remove('state-pinned');
        }
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });

  // ----- Quantity selector: 1-9 → hidden input + active state -----
  if (quantityButtons.length && quantityInput) {
    const buttons = Array.from(quantityButtons);

    function setQuantity(button) {
      const value = button.getAttribute('data-quantity');
      if (!value) return;
      buttons.forEach(function (btn) {
        const active = btn === button;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-checked', active ? 'true' : 'false');
        btn.setAttribute('tabindex', active ? '0' : '-1');
      });
      quantityInput.value = value;
      if (button.focus) button.focus();
    }

    buttons.forEach(function (button) {
      button.addEventListener('click', function (e) {
        e.preventDefault();
        setQuantity(button);
      });
    });

    const radiogroup = bar.querySelector('[data-quantity-buttons]');
    if (radiogroup) {
      radiogroup.addEventListener('keydown', function (e) {
        const currentIndex = buttons.findIndex(function (b) { return b.classList.contains('is-active'); });
        if (currentIndex === -1) return;
        let nextIndex = currentIndex;
        switch (e.key) {
          case 'ArrowRight':
          case 'ArrowDown':
            e.preventDefault();
            nextIndex = (currentIndex + 1) % buttons.length;
            setQuantity(buttons[nextIndex]);
            break;
          case 'ArrowLeft':
          case 'ArrowUp':
            e.preventDefault();
            nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
            setQuantity(buttons[nextIndex]);
            break;
          case 'Home':
            e.preventDefault();
            setQuantity(buttons[0]);
            break;
          case 'End':
            e.preventDefault();
            setQuantity(buttons[buttons.length - 1]);
            break;
          case ' ':
          case 'Enter':
            e.preventDefault();
            setQuantity(buttons[currentIndex]);
            break;
        }
      });
    }
  }

  // ----- Add to Cart: submit via /cart/add.js, then "In Cart" -----
  if (form && addToCartButton) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      if (addToCartButton.disabled) return;

      var previousText = addToCartText ? addToCartText.textContent : '';
      if (addToCartText) addToCartText.textContent = 'Adding...';
      addToCartButton.disabled = true;

      try {
        const formData = new FormData(form);
        const response = await fetch('/cart/add.js', {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          if (addToCartText) addToCartText.textContent = 'In Cart';
          addToCartButton.classList.add('is-added');
          document.dispatchEvent(new CustomEvent('cart:updated'));
          // Keep "In Cart" state; do not reset
        } else {
          var json = await response.json().catch(function () { return {}; });
          if (addToCartText) addToCartText.textContent = json.description || 'Error';
          addToCartButton.disabled = false;
          setTimeout(function () {
            if (addToCartText) addToCartText.textContent = previousText;
          }, 2000);
        }
      } catch (err) {
        console.error('A24 add to cart error:', err);
        if (addToCartText) addToCartText.textContent = 'Error';
        addToCartButton.disabled = false;
        setTimeout(function () {
          if (addToCartText) addToCartText.textContent = previousText;
        }, 2000);
      }
    });
  }
})();
