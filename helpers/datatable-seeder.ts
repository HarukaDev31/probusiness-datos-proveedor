import type { ContainerJourney } from '~/types/containers'

export const journeySeeder = (count: number): ContainerJourney[] => {
  const journeys: ContainerJourney[] = []
  
  for (let i = 1; i <= count; i++) {
    const journey: ContainerJourney = {
      id: i,
      carga: `Carga ${i.toString().padStart(3, '0')}`,
      closeDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      arrivalDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      deliveryDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      qtyBox: Math.floor(Math.random() * 1000) + 10,
      cbm: Math.floor(Math.random() * 100) + 1,
      fob: Math.floor(Math.random() * 100000) + 1000,
      logistic: Math.floor(Math.random() * 50000) + 500
    }
    journeys.push(journey)
  }
  
  return journeys
}
