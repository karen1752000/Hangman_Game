console.clear();

class Hangman {
	
	private words:string[] = ["bee", "butterfly", "elephant", "falcon", "grasshopper"];
	
	private gameStateEl;
	private failsEl;
	private wordEl;
	private keyboardEl;
	private newGameEl;
	
	private word:string;
	private wordAttempt:string;
	
	private selectedChars:Set;
	private failCount:number;
	private const MAX_FAIL_COUNT:number = 10;
	
	private isGameActive:boolean = true;

	constructor() {
		this.gameStateEl = document.querySelector('.game-state');
		this.failsEl = document.querySelector('.fails');
		this.wordEl = document.querySelector('.word');
		this.keyboardEl = document.querySelector('.keyboard');
		this.newGameEl = document.querySelector('.new-game');
		
		this.newGameEl.addEventListener('click', () => { this.initNewGame(); });
		
		this.keyboardEl.addEventListener('click', (e) => {
			if(e.target.classList.contains('key')) {
				this.handleKey(e.target.textContent);	
			}		
		});

		document.body.addEventListener('keyup', (e) => {
			const key = e.key.toUpperCase();
			const charCode = key.charCodeAt(0);
			if(charCode >= 65 && charCode <= 90) {
				this.handleKey(key);
			}
		});

		this.initNewGame();
	}
	
	initNewGame() {
		this.isGameActive = true;
		this.initNewWord();
		this.selectedChars = new Set();
		this.failCount = 0;
		this.resetGameStateElement();
		this.resetKeyboard();
		this.resetFailsElement();
		
		this.updateGameState();
	}


	initNewWord() {
		this.word = this.getRandomWord();
		this.missingLetters = this.word.length;
		this.wordEl.innerHTML = '';
		this.word.split('').forEach((char) => {
			const charEl = document.createElement('div');
			charEl.classList.add('char');
			charEl.textContent = '_';
			this.wordEl.appendChild(charEl);
		})
	}
		
	resetKeyboard() {
		for(let i = 0; i < this.keyboardEl.children.length; i++) {
			this.keyboardEl.children[i].classList.remove('key--fade-out');
		};
	}


	resetGameStateElement() {
		this.gameStateEl.classList.remove('game-state--active');
		this.gameStateEl.classList.remove('game-state--win');
		this.gameStateEl.classList.remove('game-state--fail');
	}

	resetFailsElement() {
		this.failsEl.style.backgroundColor = 'white';
	}

	getRandomWord() {
		const max = this.words.length;
		const rand = Math.floor(max * Math.random());
		return this.words[rand].toUpperCase();
	}
	
	handleKey(key) {
		key = key.toUpperCase();
		
		if(!this.isGameActive) {
			return;
		}
		
		if(!this.selectedChars.has(key)) {
			this.selectedChars.add(key);
			this.fadeKeyInKeyboard(key);
			
			if(this.word.includes(key)) {
				this.word.split('').forEach((char, i) => {
					if(char === key) {
						this.wordEl.children[i].textContent = key;
						this.missingLetters--;
					}
				});
			} else {
				this.failCount++;
				this.failsEl.style.backgroundColor = `rgba(255,0,0,0.${this.failCount-1})`;
			}
			
			this.updateGameState();
		}
	}
	
	fadeKeyInKeyboard(key) {
		const index = key.charCodeAt(0) - 65;
		this.keyboardEl.children[index].classList.add('key--fade-out');
	}

	showWord() {
		this.word.split('').forEach((char, i) => {
			this.wordEl.children[i].textContent = char;
		})
	}

	updateGameState() {
		this.failsEl.textContent = `FAILS: ${this.failCount}/${this.MAX_FAIL_COUNT}`;
		
		if(this.failCount === this.MAX_FAIL_COUNT) {
			this.isGameActive = false;
			this.gameStateEl.firstElementChild.textContent = 'LOSE!!';
			this.gameStateEl.classList.add('game-state--fail');
			this.showWord();
			return;
		} else if(this.missingLetters === 0) {
			this.isGameActive = false;
			this.gameStateEl.firstElementChild.textContent = 'WIN!!';
			this.gameStateEl.classList.add('game-state--win');
			return;
		} else {
			this.gameStateEl.firstElementChild.textContent = 'CURRENT GAME';
			this.gameStateEl.classList.add('game-state--active');
		}
	}
}

new HangmanMan();