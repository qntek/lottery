const footerYear = document.getElementById('year');
const pickBallBox = document.getElementById('ballBox');
let userNumbers = [];
let drawnNumbers = [];
const clearUserNumbersBtn = document.querySelector('.ti-x'); //btn to clear user and drawn numbers
const playBtn = document.querySelector('.ti-player-play'); //btn to start the game
const insertBox = document.querySelector('.input__box');
const outputBox = document.querySelector('.output__box');
const menuBtn = document.querySelector('.menu');
const singleDrawOption = document.getElementById('opt_1');
const drawToWinOption = document.getElementById('opt_2');

footerYear.textContent = new Date().getFullYear();
pickBallBox.addEventListener('click', (e) => {
	handlePickedBall(e);
});
clearUserNumbersBtn.addEventListener('click', () => {
	clearDomBox(insertBox);
	clearDomBox(outputBox);
	userNumbers = [];
	drawnNumbers = [];
	controlColorOfBtns();
});
menuBtn.addEventListener('click', toggleMenuNav);
singleDrawOption.addEventListener('click', singleDrawOptionHandler);
drawToWinOption.addEventListener('click', drawToWinHandler);
playBtn.addEventListener('click', playBtnHandler);

function handlePickedBall(e) {
	let value = +e.target.textContent;
	if (value > 0 && value < 50) {
	} else return;
	pushBallToUserNumbers(value);
	insertIntoUserNumbersBox(insertBox, userNumbers, false);
}

function pushBallToUserNumbers(value) {
	if (userNumbers.length < 6 && !userNumbers.includes(value)) {
		userNumbers.push(value);
		controlColorOfBtns();
		sortArray(userNumbers);
	}
}

async function insertIntoUserNumbersBox(obj, array, flag, ms = 0) {
	clearDomBox(obj);
	const putWithDelay = ms => {
		return new Promise(resolve => setTimeout(resolve, ms))
	}

	for (const number of array) {
		const ball = document.createElement('div');
		ball.classList.add('ball');
		ball.classList.add('ball_js');
		if ((array.indexOf(number) === array.length - 1) || flag) {
			ball.classList.add('ball_js_animation');
		}
		ball.textContent = number;
		await putWithDelay(ms).then(obj.append(ball));
	}
	
}

function controlColorOfBtns() {
	if (userNumbers.length > 0) {
		clearUserNumbersBtn.classList.add('btn_active');
	} else clearUserNumbersBtn.classList.remove('btn_active');
	if (userNumbers.length === 6) {
		playBtn.classList.add('btn_active');
	} else playBtn.classList.remove('btn_active');
}

function sortArray(array) {
	array.sort((a, b) => {
		if (a > b) {
			return 1;
		} else if (a < b) {
			return -1;
		} else if (a == b) {
			return 0;
		}
	});
}

function clearDomBox(obj) {
	const box = obj.querySelectorAll('.ball');
	for (const number of box) number.remove();
}

function toggleMenuNav() {
	const navMenu = document.querySelector('.nav__box');
	if (navMenu.classList.contains('nav__active')) {
		navMenu.classList.remove('nav__active');
	} else {
		navMenu.classList.add('nav__active');
	}
}

function singleDrawOptionHandler() {
	if (
		singleDrawOption.nextElementSibling.firstElementChild.classList.contains(
			'visible'
		)
	) {
		return;
	} else {
		drawToWinOption.nextElementSibling.firstElementChild.classList.remove(
			'visible'
		);
		singleDrawOption.nextElementSibling.firstElementChild.classList.add(
			'visible'
		);
	}
}
function drawToWinHandler() {
	if (
		drawToWinOption.nextElementSibling.firstElementChild.classList.contains(
			'visible'
		)
	) {
		return;
	} else {
		singleDrawOption.nextElementSibling.firstElementChild.classList.remove(
			'visible'
		);
		drawToWinOption.nextElementSibling.firstElementChild.classList.add(
			'visible'
		);
	}
}

function playBtnHandler() {
	const playOnce =
		singleDrawOption.nextElementSibling.firstElementChild.classList.contains(
			'visible'
		);
	if (userNumbers.length < 6) return;
	if (playOnce) {
		drawnNumbers = [];
		clearDomBox(outputBox);
		letsDrawNumbers();
		insertIntoUserNumbersBox(outputBox, drawnNumbers, true, 500);
	}
}

function letsDrawNumbers() {
	while (drawnNumbers.length < 6) {
		let tempNumber = Math.floor(Math.random() * 49 + 1);
		if (!drawnNumbers.includes(tempNumber)) drawnNumbers.push(tempNumber);
	}
	sortArray(drawnNumbers);
}
