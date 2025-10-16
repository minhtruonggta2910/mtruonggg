window.addEventListener('load', () => {
    const messages = [
        "20/10 là ngày tôn vinh một nửa thế giới 🌸",
        "Chúc các bạn nữ ngày 20/10 tràn ngập yêu thương, niềm vui và hạnh phúc 💖",
        "Mong rằng mỗi ngày của các bạn đều là một ngày 20/10 — được quan tâm, được yêu thương và luôn mỉm cười thật tươi 💕",
        "Hãy luôn tự tin vào chính mình, vì mỗi bạn đều là một bông hoa độc nhất vô nhị, không ai có thể thay thế 🌷",
        "Cảm ơn thế giới cho chúng ta gặp nhau và mong rằng chúng ta vẫn sẽ bên nhau lâu dài, cùng nhau trưởng thành và lưu giữ những ký ức đẹp nhất của tuổi trẻ 🌼",
        "Dù có bận rộn thế nào, cũng nhớ là mình luôn xinh đẹp, bản lĩnh và đáng yêu nhất hội nha! Mãi yêu những con quỷ cái này! 💪💋"
    ];

    const msgEl = document.getElementById('message');
    let i = 0;
    msgEl.style.opacity = 1;
    setInterval(() => {
        msgEl.style.opacity = 0;
        setTimeout(() => {
            i = (i + 1) % messages.length;
            msgEl.textContent = messages[i];
            msgEl.style.opacity = 1;
        }, 800);
    }, 4800);

    const falling = [];
    for (let k = 1; k <= 12; k++) falling.push(`style/img/Anh (${k}).png`);

    const activePositions = [];
    function createFallingImage() {
        let left;
        const safe = 8;
        const minDistance = 10;
        let tries = 0;
        do {
            left = safe + Math.random() * (100 - 2 * safe);
            tries++;
        } while (activePositions.some(x => Math.abs(x - left) < minDistance) && tries < 20);

        const el = document.createElement('img');
        el.className = 'falling-img';
        el.src = falling[Math.floor(Math.random() * falling.length)];
        el.style.left = left + 'vw';

        let min = 80, max = 120;
        if (window.innerWidth <= 480) { min = 40; max = 70; }
        else if (window.innerWidth <= 768) { min = 60; max = 90; }
        el.style.width = (min + Math.random() * (max - min)) + 'px';
        el.style.animationDuration = (8 + Math.random() * 4) + 's';
        el.style.transform = `rotate(${Math.random() * 360}deg)`;

        document.body.appendChild(el);
        activePositions.push(left);

        setTimeout(() => {
            el.remove();
            const idx = activePositions.indexOf(left);
            if (idx !== -1) activePositions.splice(idx, 1);
        }, 14000);
    }

    setInterval(createFallingImage, 1100);

    const bgm = document.getElementById('bgm');
    const toggle = document.getElementById('soundToggle');
    let playing = false;

    toggle.addEventListener('click', async () => {
        try {
            if (!playing) {
                bgm.currentTime = 68;
                await bgm.play();
                toggle.textContent = "🔈";
                playing = true;
            } else {
                bgm.pause();
                toggle.textContent = "🔇";
                playing = false;
            }
        } catch (err) {
            console.log("Không thể phát", err);
        }
    });
});
