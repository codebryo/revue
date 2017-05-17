export default {
  template: `
    <div>
      <h1>Welcome {{ nameProcessed }}</h1>
      <p class="description">{{ desc }}</p>
      <button @click="toggle">Transform Name</button>

      <h2>Share some Love</h2>
      <span class="love">{{ love }}</span>
      <button @click="increase">Increase</button>
    </div>
  `,

  props: ['name'],

  data() {
    return {
      desc: 'Default description!',
      allcaps: false,
    };
  },

  computed: {
    nameProcessed() {
      if (this.allcaps) return this.name.toUpperCase();
      return this.name;
    },

    love() {
      if(this.$store) // only for this tested component
        return this.$store.state.love
    }
  },

  methods: {
    toggle() {
      this.allcaps = !this.allcaps;
    },

    increase() {
      if(this.$store) // only for this tested component
        this.$store.commit('increase')
    },
  },
};
