<template>
    <div class="container-item skeleton-container">
      <div class="container-item__header">
        <div class="skeleton-line skeleton-title pulse-element"></div>
        <div class="container-item__divider skeleton-divider pulse-element delay-1"></div>
      </div>
      <div class="container-item__body">
        <div class="container-item__details">
          <div class="container-item__description skeleton-description">
            <div class="skeleton-icon pulse-element delay-2"></div>
            <div class="skeleton-text">
              <div class="skeleton-line skeleton-line--medium pulse-element delay-2"></div>
            </div>
          </div>
          <div class="container-item__description skeleton-description">
            <div class="skeleton-icon pulse-element delay-3"></div>
            <div class="skeleton-text">
              <div class="skeleton-line skeleton-line--medium pulse-element delay-3"></div>
            </div>
          </div>
          <div class="container-item__description skeleton-description">
            <div class="skeleton-icon pulse-element delay-4"></div>
            <div class="skeleton-text">
              <div class="skeleton-line skeleton-line--medium pulse-element delay-4"></div>
            </div>
          </div>
          <div class="container-item__description skeleton-description">
            <div class="skeleton-icon pulse-element delay-5"></div>
            <div class="skeleton-text">
              <div class="skeleton-line skeleton-line--medium pulse-element delay-5"></div>
            </div>
          </div>
        </div>
        <div class="container-item__progress">
          <div class="skeleton-progress-rectangle pulse-element delay-1"></div>
          <div class="skeleton-button pulse-element delay-6"></div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  // No se requiere lógica adicional para el skeleton
  </script>
  
  <style scoped >
  
 
  
  .skeleton-line {
    height: 14px;
    background-color: #e0e0e0;
    border-radius: 4px;
    width: 100%;
  }
  
  .skeleton-title {
    width: 60%;
    height: 20px;
    margin: 1em auto;
  }
  
  .skeleton-divider {
    background-color: #e0e0e0 !important;
  }
  
  .skeleton-description {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
  }
  
  .skeleton-icon {
    width: 20px;
    height: 20px;
    background-color: #e0e0e0;
    border-radius: 50%;
    margin-right: 10px;
  }
  
  .skeleton-text {
    flex: 1;
    width: 100%;
  }
  
  .skeleton-line--medium {
    width: 80%;
  }
  
  .skeleton-progress-rectangle {
    width: 180px;
    height: 150px;
    background-color: #e0e0e0;
    border-radius: 8px;
    margin-bottom: 16px;
  }
  
  .container-item__description {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  
  .skeleton-button {
    width: 100px;
    height: 36px;
    background-color: #e0e0e0;
    border-radius: 6px;
    margin: 0 auto;
  }
  
  /* Animación de pulso para cada elemento individual */
  .pulse-element {
    animation: pulse 1.5s infinite;
  }
  
  /* Retrasos para crear efecto de onda */
  .delay-1 {
    animation-delay: 0.1s;
  }
  
  .delay-2 {
    animation-delay: 0.2s;
  }
  
  .delay-3 {
    animation-delay: 0.3s;
  }
  
  .delay-4 {
    animation-delay: 0.4s;
  }
  
  .delay-5 {
    animation-delay: 0.5s;
  }
  
  .delay-6 {
    animation-delay: 0.6s;
  }
  
  @keyframes pulse {
    0% {
      opacity: 0.6;
    }
    50% {
      opacity: 0.9;
    }
    100% {
      opacity: 0.6;
    }
    50% {
      opacity: 0.9;
    }
    0% {
      opacity: 0.6;
    }
  }
  </style>