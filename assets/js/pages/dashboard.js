import { initCursor } from "../core/cursor.js";
import { supabase } from "../config/supabase.js";

// 1. Proteção de Rota (Security Check)
const { data: { session } } = await supabase.auth.getSession();

if (!session) {
    // Se não houver sessão, chuta para o login
    window.location.href = './login.html';
}

initCursor();

// Animações de Entrada (Consistência com Index)
const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.8 } });

tl.to("header", {
    y: 0,
    opacity: 1,
    duration: 1
})
.to(".stat-card", {
    y: 0,
    opacity: 1,
    stagger: 0.1
}, "-=0.5")
.to(".chart-container, .ai-action-card, .locked-widget", {
    y: 0,
    opacity: 1,
    stagger: 0.1
}, "-=0.5");

// Configuração do Gráfico Principal
const ctx = document.getElementById('mainChart').getContext('2d');
new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        datasets: [{
            label: 'Ansiedade',
            data: [30, 45, 42, 50, 48, 40],
            borderColor: '#1A3C34',
            backgroundColor: 'transparent',
            tension: 0.4,
            borderWidth: 4,
            pointRadius: 0
        }, {
            label: 'Burnout',
            data: [15, 18, 25, 30, 28, 26],
            borderColor: '#D9836B',
            backgroundColor: 'transparent',
            tension: 0.4,
            borderWidth: 4,
            pointRadius: 0
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: false }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { display: false },
                ticks: { font: { size: 10, weight: '600' } }
            },
            x: {
                grid: { display: false },
                ticks: { font: { size: 10, weight: '600' } }
            }
        }
    }
});

// Lógica de Logout
const logoutBtn = document.getElementById('logoutBtn');
if(logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
        // 1. Feedback no Botão
        logoutBtn.disabled = true;
        logoutBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Encerrando...';
        logoutBtn.style.borderColor = "transparent";
        
        // Criar mensagem "Até breve"
        const goodbyeMsg = document.createElement('div');
        goodbyeMsg.innerHTML = '<h2 class="text-4xl font-light tracking-tight text-white">Até breve.</h2>';
        goodbyeMsg.className = 'fixed inset-0 flex items-center justify-center z-[9999] pointer-events-none opacity-0';
        document.body.appendChild(goodbyeMsg);

        // 2. Sequência de Saída (Implosão Suave)
        const tl = gsap.timeline();

        // Conteúdo principal desce e desaparece
        tl.to("main", { y: 30, opacity: 0, duration: 0.6, ease: "power2.in" })
          // Sidebar desliza para a esquerda
          .to(".sidebar", { x: -50, opacity: 0, duration: 0.6 }, "<")
          // Fundo transiciona para a cor Forest (identidade visual)
          .to("body", { backgroundColor: "#1A3C34", duration: 0.8 }, "-=0.4")
          // Mensagem aparece suavemente
          .to(goodbyeMsg, { opacity: 1, duration: 1, y: -10, ease: "power2.out" }, "-=0.2")
          // Transição final para a cor do Login (#FBFBFD) antes de redirecionar
          .to("body", { backgroundColor: "#FBFBFD", duration: 1, delay: 1 })
          .to(goodbyeMsg, { opacity: 0, duration: 0.5 }, "<");

        // 3. Processamento e Redirecionamento
        await supabase.auth.signOut();
        
        // O tempo agora é controlado pela timeline do GSAP
        setTimeout(() => {
            window.location.href = './login.html';
        }, tl.duration() * 1000);
    });
}