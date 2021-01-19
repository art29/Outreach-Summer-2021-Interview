<template>
  <div>
    <div id="v-for-sectors" class="m-0">
      <div class="float-left">
        <label for="searchbar">Search for household item</label>
        <div class="input-group w-80">
          <input class="form-control"
                 placeholder="search"
                 v-debounce="updateSearch"
                 id="searchbar">
          <span class="input-group-append">
            <button class="btn btn-secondary" type="button">
                <i class="fa fa-search"></i>
            </button>
          </span>
        </div>
      </div>
      <ul class="p-2">
        <div class="row border border-dark p-2" style="text-align: left!important;"
             v-for="value in filteredList" v-bind:key="value">
          <div class="col-md-2 text-center">
            <p>{{ value.title }}</p>
            <img v-bind:src="getImageURL(value.category)" width="60"><br>
            <p>{{ value.category }}</p>
          </div>
          <div v-html="decodeHtml(value.body)" class="col-md-7" style="overflow: hidden">
          </div>
          <div class="col-md-3 align-self-center">
            <button class="btn btn-secondary"
                    :disabled="titles.includes(value.title) === true"
                    @click="addToWasteRoom(value)">
              Add in Waste Room
            </button>
          </div>
        </div>
      </ul>
    </div>
    <div class="text-center">
      <span style="text-decoration: underline;" @click="loadMore"
            v-if="currentResults < totalResults">Load More</span>
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
      totalResults: '',
      currentResults: 5,
      error: '',
    };
  },
  props: {
    titles: {},
  },
  created() {
    // Making the get request to the Waste Data
    axios.get('https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000')
      .then((response) => {
        this.data = response.data;
        this.totalResults = this.data.length;
      })
      .catch((error) => this.setError(error, 'Something went wrong'));
  },
  methods: {
    setError(error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text;
    },
    // Method to fix the HTML that is encoded
    decodeHtml(html) {
      const txt = document.createElement('textarea');
      txt.innerHTML = html;
      return txt.value;
    },
    // Add new item to the Waste Room
    addToWasteRoom(item) {
      this.$emit('addToWasteRoom', item);
    },
    // Adding more results to the search
    loadMore() {
      this.currentResults += 5;
    },
    // Checking if a result matches the searched item
    matches(obj) {
      const term = this.searchQuery.toLowerCase();
      return obj.keywords.toLowerCase()
        .includes(term);
    },
    updateSearch(val) {
      this.searchQuery = val;
    },
    // Getting the right image URL depending on the type
    getImageURL(val) {
      if (val === 'Garbage') {
        return 'assets/garbagebin.png';
      }
      if (val === 'Blue Bin') {
        return 'assets/bluebin.png';
      }
      if (val === 'Green Bin') {
        return 'assets/greenbin.png';
      }
      if (val === 'HHW') {
        return 'assets/hhw.jpg';
      }
      if (val === 'Depot') {
        return 'assets/depot.jpg';
      }
      if (val === 'Oversize') {
        return 'assets/oversized.png';
      }
      if (val === 'Yard Waste') {
        return 'assets/yardwaste.png';
      }
      if (val === 'Christmas Tree') {
        return 'assets/christmastree.png';
      }
      if (val === 'Metal Items') {
        return 'assets/metal.png';
      }
      if (val === 'Electronic Waste') {
        return 'assets/ewaste.png';
      }
      if (val === 'Not Accepted') {
        return 'assets/notaccepted.png';
      }
      return 'assets/logo.png';
    },
  },
  computed: {
    // Search
    listValues() {
      return Object.values(this.data);
    },
    filteredList() {
      if (!this.searchQuery) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.totalResults = this.listValues.length;
        return this.listValues.slice(0, this.currentResults);
      }

      const searchResults = this.listValues
        // eslint-disable-next-line array-callback-return,consistent-return
        .map((v) => {
          if (this.matches(v)) {
            return v;
          }
        })
        .filter((v) => v);

      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.totalResults = searchResults.length;
      return searchResults.slice(0, this.currentResults);
    },
  },
};

// The search part is inspired by this Stackoverflow page : https://stackoverflow.com/questions/54775982/how-to-do-a-search-filter-on-a-multidimensional-json-object-with-vue-js
</script>

<style scoped>

</style>
