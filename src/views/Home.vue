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
  methods: {
    addToWasteRoom(wasteRoomData) {
      this.titles.push(wasteRoomData.title);
      this.wasteRoom = wasteRoomData;
    },
    removeFromWasteRoom(title) {
      const index = this.titles.indexOf(title);
      if (index > -1) {
        this.titles.splice(index, 1);
      }
      this.wasteRoom = [];
    },
  },
};
</script>
