<template>
    <div
      class="wave-progress-container"
      :style="{ width: width + 'px', height: height + 'px' }"
    >
      <!-- Contenedor principal con fondo gris -->
      <div class="progress-bar-container">
        <!-- Área de progreso con efecto de ola -->
        <div class="progress-fill" :style="{ height: `${percentage}%` }">
          <!-- Primera capa de olas -->
          <div class="wave-effect wave-effect-1">
            <svg width="100%" height="20" preserveAspectRatio="none">
              <defs>
                <linearGradient
                  id="waveGradient1"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stop-color="rgba(255,255,255,0.8)" />
                  <stop offset="100%" stop-color="rgba(255,255,255,0)" />
                </linearGradient>
              </defs>
              <path
                d="M0,20 C20,7 40,18 60,12 C80,6 100,18 120,12 C140,6 160,18 180,12 C200,6 220,18 240,12 C260,6 280,18 300,12 L300,0 L0,0 Z"
                fill="url(#waveGradient1)"
                class="wave-path"
              >
                <animate
                  attributeName="d"
                  values="
                    M0,20 C20,7 40,18 60,12 C80,6 100,18 120,12 C140,6 160,18 180,12 C200,6 220,18 240,12
                    C260,6 280,18 300,12 L300,0 L0,0 Z;
                    
                    M0,20 C20,18 40,7 60,12 C80,18 100,7 120,12 C140,18 160,7 180,12 C200,18 220,7 240,12
                    C260,18 280,7 300,12 L300,0 L0,0 Z;
                    
                    M0,20 C20,7 40,18 60,12 C80,6 100,18 120,12 C140,6 160,18 180,12 C200,6 220,18 240,12
                    C260,6 280,18 300,12 L300,0 L0,0 Z
                  "
                  dur="4s"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          </div>
  
          <!-- Segunda capa de olas con diferente sincronización -->
          <div class="wave-effect wave-effect-2">
            <svg width="100%" height="15" preserveAspectRatio="none">
              <defs>
                <linearGradient
                  id="waveGradient2"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stop-color="rgba(255,255,255,0.6)" />
                  <stop offset="100%" stop-color="rgba(255,255,255,0)" />
                </linearGradient>
              </defs>
              <path
                d="M0,15 C30,8 60,15 90,10 C120,5 150,15 180,10 C210,5 240,15 270,10 L300,10 L300,0 L0,0 Z"
                fill="url(#waveGradient2)"
                class="wave-path"
              >
                <animate
                  attributeName="d"
                  values="
                    M0,15 C30,8 60,15 90,10 C120,5 150,15 180,10 C210,5 240,15 270,10 L300,10 L300,0 L0,0 Z;
                    M0,15 C30,15 60,5 90,10 C120,15 150,5 180,10 C210,15 240,5 270,10 L300,10 L300,0 L0,0 Z;
                    M0,15 C30,8 60,15 90,10 C120,5 150,15 180,10 C210,5 240,15 270,10 L300,10 L300,0 L0,0 Z
                  "
                  dur="3s"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          </div>
  
          <!-- Burbujas animadas para efecto adicional -->
          <div class="bubbles">
            <div class="bubble bubble-1"></div>
            <div class="bubble bubble-2"></div>
            <div class="bubble bubble-3"></div>
            <div class="bubble bubble-4"></div>
          </div>
        </div>
  
        <!-- Líneas verticales blancas (más juntas) -->
        <div class="vertical-lines">
          <div
            v-for="index in lineCount"
            :key="index"
            class="vertical-line"
          ></div>
        </div>
      </div>
  
      <!-- Etiqueta opcional para mostrar el porcentaje -->
      <div v-if="showLabel" class="percentage-label">
        <span>Contenedor al:</span>
        <h2><strong>{{ Math.round(percentage) }}%</strong></h2>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      // Porcentaje de llenado (0-100)
      percentage: {
        type: Number,
        default: 0,
        validator: (value) => value >= 0 && value <= 100,
      },
      // Ancho del componente en píxeles
      width: {
        type: Number,
        default: 200,
      },
      // Alto del componente en píxeles
      height: {
        type: Number,
        default: 120,
      },
      // Número de líneas verticales
      lineCount: {
        type: Number,
        default: 7,
      },
      // Color del fondo (gris por defecto)
      backgroundColor: {
        type: String,
        default: "#d9d9d9",
      },
      // Color de llenado (verde por defecto)
      fillColor: {
        type: String,
        default: "#2ecc71",
      },
      // Mostrar etiqueta de porcentaje
      showLabel: {
        type: Boolean,
        default: false,
      },
    },
  };
  </script>
  
  <style scoped>
  .wave-progress-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  
  .progress-bar-container {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: v-bind(backgroundColor);
    border-radius: 0.8em;
    overflow: hidden;
  }
  
  .progress-fill {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: linear-gradient(
      to bottom,
      v-bind(fillColor),
      color-mix(in srgb, v-bind(fillColor), black 20%)
    );
    transition: height 0.7s cubic-bezier(0.23, 1, 0.32, 1);
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
  }
  
  .wave-effect {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
  }
  
  .wave-effect-1 {
    height: 20px;
    z-index: 2;
  }
  
  .wave-effect-2 {
    height: 15px;
    z-index: 1;
    opacity: 0.8;
  }
  
  .vertical-lines {
    position: absolute;
    top: 15%;
    left: 10%;
    width: 80%;
    height: 70%;
    display: flex;
    justify-content: space-between;
    transform: translateY(20%, 30%);
  
    padding: 0 2px;
    pointer-events: none;
    z-index: 3;
  }
  
  .vertical-line {
    height: 100%;
    display: flex;
    border-radius: 0.2em;
    width: 5px; /* Líneas más delgadas para que quepan más */
    background-color: white;
  }
  
  .percentage-label {
    color: #333;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1em;
  }
  
  /* Animación mejorada para simular ondulación de agua */
  @keyframes ripple {
    0% {
      transform: translateY(0) scaleY(1);
    }
    25% {
      transform: translateY(-2px) scaleY(1.03);
    }
    50% {
      transform: translateY(-4px) scaleY(1.05);
    }
    75% {
      transform: translateY(-2px) scaleY(1.03);
    }
    100% {
      transform: translateY(0) scaleY(1);
    }
  }
  
  .progress-fill {
    animation: ripple 3s ease-in-out infinite;
  }
  
  /* Burbujas para mejorar el efecto acuático */
  .bubbles {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  
  .bubble {
    position: absolute;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 50%;
    bottom: -20px;
  }
  
  .bubble-1 {
    width: 10px;
    height: 10px;
    left: 10%;
    animation: float 4s ease-in infinite;
  }
  
  .bubble-2 {
    width: 8px;
    height: 8px;
    left: 30%;
    animation: float 6s ease-in infinite 1s;
  }
  
  .bubble-3 {
    width: 12px;
    height: 12px;
    left: 60%;
    animation: float 5s ease-in infinite 2s;
  }
  
  .bubble-4 {
    width: 7px;
    height: 7px;
    left: 80%;
    animation: float 4.5s ease-in infinite 0.5s;
  }
  
  @keyframes float {
    0% {
      transform: translateY(0);
      opacity: 0;
    }
    10% {
      opacity: 0.8;
    }
    100% {
      transform: translateY(-100px);
      opacity: 0;
    }
  }
  
  /* Adaptaciones para hacer el movimiento más pronunciado */
  .wave-path {
    transform-origin: center top;
    animation: wavyMovement 3s ease-in-out infinite alternate;
  }
  
  @keyframes wavyMovement {
    0% {
      transform: scaleY(1);
    }
    50% {
      transform: scaleY(1.2);
    }
    100% {
      transform: scaleY(1);
    }
  }
  </style>