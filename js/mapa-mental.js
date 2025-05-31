document.addEventListener('DOMContentLoaded', function () {
            const botaoComecar = document.getElementById('botaoComecar');
            const secoesMapas = document.querySelectorAll('.tipos-mapas');
            let intervalId = null;
            let loopAtivo = false;
            let currentIndexMapBySection = new Map();

            // Função para remover destaque de todos mapas
            function removerDestaques() {
                secoesMapas.forEach(secao => {
                    const mapas = secao.querySelectorAll('.mapa');
                    mapas.forEach(mapa => mapa.classList.remove('destacado'));
                });
            }

            secoesMapas.forEach(secao => {
                secao.style.display = 'none';
            });

            // Função para iniciar o loop de destaque automático
            function iniciarLoopDeMapas() {
                if(loopAtivo) return; // já ativo

                loopAtivo = true;
                secoesMapas.forEach((secao, secaoIdx) => {
                    // Mostra a seção
                    secao.classList.add('mostrar');
                    secao.style.display = 'block';

                    const mapas = secao.querySelectorAll('.mapa');
                    if (mapas.length === 0) return;

                    currentIndexMapBySection.set(secao, 0);

                    mapas[0].classList.add('destacado');
                });

                intervalId = setInterval(() => {
                    secoesMapas.forEach(secao => {
                        const mapas = secao.querySelectorAll('.mapa');
                        if (mapas.length === 0) return;

                        // Pausa loop se mouse hover em algum mapa
                        if(secao.querySelector('.mapa:hover')) {
                            return; 
                        }

                        let currentIndex = currentIndexMapBySection.get(secao) || 0;
                        mapas[currentIndex].classList.remove('destacado');
                        currentIndex = (currentIndex + 1) % mapas.length;
                        mapas[currentIndex].classList.add('destacado');
                        currentIndexMapBySection.set(secao, currentIndex);

                        // Centraliza o mapa destacado no container
                        const container = secao.querySelector('.mapa-container');
                        if(container) {
                            container.scrollTo({
                                left: mapas[currentIndex].offsetLeft - (container.offsetWidth - mapas[currentIndex].offsetWidth)/2,
                                behavior: 'smooth'
                            });
                        }
                    });
                }, 2000);
            }

            function pararLoopDeMapas() {
                if(intervalId !== null) {
                    clearInterval(intervalId);
                    intervalId = null;
                }
                loopAtivo = false;
                removerDestaques();
            }

            secoesMapas.forEach(secao => {
                const mapas = secao.querySelectorAll('.mapa');
                mapas.forEach(mapa => {
                    mapa.addEventListener('mouseenter', () => {
                        
                        if(loopAtivo) {
                            clearInterval(intervalId);
                            intervalId = null;
                        }
                        removerDestaques();
                        mapa.classList.add('destacado');

                        const container = secao.querySelector('.mapa-container');
                        if(container) {
                            container.scrollTo({
                                left: mapa.offsetLeft - (container.offsetWidth - mapa.offsetWidth)/2,
                                behavior: 'smooth'
                            });
                        }
                    });
                    mapa.addEventListener('mouseleave', () => {
                        if(loopAtivo && intervalId === null) {
                            
                            intervalId = setInterval(() => {
                                secoesMapas.forEach(secaoInner => {
                                    const mapasInner = secaoInner.querySelectorAll('.mapa');
                                    if(mapasInner.length === 0) return;

                                    if(secaoInner.querySelector('.mapa:hover')) {
                                        return;
                                    }

                                    let currentIndex = currentIndexMapBySection.get(secaoInner) || 0;
                                    mapasInner[currentIndex].classList.remove('destacado');
                                    currentIndex = (currentIndex + 1) % mapasInner.length;
                                    mapasInner[currentIndex].classList.add('destacado');
                                    currentIndexMapBySection.set(secaoInner, currentIndex);

                                    const container = secaoInner.querySelector('.mapa-container');
                                    if(container) {
                                        container.scrollTo({
                                            left: mapasInner[currentIndex].offsetLeft - (container.offsetWidth - mapasInner[currentIndex].offsetWidth)/2,
                                            behavior: 'smooth'
                                        });
                                    }
                                });
                            }, 2000);
                        } else {
                            
                            if(!loopAtivo) {
                                mapa.classList.remove('destacado');
                            }
                        }
                    });
                });
            });

            if(botaoComecar) {
                botaoComecar.addEventListener('click', (e) => {
                    e.preventDefault();
                    iniciarLoopDeMapas();
                    
                    botaoComecar.removeEventListener('click', arguments.callee);
                });
            }
        });