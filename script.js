/* ==========================================================================
   Julius Cheche Wamanji — portfolio interactions
   --------------------------------------------------------------------------
   Everything you are likely to change lives in one of two places:
   1. The HTML (text, links, phone number, images)
   2. The CONFIG object just below

   The WhatsApp number is read from data-whatsapp on the links themselves, so
   editing that attribute in index.html is enough.
   ========================================================================== */

(function () {
  'use strict';

  var CONFIG = {
    email: 'juliuscece52@gmail.com',
    whatsappNumber: '',            // leave empty to use data-whatsapp from the HTML
    whatsappMessage: 'Hello Julius, I found your portfolio and would like to connect.',
    formSubject: 'Portfolio enquiry'
  };

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function $(selector, scope) {
    return (scope || document).querySelector(selector);
  }

  function $$(selector, scope) {
    return Array.prototype.slice.call((scope || document).querySelectorAll(selector));
  }

  /* ---------------------------------------------------------------- header */
  var header = $('#siteHeader');
  var progressBar = $('#progressBar');

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;

    if (header) header.classList.toggle('is-scrolled', y > 14);

    if (progressBar) {
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight;
      var pct = max > 0 ? Math.min(100, Math.max(0, (y / max) * 100)) : 0;
      progressBar.style.width = pct + '%';
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  /* ------------------------------------------------------------- mobile nav */
  var navToggle = $('#navToggle');
  var primaryNav = $('#primaryNav');
  var navBackdrop = $('#navBackdrop');

  function setNav(open) {
    if (!navToggle) return;
    document.body.classList.toggle('nav-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (navBackdrop) navBackdrop.classList.toggle('is-visible', open);
  }

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      setNav(!document.body.classList.contains('nav-open'));
    });
  }
  if (navBackdrop) navBackdrop.addEventListener('click', function () { setNav(false); });
  $$('#primaryNav a').forEach(function (link) {
    link.addEventListener('click', function () { setNav(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setNav(false);
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 1120 && document.body.classList.contains('nav-open')) setNav(false);
  });

  /* --------------------------------------------------------- reveal on view */
  var revealItems = $$('.reveal');

  // Tells index.html that animations are wired up, so it can fall back to
  // showing everything if this file ever fails to load.
  document.documentElement.classList.add('reveal-ready');

  if (!reduceMotion && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    revealItems.forEach(function (item) { revealObserver.observe(item); });
  } else {
    revealItems.forEach(function (item) { item.classList.add('is-visible'); });
  }

  /* ------------------------------------------------------- active nav link */
  var sections = $$('main section[id]');
  var navLinks = $$('#primaryNav a[href^="#"]');

  if ('IntersectionObserver' in window && sections.length) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          var isActive = link.getAttribute('href') === '#' + entry.target.id;
          link.classList.toggle('is-active', isActive);
          if (isActive) {
            link.setAttribute('aria-current', 'true');
          } else {
            link.removeAttribute('aria-current');
          }
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (section) { sectionObserver.observe(section); });
  }

  /* ------------------------------------------------------ pointer spotlight */
  if (!reduceMotion && window.matchMedia('(hover: hover)').matches) {
    $$('.spotlight').forEach(function (card) {
      card.addEventListener('pointermove', function (event) {
        var rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', (event.clientX - rect.left) + 'px');
        card.style.setProperty('--my', (event.clientY - rect.top) + 'px');
      });
    });
  }

  /* -------------------------------------------------------------- whatsapp */
  var number = CONFIG.whatsappNumber;
  var message = CONFIG.whatsappMessage;

  function whatsappHref(rawNumber, rawMessage) {
    var digits = String(rawNumber || '').replace(/[^\d]/g, '');
    if (digits.length < 8) return null;
    var text = rawMessage || message;
    return 'https://wa.me/' + digits + '?text=' + encodeURIComponent(text);
  }

  $$('[data-whatsapp]').forEach(function (link) {
    var href = whatsappHref(number || link.getAttribute('data-whatsapp'), link.getAttribute('data-message'));
    if (href) {
      link.setAttribute('href', href);
      if (!link.getAttribute('title')) link.setAttribute('title', 'Chat with Julius on WhatsApp');
    }
  });

  var footerWhatsapp = $('#whatsappFooter');
  var whatsappBtn = $('#whatsappBtn');
  if (footerWhatsapp && whatsappBtn) {
    footerWhatsapp.setAttribute('href', whatsappBtn.getAttribute('href'));
  }

  /* ------------------------------------------------------------- copy email */
  var toast = $('#toast');
  var toastTimer;

  function showToast(text) {
    if (!toast) return;
    toast.textContent = text;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.classList.remove('is-visible');
    }, 3200);
  }

  var copyBtn = $('#copyEmail');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var email = copyBtn.getAttribute('data-email') || CONFIG.email;

      function fallbackCopy() {
        var input = document.createElement('textarea');
        input.value = email;
        input.setAttribute('readonly', '');
        input.style.position = 'fixed';
        input.style.opacity = '0';
        document.body.appendChild(input);
        input.select();
        try { document.execCommand('copy'); } catch (err) { /* ignore */ }
        document.body.removeChild(input);
      }

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(function () {
          showToast('Email address copied');
        }).catch(function () {
          fallbackCopy();
          showToast('Email address copied');
        });
      } else {
        fallbackCopy();
        showToast('Email address copied');
      }

      copyBtn.classList.add('is-copied');
      window.setTimeout(function () { copyBtn.classList.remove('is-copied'); }, 1800);
    });
  }

  /* --------------------------------------------------------- contact form */
  var form = $('#contactForm');
  var success = $('#formSuccess');
  var submitBtn = $('#submitBtn');

  if (form) {
    var fields = {
      name: { input: $('#cName'), error: $('#errName') },
      email: { input: $('#cEmail'), error: $('#errEmail') },
      message: { input: $('#cMessage'), error: $('#errMessage') }
    };

    function setError(field, text) {
      if (!field.input) return;
      field.input.classList.toggle('has-error', Boolean(text));
      field.input.setAttribute('aria-invalid', text ? 'true' : 'false');
      if (field.error) field.error.textContent = text || '';
    }

    function validate() {
      var valid = true;
      var nameValue = fields.name.input ? fields.name.input.value.trim() : '';
      var emailValue = fields.email.input ? fields.email.input.value.trim() : '';
      var messageValue = fields.message.input ? fields.message.input.value.trim() : '';

      if (nameValue.length < 2) {
        setError(fields.name, 'Please enter your name.');
        valid = false;
      } else {
        setError(fields.name, '');
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailValue)) {
        setError(fields.email, 'Please enter a valid email address.');
        valid = false;
      } else {
        setError(fields.email, '');
      }

      if (messageValue.length < 10) {
        setError(fields.message, 'Please write a message of at least 10 characters.');
        valid = false;
      } else {
        setError(fields.message, '');
      }

      return valid;
    }

    Object.keys(fields).forEach(function (key) {
      var input = fields[key].input;
      if (!input) return;
      input.addEventListener('input', function () {
        if (input.classList.contains('has-error')) setError(fields[key], '');
      });
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      if (!validate()) {
        var firstError = form.querySelector('.has-error');
        if (firstError) firstError.focus();
        if (success) success.hidden = true;
        return;
      }

      var name = fields.name.input.value.trim();
      var email = fields.email.input.value.trim();
      var text = fields.message.input.value.trim();

      var subject = CONFIG.formSubject + ' — ' + name;
      var body = 'Name: ' + name + '\nEmail: ' + email + '\n\n' + text;
      var href = 'mailto:' + CONFIG.email +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);

      if (submitBtn) {
        submitBtn.classList.add('is-sending');
        var label = submitBtn.querySelector('span');
        if (label) {
          var original = label.textContent;
          label.textContent = 'Opening your email app…';
          window.setTimeout(function () {
            label.textContent = original;
            submitBtn.classList.remove('is-sending');
            if (success) success.hidden = false;
          }, 1400);
        }
      } else if (success) {
        success.hidden = false;
      }

      window.location.href = href;
    });
  }

  /* ------------------------------------------------------------ footer year */
  var year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
