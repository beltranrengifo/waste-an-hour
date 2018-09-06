class Setup {
    constructor() {
        this.buttons = []
        this.setupStep = 1
        this.gameConfig = {};
        this.selectMode();
    }
    selectMode() {
        this.buildModal('Select game mode', ['Human VS Computer', 'Computer VS Computer'], false);
        this.buttons.forEach(e => {
            e.addEventListener('click', () => {
                this.gameConfig.mode = e.id
                this.gameConfig.mode === 'human' ? this.getPlayerName() : this.selectChallenge()
            })
        })
    }
    getPlayerName() {
        this.buildModal("Hello stranger! What's your name?", ['Next'], true, 'player-name-input');
        this.buttons.forEach(e => {
            e.addEventListener('click', () => {
                let playerNameInput = document.querySelector('.player-name-input')
                this.gameConfig.playerName = playerNameInput.value
                if (!/\S+/.test(this.gameConfig.playerName)) {
                    playerNameInput.closest('.modal-inner').classList.add('no-validate')
                    playerNameInput.value = ''
                    playerNameInput.placeholder = 'Enter your name!';
                } else {
                    this.selectChallenge()
                }
            })
        })
    }
    selectChallenge() {
        this.buildModal('Select challenge', ['Normal Challenge', 'Extended Challenge'], false);
        this.buttons.forEach(e => {
            e.addEventListener('click', () => {
                this.gameConfig.challenge = e.id
                this.selectRounds()
            })
        })
    }
    selectRounds() {
        this.buildModal('Select number of rounds', ['Start game'], true, 'rounds');
        let roundsInput = document.querySelector('.rounds');
        roundsInput.type = 'number';
        roundsInput.placeholder = 'Odd numbers from 3 to 15';
        this.buttons.forEach(e => {
            e.addEventListener('click', () => {
                this.gameConfig.rounds = roundsInput.value
                if (!/\d/.test(this.gameConfig.rounds) 
                || this.gameConfig.rounds < 3
                || this.gameConfig.rounds > 15
                || !( this.gameConfig.rounds & 1 )) {
                    roundsInput.closest('.modal-inner').classList.add('no-validate')
                    roundsInput.value = '';
                    roundsInput.placeholder = 'Odd numbers from 3 to 15';
                } else {
                    this.setupStep = 1;
                    this.createGame()
                }
            })
        })
    }
    buildModal(title, buttons, input, inputClass) {
        document.querySelector('.modal-inner') ? this.cleanModal() : null;
        let domModalContainer = document.getElementById('modal')
        let modalContent = document.createElement('div');
        modalContent.classList.add('modal-inner')
        domModalContainer.appendChild(modalContent)
        let modalTitle = document.createElement('h3')
        modalTitle.innerHTML = '<span class="step">' + this.setupStep + '</span><br>' + title;
        modalContent.appendChild(modalTitle);
        this.setupStep++;
        if (input) {
            let inputEl = document.createElement('input');
            inputEl.classList.add(inputClass)
            modalContent.appendChild(inputEl)
        }
        buttons.forEach(e => {
            let modalButton = document.createElement('button');
            modalButton.innerText = e
            modalButton.classList.add('modal-button')
            let id = e.split(' ')[0].toLowerCase()
            modalButton.id = id
            modalContent.appendChild(modalButton)
        })
        this.buttons = [].slice.call(document.querySelectorAll('.modal-inner .modal-button'))
    }
    cleanModal(hide) {
        hide ? document.querySelector('#modal').classList.add('hidden-modal') : document.querySelector('.modal-inner').remove()
    }
    markDOM(){
        document.querySelector('body').classList.add(`${this.gameConfig.challenge}-game`,`${this.gameConfig.mode}-mode` )
    }
    createGame() {
        this.cleanModal(true)
        this.gameConfig.setup = gameConfig[this.gameConfig.challenge];
        this.markDOM()
        new Game(this.gameConfig)
    }
}