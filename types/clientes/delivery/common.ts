export interface AgenciesOptions{
    label: string
    value: string
}
export interface ClientesOptions{
    label: string
    value: string
}
export interface ClientesResponse{
    data: ClientesOptions[]
    carga: string
    success: boolean
}
export interface AgenciesResponse{
    data: AgenciesOptions[]
    success: boolean
}