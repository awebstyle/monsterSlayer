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
    mayUseSpecialAttackBtn(){
        return this.currentRound % 3 !==0;
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
      const attackValue = getRandomValue(15, 20);
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
  },
});

app.mount('#game');
