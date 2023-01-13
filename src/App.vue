<template>
  <main>
    <div class="container mx-auto sm:px-12 bg-gray-200 border p-8">
      <header>
        <div>
          <div class="text-4xl font-bold inline-block">Country Catalog App</div>
        </div>
      </header>

      <p class="text-gray-500 text-lg">Search, Sort, Paging with Vue3</p>
    </div>
    <div class="container mx-auto sm:px-12 bg-emerald-100 p-8">
      <div class="grid grid-cols-5 gap-3">
        <div class="rounded-xl bg-slate-50" v-for="country in countries" :key="country.idd">
          <div class="grid grid-cols-3 p-3 items-center">
            <div class="flex relative w-18 h-18 rounded-full justify-center items-center text-center overflow-hidden">
              <img :src="country.flags.png" alt="" class="object-cover h-20">
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
import { onMounted, ref } from "vue-demi";
import { axiosInstance } from "./libs/http"
import { Country } from "./types/Country";

const countries = ref<Country[]>([])

onMounted(async () => {
  const {data} = await axiosInstance.get('/all')
  console.warn('data', data)
  countries.value = data
})
</script>

<style scoped></style>
