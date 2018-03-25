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