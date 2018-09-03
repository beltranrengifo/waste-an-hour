const gameConfig = {
    normal : [
        {
            name: 'rock',
            wins: 'scissors',
            loses: 'paper',
            img: 'img/svg/rock.svg'
        },
        {
            name: 'paper',
            wins: 'rock',
            loses: 'scissors',
            img: 'img/svg/paper.svg'
        },
        {
            name: 'scissors',
            wins: 'paper',
            loses: 'rock',
            img: 'img/svg/scissors.svg'
        }
    ] ,
    extended : [
        {
            name: 'rock',
            wins: ['scissors', 'lizard'],
            loses: ['paper', 'spock'],
            img: 'img/svg/rock.svg'
        },
        {
            name: 'paper',
            wins: ['rock', 'spock'],
            loses: ['scissors', 'lizard'],
            img: 'img/svg/paper.svg'
        },
        {
            name: 'scissors',
            wins: ['paper', 'lizard'],
            loses: ['rock', 'spock'],
            img: 'img/svg/scissors.svg'
        },
        {
            name: 'lizard',
            wins: ['paper', 'spock'],
            loses: ['rock', 'scissors'],
            img: 'img/svg/lizard.svg'
        },
        {
            name: 'spock',
            wins: ['scissors', 'rock'],
            loses: ['paper', 'lizard'],
            img: 'img/svg/spock.svg'
        }
    ]
}