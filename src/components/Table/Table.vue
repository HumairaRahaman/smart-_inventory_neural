<script>
import { onMounted, reactive } from "vue";

export default {
  setup() {
    const state = reactive({
      test: null,
    });
    let Api_Key = "ABAd/fIIrrYfdoXQ1SQgYCkh18CDiOSMjPYsJ3tJdDQ=";
    let Api_Url = "http://182.163.101.173:49029";

    onMounted(async () => {
      const response = await fetch(`${Api_Url}/product-crud/products`, {
        headers: {
          apiKey: Api_Key,
        },
      });
      state.test = await response.json();
      console.log(state.test);
    });

    return {
      state,
      Api_Url,
      Api_Key,
    };
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
              :src="Api_Url + '/product-crud/' + data.productPhoto.v50x50Path"
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
                <button class="">
                  <img src="../../../public/Image/edit.png" class="" alt="edit" />
                </button>
              </div>
              <div class="">
                <button>
                  <img src="../../../public/Image/delete.png" class="" alt="delete" />
                </button>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped></style>
