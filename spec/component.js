export default {
  template: `
    <div>
      <h1>Welcome {{ nameProcessed }}</h1>
      <p class="desription">{{ desc }}</p>
      <button @click="toggle">Transform Name</button>
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
      return name;
    },
  },

  methods: {
    toggle() {
      this.allcaps = !this.allcaps;
    },
  },
};
