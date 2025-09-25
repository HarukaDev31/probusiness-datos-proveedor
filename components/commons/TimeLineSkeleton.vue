<template>
    <div class="w-3/4 min-h-screen mx-auto animate-pulse ">
      <!-- Timeline Skeleton -->
      <div class="flex flex-col space-y-8 ">
        <!-- Repeat skeleton items for the expected number of timeline entries -->
        <div v-for="i in 5" :key="i" class="flex gap-4">
          <!-- Marker/Connector Column -->
          <div class="flex flex-col items-center w-10">
            <!-- Marker -->
            <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"></div>
            <!-- Connector -->
            <div class="w-2 h-full bg-gray-200 mt-2"></div>
          </div>
  
          <!-- Content Column -->
          <div class="flex-1 pt-1">
            <div class="flex flex-row justify-between mb-2">
              <div class="h-5 bg-gray-200 rounded w-1/3"></div>
              <div class="h-5 bg-gray-200 rounded w-1/4"></div>
            </div>
            <div class="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
            <div class="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  // You can customize the number of skeleton items shown
  const skeletonItems = 5;
  </script>
  
  <style scoped>
  /* Add any custom styles if needed */
  </style>