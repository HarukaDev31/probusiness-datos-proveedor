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
    key: string,
    name: string,
    status: string,
    description: string,
    date: string,
}
export interface ContainerInspectionProviders{
    id:number,
    name:string,
    files: FileItem[],
    notes: string,
}
