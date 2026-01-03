let countdownInterval
const timerMax = 5
let timeLeft = timerMax
const display = document.getElementById('timer')

const tomato = document.getElementById('tomato')
const ballon = document.getElementById('ballon')

const startButton = document.getElementById('button-start')
const pauseButton = document.getElementById('button-pause')
const resetButton = document.getElementById('button-reset')

const audio = new Audio('./beep-alarm.mp3');

updateDisplay()

showStartButton()

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60)
    const seconds = Math.floor(timeLeft % 60)
    display.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

function startTimer() {
    if (countdownInterval) {
        return
    }

    updateDisplay()

    changeTomatoFace('surprised')
    changeBallon('start')

    startButton.style.display = 'none'
    pauseButton.style.display = 'block'
    resetButton.style.display = 'block'

    countdownInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(countdownInterval)
            countdownInterval = null
            display.textContent = "00:00"

            tomatoReady()
        } else {
            timeLeft--
            updateDisplay()

            changeTomatoFace('start')
            ballonIsVisible(false)
            tomatoIsWaiting(true)
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(countdownInterval)
    countdownInterval = null

    changeTomatoFace('serious')
    changeBallon('pause')
    tomatoIsWaiting(false)

    startButton.style.display = 'block'
    pauseButton.style.display = 'none'
    resetButton.style.display = 'block'

    setTimeout(() => {
        ballonIsVisible(false)
    }, 1000)
}

function resetTimer() {
    audio.pause()

    changeTomatoFace('surprised')
    changeBallon('reset')
    tomatoIsJumping(false)
    tomatoIsWaiting(false)

    clearInterval(countdownInterval)
    countdownInterval = null
    timeLeft = timerMax

    updateDisplay()

    showStartButton()
    setTimeout(() => {
        changeTomatoFace('start')
        ballonIsVisible(false)
    }, 1000)
}

function changeTomatoFace(newFace) {
    tomato.setAttribute("src", `./icons/tomato-${newFace}.svg`)
}

function changeBallon(ballonType) {
    ballon.setAttribute("src", `./icons/ballon-${ballonType}.svg`)
    ballonIsVisible(true)
}

function ballonIsVisible(status){
    if (status) {
        ballon.classList.remove('ballon-hide')
        return
    }
    ballon.classList.add('ballon-hide')
}

function showStartButton() {
    startButton.style.display = 'block'
    pauseButton.style.display = 'none'
    resetButton.style.display = 'none'
}

function tomatoIsJumping(status) {
    if (status) {
        tomato.classList.add('jump')
        return
    }

    tomato.classList.remove('jump')    
}

function tomatoIsWaiting(status) {
    if (status) {
        tomato.classList.add('waiting')
        return
    }

    tomato.classList.remove('waiting')    
}

function tomatoReady() {
    tomatoIsWaiting(false)
    changeTomatoFace('happy')
    changeBallon('ready')
    tomatoIsJumping(true)

    startButton.style.display = 'none'
    pauseButton.style.display = 'none'
    resetButton.style.display = 'block'

    audio.volume = 0.5
    audio.loop = true
    audio.play()
}
