class Setup {
    constructor() {
        this.challenge = ''
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
                    playerNameInput.classList.add('no-validate')
                } else {
                    document.getElementById('user').innerHTML = 'Hi <strong class="capitalize">' + this.gameConfig.playerName + '</strong>!'
                    this.selectChallenge()
                }

            })
        })
    }
    selectChallenge() {
        this.buildModal('Select challenge', ['Normal Challenge', 'Extended Challenge'], false);
        this.buttons.forEach(e => {
            e.addEventListener('click', () => {
                this.challenge = e.id
                this.selectRounds()
            })
        })
    }
    selectRounds() {
        this.buildModal('Select number of rounds', ['Start game'], true, 'rounds');
        this.buttons.forEach(e => {
            e.addEventListener('click', () => {
                let roundsInput = document.querySelector('.rounds')
                this.gameConfig.rounds = roundsInput.value
                if (!/\d/.test(this.gameConfig.rounds)) {
                    roundsInput.classList.add('no-validate')
                } else {
                    document.getElementById('rounds').innerHTML = '<span class="rounds-number">' + this.gameConfig.rounds + '</span> rounds left.'
                    this.setupStep = 1;
                    this.createGame()
                }
            })
        })
    }
    createGame() {
        this.cleanModal()
        this.gameConfig.setup = gameConfig[this.challenge]
        this.hideModal()
        new Game(this.gameConfig)
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
    cleanModal() {
        document.querySelector('.modal-inner').remove()
    }
    hideModal() {
        setTimeout(function () {
            document.querySelector('#modal').classList.add('hidden-modal');
        }, 400)
    }
}