/* ============================================
   VINOTECA PRINCESS — App Logic
   ============================================ */

'use strict';

// ─── Translations ─────────────────────────────────────────────

const i18n = {
    es: {
        badge:         "Evento Privado",
        subtitle:      "Registrá tu correo y obtené acceso exclusivo a nuestra <strong>degustación premium</strong> con posibilidad de ganar <strong>premios sorpresa</strong>.",
        label:         "Correo electrónico",
        placeholder:   "tu@email.com",
        btn_submit:    "Reservar mi lugar",
        loading:       "Enviando...",
        success_title: "¡Redirigiendo a WhatsApp!",
        success_desc:  "Tu lugar está siendo reservado. Completá la confirmación vía WhatsApp.",
        trust_1:       "100% Privado",
        trust_2:       "Sin spam",
        trust_3:       "Cupos limitados",
        err_empty:     "Por favor ingresá tu email.",
        err_invalid:   "Ingresá un email válido.",
        whatsapp_msg:  "quiero participar de la degustacion y de posible premios!",
        email_label:   "Email"
    },
    en: {
        badge:         "Private Event",
        subtitle:      "Register your email for exclusive access to our <strong>premium tasting</strong> with a chance to win <strong>surprise prizes</strong>.",
        label:         "Email address",
        placeholder:   "your@email.com",
        btn_submit:    "Reserve my spot",
        loading:       "Sending...",
        success_title: "Redirecting to WhatsApp!",
        success_desc:  "Your spot is being reserved. Complete the confirmation via WhatsApp.",
        trust_1:       "100% Private",
        trust_2:       "No spam",
        trust_3:       "Limited spots",
        err_empty:     "Please enter your email.",
        err_invalid:   "Please enter a valid email.",
        whatsapp_msg:  "I want to participate in the tasting and possible prizes!",
        email_label:   "Email"
    },
    pt: {
        badge:         "Evento Privado",
        subtitle:      "Cadastre seu e-mail para acesso exclusivo à nossa <strong>degustação premium</strong> com chance de ganhar <strong>prêmios surpresa</strong>.",
        label:         "Endereço de e-mail",
        placeholder:   "seu@email.com",
        btn_submit:    "Reservar minha vaga",
        loading:       "Enviando...",
        success_title: "Redirecionando para WhatsApp!",
        success_desc:  "Sua vaga está sendo reservada. Complete a confirmação pelo WhatsApp.",
        trust_1:       "100% Privado",
        trust_2:       "Sem spam",
        trust_3:       "Vagas limitadas",
        err_empty:     "Por favor, insira seu e-mail.",
        err_invalid:   "Insira um e-mail válido.",
        whatsapp_msg:  "quero participar da degustação e de possíveis prêmios!",
        email_label:   "E-mail"
    }
};

// ─── State ────────────────────────────────────────────────────

let currentLang = 'es';

// ─── DOM Refs ─────────────────────────────────────────────────

const dom = {
    langBtns:    null,
    form:        null,
    emailInput:  null,
    emailError:  null,
    checkIcon:   null,
    submitBtn:   null,
    submitText:  null,
    submitArrow: null,
    successState:null,
    particles:   null,
};

// ─── Validation ───────────────────────────────────────────────

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validateEmail(value) {
    if (!value.trim()) return { ok: false, key: 'err_empty' };
    if (!EMAIL_REGEX.test(value)) return { ok: false, key: 'err_invalid' };
    return { ok: true };
}

function setFieldValid(input, checkIcon, errorEl) {
    input.classList.add('is-valid');
    input.classList.remove('is-invalid');
    checkIcon.classList.add('visible');
    errorEl.textContent = '';
    errorEl.classList.remove('visible');
}

function setFieldInvalid(input, checkIcon, errorEl, msgKey) {
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    checkIcon.classList.remove('visible');
    errorEl.textContent = i18n[currentLang][msgKey];
    errorEl.classList.add('visible');
}

function resetFieldState(input, checkIcon, errorEl) {
    input.classList.remove('is-valid', 'is-invalid');
    checkIcon.classList.remove('visible');
    errorEl.textContent = '';
    errorEl.classList.remove('visible');
}

// ─── i18n ─────────────────────────────────────────────────────

function applyLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;

    const t = i18n[lang];

    // Update text elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key] !== undefined) el.innerHTML = t[key];
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (t[key] !== undefined) el.placeholder = t[key];
    });

    // Update lang button states
    dom.langBtns.forEach(btn => {
        const isActive = btn.dataset.lang === lang;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', String(isActive));
    });
}

// ─── Button States ────────────────────────────────────────────

function setButtonLoading() {
    dom.submitBtn.disabled = true;
    dom.submitBtn.innerHTML = `
        <svg class="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <path d="M12 2a10 10 0 1 0 10 10" opacity="0.3"/>
            <path d="M12 2a10 10 0 0 1 10 10"/>
        </svg>
        <span>${i18n[currentLang].loading}</span>
    `;
}

function resetButton() {
    dom.submitBtn.disabled = false;
    dom.submitBtn.innerHTML = `
        <span class="btn__text" data-i18n="btn_submit">${i18n[currentLang].btn_submit}</span>
        <svg class="btn__arrow" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
    `;
}

// ─── Particles ────────────────────────────────────────────────

function spawnParticles(count = 22) {
    const container = dom.particles;
    if (!container) return;
    container.innerHTML = '';

    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.setProperty('--dur', `${6 + Math.random() * 10}s`);
        p.style.setProperty('--delay', `${Math.random() * 12}s`);
        p.style.left = `${Math.random() * 100}%`;
        p.style.bottom = `${Math.random() * 20}%`;
        container.appendChild(p);
    }
}

// ─── Form Submission ──────────────────────────────────────────

function handleSubmit(e) {
    e.preventDefault();

    const value = dom.emailInput.value.trim();
    const validation = validateEmail(value);

    if (!validation.ok) {
        setFieldInvalid(dom.emailInput, dom.checkIcon, dom.emailError, validation.key);
        dom.emailInput.focus();
        return;
    }

    setFieldValid(dom.emailInput, dom.checkIcon, dom.emailError);
    setButtonLoading();

    // Slight delay for UX feedback before redirecting
    setTimeout(() => {
        // Fade out form
        dom.form.classList.add('fading');

        setTimeout(() => {
            dom.form.style.display = 'none';
            dom.successState.classList.remove('hidden');

            // Build WhatsApp deep-link
            const t = i18n[currentLang];
            const message = `${t.whatsapp_msg} (${t.email_label}: ${value})`;
            const encoded = encodeURIComponent(message);
            window.open(`https://wa.me/5492615715889?text=${encoded}`, '_blank');

        }, 320);
    }, 1400);
}

// ─── Live Validation (on blur / input) ───────────────────────

function handleEmailInput() {
    const value = dom.emailInput.value.trim();
    if (!value) {
        resetFieldState(dom.emailInput, dom.checkIcon, dom.emailError);
        return;
    }
    const validation = validateEmail(value);
    if (validation.ok) {
        setFieldValid(dom.emailInput, dom.checkIcon, dom.emailError);
    }
    // Only show error on blur, not while typing
}

function handleEmailBlur() {
    const value = dom.emailInput.value.trim();
    if (!value) {
        resetFieldState(dom.emailInput, dom.checkIcon, dom.emailError);
        return;
    }
    const validation = validateEmail(value);
    if (validation.ok) {
        setFieldValid(dom.emailInput, dom.checkIcon, dom.emailError);
    } else {
        setFieldInvalid(dom.emailInput, dom.checkIcon, dom.emailError, validation.key);
    }
}

// ─── Init ─────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM
    dom.langBtns     = document.querySelectorAll('.lang-btn');
    dom.form         = document.getElementById('emailForm');
    dom.emailInput   = document.getElementById('emailInput');
    dom.emailError   = document.getElementById('emailError');
    dom.checkIcon    = document.getElementById('checkIcon');
    dom.submitBtn    = document.getElementById('submitBtn');
    dom.successState = document.getElementById('successState');
    dom.particles    = document.getElementById('particles');

    // Language switcher
    dom.langBtns.forEach(btn => {
        btn.addEventListener('click', () => applyLanguage(btn.dataset.lang));
    });

    // Form handlers
    dom.form.addEventListener('submit', handleSubmit);
    dom.emailInput.addEventListener('input', handleEmailInput);
    dom.emailInput.addEventListener('blur', handleEmailBlur);

    // Spawn ambient particles
    spawnParticles(20);

    // Apply default language
    applyLanguage('es');
});
