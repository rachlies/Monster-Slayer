new Vue({
    el   : '#app',
    data : {
        playerHealth: 100,
        monsterHealth: 100,
        isGameRunning: false,
        turns : [],
    },
    methods: {
        startGame : function(){
            this.isGameRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
        },
        endGame: function () {
            this.isGameRunning = false;
        },
        attack: function() {
            const damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: "Player hits monster for " + damage,
            });
            if(this.check()) {
                return;
            }
            this.monsterAttack();
        },
        specialAttack: function () {
            this.monsterHealth -= this.calculateDamage(10, 20);
            if(this.check()) {
                return;
            }
            this.monsterAttack();
        },
        heal: function() {
            this.playerHealth = this.playerHealth < 90 ? this.playerHealth+10 : 100;
            this.monsterAttack();
        },

        monsterAttack: function() {
            const damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
            this.check();
            this.turns.unshift({
                isPlayer: false,
                text: "Monster hits player for " + damage,
            });
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