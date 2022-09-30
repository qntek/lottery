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
const infoWindowCloseBtn = document.getElementById('info_window');
const infoWindow = document.querySelector('.info__box');
const results = {
	0: 0,
	1: 0,
	2: 0,
	3: 0,
	4: 0,
	5: 0,
	6: 0,
	counter: 0,
	time: 0,
};

footerYear.textContent = new Date().getFullYear();
pickBallBox.addEventListener('click', (e) => {
	handlePickedBall(e);
});
clearUserNumbersBtn.addEventListener('click', clearBtnHandler);
menuBtn.addEventListener('click', toggleMenuNav);
singleDrawOption.addEventListener('click', singleDrawOptionHandler);
drawToWinOption.addEventListener('click', drawToWinHandler);
playBtn.addEventListener('click', playBtnHandler);
infoWindowCloseBtn.addEventListener('click', () => {
	infoWindow.classList.remove('info__box_visible');
});
function clearBtnHandler() {
	clearDomBox(insertBox);
	clearDomBox(outputBox);
	userNumbers = [];
	drawnNumbers = [];
	controlColorOfBtns();
}

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
	const putWithDelay = (ms) => {
		return new Promise((resolve) => setTimeout(resolve, ms));
	};

	for (const number of array) {
		const ball = document.createElement('div');
		ball.classList.add('ball');
		ball.classList.add('ball_js');
		if (flag || array.indexOf(number) === array.length - 1) {
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

async function playBtnHandler() {
	const playOnce =
		singleDrawOption.nextElementSibling.firstElementChild.classList.contains(
			'visible'
		);
	const drawToWin =
		drawToWinOption.nextElementSibling.firstElementChild.classList.contains(
			'visible'
		);
	if (userNumbers.length < 6) return;
	playBtn.removeEventListener('click', playBtnHandler);
	clearUserNumbersBtn.removeEventListener('click', clearBtnHandler);
	drawnNumbers = [];
	clearDomBox(outputBox);
	if (playOnce) {
		letsDrawNumbers();
		await insertIntoUserNumbersBox(outputBox, drawnNumbers, true, 400);
		displayInfoWindow();
	}
	if (drawToWin) {
		let start = new Date();
		for (let i in results) {
			results[i] = 0;
		}
		while (results['6'] < 1) {
			drawnNumbers = [];
			results.counter++;
			letsDrawNumbers();
			if (compareNumbers().length === 0) results['0']++;
			else if (compareNumbers().length === 1) results['1']++;
			else if (compareNumbers().length === 2) results['2']++;
			else if (compareNumbers().length === 3) results['3']++;
			else if (compareNumbers().length === 4) results['4']++;
			else if (compareNumbers().length === 5) results['5']++;
			else if (compareNumbers().length === 6) results['6']++;
		}
		let end = new Date();
		results.time = (end.getTime() - start.getTime()) / 1000;
		await insertIntoUserNumbersBox(outputBox, drawnNumbers, true, 400);
		displayInfoWindowStatistic();
	}

	playBtn.addEventListener('click', playBtnHandler);
	clearUserNumbersBtn.addEventListener('click', clearBtnHandler);
}

function letsDrawNumbers() {
	while (drawnNumbers.length < 6) {
		let tempNumber = Math.floor(Math.random() * 49 + 1);
		if (!drawnNumbers.includes(tempNumber)) drawnNumbers.push(tempNumber);
	}
	sortArray(drawnNumbers);
}

function displayInfoWindow() {
	infoWindow.classList.add('info__box_visible');
	let output = '';
	if (compareNumbers().length === 0) {
		output = `<p>Unfortunately, you haven't hit any numbers.</p>`;
	} else if (compareNumbers().length === 1) {
		output = `
		<p>You've hit one number.</p>
		<div class="info__box_balls">
		<div class="ball ball_js">
                ${compareNumbers()[0]}
            </div>
		</div>`;
	} else if (compareNumbers().length === 2) {
		output = `
		<p>You've hit ${compareNumbers().length} numbers.</p>
		<div class="info__box_balls">
		<div class="ball ball_js">
                ${compareNumbers()[0]}
            </div>
			<div class="ball ball_js">
                ${compareNumbers()[1]}
            </div>
		</div>`;
	} else if (compareNumbers().length === 3) {
		output = `
		<p>Not bad! <br>You've hit ${compareNumbers().length} numbers.</p>
		<div class="info__box_balls">
		<div class="ball ball_js">
                ${compareNumbers()[0]}
            </div>
			<div class="ball ball_js">
                ${compareNumbers()[1]}
            </div>
			<div class="ball ball_js">
                ${compareNumbers()[2]}
            </div>
		</div>`;
	} else if (compareNumbers().length === 4) {
		output = `
		<p>Lucky You! <br>You've hit ${compareNumbers().length} numbers.</p>
		<div class="info__box_balls">
		<div class="ball ball_js">
                ${compareNumbers()[0]}
            </div>
			<div class="ball ball_js">
                ${compareNumbers()[1]}
            </div>
			<div class="ball ball_js">
                ${compareNumbers()[2]}
            </div>
			<div class="ball ball_js">
                ${compareNumbers()[3]}
            </div>
		</div>`;
	} else if (compareNumbers().length === 5) {
		output = `
		<p>Wow, so close! <br>You've hit ${compareNumbers().length} numbers.</p>
		<div class="info__box_balls">
		<div class="ball ball_js">
                ${compareNumbers()[0]}
            </div>
			<div class="ball ball_js">
                ${compareNumbers()[1]}
            </div>
			<div class="ball ball_js">
                ${compareNumbers()[2]}
            </div>
			<div class="ball ball_js">
                ${compareNumbers()[3]}
            </div>
			<div class="ball ball_js">
                ${compareNumbers()[4]}
            </div>
		</div>`;
	} else if (compareNumbers().length === 6) {
		output = `
		<p>This is impossible! <br>You have won! <br>You should definitely play the real lottery!</p>`;
	} else output = 'Something went wrong :(';
	infoWindowCloseBtn.nextElementSibling.innerHTML = output;
}

function displayInfoWindowStatistic() {
	let output = '';
	infoWindow.classList.add('info__box_visible');
	output = `
	<p class="info__box_statistic-paragraph">Drawing statistics</p>
	<ul class="info__box_statistic-ul">
        <li>Total draws: ${results.counter}</li>
        <li>Zero: ${results['0']}</li>
        <li>One: ${results['1']}</li>
        <li>Two: ${results['2']}</li>
        <li>Three: ${results['3']}</li>
        <li>Four: ${results['4']}</li>
        <li>Five: ${results['5']}</li>
        <li>Six: ${results['6']}</li><br>
        <li>Total time: <span class="span-red">${results.time.toFixed(1)}</span>s</li>
    </ul>`;
	infoWindowCloseBtn.nextElementSibling.innerHTML = output;
}

function compareNumbers() {
	const sameNumbers = [];
	for (let i of userNumbers) {
		if (drawnNumbers.includes(i)) sameNumbers.push(i);
	}
	sortArray(sameNumbers);
	return sameNumbers;
}
