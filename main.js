let countdownInterval
const timerMax = 5
let timeLeft = timerMax
const display = document.getElementById('timer')

const tomato = document.getElementById('tomato')
const ballon = document.getElementById('ballon')

const startButton = document.getElementById('button-start')
const pauseButton = document.getElementById('button-pause')
const resetButton = document.getElementById('button-reset')


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
            changeTomatoFace('happy')
            changeBallon('ready')

            startButton.style.display = 'none'
            pauseButton.style.display = 'none'
            resetButton.style.display = 'block'
        } else {
            timeLeft--
            updateDisplay()
            changeTomatoFace('start')
            hideBallon()
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(countdownInterval)
    countdownInterval = null
    changeTomatoFace('serious')
    changeBallon('pause')
    startButton.style.display = 'block'
    pauseButton.style.display = 'none'
    resetButton.style.display = 'block'
    setTimeout(() => {
        hideBallon()
    }, 1000)
}

function resetTimer() {
    changeTomatoFace('surprised')
    changeBallon('reset')
    clearInterval(countdownInterval)
    countdownInterval = null
    timeLeft = timerMax
    updateDisplay()
    showStartButton()
    setTimeout(() => {
        changeTomatoFace('start')
        hideBallon()
    }, 1000)
}

function changeTomatoFace(newFace) {
    tomato.setAttribute("src", `./tomato-${newFace}.svg`)
}

function changeBallon(ballonType) {
    ballon.setAttribute("src", `./ballon-${ballonType}.svg`)
    showBallon()
}

function hideBallon(){
    ballon.classList.add('ballon-hide')
}

function showBallon() {
    ballon.classList.remove('ballon-hide')
}

function showStartButton() {
    startButton.style.display = 'block'
    pauseButton.style.display = 'none'
    resetButton.style.display = 'none'
}
