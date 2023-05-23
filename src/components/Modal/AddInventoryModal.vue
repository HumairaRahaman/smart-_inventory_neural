<script>
import { ref, defineComponent, reactive, onMounted } from "vue";
import VueImageChooser from "vue-image-chooser";
import axios from "axios";
//Vue.use(VueImageChooser);

export default defineComponent({
  props: {
    show: Boolean,
    id: String,
  },

  setup(props) {
    let has_warranty = ref(false);
    let success_text = ref("");
    let category = ref("category");
    let product_name = ref("");
    let serial_number = ref("");
    let purchase_price = ref("");
    let purchase_day = ref("");
    let purchase_month = ref("");
    let purchase_year = ref("");
    let warranty = ref("");
    let warranty_expire_day = ref("");
    let warranty_expire_month = ref("");
    let warranty_expire_year = ref("");
    console.log(has_warranty.value);

    //api
    const state = reactive({
      category: null,
    });
    let Api_Key = "ABAd/fIIrrYfdoXQ1SQgYCkh18CDiOSMjPYsJ3tJdDQ=";
    let Api_Url = "http://182.163.101.173:49029";

    onMounted(async () => {
      const response = await fetch(
        `${Api_Url}/product-crud/products/category-name-wise-product-names`,
        {
          headers: {
            apiKey: Api_Key,
          },
        }
      );
      state.category = await response.json();
    });

    let data_submit = {
      categoryName: category.value,
      productName: product_name.value,
      serialNumber: serial_number.value,
      purchasePrice: purchase_price.value,
      purchaseDate: "2023-05-22",
      warrantyInYears: 5,
      warrantyExpireDate: "2028-06-03",
      //   productPhoto: {
      //     originalPath: "imgs/product_photo/product_photo_228_7926078118751846.jpg",
      //     photoName: "productPhoto",
      //   },
    };
    const submit = (e) => {
      e.preventDefault();
      console.log(data_submit);
      axios
        .post(`${Api_Url}/product-crud/products`, data_submit, {
          headers: { apiKey: Api_Key },
        })

        .then((res) => {
          console.log(res);
          alert("submited");
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
        });
    };

    return {
      submit,
      data_submit,
      category,
      product_name,
      serial_number,
      purchase_price,
      purchase_day,
      purchase_month,
      purchase_year,
      warranty,
      warranty_expire_day,
      warranty_expire_month,
      warranty_expire_year,
      state,
      has_warranty,
      success_text,
    };
  },
});
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container pl-[27px] pr-[40px]">
        <div class="relative bg-white rounded-lg dark:bg-gray-700">
          <button
            @click="$emit('close')"
            type="button"
            class="absolute top-3 right-2.5 text-[#4F4F4F] text-[16px] bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-hide="authentication-modal"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
          <div class="pt-[17px] pb-[38px]">
            <h3
              class="mb-[29px] text-xl text-center font-medium text-gray-900 dark:text-white"
            >
              Add New Product
            </h3>
            <form class="space-y-6" @submit.prevent="submit">
              <div class="flex justify-between">
                <div class="w-[30%] flex justify-end mr-4 items-center">
                  <label
                    for="category"
                    class="block mb-2 text-sm font-medium text-end text-gray-900 dark:text-white"
                    >Category <span class="text-red-600">*</span></label
                  >
                </div>
                <div class="justify-end w-[70%]">
                  <div class="w-[347px] h-[36px]">
                    <label class="">
                      <select
                        v-model="category"
                        class="bg-gray-50 border border-gray-300 text-gray-900 w-[90%] text-sm focus:ring-blue-500 focus:border-blue-500 m-auto block md:w-[100%] sm:w-[98%] p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2 md:mb-0"
                      >
                        <option
                          selected
                          v-for="(category_name, i) in state.category"
                          :key="i"
                          class="py-[9px] px-[12px] w-44 bg-indigo-50 text-bold rounded-lg text-black divide-y divide-gray-100 dark:bg-gray-700"
                        >
                          {{ category_name.name }}
                        </option>
                      </select>
                    </label>
                  </div>
                </div>
              </div>
              <div class="flex justify-between">
                <div class="w-[30%] flex justify-end mr-4 items-center">
                  <label
                    for="product_name"
                    class="block mb-2 text-sm font-medium text-end text-gray-900 dark:text-white"
                    >Product Name<span class="text-red-600">*</span></label
                  >
                </div>
                <div class="justify-end w-[70%]">
                  <div class="w-[347px] h-[36px]">
                    <label class="">
                      <select
                        v-model="product_name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 w-[90%] text-sm focus:ring-blue-500 focus:border-blue-500 m-auto block md:w-[100%] sm:w-[98%] p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2 md:mb-0"
                      >
                        <option
                          v-for="(product_name, i) in state.category"
                          :key="i"
                          class="py-[9px] px-[12px] w-44 bg-indigo-50 text-bold rounded-lg text-black divide-y divide-gray-100 dark:bg-gray-700"
                        >
                          {{ product_name.products[i].name }}
                        </option>
                      </select>
                    </label>
                  </div>
                </div>
              </div>
              <div class="flex justify-between">
                <div class="w-[30%] flex justify-end mr-4 items-center">
                  <label
                    for="serial_number"
                    class="block mb-2 text-sm font-medium text-end text-gray-900 dark:text-white"
                    >Serial Number
                  </label>
                </div>
                <div class="justify-end w-[70%]">
                  <input
                    v-model="serial_number"
                    type="serial_number"
                    name="serial_number"
                    id="serial_number"
                    class="py-[9px] px-[12px] bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-[347px] h-[36px] p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="5CDFGDSERY"
                    required
                  />
                </div>
              </div>
              <div class="flex justify-between">
                <div class="w-[30%] flex justify-end mr-4 items-center">
                  <label
                    for="purchase_price"
                    class="block mb-2 text-sm font-medium text-end text-gray-900 dark:text-white"
                    >Purchase Price<span class="text-red-600">*</span></label
                  >
                </div>
                <div class="justify-end w-[70%]">
                  <input
                    v-model="purchase_price"
                    type="purchase_price"
                    name="purchase_price"
                    id="purchase_price"
                    class="py-[9px] px-[12px] bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-[347px] h-[36px] p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="95620"
                    required
                  />
                </div>
              </div>

              <div class="flex justify-between">
                <div class="w-[30%] flex justify-end mr-4 items-center">
                  <label
                    for="purchase_date"
                    class="block mb-2 text-sm font-medium text-end text-gray-900 dark:text-white"
                    >Purchase Date<span class="text-red-600">*</span></label
                  >
                </div>
                <div class="flex w-[70%]">
                  <div class="w-[89px] h-[36px] mr-4">
                    <label class="w-[89px]">
                      <select
                        v-model="purchase_day"
                        class="bg-gray-50 border border-gray-300 text-gray-900 w-[90%] text-sm focus:ring-blue-500 focus:border-blue-500 m-auto block md:w-[100%] sm:w-[98%] p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2 md:mb-0"
                      >
                        <option
                          class="w-44 bg-indigo-50 text-bold rounded-lg text-black divide-y divide-gray-100 dark:bg-gray-700"
                        >
                          jjjj
                        </option>
                      </select>
                    </label>
                  </div>
                  <div class="w-[117px] h-[36px] mr-4">
                    <label class="w-[89px]">
                      <select
                        v-model="purchase_month"
                        class="bg-gray-50 border border-gray-300 text-gray-900 w-[90%] text-sm focus:ring-blue-500 focus:border-blue-500 m-auto block md:w-[100%] sm:w-[98%] p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2 md:mb-0"
                      >
                        <option
                          class="w-44 bg-indigo-50 text-bold rounded-lg text-black divide-y divide-gray-100 dark:bg-gray-700"
                        >
                          jjjj
                        </option>
                      </select>
                    </label>
                  </div>
                  <div class="w-[109px] h-[36px]">
                    <label class="w-[89px]">
                      <select
                        v-model="purchase_year"
                        class="bg-gray-50 border border-gray-300 text-gray-900 w-[90%] text-sm focus:ring-blue-500 focus:border-blue-500 m-auto block md:w-[100%] sm:w-[98%] p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2 md:mb-0"
                      >
                        <option
                          class="w-44 bg-indigo-50 text-bold rounded-lg text-black divide-y divide-gray-100 dark:bg-gray-700"
                        >
                          jjjj
                        </option>
                      </select>
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <div class="flex mb-[9px]">
                  <div class="flex w-[30%] justify-end mr-4 items-center"></div>
                  <div class="justify-start w-[70%]">
                    <div class="flex h-5">
                      <input
                        v-model="has_warranty"
                        id="remember"
                        type="checkbox"
                        value=""
                        class="w-4 h-4 border border-gray-300 bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                        required
                      />
                      <span
                        class="ml-1 flex items-end text-[14px] font-normal font-['Open_Sans'] text-[#333333]"
                        >Has Warranty</span
                      >
                    </div>
                  </div>
                </div>
                <div v-if="has_warranty === true" class="space-y-6">
                  <div class="flex justify-between">
                    <div class="w-[30%] flex justify-end mr-4 items-center">
                      <label
                        for="warranty"
                        class="block mb-2 text-sm font-medium text-end text-gray-900 dark:text-white"
                        >Warranty<span class="text-red-600">*</span></label
                      >
                    </div>
                    <div class="justify-end w-[70%]">
                      <div class="w-[347px] h-[36px]">
                        <label class="">
                          <select
                            v-model="warranty"
                            class="bg-gray-50 border border-gray-300 text-gray-900 w-[90%] text-sm focus:ring-blue-500 focus:border-blue-500 m-auto block md:w-[100%] sm:w-[98%] p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2 md:mb-0"
                          >
                            <option
                              class="w-44 bg-indigo-50 text-bold rounded-lg text-black divide-y divide-gray-100 dark:bg-gray-700"
                            >
                              jjjj
                            </option>
                          </select>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="flex justify-between">
                    <div class="w-[30%] flex justify-end mr-4 items-center">
                      <label
                        for="warranty_expire_date"
                        class="block mb-2 text-sm font-medium text-end text-gray-900 dark:text-white"
                        >Warranty Expire Date<span class="text-red-600">*</span></label
                      >
                    </div>
                    <div class="flex w-[70%]">
                      <div class="w-[89px] h-[36px] mr-4">
                        <label class="w-[89px]">
                          <select
                            v-model="warranty_expire_day"
                            class="bg-gray-50 border border-gray-300 text-gray-900 w-[90%] text-sm focus:ring-blue-500 focus:border-blue-500 m-auto block md:w-[100%] sm:w-[98%] p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2 md:mb-0"
                          >
                            <option
                              class="w-44 bg-indigo-50 text-bold rounded-lg text-black divide-y divide-gray-100 dark:bg-gray-700"
                            >
                              jjjj
                            </option>
                          </select>
                        </label>
                      </div>
                      <div class="w-[117px] h-[36px] mr-4">
                        <label class="w-[89px]">
                          <select
                            v-model="warranty_expire_month"
                            class="bg-gray-50 border border-gray-300 text-gray-900 w-[90%] text-sm focus:ring-blue-500 focus:border-blue-500 m-auto block md:w-[100%] sm:w-[98%] p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2 md:mb-0"
                          >
                            <option
                              class="w-44 bg-indigo-50 text-bold rounded-lg text-black divide-y divide-gray-100 dark:bg-gray-700"
                            >
                              jjjj
                            </option>
                          </select>
                        </label>
                      </div>

                      <div class="w-[109px] h-[36px]">
                        <label class="w-[89px]">
                          <select
                            v-model="warranty_expire_year"
                            class="bg-gray-50 border border-gray-300 text-gray-900 w-[90%] text-sm focus:ring-blue-500 focus:border-blue-500 m-auto block md:w-[100%] sm:w-[98%] p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2 md:mb-0"
                          >
                            <option
                              class="w-44 bg-indigo-50 text-bold rounded-lg text-black divide-y divide-gray-100 dark:bg-gray-700"
                            >
                              jjjj
                            </option>
                          </select>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex">
                <div class="flex w-[30%] justify-end mr-4 items-center"></div>
                <div class="justify-start w-[70%]">
                  <div class="flex items-center">
                    <button
                      type="submit"
                      class="mr-[65px] w-[149px] h-[42px] border border-[#BDBDBD] rounded-[4px] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm pr-2 pl-[15px] py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      <div>
                        <div class="flex items-center">
                          <img
                            src="../../../public/Image/Camera.svg"
                            class="p-1 rounded-full bg-[#E0E0E0] mr-[7px]"
                            alt=""
                          />
                          <p
                            class="text-[16px] font-semibold font-['Open_Sans'] text-[#333333]"
                          >
                            Add Image<span class="text-[#EF1A57]">*</span>
                          </p>
                        </div>
                      </div>
                    </button>
                    <div>
                      <img
                        src="../../../public/image 19.png"
                        alt="product image"
                        class="w-[134px] h-[134px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex">
                <div class="flex w-[30%] justify-end mr-4 items-center"></div>
                <div class="justify-end flex w-[70%]">
                  <div class="flex">
                    <img src="../../../public/Image/plus_circle.svg" class="" alt="" />
                    <button
                      type="submit"
                      class="w-[149px] h-[42px] rounded-[4px] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-1 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      <div class="w-[100%] h-[24px] rounded-full object-cover">
                        <span
                          class="text-[#0F75BC] w-[100%] text-[14px] font-semibold ml-[-15px]"
                          >Add more Product</span
                        >
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              <div class="flex">
                <div class="flex w-[30%] justify-end mr-4 items-center"></div>
                <div class="justify-end flex w-[70%]">
                  <div class="flex">
                    <button
                      @click="$emit('close')"
                      type="submit"
                      class="mr-[8px] w-[85px] h-[40px] flex justify-center items-center bg-[#fffff] border border-[#EB5757] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      <span
                        class="text-[#EB5757] w-[100%] px-[20px] py-[10px] text-[14px] font-semibold font-['Open_Sans']"
                        >Cancle</span
                      >
                    </button>
                    <button
                      @click="submit"
                      type="submit"
                      class="px-[20px] py-[10px] w-[72px] h-[40px] flex justify-center items-center bg-[#1890FF] border border-[#1890FF] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      <span
                        class="text-white w-[100%] text-[14px] font-semibold font-['Open_Sans']"
                        >Save</span
                      >
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 582px;
  height: auto;
  margin: auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
