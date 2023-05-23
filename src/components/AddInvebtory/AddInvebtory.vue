<script>
import { defineComponent, ref } from "vue";
import Modal from "../Modal/AddInventoryModal.vue";

export default defineComponent({
  setup() {
    const modal = ref();
    const showModal = ref(false);

    const modal_view = () => {
      showModal.value = true;
    };
    return {
      modal,
      modal_view,
      showModal,
    };
  },

  components: {
    Modal,
  },
});
</script>

<template>
  <div class="px-[25px] flex justify-between pt-[21px]">
    <div>
      <div class="mb-[29px]">
        <button
          id="show-modal"
          @click="modal_view"
          class="text-[16px] bg-[#045692] py-[7px] leading-[21.79px] px-[10px] text-white font-semibold"
        >
          Add Inventory
        </button>
        <Teleport to="body">
          <modal :show="showModal" @close="showModal = false" :id="id" ref="modal">
            <template #header>
              <h3>custom header</h3>
            </template>
          </modal>
        </Teleport>
      </div>
    </div>
    <div
      class="flex justify-between w-[285px] h-[42px] border-[1px] border-solid border-[#828d9980] rounded-[5px] mb-[25px]"
    >
      <div class="my-[11px]">
        <p
          class="text-[16px] pl-[21px] text-[#333333] font-normal font-['Open_Sans'] opacity-[0.7]"
        >
          Search here
        </p>
      </div>
      <div class="my-[11px] pr-[7px]">
        <img
          src="../../../public/Image/search.svg"
          alt="search"
          class="w-[16.61px] h-[16.61px] text-[#2E3A59]"
        />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
