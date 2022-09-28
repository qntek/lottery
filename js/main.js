const footerYear = document.getElementById('year');
const pickBallBox = document.getElementById('ballBox');
let userNumbers = [];
const drawnNumbers = [];
const clearUserNumbersBtn = document.querySelector('.ti-x'); //btn to clear user and drawn numbers
const playBtn = document.querySelector('.ti-player-play'); //btn to start the game
const insertBox = document.querySelector('.input__box');
const menuBtn = document.querySelector('.menu');
const singleDrawOption = document.getElementById('opt_1');
const drawToWinOption = document.getElementById('opt_2');

footerYear.textContent = new Date().getFullYear();
pickBallBox.addEventListener('click', (e) => {
	handlePickedBall(e);
});
clearUserNumbersBtn.addEventListener('click', () => {
	clearInputBox();
	userNumbers = [];
	controlColorOfBtns();
});
menuBtn.addEventListener('click', toggleMenuNav);
singleDrawOption.addEventListener('click', singleDrawOptionHandler);
drawToWinOption.addEventListener('click', drawToWinHandler);

function handlePickedBall(e) {
	let value = +e.target.textContent;
	if (value > 0 && value < 50) {
	} else return;
	pushBallToUserNumbers(value);
	insertIntoUserNumbersBox(insertBox, userNumbers);
}

function pushBallToUserNumbers(value) {
	if (userNumbers.length < 6 && !userNumbers.includes(value)) {
		userNumbers.push(value);
		controlColorOfBtns();
		sortArray(userNumbers);
	}
}

function insertIntoUserNumbersBox(obj, array) {
	clearInputBox();
	for (const number of array) {
		const ball = document.createElement('div');
		ball.classList.add('ball');
		ball.classList.add('ball_js');
		if (array.indexOf(number) === array.length - 1) {
			ball.classList.add('ball_js_animation');
		}
		ball.textContent = number;
		obj.appendChild(ball);
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

function clearInputBox() {
	const inputBox = insertBox.querySelectorAll('.ball');
	for (const number of inputBox) number.remove();
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
