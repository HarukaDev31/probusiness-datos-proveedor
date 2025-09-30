import { BaseService } from '~/services/base/BaseService'
import type { UserProfile, UserProfileResponse, UserBusiness } from '~/types/userprofile'

export class ProfileService extends BaseService {
    private static baseUrl = 'api/auth/clientes'
    
    // Función auxiliar para debug del FormData
    private static debugFormData(formData: FormData) {
        console.log('FormData contents:');
        for (const [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }
    }
    
    static async getProfile(): Promise<UserProfileResponse> {
        try {
            const response = await this.apiCall<UserProfileResponse>(`${this.baseUrl}/me`)
            return response
        } catch (error) {
            console.error('Error al cargar el perfil:', error)
            throw error
        }
    }

    static async updateProfile(profileData: Partial<UserProfile>, photoFile?: File): Promise<UserProfileResponse> {
        try {
            const formData = new FormData()
            
            // Agregar campos del perfil (incluir campos vacíos también)
            if (profileData.fullName !== undefined) formData.append('full_name', profileData.fullName)
            if (profileData.email !== undefined) formData.append('email', profileData.email)
            if (profileData.documentNumber !== undefined) formData.append('document_number', profileData.documentNumber)
            if (profileData.age !== undefined) formData.append('age', profileData.age.toString())
            if (profileData.country !== undefined) formData.append('country', profileData.country)
            if (profileData.city !== undefined) formData.append('city', profileData.city)
            if (profileData.phone !== undefined) formData.append('phone', profileData.phone)
            if (profileData.goals !== undefined) formData.append('goals', profileData.goals)
            
            // Agregar foto si existe
            if (photoFile) {
                formData.append('photo', photoFile)
            }

            const response = await this.apiCall<UserProfileResponse>(`${this.baseUrl}/profile`, {
                method: 'POST',
                body: formData
            })
            return response
        } catch (error) {
            console.error('Error al actualizar el perfil:', error)
            throw error
        }
    }

    static async updateBusiness(businessData: Partial<UserBusiness>): Promise<{ business: UserBusiness }> {
        try {
            const formData = new FormData()
            
            // Agregar campos de la empresa (incluir campos vacíos también)
            if (businessData.name !== undefined) formData.append('business_name', businessData.name)
            if (businessData.ruc !== undefined) formData.append('business_ruc', businessData.ruc)
            if (businessData.comercialCapacity !== undefined) formData.append('comercial_capacity', businessData.comercialCapacity)
            if (businessData.rubric !== undefined) formData.append('rubric', businessData.rubric)
            if (businessData.socialAddress !== undefined) formData.append('social_address', businessData.socialAddress)

            // Debug: mostrar contenido del FormData
            this.debugFormData(formData);

            const response = await this.apiCall<{ business: UserBusiness }>(`${this.baseUrl}/business`, {
                method: 'POST',
                body: formData
            })
            return response
        } catch (error) {
            console.error('Error al actualizar la empresa:', error)
            throw error
        }
    }

    static async uploadProfilePhoto(file: File): Promise<{ photoUrl: string }> {
        try {
            const formData = new FormData()
            formData.append('photo', file)

            const response = await this.apiCall<{ photoUrl: string }>(`${this.baseUrl}/photo`, {
                method: 'POST',
                body: formData
            })
            return response
        } catch (error) {
            console.error('Error al subir la foto:', error)
            throw error
        }
    }
}