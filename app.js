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
    };
  },

  computed: {
    monsterBarStyle() {
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyle() {
      return { width: this.playerHealth + "%" };
    },
    mayUseSpecialAttackBtn() {
      return this.currentRound % 3 !== 0;
    },
    mayUseHealBtn() {
      return this.playerHealth === 100;
    }
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
      this.attackPlayer();
    },

    /**
     * input : playerHealth
     * output : playerHealth - attackValue
     **/
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
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
      this.attackPlayer();
    },
  },
});

app.mount('#game');
