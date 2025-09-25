<template>
    <div class="min-h-screen w-full flex items-start justify-center relative overflow-hidden">
      <div class="w-full relative">
        <!-- Skeleton Map Container -->
        <div class="relative w-full bg-gray-200 rounded-xl p-4 h-[400px] overflow-hidden">
          <!-- Skeleton SVG container -->
          <div class="absolute inset-0 w-full h-full flex items-center justify-center">
            <div class="animate-pulse flex flex-col items-center">
              <!-- Skeleton markers -->
              <div class="flex justify-between w-full px-8">
                <div class="flex flex-col items-center">
                  <div class="w-3 h-3 bg-gray-400 rounded-full mb-2"></div>
                  <div class="h-4 w-16 bg-gray-300 rounded"></div>
                </div>
                <div class="flex flex-col items-center">
                  <div class="w-3 h-3 bg-gray-400 rounded-full mb-2"></div>
                  <div class="h-4 w-16 bg-gray-300 rounded"></div>
                </div>
              </div>
              
              <!-- Skeleton path -->
              <div class="relative w-full my-8">
                <div class="h-1 bg-gray-300 rounded-full w-full"></div>
                <div class="absolute top-0 left-0 h-1 bg-gray-400 rounded-full w-1/3"></div>
              </div>
              
              <!-- Skeleton ship -->
              <div class="w-10 h-10 bg-gray-300 rounded-lg"></div>
            </div>
          </div>
        </div>
        
        <!-- Skeleton Status Information -->
        <div class="mt-4 animate-pulse">
          <div class="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div class="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
          <div class="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  // No script needed for the skeleton component
  </script>
  
  <style scoped>
  /* Add any specific styles if needed */
  </style>