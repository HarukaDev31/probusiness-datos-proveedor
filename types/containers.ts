import type { FileItem } from "./commons/file"
export interface ContainerJourney extends Container {
  qtyBox: number | null
  cbm: number | null
  fob: number | null
  logistic: number | null
  tax: number | null
  seekingUuid: string | null
}
export interface Container {
    id: number
    carga: number
    type: number
    progress: number
    status: string
    userIsPresent: boolean
    closeDate?: string
    shipDate?: string
    arrivalDate?: string
    deliveryDate?: string
    createdAt?: string
}
export interface ContainerJourney extends Container {
    qtyBox: number | null
    cbm: number | null
    fob: number | null
    logistic: number | null
    tax: number | null
    seekingUuid: string | null
}
export interface ContainerJourneyStatus {
    id: number,
    name: string,
    date: string,
    status: number,
    title: string,
    description?: string,
    icon: string,
    containerId: number,
}
export interface ContainerInspectionProviders{
    id:number,
    name:string,
    files: FileItem[],
    notes: string,
}
