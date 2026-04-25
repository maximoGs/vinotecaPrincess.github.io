document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('emailForm');
    const successMessage = document.getElementById('successMessage');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = document.getElementById('email');
        const submitBtn = document.getElementById('submitBtn');
        
        // Button loading state transition
        submitBtn.disabled = true;
        
        // Store original content to be able to reset if needed
        const originalBtnHTML = submitBtn.innerHTML;
        
        submitBtn.innerHTML = `
            <svg class="spinner" viewBox="0 0 50 50" style="width:20px;height:20px;animation:spin 1s linear infinite;">
                <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-dasharray="80" stroke-dashoffset="40"></circle>
            </svg>
            <span>Procesando...</span>
        `;
        
        // Inject spinner animation if it doesn't exist
        if (!document.getElementById('spinner-style')) {
            const style = document.createElement('style');
            style.id = 'spinner-style';
            style.innerHTML = `@keyframes spin { 100% { transform: rotate(360deg); } }`;
            document.head.appendChild(style);
        }
        
        // Simulate network request (In reality, replace this with Fetch API to your backend or Formspree)
        setTimeout(() => {
            // Fade out the form
            form.style.opacity = '0';
            
            setTimeout(() => {
                // Hide form entirely and show success message
                form.style.display = 'none';
                successMessage.classList.remove('hidden');
                
                // Logging for verification
                console.log(`[Vinoteca Princess] Email registrado exitosamente: ${emailInput.value}`);
                
                // Clean up input value
                emailInput.value = '';
                
            }, 300); // Matches the CSS transition time
            
        }, 1500); // 1.5 second loading simulation
    });
});
