<template>
  <main>
    <div class="container mx-auto sm:px-12 bg-gray-200 border p-8">
      <header>
        <div>
          <div class="text-4xl font-bold inline-block">Country Catalog App</div>
        </div>
        <p class="text-gray-500 text-lg">Search, Sort, Paging with Vue3</p>
        <br />
        <div class="items-center">
          <div>
            <input
              id="default-search"
              type="search"
              v-model="searchCriteria"
              class="block p-3 pl-5 w-full rounded-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search By Country Name"
            />
          </div>

          <div class="py-2 flex items-center justify-center">
            <button
              class="border-solid border-2 border-sky-700 p-2 w-24"
              :class="{
                'bg-gray-300 border-sky-700 text-white button-alt p-2 w-24': isFirstPage,
              }"
              :disabled="isFirstPage"
              @click="prev"
            >
              Prev
            </button>
            <button
              class="border-solid border-2 border-sky-700 p-2 w-24"
              :class="{
                'bg-sky-700 border-sky-700 text-white button-alt p-2 w-24': currentPage === item,
              }"
              v-for="item in pageCount"
              :key="item"
              :disabled="currentPage === item"
              @click="currentPage = item"
            >
              {{ item }}
            </button>
            <button
              class="border-solid border-2 border-sky-700 p-2 w-32"
              :class="{
                'bg-gray-300 border-sky-700 text-white button-alt p-2 w-24': isLastPage,
              }"
              :disabled="isLastPage"
              @click="next"
            >
              Next
            </button>
          </div>

          <div class="flex gap-x-2 flex-wrap items-center justify-center">
            <button
              :class="{
                'bg-sky-700 text-white': orderNameBy === OrderBy.ASC,
              }"
              class="button-alt border-2 border-sky-700 hover:text- p-2 w-32"
              @click="orderCountryNameBy(OrderBy.ASC)"
            >
              Ascending
            </button>
            <button
              :class="{
                'bg-sky-700 text-white': orderNameBy === OrderBy.DESC,
              }"
              class="button-alt border-2 border-sky-700 hover:text-white p-2 w-32"
              @click="orderCountryNameBy(OrderBy.DESC)"
            >
              Descending
            </button>
            <!-- <button class="button" @click="reset">Reset</button> -->
          </div>
        </div>
      </header>
    </div>
    <div class="container mx-auto sm:px-12 bg-emerald-100 p-8">
      <div class="grid grid-cols-5 gap-3">
        <div class="rounded-xl bg-slate-50" v-for="country in displayCountries" :key="country.idd">
          <div class="grid grid-cols-3 p-3 items-center">
            <div
              class="flex relative w-18 h-18 rounded-full justify-center items-center text-center overflow-hidden"
            >
              <img :src="country.flags.png" alt="" class="object-cover h-20" />
            </div>
            <div class="col-span-2 bg-slate-50 pl-5">
              <p class="font-bold truncate">{{ country.name.official }}</p>
              <p class="truncate text-xs">
                <span class="font-bold truncate text-xs">{{ country.idd.root }}</span>
                <span
                  class="font-bold truncate text-xs"
                  v-for="idd in country.idd.suffixes"
                  :key="idd"
                >
                  <span v-if="country.idd.suffixes.length < 2">{{ idd }}</span>
                </span>
                {{ country.cca2 }} | {{ country.cca3 }}
              </p>

              <span v-if="country.name.nativeName">
                <p class="truncate text-xs" v-for="zho in country.name.nativeName.zho" :key="zho">
                  {{ country.name.nativeName.zho.official }}
                </p>
              </span>

              <p
                class="truncate text-xs break-normal"
                v-for="altSpelling in country.altSpellings.slice(1)"
                :key="altSpelling"
              >
                {{ altSpelling }}
              </p>
              <p></p>
            </div>
            <div>
              <button
                @click="readMoreModal(country)"
                class="rounded-full truncate bg-emerald-600 text-white p-1 mt-1 w-full text-xs"
              >
                Read More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                {{ selectedCountry?.name.official }} -
                {{ selectedCountry?.translations.zho.official }}
              </DialogTitle>
              <div class="mt-2">
                <div class="grid grid-flow-col auto-cols-max gap-x-4">
                  <div class="flex relative items-left text-center overflow-hidden">
                    <img
                      :src="selectedCountry?.flags.png"
                      :alt="selectedCountry?.flag"
                      class="object-cover h-20"
                    />
                  </div>
                  <div class="text-sm">
                    <p class="">
                      <span class="font-bold">Area </span>
                      <span> {{ selectedCountry?.area }}km²</span>
                    </p>
                    <p v-for="continent in selectedCountry?.continents" :key="continent">
                      <span class="font-bold">Continent </span> <span> {{ continent }}</span>
                    </p>
                    <p>
                      <span class="font-bold">Population </span>
                      <span>{{ selectedCountry?.population }}</span>
                    </p>
                    <p>
                      <span class="font-bold" v-if="selectedCountry?.capital">Capital </span>
                      <span v-for="capital in selectedCountry?.capital" :key="capital">{{
                        capital
                      }}</span>
                    </p>
                  </div>
                </div>
                <div class="text-sm">
                  <p>
                    <span v-if="selectedCountry?.independent">An Independent Country </span>
                    <span v-if="selectedCountry?.unMember">and one of UN Members, </span>
                    <span>Alternative Spelling </span
                    > <span
                      v-for="altSpelling in selectedCountry?.altSpellings"
                      :key="altSpelling"
                      > {{ altSpelling }}, </span
                    >
                    <span>Timezone</span> <span v-for="timezone in selectedCountry?.timezones" :key="timezone">{{ timezone }}, </span>
                    <span>Start of the Week is {{ selectedCountry?.startOfWeek }}</span>
                  </p>
                  <p>
                    
                  </p>
                </div>
              </div>

              <div class="mt-4 grid justify-items-end">
                <button
                  type="button"
                  class="rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="closeModal"
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts" setup>
import { onBeforeMount, onMounted, ref, Ref, watch } from 'vue'
import { useOffsetPagination } from '@vueuse/core'
import { axiosInstance } from './libs/http'
import { Country } from './types/Country'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
} from '@headlessui/vue'
import { _ } from 'lodash'

