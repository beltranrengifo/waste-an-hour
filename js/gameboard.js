class Gameboard {
    constructor(game) {
        this.game = game
        this.drawboard()
    }
    drawboard(){
        let sections = [].slice.call(document.querySelectorAll('.player-section'));
        sections.forEach((section,i)=>{
            let wrapper = document.createElement('div');
            i===0?wrapper.classList.add('player-section-inner','rotate-img'):wrapper.classList.add('player-section-inner')
            section.appendChild(wrapper)
            this.game.setup.forEach(e=>{
                let cardWrapper = document.createElement('div');
                cardWrapper.classList.add('card')
                let cardImgObj = document.createElement('object');
                cardImgObj.classList.add('svg-img')
                cardImgObj.data = e.img
                cardImgObj.type = 'image/svg+xml'
                cardWrapper.appendChild(cardImgObj)
                wrapper.appendChild(cardWrapper)
            })
        })
    }
}

{/* <object data="img/svg/spock.svg" type="image/svg+xml"></object> */}