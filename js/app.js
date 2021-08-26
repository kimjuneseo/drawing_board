const canva = document.querySelector('#canva');
const ctx = canva.getContext("2d");
//흰색 판
// ctx.fillStyle = '#fff';
// ctx.fillRect(0, 0, 1600, 900);
// tag
const color = document.querySelector('#color');
const thicknes = document.querySelector('#thin');
const previewImgModal = document.querySelector('.modal');
const previewImg = document.querySelector('.previewImg')
const closeBtn = document.querySelector('.closeBtn');
const tool = document.querySelector('.tool');
const eraser = document.querySelector('#eraser');
const pen = document.querySelector('#pen');
const create = (tag) => document.createElement(tag);
const pos = {
    drawable: false,
    clearble: false,
};

// evt management
const commonListener = (event) => {
    switch (event.type) {
        case "mousedown":
            pos.drawable = true;
            // 지우개인지 체크
            if(!pos.clearble){
                clear(event);
            }else{
                // 그릴준비
                ctx.beginPath();
                ctx.moveTo(event.x, event.y);
            }
            break;
        case "mousemove":
            if (pos.drawable) {
                // clearble이 false면 clear실행 아니면 draw실행
                !pos.clearble ? clear(event) : draw(event); 
             }
            break;
        case "mouseup":
            pos.drawable = false;
            break;
    }
};

// draw
const draw = (event) => {
    ctx.lineTo(event.x, event.y);
    ctx.stroke();
    ctx.lineWidth = thicknes.value
    ctx.strokeStyle = color.value;
};

// clear
const clear = (event) => {
    const radius = 0.5; 
    ctx.clearRect(event.x - radius - 1, event.y - radius, radius * 2 + 2, radius * 2 + 2);
    // .clearRect(x , y -, );
}

// input evt
thicknes.addEventListener('click', commonListener);
color.addEventListener('click', commonListener);

// mouse evt
canva.addEventListener("mousedown", commonListener);
canva.addEventListener("mousemove", commonListener);
canva.addEventListener("mouseup", commonListener);
canva.addEventListener("mouseout", commonListener);

// preview evt
closeBtn.addEventListener("click", () => {
    previewImgModal.classList.add('none');
});

// pen
pen.addEventListener('click', () =>{
    pos.clearble = true;
});

// eraser
eraser.addEventListener("click", () => {
    pos.clearble = false;
});

// 우클릭 저장
canva.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    previewImgModal.classList.remove('none');
    const base64 = event.target.href = canva.toDataURL('image/jpeg', 1.0);
    previewImg.src = base64;
});


