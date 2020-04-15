export const hamburgerHandler = () => {
    const hamburger = document.querySelector('.hamburger');
    hamburger.addEventListener('click', (e) => {
        toogleHandler(hamburger);
        e.stopPropagation();
        document.addEventListener('click', e => {
            if(hamburger.classList.contains('hamburger-line--active') && !e.target.classList.contains('nav') && !e.target.classList.contains('nav__item'))
            toogleHandler(hamburger);
        });
    });  
};

const toogleHandler = (hamburger) => {
    hamburger.classList.toggle('hamburger-line--active');
        document.querySelector('.nav').classList.toggle('nav--active');
};
