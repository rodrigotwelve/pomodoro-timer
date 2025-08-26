// Pomodoro Timer basic structure
const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const sessionType = document.getElementById('session-type');

// State variables
let defaultTime = 25 * 60; // 25 minutes in seconds
let totalSeconds = defaultTime;
let timerInterval = null;

// Update timer display in MM:SS format
function updateTimerDisplay(seconds) {
	const mins = Math.floor(seconds / 60);
	const secs = seconds % 60;
	const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
	timerDisplay.textContent = formatted;
}

// Start timer
function startTimer() {
	if (timerInterval) return; // Prevent multiple intervals
	timerInterval = setInterval(() => {
		if (totalSeconds > 0) {
			totalSeconds--;
			updateTimerDisplay(totalSeconds);
		} else {
			clearInterval(timerInterval);
			timerInterval = null;
		}
	}, 1000);
}

// Initial display
updateTimerDisplay(totalSeconds);
