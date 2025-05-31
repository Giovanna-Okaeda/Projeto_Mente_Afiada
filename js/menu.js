
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-btn');
    const navbar = document.querySelector('.navbar'); 

    if (menuBtn && navbar) {
        menuBtn.onclick = () => {
            navbar.classList.toggle('active');
            menuBtn.classList.toggle('fa-times'); 
        };

        navbar.querySelectorAll('a').forEach(link => {
            link.onclick = () => {
                
                if (window.innerWidth <= 768) { 
                    navbar.classList.remove('active');
                    menuBtn.classList.remove('fa-times');
                }
            };
        });

        window.onresize = () => {
            if (window.innerWidth > 768) { 
                navbar.classList.remove('active');
                menuBtn.classList.remove('fa-times');
            }
        };

        window.onscroll = () => {
            if (navbar.classList.contains('active') && window.innerWidth <= 768) {
                 navbar.classList.remove('active');
                 menuBtn.classList.remove('fa-times');
            }
        };

    } else {
        console.error("Erro: Elementos 'menu-btn' ou 'navbar' não encontrados no DOM. Verifique seu HTML.");
    }
});