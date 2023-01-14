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
              class="block p-3 pl-5 w-full rounded-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search By Country Name"
            />
          </div>
          <div class="py-4">
            <button
              class="border-solid border-2 border-indigo-500 p-2 w-24"
              :class="{
                'border-none bg-gray-300 p-2 w-24': isFirstPage,
              }"
              :disabled="isFirstPage"
              @click="prev"
            >
              Prev
            </button>
            <button
              class="border-solid border-2 border-indigo-600 p-2 w-24"
              :class="{
                'border-none bg-gray-300 p-2 w-24': currentPage === item,
              }"
              v-for="item in pageCount"
              :key="item"
              :disabled="currentPage === item"
              @click="currentPage = item"
            >
              {{ item }}
            </button>
            <button
              class="border-solid border-2 border-indigo-600 p-2 w-32"
              :class="{
                'border-none bg-gray-300 p-2 w-24': isLastPage,
              }"
              :disabled="isLastPage"
              @click="next"
            >
              Next
            </button>
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
              <p>Description</p>
              <button class="rounded-full bg-emerald-300 pr-3 pl-3">Read more</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { onBeforeMount, onMounted, ref, Ref } from 'vue'
import { useOffsetPagination } from '@vueuse/core'
import { axiosInstance } from './libs/http'
import { Country } from './types/Country'

const countryData = ref<Country[]>([])
const totalItems = ref()

onBeforeMount(async () => {
  const { data } = await axiosInstance.get('/all')
  countryData.value = data
  totalItems.value = countryData.value.length
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
</script>
