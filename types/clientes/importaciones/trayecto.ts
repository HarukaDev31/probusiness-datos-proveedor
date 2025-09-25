import type { PaginationInfo } from "~/types/data-table"
/**
 * "id": 529,
            "id_contenedor": 59,
            "carga": "9",
            "fecha_cierre": "2025-06-16T00:00:00.000000Z",
            "fecha_arribo": "2025-07-27T00:00:00.000000Z",
            "fecha_entrega": "2025-08-18T00:00:00.000000Z",
            "qty_box": 0,
            "cbm": 0,
            "fob": "1527.80",
            "logistica": "731.25",
 */
export interface Trayecto {
    id: number
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