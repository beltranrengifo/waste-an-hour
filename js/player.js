class Player {
    constructor(game, computerName) {
        this.game = game;
        this.name = computerName ? computerName : this.game.options.playerName;
        this.score = 0;
    }
}