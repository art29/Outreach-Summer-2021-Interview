<template>
  <div>
    <button class="btn-primary">test</button>
    <div id="v-for-sectors">
      <input type="text" placeholder="Search" v-debounce:100ms="updateSearch">
      <ul>
        <p v-for="value in filteredList" v-bind:key="value">
          <b>{{ value.title }}</b>
        </p>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Search',
  data() {
    return {
      searchQuery: '',
      data: [],
      error: '',
    };
  },
  created() {
    axios.get('https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000')
      .then((response) => {
        this.data = response.data;
      })
      .catch((error) => this.setError(error, 'Something went wrong'));
  },
  methods: {
    setError(error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text;
    },
    matches(obj) {
      const term = this.searchQuery.toLowerCase();
      return obj.keywords.toLowerCase().includes(term);
    },
    updateSearch(val) {
      this.searchQuery = val;
    },
  },
  computed: {
    listValues() {
      return Object.values(this.data);
    },

    filteredList() {
      if (!this.searchQuery) {
        return this.listValues;
      }

      return this.listValues
        // eslint-disable-next-line array-callback-return,consistent-return
        .map((v) => {
          if (this.matches(v)) {
            return v;
          }
        })
        .filter((v) => v);
    },
  },
};

// The search part is inspired by this Stackoverflow page : https://stackoverflow.com/questions/54775982/how-to-do-a-search-filter-on-a-multidimensional-json-object-with-vue-js
</script>

<style scoped>

</style>