const isOpen = ref(false)
const selectedCountry = ref<Country>()

function closeModal() {
  isOpen.value = false
}

function readMoreModal(country: Country) {
  selectedCountry.value = country
  isOpen.value = true
}

// Fetching data from api
const countryData = ref<Country[]>([])
const totalItems = ref()

onBeforeMount(async () => {
  const { data } = await axiosInstance.get('/all')
  countryData.value = data
  totalItems.value = countryData.value.length

  orderCountryNameBy(OrderBy.ASC)
  getDefault()
})

// Paging
function fetch(page: number, pageSize: number) {
  return new Promise<Country[]>((resolve, reject) => {
    const start = (page - 1) * pageSize
    const end = start + pageSize
    setTimeout(() => {
      resolve(countryData.value.slice(start, end))
    }, 100)
  })
}

const displayCountries: Ref<Country[]> = ref([])
const page = ref(1)
const pageSize = ref(25)

fetchData({
  currentPage: page.value,
  currentPageSize: pageSize.value,
})

function fetchData({
  currentPage,
  currentPageSize,
}: {
  currentPage: number
  currentPageSize: number
}) {
  fetch(currentPage, currentPageSize).then((responseData) => {
    displayCountries.value = responseData
  })
}

const { currentPage, currentPageSize, pageCount, isFirstPage, isLastPage, prev, next } =
  useOffsetPagination({
    total: totalItems,
    page: 1,
    pageSize,
    onPageChange: fetchData,
    onPageSizeChange: fetchData,
  })

// Searching
let searchTimeout: any
const searchCriteria = ref('')

watch(searchCriteria, () => {
  clearTimeout(searchTimeout)

  if (searchCriteria.value) {
    displayCountries.value = countryData.value?.filter((country) =>
      country.name.official.toLowerCase().includes(searchCriteria.value.toLowerCase())
    )
  } else {
    displayCountries.value = countryData.value
  }
})

// Ordering
enum OrderBy {
  ASC = 'ASC',
  DESC = 'DESC',
}
const orderNameBy = ref()

const orderCountryNameBy = (order: OrderBy) => {
  orderNameBy.value = order

  countryData.value = _.orderBy(
    countryData.value,
    ['name.official'],
    OrderBy[order].toLocaleLowerCase()
  )

  getDefault()
}

const getDefault = () => {
  page.value = 1
  currentPage.value = 1
  fetchData({
    currentPage: page.value,
    currentPageSize: pageSize.value,
  })
}
</script>
