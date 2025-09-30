export interface HorarioResponse {
    data: Horario[]
    success: boolean
}
export interface Horario {
    date_id: number
    date: string
    day: number
    month: number
    year: number
    slots:HorarioTime[]
}
export interface HorarioTime {
    range_id: string
    start_time: string
    end_time: string
    available: number
    
}