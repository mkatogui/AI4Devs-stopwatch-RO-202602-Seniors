// Timer and Countdown functionality
// Early web utility style, simple logic, clear UI

// Stopwatch variables
let stopwatchInterval = null;
let stopwatchStartTime = null;
let stopwatchElapsed = 0;
let stopwatchRunning = false;

// Countdown variables
let countdownInterval = null;
let countdownRemaining = 0;
let countdownRunning = false;

// DOM elements
const stopwatchDisplay = document.getElementById('stopwatch-display');
const stopwatchStartBtn = document.getElementById('stopwatch-start');
const stopwatchStopBtn = document.getElementById('stopwatch-stop');
const stopwatchResetBtn = document.getElementById('stopwatch-reset');

const countdownDisplay = document.getElementById('countdown-display');
const countdownStartBtn = document.getElementById('countdown-start');
const countdownStopBtn = document.getElementById('countdown-stop');
const countdownResetBtn = document.getElementById('countdown-reset');
const countdownHours = document.getElementById('countdown-hours');
const countdownMinutes = document.getElementById('countdown-minutes');
const countdownSeconds = document.getElementById('countdown-seconds');

// Stopwatch functions
function formatStopwatch(ms) {
	const totalSeconds = Math.floor(ms / 1000);
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;
	const centiseconds = Math.floor((ms % 1000) / 10);
	return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
}

function updateStopwatchDisplay() {
	stopwatchDisplay.textContent = formatStopwatch(stopwatchElapsed);
}

function startStopwatch() {
	if (stopwatchRunning) return;
	stopwatchRunning = true;
	stopwatchStartTime = Date.now() - stopwatchElapsed;
	stopwatchInterval = setInterval(() => {
		stopwatchElapsed = Date.now() - stopwatchStartTime;
		updateStopwatchDisplay();
	}, 10);
}

function stopStopwatch() {
	if (!stopwatchRunning) return;
	stopwatchRunning = false;
	clearInterval(stopwatchInterval);
}

function resetStopwatch() {
	stopStopwatch();
	stopwatchElapsed = 0;
	updateStopwatchDisplay();
}

stopwatchStartBtn.addEventListener('click', startStopwatch);
stopwatchStopBtn.addEventListener('click', stopStopwatch);
stopwatchResetBtn.addEventListener('click', resetStopwatch);

// Countdown functions
function formatCountdown(seconds) {
	const hrs = Math.floor(seconds / 3600);
	const mins = Math.floor((seconds % 3600) / 60);
	const secs = seconds % 60;
	return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateCountdownDisplay() {
	countdownDisplay.textContent = formatCountdown(countdownRemaining);
}

function startCountdown() {
	if (countdownRunning) return;
	// Get input values
	const hrs = parseInt(countdownHours.value) || 0;
	const mins = parseInt(countdownMinutes.value) || 0;
	const secs = parseInt(countdownSeconds.value) || 0;
	countdownRemaining = hrs * 3600 + mins * 60 + secs;
	if (countdownRemaining <= 0) return;
	countdownRunning = true;
	updateCountdownDisplay();
	countdownInterval = setInterval(() => {
		countdownRemaining--;
		updateCountdownDisplay();
		if (countdownRemaining <= 0) {
			stopCountdown();
			countdownDisplay.textContent = '00:00:00';
		}
	}, 1000);
}

function stopCountdown() {
	if (!countdownRunning) return;
	countdownRunning = false;
	clearInterval(countdownInterval);
}

function resetCountdown() {
	stopCountdown();
	countdownRemaining = 0;
	updateCountdownDisplay();
	countdownHours.value = '';
	countdownMinutes.value = '';
	countdownSeconds.value = '';
}

countdownStartBtn.addEventListener('click', startCountdown);
countdownStopBtn.addEventListener('click', stopCountdown);
countdownResetBtn.addEventListener('click', resetCountdown);

// Initialize displays
updateStopwatchDisplay();
updateCountdownDisplay();

