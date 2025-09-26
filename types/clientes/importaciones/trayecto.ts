import type { PaginationInfo } from "~/types/data-table"

export interface Trayecto {
    id: string
    id_contenedor: number
    carga: string
    fecha_cierre: string
    fecha_arribo: string
    fecha_entrega: string
    qty_box: number
    cbm: number
    fob: string
    logistica: string
}
export interface TrayectoResponse {
    data: Trayecto[],
    success: boolean,
    pagination: PaginationInfo
}