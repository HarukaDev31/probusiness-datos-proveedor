<template>
  <div class="w-full flex flex-col justify-center items-center mx-auto bg-white dark:bg-gray-800 rounded-2xl py-6 shadow-sm">
    <!-- Header -->
    <div class="w-full text-center mb-4">
      <div class="h-5 bg-gray-300 dark:bg-gray-600 rounded w-3/5 mx-auto mb-4 animate-pulse"></div>
      <div class="w-full h-0.5 bg-gray-300 dark:bg-gray-600 animate-pulse delay-100"></div>
    </div>
    
    <!-- Body -->
    <div class="w-full flex items-center flex-row gap-8 px-4">
      <!-- Details Section -->
      <div class="w-full flex flex-col justify-center items-center h-full gap-6">
        <!-- Description Item 1 -->
        <div class="flex flex-row justify-center items-center gap-4 w-full">
          <div class="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse delay-200"></div>
          <div class="flex-1">
            <div class="h-3.5 bg-gray-300 dark:bg-gray-600 rounded w-4/5 animate-pulse delay-200"></div>
          </div>
        </div>
        
        <!-- Description Item 2 -->
        <div class="flex flex-row justify-center items-center gap-4 w-full">
          <div class="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse delay-300"></div>
          <div class="flex-1">
            <div class="h-3.5 bg-gray-300 dark:bg-gray-600 rounded w-4/5 animate-pulse delay-300"></div>
          </div>
        </div>
        
        <!-- Description Item 3 -->
        <div class="flex flex-row justify-center items-center gap-4 w-full">
          <div class="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse delay-500"></div>
          <div class="flex-1">
            <div class="h-3.5 bg-gray-300 dark:bg-gray-600 rounded w-4/5 animate-pulse delay-500"></div>
          </div>
        </div>
        
        <!-- Description Item 4 -->
        <div class="flex flex-row justify-center items-center gap-4 w-full">
          <div class="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse delay-700"></div>
          <div class="flex-1">
            <div class="h-3.5 bg-gray-300 dark:bg-gray-600 rounded w-4/5 animate-pulse delay-700"></div>
          </div>
        </div>
      </div>
      
      <!-- Progress Section -->
      <div class="flex flex-col items-center gap-4">
        <!-- Progress Rectangle (replacing circular progress) -->
        <div class="w-45 h-38 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse delay-100"></div>
        <!-- Button -->
        <div class="w-25 h-9 bg-gray-300 dark:bg-gray-600 rounded animate-pulse delay-1000"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No se requiere lógica adicional para el skeleton
</script>

<style scoped>
/* Animaciones personalizadas con delays */
.delay-100 {
  animation-delay: 0.1s;
}
.delay-200 {
  animation-delay: 0.2s;
}
.delay-300 {
  animation-delay: 0.3s;
}
.delay-500 {
  animation-delay: 0.5s;
}
.delay-700 {
  animation-delay: 0.7s;
}
.delay-1000 {
  animation-delay: 1s;
}
</style>
