<script>
import { onMounted, reactive, ref } from "vue";
import Modal from "../Modal/EditInventoryModal.vue";
import Delete_Modal from "../Modal/DeleteInventoryModal.vue";

export default {
  setup() {
    const state = reactive({
      test: null,
    });
    let id = ref("");
    let Api_Key = "ABAd/fIIrrYfdoXQ1SQgYCkh18CDiOSMjPYsJ3tJdDQ=";
    let Api_Url = "http://182.163.101.173:49029";

    onMounted(async () => {
      const response = await fetch(`${Api_Url}/product-crud/products`, {
        headers: {
          apiKey: Api_Key,
        },
      });
      state.test = await response.json();
      id.value = state.test.id;
      console.log(state.test);
    });

    const modal = ref();
    const showModal = ref(false);
    const showModalDelete = ref(false);

    const modal_view = (e) => {
      console.log(e);
      id.value = e;
      showModal.value = true;
      console.log(typeof id.value);
    };

    const delete_modal_view = () => {
      console.log("object");
      showModalDelete.value = true;
      console.log(showModalDelete.value);
    };

    return {
      id,
      modal,
      modal_view,
      delete_modal_view,
      showModal,
      showModalDelete,
      state,
      Api_Url,
      Api_Key,
    };
  },
  components: {
    Modal,
    Delete_Modal,
  },
};
</script>

<template>
  <div class="px-[25px]">
    <table
      class="border-separate border-spacing-y-2 border-slate-500 text-start w-[100%]"
    >
      <thead class="bg-[#cfd5db]">
        <tr class="pl-[19px]">
          <th
            class="text-[#333333] text-[14px] font-semibold font-['Open_Sans'] py-[10px]"
          >
            SL
          </th>
          <th
            class="text-[#333333] text-[14px] font-semibold font-['Open_Sans'] py-[10px]"
          >
            Asset No.
          </th>
          <th
            class="text-[#333333] text-[14px] font-semibold font-['Open_Sans'] py-[10px]"
          >
            Category
          </th>
          <th
            class="text-[#333333] text-[14px] font-semibold font-['Open_Sans'] py-[10px]"
          >
            Image
          </th>
          <th
            class="text-[#333333] text-[14px] font-semibold font-['Open_Sans'] py-[10px]"
          >
            Product Name
          </th>
          <th
            class="text-[#333333] text-[14px] font-semibold font-['Open_Sans'] py-[10px]"
          >
            Serial No.
          </th>
          <th
            class="text-[#333333] text-[14px] font-semibold font-['Open_Sans'] py-[10px]"
          >
            Price
          </th>
          <th
            class="text-[#333333] text-[14px] font-semibold font-['Open_Sans'] py-[10px]"
          >
            Warranty
          </th>
          <th
            class="text-[#333333] text-[14px] font-semibold font-['Open_Sans'] py-[10px]"
          >
            Purchase Date
          </th>
          <th
            class="text-[#333333] text-[14px] font-semibold font-['Open_Sans'] py-[10px]"
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody class="text-center text-[#9F9F9F]">
        <tr v-for="(data, i) in state.test" :key="i">
          <td
            class="border border-r-0 text-[#333333] border-slate-200 font-normal text-[14px] leading-[136%] font-['Open_Sans] py-[15px]"
          >
            {{ i + 1 }}
          </td>
          <td
            class="border border-x-0 text-[#333333] border-slate-200 font-normal text-[14px] leading-[136%] font-['Open_Sans]"
          >
            {{ data.assetNumber }}
          </td>
          <td
            class="border border-x-0 text-[#333333] border-slate-200 font-normal text-[14px] leading-[136%] font-['Open_Sans]"
          >
            {{ data.categoryName }}
          </td>
          <td
            class="border border-x-0 text-[#333333] border-slate-200 font-normal text-[14px] leading-[136%] font-['Open_Sans]"
          >
            <img
              :src="Api_Url + '/product-crud/' + data?.productPhoto?.originalPath"
              alt="img"
              class="mx-auto rounded-full w-[29px] h-[29px]"
            />
          </td>
          <td
            class="border border-x-0 text-[#333333] border-slate-200 font-normal text-[14px] leading-[136%] font-['Open_Sans]"
          >
            {{ data.productName }}
          </td>
          <td
            class="border border-x-0 text-[#333333] border-slate-200 font-normal text-[14px] leading-[136%] font-['Open_Sans]"
          >
            {{ data.serialNumber }}
          </td>
          <td
            class="border border-x-0 text-[#333333] border-slate-200 font-normal text-[14px] leading-[136%] font-['Open_Sans]"
          >
            {{ data.purchasePrice }}
          </td>
          <td
            v-if="data.warrantyInYears != null"
            class="border border-x-0 text-[#333333] border-slate-200 font-normal text-[14px] leading-[136%] font-['Open_Sans]"
          >
            {{ data.warrantyInYears }}
          </td>
          <td
            v-if="data.warrantyInYears == null"
            class="border border-x-0 text-[#333333] border-slate-200 font-normal text-[14px] leading-[136%] font-['Open_Sans]"
          >
            0
          </td>
          <td
            class="border border-x-0 text-[#333333] border-slate-200 font-normal text-[14px] leading-[136%] font-['Open_Sans]"
          >
            {{ data.purchaseDate }}
          </td>
          <td
            class="border border-l-0 text-[#333333] border-slate-200 font-normal text-[14px] leading-[136%] font-['Open_Sans]"
          >
            <div class="flex">
              <div class="mr-2">
                <button class="" @click="modal_view(data)">
                  <img src="../../../public/Image/edit.png" class="" alt="edit" />
                </button>
                <Teleport to="body">
                  <modal
                    :show="showModal"
                    @close="showModal = false"
                    :id="id"
                    ref="modal"
                  >
                    <template #header>
                      <h3>custom header</h3>
                    </template>
                  </modal>
                </Teleport>
              </div>
              <div class="">
                <button @click="delete_modal_view">
                  <img src="../../../public/Image/delete.png" class="" alt="delete" />
                </button>
                <Teleport to="body">
                  <modal>
                    <template #header>
                      <h3>custom header</h3>
                    </template>
                  </modal>
                  <modal
                    :show_delete="showModalDelete"
                    @close="showModalDelete = false"
                    :id="id"
                    ref="delete-modal"
                  >
                  </modal>
                </Teleport>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped></style>
