// Pomodoro Timer basic structure
const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const sessionType = document.getElementById('session-type');

// State variables
let SESSION_TYPES = {
	FOCUS: 'Focus',
	SHORT_BREAK: 'Short Break',
	LONG_BREAK: 'Long Break'
};
let sessionDurations = {
	[SESSION_TYPES.FOCUS]: 25 * 60,
	[SESSION_TYPES.SHORT_BREAK]: 5 * 60,
	[SESSION_TYPES.LONG_BREAK]: 15 * 60
};
let currentSession = SESSION_TYPES.FOCUS;
let completedFocusSessions = 0;
let totalSeconds = sessionDurations[currentSession];
let timerInterval = null;
let audio = new window.Audio('audio/notification.mp3'); // Place a notification.mp3 in audio/

// Update timer display in MM:SS format
function updateTimerDisplay(seconds) {
	const mins = Math.floor(seconds / 60);
	const secs = seconds % 60;
	const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
	timerDisplay.textContent = formatted;
}

// Update session UI
function updateSessionUI() {
	sessionType.textContent = currentSession;
	document.body.classList.remove('focus-mode', 'break-mode');
	if (currentSession === SESSION_TYPES.FOCUS) {
		document.body.classList.add('focus-mode');
	} else {
		document.body.classList.add('break-mode');
	}
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
			handleSessionEnd();
		}
	}, 1000);
}

// Handle session end and transition
function handleSessionEnd() {
	// Play notification sound
	audio.currentTime = 0;
	audio.play();

	if (currentSession === SESSION_TYPES.FOCUS) {
		completedFocusSessions++;
		if (completedFocusSessions % 4 === 0) {
			currentSession = SESSION_TYPES.LONG_BREAK;
		} else {
			currentSession = SESSION_TYPES.SHORT_BREAK;
		}
	} else {
		currentSession = SESSION_TYPES.FOCUS;
	}
	totalSeconds = sessionDurations[currentSession];
	updateSessionUI();
	updateTimerDisplay(totalSeconds);
}

// Initial display
updateSessionUI();
updateTimerDisplay(totalSeconds);

// Event listeners
startBtn.addEventListener('click', () => {
	startTimer();
});

pauseBtn.addEventListener('click', () => {
	if (timerInterval) {
		clearInterval(timerInterval);
		timerInterval = null;
	}
});

resetBtn.addEventListener('click', () => {
	if (timerInterval) {
		clearInterval(timerInterval);
		timerInterval = null;
	}
	// Reset to current session's default time
	totalSeconds = sessionDurations[currentSession];
	updateTimerDisplay(totalSeconds);
});
