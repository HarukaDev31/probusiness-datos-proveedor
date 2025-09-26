import { BaseService } from "~/services/base/BaseService"
import type { PaginationInfo } from "~/types/data-table"
import type { TrayectoResponse } from "~/types/clientes/importaciones/trayecto"
import type { InspeccionResponse } from "~/types/clientes/importaciones/inspeccion"
import type { SeguimientoResponse } from "~/types/clientes/importaciones/seguimiento"
export class TrayectoService extends BaseService {
    private static baseUrl = '/api/clientes/importaciones/trayecto'
    constructor() {
      super()
    }
    static async getTrayectos(params: any): Promise<TrayectoResponse> {
        try {
            const queryParams = new URLSearchParams()
            if (params.page) queryParams.append('page', params.page.toString())
            if (params.limit) queryParams.append('limit', params.limit.toString())
            if (params.search) queryParams.append('search', params.search)
            const response = await this.apiCall<TrayectoResponse>(`${this.baseUrl}?${queryParams.toString()}`)
            return response
        } catch (error) {
            console.error('Error en getTrayectos:', error)
            throw error
        }
    }
    static async getInspeccion(uuid: string): Promise<InspeccionResponse> {
        try {
            const response = await this.apiCall<InspeccionResponse>(`${this.baseUrl}/inspeccion/${uuid}`)
            return response
        } catch (error) {
            console.error('Error en getInspeccion:', error)
            throw error
        }
    }
    static async getSeguimiento(uuid: string): Promise<SeguimientoResponse> {
        try {
            const response = await this.apiCall<SeguimientoResponse>(`${this.baseUrl}/seguimiento/${uuid}`)
            return response
        } catch (error) {
            console.error('Error en getSeguimiento:', error)
            throw error
        }
    }
}