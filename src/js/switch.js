export const switchMode = () => {

const switchButton 			= document.querySelector('.switch-button');
const switchBtnRight 			= document.querySelector('.switch-button-case.right');
const switchBtnLeft 			= document.querySelector('.switch-button-case.left');
const activeSwitch 			= document.querySelector('.active');

function switchLeft(cb){
    if(!switchBtnLeft.classList.contains('active-case')) {
        switchBtnRight.classList.remove('active-case');
        switchBtnLeft.classList.add('active-case');
        activeSwitch.style.left 						= '0%';
        //callback that activates train mode
        //cb();
        console.log('Switch left!.....');
    }
	switchBtnRight.classList.remove('active-case');
	switchBtnLeft.classList.add('active-case');
    activeSwitch.style.left 						= '0%';
    //callback that activates play mode
    //cb();
}

function switchRight(cb){
    if(!switchBtnRight.classList.contains('active-case')) {
        switchBtnRight.classList.add('active-case');
        switchBtnLeft.classList.remove('active-case');
        activeSwitch.style.left 						= '50%';
        //callback that activates train mode
        //cb();
        console.log('Switch right!.....');
    }
	
}

switchBtnLeft.addEventListener('click', switchLeft);

switchBtnRight.addEventListener('click', switchRight);

};