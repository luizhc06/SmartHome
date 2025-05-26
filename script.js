// Menu Mobile
const mobileMenu = document.querySelector('.mobile-menu');
const navList = document.querySelector('.nav-list');
const navLinks = document.querySelectorAll('.nav-list li a');

function toggleMenu() {
    navList.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    
    // Fechar dropdowns abertos quando o menu mobile é ativado
    document.querySelectorAll('.drop-hover .dropp').forEach(drop => {
        drop.style.display = 'none';
    });
}

mobileMenu.addEventListener('click', toggleMenu);

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            toggleMenu();
        }
    });
});

// Dropdown Menu
const dropHovers = document.querySelectorAll('.drop-hover');

dropHovers.forEach(drop => {
    if (window.innerWidth <= 768) {
        const link = drop.querySelector('a');
        const dropdown = drop.querySelector('.dropp');
        
        link.addEventListener('click', (e) => {
            e.preventDefault();
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        });
    }
});

// Carrossel
const carrosselContainer = document.querySelector('.carrossel-container');
const carrosselItems = document.querySelectorAll('.carrossel-item');
const prevBtn = document.querySelector('.carrossel-prev');
const nextBtn = document.querySelector('.carrossel-next');
let currentIndex = 0;
let intervalId;

// Função para atualizar a posição do carrossel
function updateCarrossel() {
    // Remove a classe active de todos os itens
    carrosselItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Adiciona a classe active ao item atual
    carrosselItems[currentIndex].classList.add('active');
    
    // Move o container para mostrar o item atual
    carrosselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Função para avançar para o próximo slide
function nextSlide() {
    currentIndex = (currentIndex < carrosselItems.length - 1) ? currentIndex + 1 : 0;
    updateCarrossel();
}

// Função para voltar ao slide anterior
function prevSlide() {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : carrosselItems.length - 1;
    updateCarrossel();
}

// Event listeners para os botões de navegação
prevBtn.addEventListener('click', () => {
    prevSlide();
    resetInterval();
});

nextBtn.addEventListener('click', () => {
    nextSlide();
    resetInterval();
});

// Navegação por teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
        resetInterval();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
        resetInterval();
    }
});

// Auto-play
function startInterval() {
    intervalId = setInterval(() => {
        nextSlide();
    }, 5000);
}

function resetInterval() {
    clearInterval(intervalId);
    startInterval();
}

// Inicia o carrossel
function initCarrossel() {
    updateCarrossel();
    startInterval();
    
    // Pausa o auto-play quando o mouse está sobre o carrossel
    carrosselContainer.addEventListener('mouseenter', () => {
        clearInterval(intervalId);
    });

    carrosselContainer.addEventListener('mouseleave', () => {
        startInterval();
    });
}

// Inicializa o carrossel quando a página carrega
window.addEventListener('load', initCarrossel);

// Atualiza o carrossel quando a janela é redimensionada
window.addEventListener('resize', () => {
    updateCarrossel();
});