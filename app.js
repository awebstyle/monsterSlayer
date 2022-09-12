// get a random int number betwee min and max
function getRandomValue(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
    };
  },
  computed: {},
  methods: {
    /**
     * input : monsterHealth
     * output : monsterHealth - attackValue
     **/
    attackMonster() {
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
    },
    /**
     * input : playerHealth
     * output : playerHealth - attackValue
     **/
    attackMonster() {
      const attackValue = getRandomValue(8,15);
      this.monsterHealth -= attackValue;
    },
  },
});

app.mount('#game');
