import { initCursor } from "../core/cursor.js";
import { supabase } from "../config/supabase.js";

initCursor();

// Correção de Glitches Visuais (Scrollbar e Posicionamento)
gsap.set("body", { overflow: "hidden" }); // Trava a barra de rolagem durante a entrada
gsap.set("nav", { xPercent: -50 }); // Força o GSAP a respeitar a centralização do Tailwind

// Animação de Entrada (Suaviza a chegada)
gsap.to("body", { opacity: 1, visibility: "visible", duration: 1.2, ease: "power2.inOut", onComplete: () => gsap.set("body", { overflow: "auto" }) });
gsap.from(".login-container", { y: 20, opacity: 0, duration: 1, delay: 0.3, ease: "power3.out" });
gsap.from("nav", { y: -20, opacity: 0, duration: 1, delay: 0.3, ease: "power3.out" });

const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const submitBtn = document.getElementById('submitBtn');
const backBtn = document.querySelector('[data-back]');

// Botão Voltar
if (backBtn) backBtn.addEventListener('click', () => window.location.href = './index.html');

// Verificar se já está logado
const { data: { session } } = await supabase.auth.getSession();
if (session) {
    window.location.href = './dashboard.html';
}

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Elementos do botão
    const btnText = submitBtn.querySelector('span');
    const btnFill = submitBtn.querySelector('div'); // O background animado

    // 1. Estado de Loading Criativo
    submitBtn.disabled = true;
    
    // Anima o preenchimento (Clay) para cobrir o botão
    gsap.to(btnFill, { y: "0%", duration: 0.6, ease: "power3.inOut" });
    
    // Anima o texto e inicia o "pulso"
    gsap.to(btnText, { opacity: 0, duration: 0.2, onComplete: () => {
        btnText.innerText = "Autenticando...";
        gsap.to(btnText, { opacity: 1, duration: 0.2 });
    }});

    // Efeito de respiração (Breathing) no botão
    gsap.to(submitBtn, { scale: 0.98, yoyo: true, repeat: -1, duration: 0.8, ease: "sine.inOut" });

    const email = emailInput.value;
    const password = passwordInput.value;

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) throw error;

        // 2. Sucesso: Feedback Visual e Saída
        gsap.killTweensOf(submitBtn); // Para o pulso
        btnText.innerText = "Autenticado";
        
        // Animação de saída da página (Lift off)
        gsap.to(submitBtn, { scale: 1.05, duration: 0.3, ease: "back.out" });
        gsap.to(".login-container, nav", { 
            y: -50, 
            opacity: 0, 
            duration: 0.8, 
            ease: "power3.in",
            onComplete: () => window.location.href = './dashboard.html'
        });

    } catch (error) {
        alert('Erro ao entrar: ' + error.message); // Idealmente, use um toast/notificação customizada
        
        // Resetar botão com feedback de erro (Shake)
        gsap.killTweensOf(submitBtn);
        gsap.to(submitBtn, { x: [-5, 5, -5, 5, 0], duration: 0.4, scale: 1 });
        gsap.to(btnFill, { y: "100%", duration: 0.4 }); // Remove o preenchimento
        btnText.innerText = "Entrar";
        submitBtn.disabled = false;
    }
});