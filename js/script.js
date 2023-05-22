const play = document.querySelector('.play');
const rock = document.querySelector('.rock');
let count = 0;

const scoreDisplay = document.getElementById('score-display'); 

const jump = () => {
  play.classList.add('jump');

  setTimeout(() => {
    play.classList.remove('jump');
  }, 500);
};

const loop = setInterval(() => {
  const rockPosition = rock.offsetLeft;
  const playPosition = +window.getComputedStyle(play).bottom.replace('px', '');

  if (rockPosition <= 120 && rockPosition > 0 && playPosition < 100) {
    alert(`Game over! Seu score é: ${count}`);
    count = 0;
    rock.style.animation = 'none';
    rock.style.left = `${rockPosition}px`;
    play.style.animation = 'none';
    play.style.bottom = `${playPosition}px`;
    clearInterval(loop);
  }

  count++;
  scoreDisplay.textContent = `SCORE: ${count}`; 
}, 10);

document.addEventListener('keydown', jump);
