export const hamburgerHandler = () => {
    const hamburger = document.querySelector('.hamburger');
    hamburger.addEventListener('click', (e) => {
        hamburger.classList.toggle('hamburger-line--active');
        //Click on links handler
    });  
};
