class Gameboard {
    constructor(game) {
        this.game = game
        loader(true)
        this.drawboard()
    }
    drawboard() {
        let sections = [].slice.call(document.querySelectorAll('.player-section'));
        //create cardboards
        sections.forEach((section, i) => {
            let wrapper = document.createElement('div');
            i === 0 ? wrapper.classList.add('player-section-inner', 'rotate-img') : wrapper.classList.add('player-section-inner')
            section.appendChild(wrapper)
            this.game.options.setup.forEach((e,i) => {
                let cardWrapper = document.createElement('div');
                cardWrapper.classList.add('card')
                let svgWrapper = document.createElement('div');
                svgWrapper.classList.add('svg-img')
                svgWrapper.innerHTML = eval(`svg${i}`)
                cardWrapper.appendChild(svgWrapper)
                wrapper.appendChild(cardWrapper)
            })
        });
        //create info section
        let gameInfoSection = document.getElementById('game-info')
        let infoWrapper = document.createElement('div');
        infoWrapper.classList.add('game-info-inner')
        let namesWrapper = document.createElement('div');
        namesWrapper.classList.add('names-wrapper');
        let nameA = document.createElement('div');
        nameA.classList.add('player-name')
        nameA.innerHTML = '<span>'+ this.game.computer.name +'</span>'
        let separator = document.createElement('hr');
        separator.classList.add('separator')
        let nameB = document.createElement('div');
        nameB.classList.add('player-name')
        nameB.innerHTML = '<span class="capitalize">'+ this.game.player.name +'</span>'
        let scoreA = document.createElement('span');
        scoreA.id = 'computer-score';
        scoreA.classList.add('score');
        scoreA.innerText = this.game.computer.score
        let scoreB = document.createElement('span');
        scoreB.id = 'player-score';
        scoreB.classList.add('score');
        scoreB.innerText = this.game.player.score
        let messages = document.createElement('div');
        messages.classList.add('game-messages')
        let roundsInfo = document.createElement('div');
        roundsInfo.classList.add('rounds-info')
        roundsInfo.innerHTML = 'Rounds left  <strong><span class="rounds-number">' + this.game.options.rounds + '</span></strong>'
        namesWrapper.appendChild(nameA)
        nameA.appendChild(scoreA)
        nameB.appendChild(scoreB)
        namesWrapper.appendChild(separator)
        namesWrapper.appendChild(nameB)
        infoWrapper.appendChild(namesWrapper)
        infoWrapper.appendChild(messages)
        infoWrapper.appendChild(roundsInfo)
        gameInfoSection.appendChild(infoWrapper)
        setTimeout(()=>loader(),300)
    }
    addCardsListeners() {
        [].slice.call(document.querySelectorAll('.player-section svg'))
        .forEach(el=>el.addEventListener('click',event=>this.game.checkIfPair(event))
    )}
    gameMessage(message,cssClass) {
        let messageWrapper = document.querySelector('.game-messages')
        cssClass ? messageWrapper.classList.add(cssClass) : null
        messageWrapper.innerHTML = message
    }
    reset() {
        let resetImages = [].slice.call(document.querySelectorAll('svg'))
        resetImages.forEach(e=>e.classList.remove('active-svg'))
        document.querySelector('body').classList.remove('prevent-click')
    }
    activateCard(event) {
        event.target.closest('.svg-img').children[0].classList.add('active-svg')
    }
    deactivateCards(array) {
        array.forEach(e=>e.classList.remove('active-svg'))
    }
    pickCardId(event) {
        return event.target.closest('.svg-img').children[0].id
    }
    blockInteraction() {
        document.querySelector('body').classList.add('prevent-click')
    }
    getChoices(selector){
        return [].slice.call(document.querySelectorAll(selector))
    }
    updateScore() {
        this.game.winner.score++
        let selector = this.game.winner.name == 'Computer' ? 'computer' : 'player'
        let el = document.querySelector(`#${selector}-score`)
        el.innerText = this.game.winner.score
    }
    updateRounds() {
        this.game.options.rounds--
        document.querySelector('.rounds-number').innerText = this.game.options.rounds
    }
    capitalizeString(string) {
        return string.replace(/^\w/, c => c.toUpperCase());
    }
}