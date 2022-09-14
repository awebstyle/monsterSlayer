// get a random int number betwee min and max
function getRandomValue(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      end: false,
      winner: null,
      logMessages: [],
    };
  },

  computed: {
    monsterBarStyle() {
      if (this.monsterHealth < 0){
        return { width: '0%' };
      }
      else return { width: this.monsterHealth + "%" };
    },
    playerBarStyle() {
      if (this.playerHealth < 0){
        return { width: '0%' } ;
      }
      return { width: this.playerHealth + "%" };
    },
    mayUseSpecialAttackBtn() {
      return this.currentRound % 3 !== 0;
    },
    mayUseHealBtn() {
      return this.playerHealth === 100;
    }
  },

  watch: {
    playerHealth(value) {
      
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = 'draw';
      }
      else if (value <=0){
        this.winner = 'monster'
      }

    },
    monsterHealth(value) {

        if (value <=0 && this.playerHealth <=0) {
            this.winner = 'draw';
        }
        else if (value <=0){
            this.winner = 'player';
        }

    },
  },

  methods: {
    /**
     * input : monsterHealth
     * output : monsterHealth - attackValue
     **/
    attackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      this.addLogMessages('Player', 'attack', attackValue);
      this.attackPlayer();
    },

    /**
     * input : monsterHealth
     * output : monsterHealth - attackValue
     **/
    specialAttackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(10, 25);
      this.monsterHealth -= attackValue;
      this.addLogMessages("Player", "special attack", attackValue);
      this.attackPlayer();
    },

    /**
     * input : playerHealth
     * output : playerHealth - attackValue
     **/
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      this.addLogMessages("Monster", "attack", attackValue);
      this.playerHealth -= attackValue;
    },

    /**
     * input : playerHealth
     * output : playerHealth + healthValue
     **/
    healPlayer() {
      this.currentRound++  
      const healthValue = getRandomValue(7, 12);
      if ( this.playerHealth + healthValue > 100 ) {
        this.playerHealth = 100
      }
      else {
        this.playerHealth += healthValue;
      }
      this.addLogMessages("Player", "heal", healthValue);
      this.attackPlayer();
    },

    /** 
     * input : data at the end of the last games
     * output : reset data
     * **/
    restart(){
      this.playerHealth = 100,
      this.monsterHealth = 100,
      this.currentRound = 0,
      this.end = false,
      this.winner = null,
      this.logMessages = []
    },

    /**
     * output : winner = monster 
     **/
    surrender(){
      this.winner = 'monster';
    },

    /**
     * output : log messages
     */
    addLogMessages(who, what, value){
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value
      })
    }
  },
});

app.mount('#game');
