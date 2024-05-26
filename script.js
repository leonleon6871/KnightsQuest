const player = document.getElementById('player');
let isJumping = false;
let gravity = 0.9;
let position = 0;

function jump() {
    if (isJumping) return;
    isJumping = true;
    let count = 0;
    let upInterval = setInterval(() => {
        if (count === 15) {
            clearInterval(upInterval);
            let downInterval = setInterval(() => {
                if (count === 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                }
                position -= 5;
                count--;
                position = position * gravity;
                player.style.bottom = position + 'px';
            }, 20);
        }
        position += 30;
        count++;
        position = position * gravity;
        player.style.bottom = position + 'px';
    }, 20);
}

document.addEventListener('keydown', event => {
    if (event.code === 'Space' || event.key === ' ') {
        jump();
    }
});
