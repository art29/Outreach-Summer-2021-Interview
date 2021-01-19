<template>
  <div>
<!-- Can be improved by adding more components (One for waste categories and one for each item) -->
    <h1>My Waste Room</h1>
    <div class="w-100 border border-dark" style="min-height: 200px">
      <span>Garbage</span><br><br>
      <div v-for="(g, i) in garbage" v-bind:key="g" class="input-group p-2">
        <div class="input-group-prepend">
          <div class="input-group-text bg-white">{{ g.title }}</div>
        </div>
        <button @click="deleteWaste(g.title, i, 'garbage')" class="btn btn-secondary">X</button>
      </div>
    </div>
    <br>
    <div class="w-100 border border-dark" style="min-height: 200px">
      <span>Compost & Yard Waste</span><br><br>
      <div v-for="(g, i) in compost_yard" v-bind:key="g" class="input-group p-2">
        <div class="input-group-prepend">
          <div class="input-group-text bg-white">{{ g.title }}</div>
        </div>
        <button @click="deleteWaste(g.title, i, 'compost')" class="btn btn-secondary">X</button>
      </div>
    </div>
    <br>
    <div class="w-100 border border-dark" style="min-height: 200px">
      <span>Recycling</span><br><br>
      <div v-for="(g, i) in recycling" v-bind:key="g" class="input-group p-2">
        <div class="input-group-prepend">
          <div class="input-group-text bg-white">{{ g.title }}</div>
        </div>
        <button @click="deleteWaste(g.title, i, 'recycling')" class="btn btn-secondary">X</button>
      </div>
    </div>
    <br>
    <div class="w-100 border border-dark" style="min-height: 200px">
      <span>Hazard Waste</span><br><br>
      <div v-for="(g, i) in hazard" v-bind:key="g" class="input-group p-2">
        <div class="input-group-prepend">
          <div class="input-group-text bg-white">{{ g.title }}</div>
        </div>
        <button @click="deleteWaste(g.title, i, 'hazard')" class="btn btn-secondary">X</button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'WasteRoom',
  props: {
    newWasteRoomData: {
    },
  },
  data() {
    return {
      garbage: [],
      compost_yard: [],
      recycling: [],
      hazard: [],
    };
  },
  methods: {
    deleteWaste(title, index, type) {
      if (type === 'garbage') {
        this.garbage.splice(index, 1);
      } else if (type === 'compost') {
        this.compost_yard.splice(index, 1);
      } else if (type === 'recycling') {
        this.recycling.splice(index, 1);
      } else if (type === 'hazard') {
        this.hazard.splice(index, 1);
      }
      this.$emit('removeFromWasteRoom', title);
    },
  },
  mounted() {
    if (localStorage.getItem('garbage')) this.garbage = JSON.parse(localStorage.getItem('garbage'));
    if (localStorage.getItem('compost_yard')) this.compost_yard = JSON.parse(localStorage.getItem('compost_yard'));
    if (localStorage.getItem('recycling')) this.recycling = JSON.parse(localStorage.getItem('recycling'));
    if (localStorage.getItem('hazard')) this.hazard = JSON.parse(localStorage.getItem('hazard'));
  },
  watch: {
    newWasteRoomData() {
      function isArrayInArray(arr, item) {
        const itemAsString = JSON.stringify(item);
        return arr.some((ele) => JSON.stringify(ele) === itemAsString);
      }

      const val = this.newWasteRoomData.category;
      const w = this.newWasteRoomData;
      if (val === 'Garbage' && !isArrayInArray(this.garbage, w)) {
        this.garbage.push(this.newWasteRoomData);
      } else if (val === 'Blue Bin' && !isArrayInArray(this.recycling, w)) {
        this.recycling.push(this.newWasteRoomData);
      } else if ((val === 'Green Bin' || val === 'Yard Waste' || val === 'Christmas Tree') && !isArrayInArray(this.compost_yard, w)) {
        this.compost_yard.push(this.newWasteRoomData);
      } else if ((val === 'HHW' || val === 'Depot' || val === 'Oversize' || val === 'Metal Items' || val === 'Electronic Waste' || val === 'Not Accepted') && !isArrayInArray(this.hazard, w)) {
        this.hazard.push(this.newWasteRoomData);
      }
    },
    garbage: {
      handler(garbage) {
        localStorage.setItem('garbage', JSON.stringify(garbage));
      },
      deep: true,
    },
    compost_yard: {
      // eslint-disable-next-line camelcase
      handler(compost_yard) {
        localStorage.setItem('compost_yard', JSON.stringify(compost_yard));
      },
      deep: true,
    },
    recycling: {
      // eslint-disable-next-line camelcase
      handler(recycling) {
        localStorage.setItem('recycling', JSON.stringify(recycling));
      },
      deep: true,
    },
    hazard: {
      // eslint-disable-next-line camelcase
      handler(hazard) {
        localStorage.setItem('hazard', JSON.stringify(hazard));
      },
      deep: true,
    },
  },
};
</script>

<style scoped>

</style>
