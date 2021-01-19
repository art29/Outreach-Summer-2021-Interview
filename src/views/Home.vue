<template>
  <div class="home">
    <div class="row p-3">
      <div class="col-md-6">
        <Search @addToWasteRoom="addToWasteRoom" :titles="titles" />
      </div>
      <div class="col-md-6">
        <WasteRoom @removeFromWasteRoom="removeFromWasteRoom" :new-waste-room-data="wasteRoom" />
      </div>
    </div>
  </div>
</template>

<script>
import Search from '@/components/Search.vue';
import WasteRoom from '@/components/WasteRoom.vue';

export default {
  name: 'Home',
  data() {
    return {
      wasteRoom: [],
      titles: [],
    };
  },
  components: {
    Search,
    WasteRoom,
  },
  mounted() {
    // Get the array of titles in the Waste Room from Local Storage
    if (localStorage.getItem('titles')) this.titles = JSON.parse(localStorage.getItem('titles'));
  },
  methods: {
    // Add new item to the Waste Room
    addToWasteRoom(wasteRoomData) {
      this.titles.push(wasteRoomData.title);
      this.wasteRoom = wasteRoomData;
    },
    // Remove item from the Waste Room
    removeFromWasteRoom(title) {
      const index = this.titles.indexOf(title);
      if (index > -1) {
        this.titles.splice(index, 1);
      }
      this.wasteRoom = [];
    },
  },
  watch: {
    // When the titles array is updated, update Local Storage
    titles: {
      handler(titles) {
        localStorage.setItem('titles', JSON.stringify(titles));
      },
      deep: true,
    },
  },
};
</script>
