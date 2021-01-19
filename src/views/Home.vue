<template>
  <div class="home">
    <div class="row p-3">
      <div class="col-md-6">
        <Search @addToWasteRoom="addToWasteRoom" />
      </div>
      <div class="col-md-6">
        <WasteRoom :new-waste-room-data="wasteRoom" />
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
    };
  },
  components: {
    Search,
    WasteRoom,
  },
  methods: {
    addToWasteRoom(wasteRoomData) {
      this.wasteRoom = wasteRoomData;
    },
  },
};
</script>
