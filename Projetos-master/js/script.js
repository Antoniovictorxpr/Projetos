const play = document.querySelector('.player');
const rock = document.querySelector('.rock');
let count = 0;

const scoreDisplay = document.getElementById('score-display');
let isJumping = false; // Variável de controle

const jump = () => {
  play.classList.add('jump');
  playJump();
  isJumping = true; // Definir a variável de controle como true
  setTimeout(() => {
    play.classList.remove('jump');
    isJumping = false; // Definir a variável de controle como false após o término do salto
  }, 500);
};

const loop = setInterval(() => {
  const rockPosition = rock.offsetLeft;
  const playPosition = +window.getComputedStyle(play).bottom.replace('px', '');

  if (rockPosition <= 120 && rockPosition > 0 && playPosition < 100) {
    if (isJumping) {
      stopJump();
    }
    playDefeat();
    exibirGameOver();
    const div = document.querySelector('#gameOverScreen h2')
    div.textContent = `Score: ${count}`;
    count = 0;
    rock.style.animation = 'none';
    rock.style.left = `${rockPosition}px`;
    play.style.animation = 'none';
    play.style.bottom = `${playPosition}px`;

    play.src = '/Projetos-master/assets/images/player_death.png';

    clearInterval(loop);
  }

  count++;
  scoreDisplay.textContent = `SCORE: ${count}`;
}, 10);

document.addEventListener('keydown', jump);

function exibirGameOver() {
  var gameOverDiv = document.getElementById("gameOverScreen");
  gameOverDiv.style.display = "flex";
}

function reiniciarJogo() {
  var gameOverDiv = document.getElementById("gameOverScreen");
  gameOverDiv.style.display = "none";
  location.reload();
}

function playSound(elementId) {
  const sound = document.getElementById(elementId);
  sound.play();
}

function stopSound(elementId) {
  const sound = document.getElementById(elementId);
  sound.pause();
}

function playGame() {
  playSound('soundGame');
  const x = document.getElementById('soundGame');
  const volume = 0.8;
  x.volume = volume;
}

function stopGame() {
  stopSound('soundGame');
}

function playJump() {
  playSound('soundJump');
  const x = document.getElementById('soundJump');
  const volume = 0.7;
  x.volume = volume;
}

function stopJump() {
  stopSound('soundJump');
}

function playDefeat() {
  playSound('soundDefeat');
}

function stopDefeat() {
  stopSound('soundDefeat');
}

// Executar a função playGame() em loop até que a condição seja verdadeira
(function loopPlayGame() {
  playGame();
  if (!(rock.offsetLeft <= 120 && rock.offsetLeft > 0 && +window.getComputedStyle(play).bottom.replace('px', '') < 100)) {
    setTimeout(loopPlayGame, 10);
  } else {
    stopGame();
  }
})();