class Game {
    constructor(setup) {
        this.setup = setup.setup
        this.mode = setup.mode
        this.rounds = setup.rounds
        this.gameboard = new Gameboard(this)
        this.start()
    }
    start(){
        //console.log(this.setup);
    }
}
