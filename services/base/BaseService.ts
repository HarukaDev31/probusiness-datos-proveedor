export class BaseService {
  protected static nuxtApp: any = null

  static initializeAllServices(app: any) {
    this.nuxtApp = app
  }

  protected static async apiCall<T>(endpoint: string, options: any = {}): Promise<T> {
    try {
      console.log('🔧 BaseService: Iniciando API call a:', endpoint)
      console.log('🔧 BaseService: Options:', options)
      console.log('🔧 BaseService: NuxtApp disponible:', !!this.nuxtApp)
      
      if (!this.nuxtApp) {
        throw new Error('Nuxt app not initialized')
      }
      
      console.log('🔧 BaseService: Llamando a $api.call...')
      const result = await this.nuxtApp.$api.call(endpoint, options)
      console.log('✅ BaseService: Resultado recibido:', result)
      return result as T
    } catch (error: any) {
      const status = error?.status || error?.statusCode
      const backendMessage = error?.data?.message || error?.message || 'Error desconocido'
      console.error('❌ BaseService: Error in apiCall:', status, backendMessage)
      console.error('❌ BaseService: Error completo:', error)
      throw new Error(backendMessage)
    }
  }
} 