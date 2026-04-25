const translations = {
    es: {
        badge: "Evento Privado",
        subtitle: "Registrá tu correo electrónico para obtener acceso exclusivo a una <strong>sesión de degustación premium</strong> para una sola persona.",
        placeholder_email: "tu@email.com",
        btn_submit: "Obtener Invitación",
        loading: "Procesando...",
        success_title: "¡Conectando...!",
        success_desc: "Serás redirigido a WhatsApp para confirmar tu degustación.",
        footer: "Todos los derechos reservados.",
        whatsapp_msg: "quiero participar de la degustacion y de posible premios!",
        whatsapp_email: "Email"
    },
    en: {
        badge: "Private Event",
        subtitle: "Register your email to get exclusive access to a <strong>premium tasting session</strong> for one person.",
        placeholder_email: "your@email.com",
        btn_submit: "Get Invitation",
        loading: "Processing...",
        success_title: "Connecting...!",
        success_desc: "You will be redirected to WhatsApp to confirm your tasting.",
        footer: "All rights reserved.",
        whatsapp_msg: "I want to participate in the tasting and possible prizes!",
        whatsapp_email: "Email"
    },
    pt: {
        badge: "Evento Privado",
        subtitle: "Cadastre seu e-mail para ter acesso exclusivo a uma <strong>sessão de degustação premium</strong> para uma pessoa.",
        placeholder_email: "seu@email.com",
        btn_submit: "Obter Convite",
        loading: "Processando...",
        success_title: "Conectando...!",
        success_desc: "Você será redirecionado ao WhatsApp para confirmar sua degustação.",
        footer: "Todos os direitos reservados.",
        whatsapp_msg: "quero participar da degustação e de possíveis prêmios!",
        whatsapp_email: "Email"
    }
};

let currentLang = 'es';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('emailForm');
    const successMessage = document.getElementById('successMessage');
    const langBtns = document.querySelectorAll('.lang-switcher button');
    
    // Language setup
    const updateLanguage = (lang) => {
        currentLang = lang;
        document.documentElement.lang = lang;
        
        // Update all data-i18n text
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });
        
        // Update placeholder
        document.getElementById('email').placeholder = translations[lang].placeholder_email;
        
        // Update button active state
        langBtns.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });
    };

    langBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            updateLanguage(e.target.getAttribute('data-lang'));
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = document.getElementById('email');
        const submitBtn = document.getElementById('submitBtn');
        
        submitBtn.disabled = true;
        
        submitBtn.innerHTML = `
            <svg class="spinner" viewBox="0 0 50 50" style="width:20px;height:20px;animation:spin 1s linear infinite;">
                <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-dasharray="80" stroke-dashoffset="40"></circle>
            </svg>
            <span data-i18n="loading">${translations[currentLang].loading}</span>
        `;
        
        if (!document.getElementById('spinner-style')) {
            const style = document.createElement('style');
            style.id = 'spinner-style';
            style.innerHTML = `@keyframes spin { 100% { transform: rotate(360deg); } }`;
            document.head.appendChild(style);
        }
        
        // Simulate network request
        setTimeout(() => {
            form.style.opacity = '0';
            
            setTimeout(() => {
                form.style.display = 'none';
                successMessage.classList.remove('hidden');
                
                // Redirect to WhatsApp
                const email = emailInput.value;
                const msgText = translations[currentLang].whatsapp_msg;
                const emailLabel = translations[currentLang].whatsapp_email;
                const encodedMessage = encodeURIComponent(`${msgText} (${emailLabel}: ${email})`);
                
                window.open(`https://wa.me/5492615715889?text=${encodedMessage}`, '_blank');
                
                console.log(`[Vinoteca Princess] Redirigiendo a WhatsApp. Email: ${email}`);
                
                emailInput.value = '';
            }, 300);
            
        }, 1500);
    });
});
