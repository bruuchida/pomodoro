let countdownInterval
const timerMax = 5
let timeLeft = timerMax

const elements = {
    display: document.getElementById('timer'),
    tomato: document.getElementById('tomato'),
    ballon: document.getElementById('ballon'),
    startBtn: document.getElementById('button-start'),
    pauseBtn: document.getElementById('button-pause'),
    resetBtn: document.getElementById('button-reset')
};

const audio = new Audio('./beep-alarm.mp3')
audio.volume = 0.8
audio.loop = true

updateButtonStates('start')

function updateButtonStates(state) {

     const buttonStates = {
        start: [true, false, false],
        running: [false, true, true],
        paused:  [true, false, true],
        ready: [false, false, true]
    }

    const [start, pause, reset] = buttonStates[state]
    elements.startBtn.style.display = start ? 'block' : 'none'
    elements.pauseBtn.style.display = pause ? 'block' : 'none'
    elements.resetBtn.style.display = reset ? 'block' : 'none'

    updateDisplay()
}

function updateTomatoState(face, ballon, jumping = false, waiting = false) {
    elements.tomato.src = `./icons/tomato-${face}.svg`
    elements.tomato.classList.toggle('jump', jumping)
    elements.tomato.classList.toggle('waiting', waiting)

    if (ballon) {
        elements.ballon.src = `./icons/ballon-${ballon}.svg`
        elements.ballon.classList.remove('ballon-hide')
    } else {
        elements.ballon.classList.add('ballon-hide')
    }
}


function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60)
    const seconds = Math.floor(timeLeft % 60)
    elements.display.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

function startTimer() {
    if (countdownInterval) {
        return
    }

    updateDisplay()

    updateTomatoState('surprised', 'start')
    updateButtonStates('running')

    countdownInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(countdownInterval)
            countdownInterval = null
            elements.display.textContent = "00:00"

            updateTomatoState('ready', 'ready', true, false)
            updateButtonStates('ready')

            audio.play()
        } else {
            timeLeft--
            updateDisplay()
            updateTomatoState('start', null, false, true)
        }
    }, 1000);
}

function pauseTimer() {
    stopInterval()

    updateTomatoState('pause', 'pause', false, false)
    updateButtonStates('paused')

    setTimeout(() => elements.ballon.classList.add('ballon-hide'), 1000)
}

function resetTimer() {
    stopInterval()
    timeLeft = timerMax
    audio.pause()

    updateTomatoState('surprised', 'reset', false, false)    

    updateDisplay()

    updateButtonStates('start')
    setTimeout(() => updateTomatoState('start', null), 1000)
}

function stopInterval() {
    clearInterval(countdownInterval);
    countdownInterval = null;
}
