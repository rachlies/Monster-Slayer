new Vue({
    el   : '#app',
    data : {
        playerHealth: 100,
        monsterHealth: 100,
        isGameRunning: false,
    },
    methods: {
        startGame : function(){
            this.isGameRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
        },
        endGame: function () {
            this.isGameRunning = false;
            this.playerHealth = 100;
            this.monsterHealth = 100;
        },
        attack: function() {
            this.monsterHealth -= this.calculateDamage(3, 10);
            if(this.check()) {
                return;
            }
            this.playerHealth -= this.calculateDamage(5, 12);
            this.check();
        },
        specialAttack: function () {

        },
        heal: function() {

        },
        calculateDamage: function (min, max) {
            const damage = Math.max(Math.floor(Math.random()*max) + 1, min);
            return damage;
        },

        check: function () {
            if(this.playerHealth < 0) {
                if(confirm("You Lost! new Game?")) {
                    this.startGame();
                } else {
                    this.isGameRunning = false;
                }
                return true;
            } else if(this.monsterHealth < 0) {
                if(confirm("You won! play again?")) {
                    this.startGame();
                } else {
                    this.isGameRunning = false;
                }
                return true;
            }
            return  false;
        },

    }
});