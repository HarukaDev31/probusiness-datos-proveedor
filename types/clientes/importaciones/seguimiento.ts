export interface SeguimientoResponse {
    data: Seguimiento[]
    success: boolean
}

export interface Seguimiento {
    key: string
    name: string
    status: string
    description: string
    date: string
}