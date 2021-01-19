<template>
  <div>
    <h1>My Waste Room</h1>
    <div class="w-100 border border-dark" style="min-height: 200px">
      <span>Garbage</span><br><br>
      <span v-for="g in garbage" v-bind:key="g" class="p-3 border border-dark">
        {{ g.title }}
        <button class="btn btn-secondary">X</button>
      </span>
    </div>
    <br>
    <div class="w-100 border border-dark" style="min-height: 200px">
      <span>Compost & Yard Waste</span><br><br>
      {{ compost_yard }}
    </div>
    <br>
    <div class="w-100 border border-dark" style="min-height: 200px">
      <span>Recycling</span><br><br>
      {{ recycling }}
    </div>
    <br>
    <div class="w-100 border border-dark" style="min-height: 200px">
      <span>Hazard Waste</span><br><br>
      {{ hazard }}
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
    // eslint-disable-next-line no-unused-vars
    deleteWaste(waste) {
      // Delete Waste
    },
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
  },
};
</script>

<style scoped>

</style>
