class Game {
    constructor(setup) {
        this.options = setup
        this.pickedCards = [];
        this.computerChoice;
        this.winner;
        this.loser;
        this.autopilot = this.options.mode!=='human'
        this.computer = new Player(this, 'Computer')
        this.player = this.autopilot ? new Player(this, 'Autopilot') : new Player(this) 
        this.gameboard = new Gameboard(this)
        this.gameboard.addCardsListeners()
        this.resetRound()
    }
    resetRound() {
        this.gameboard.reset()
        this.pickedCards = []
        this.startRound()
    }
    startRound() {
        this.autopilot ? this.autoSelectCard(true) : this.gameboard.gameMessage("Make your choice!<i class='fal fa-long-arrow-down'></i>")
    }
    randomNum(min,max){
        return Math.floor(Math.random() * max) + min 
    }
    autoSelectCard(autopilot) {
        let message = autopilot ? 'Autopilot is choosing...<i class="fal fa-long-arrow-down"></i>' : '<i class="fal fa-long-arrow-up"></i>Computer is choosing...'
        this.gameboard.gameMessage(message)
        let selector = autopilot ? '#user-section svg' : '#computer-section svg'
        let choices = this.gameboard.getChoices(selector)
        let loop = this.options.challenge === 'extended' ? this.randomNum(20,30) : this.randomNum(12,21)
        let delay = 150
        const iteratingInCards = loop => {
            this.gameboard.deactivateCards(choices)
            this.computerChoice = choices[this.randomNum(0,choices.length)] 
            this.computerChoice.classList.add('active-svg')
            loop--
            if (loop>1) setTimeout(()=>iteratingInCards(loop),delay)
            else this.checkIfPair()
        }
        iteratingInCards(loop)
    }
    checkIfPair(event) {
        let pickedCardId
        if(event) {
            this.gameboard.activateCard(event)
            pickedCardId = this.gameboard.pickCardId(event) 
            this.gameboard.blockInteraction()
        } else pickedCardId = this.computerChoice.id
        if(!this.pickedCards.length) { 
            this.pickedCards.push(pickedCardId)
            this.gameboard.showChoice(pickedCardId,'player')
            this.autoSelectCard()
        } else {
            this.pickedCards.push(pickedCardId)
            this.gameboard.showChoice(pickedCardId,'computer')
            this.resolveRound()
        }
    }
    resolveRound() {
        this.gameboard.gameMessage("Resolving...")
        if(this.pickedCards[0]===this.pickedCards[1]) {
            setTimeout(()=>this.gameboard.gameMessage("It's a draw, try again!<i class='fal fa-redo'></i>"),1000)
            setTimeout(()=>this.resetRound(),2500)
        } else {
            let firstCard = this.options.setup.find(card =>card.name === this.pickedCards[0])
            if(firstCard.wins.includes(this.pickedCards[1])) this.winner = this.player, this.loser = this.computer
            else this.winner = this.computer , this.loser = this.player
            setTimeout(()=>{
                this.gameboard.gameMessage(`${this.gameboard.capitalizeString(this.winner.name)} wins!`)
                this.checkIfGameOver()
            },1000)
        }
    }
    checkIfGameOver() {
        this.gameboard.updateRounds()
        this.gameboard.updateScore()
        setTimeout(()=>{
            if(!this.options.rounds || this.loser.score + this.options.rounds < this.winner.score){
                this.gameboard.gameMessage(`${this.gameboard.capitalizeString(this.winner.name)} wins the game!`, 'success')
            } else this.resetRound()
        },2000)
    }
}
