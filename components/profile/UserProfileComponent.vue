<template>
    <div class="p-8">
        <h1 class="text-xl font-medium text-onix-pro">Mi cuenta</h1>
    </div>
    
    <div class="user-profile p-8">
        <!-- Información Personal -->
        <UCard class="profile-header flex" style="grid-area: profile-header;">
            <div class="edit-header flex flex-row w-full justify-end items-end">
                <UButton variant="ghost" @click="toggleEditProfile"
                    :icon="isEditingProfile ? 'i-heroicons-x-mark' : 'i-heroicons-pencil'" class="h-8 w-8 align-end justify-end items-end">
                </UButton>
            </div>
            <div class="profile-info px-4">
                <div class="pb-10">
                    <div class="profile-avatar__container">
                        <UAvatar :src="previewImage || userProfile.photoUrl" alt="Foto de perfil" class="profile-avatar" />
                    
                        <div class="profile-avatar__overlay" v-if="isEditingProfile" @click="openSimpleUploadFile()">
                            <UButton variant="solid" class="h-8 w-8 text-white rounded-full" @click="openSimpleUploadFile()" icon="i-heroicons-camera" color="primary"  >
                            </UButton>
                            
                        </div>
                    </div>

                    <h2 class="profile-name">{{ userProfile.fullName || '-' }}</h2>
                    <p class="profile-dni">DNI: {{ userProfile.documentNumber || '-' }}</p>
                </div>
                <div class="flex flex-col gap-4">
                    <p class="flex place-content-start">
                        <strong style="width:80px; font-weight: 300;">Edad:</strong>
                        <span v-if="!isEditingProfile" class="w-40 word-break break-words">{{ userProfile.age ? `${userProfile.age} años` : '-' }}</span>
                        <UInput v-else type="number" v-model.number="profileForm.age" class="edit-input w-40" />
                    </p>
                    <p class="flex place-content-start">
                        <strong style="width:80px; font-weight: 300;">País:</strong>
                        <span v-if="!isEditingProfile" class="w-40 word-break break-words">{{ userProfile.country || '-' }}</span>
                        <UInput v-else v-model="profileForm.country" class="edit-input w-40" />
                    </p>
                    <p class="flex place-content-start">
                        <strong style="width:80px; font-weight: 300;">Ciudad:</strong>
                        <span v-if="!isEditingProfile" class="w-40 word-break break-words">{{ userProfile.city || '-' }}</span>
                        <UInput v-else v-model="profileForm.city" class="edit-input w-40" />
                    </p>
                    <p class="flex place-content-start">
                        <strong style="width:80px; font-weight: 300;">Correo:</strong>
                        <span v-if="!isEditingProfile" class="w-40 word-break break-words">{{ userProfile.email || '-' }}</span>
                        <UInput v-else type="email" v-model="profileForm.email" class="edit-input w-40" />
                    </p>
                    <p class="flex place-content-start">
                        <strong style="width:80px; font-weight: 300;">Celular:</strong>
                        <span v-if="!isEditingProfile" class="w-40 word-break break-words">{{ userProfile.phone || '-' }}</span>
                        <UInput v-else v-model="profileForm.phone" class="edit-input w-40" />
                    </p>
                </div>
                <!-- Botón de guardar para el perfil -->
                <UButton v-if="isEditingProfile" @click="saveProfile" :loading="loading" class="w-60 mx-auto mt-4 py-4 flex items-center justify-center text-white" >
                    Guardar
                </UButton>
            </div>
        </UCard>

        <!-- Estadísticas -->
        <UCard class=" profile-stats" style="grid-area: profile-stats;">
            <h3>Monto Importado</h3>
            <p class="text-7xl font-bold">{{ formatCurrency(userProfile.importedAmount || 0) }}</p>
            <p>de {{ userProfile.importedContainers || 0 }} importaciones realizadas con éxito</p>
        </UCard>

        <!-- Información de la Empresa -->
        <UCard class=" business-details" style="grid-area: business-details;" >
            <div class="flex flex-row gap-2 items-center justify-between mb-4">
                <div class="flex flex-row gap-1">
                    <h3>Mi empresa</h3>
                    <img src="/assets/icon/home.svg" alt="Empresa" class="business-icon" />
                </div>
                <UButton variant="ghost" @click="toggleEditBusiness" :icon="isEditingBusiness ? 'i-heroicons-x-mark' : 'i-heroicons-pencil'" class="h-8 w-8">
                </UButton>
            </div>
            <div class="flex flex-col gap-4">
                <p class="flex place-content-start">
                    <strong style="width:200px; font-weight: 300;">Empresa:</strong>
                    <span v-if="!isEditingBusiness">{{ userProfile.business?.name }}</span>
                    <UInput v-else v-model="businessForm.name" class="edit-input" />
                </p>
                <p class="flex place-content-start">
                    <strong style="width:200px; font-weight: 300;">RUC:</strong>
                    <span v-if="!isEditingBusiness">{{ userProfile.business?.ruc }}</span>
                    <UInput v-else v-model="businessForm.ruc" class="edit-input" />
                </p>
                <p class="flex place-content-start">
                    <strong style="width:200px; font-weight: 300;">Capacidad Comercial:</strong>
                    <span v-if="!isEditingBusiness">{{ userProfile.business?.comercialCapacity }}</span>
                    <UInput v-else v-model="businessForm.comercialCapacity" class="edit-input" />
                </p>
                <p class="flex place-content-start">
                    <strong style="width:200px; font-weight: 300;">Rubro:</strong>
                    <span v-if="!isEditingBusiness">{{ userProfile.business?.rubric }}</span>
                    <UInput v-else v-model="businessForm.rubric" class="edit-input" />
                </p>
                <p class="flex place-content-start">
                    <strong style="width:200px; font-weight: 300;">Red social:</strong>
                    <span v-if="!isEditingBusiness">{{ userProfile.business?.socialAddress }}</span>
                    <UInput v-else v-model="businessForm.socialAddress" class="edit-input" />
                </p>
            </div>
            <!-- Botón de guardar para la empresa -->
            <UButton v-if="isEditingBusiness" @click="saveBusiness" :loading="loading" class="w-80 mx-auto mt-4 py-4 flex items-center justify-center text-white" >
                Guardar
            </UButton>
        </UCard>
       

        <!-- Metas -->
        <UCard class=" profile-goals" style="grid-area: profile-goals;">
            <div class="flex flex-row gap-2 items-center mb-4">
                <h3>Mis metas</h3>
                <img src="/assets/icon/star.svg" alt="Metas" class="business-icon" />
            </div>

            <UTextarea 
                v-model="profileForm.goals"
                placeholder="Ingresa tus metas personales o las de tu empresa"
                class="w-full"
                :rows="4"
            />
        </UCard>
    </div>
</template>
<script setup lang="ts">
import type { UserProfile, UserBusiness } from '~/types/userprofile';
import SimpleUploadFile from '~/components/commons/SimpleUploadFile.vue';
import { useOverlay } from '#imports';
import { useProfile } from '~/composables/clientes/commons/profile';
import { useSpinner } from '~/composables/commons/useSpinner';
const { withSpinner } = useSpinner();
import { useModal } from '~/composables/commons/useModal';
const { showSuccess, showError } = useModal();


const overlay = useOverlay();
const simpleUploadFile = overlay.create(SimpleUploadFile);
const { updateProfile, updateBusiness, uploadProfilePhoto, loading } = useProfile();

const props = defineProps({
    userProfile: {
        type: Object as () => UserProfile,
        required: true
    }
});

// Estados reactivos
const userProfile = ref({} as UserProfile);
const isEditingProfile = ref(false);
const isEditingBusiness = ref(false);
const previewImage = ref<string | null>(null);
const pendingPhotoFile = ref<File | null>(null);

// Formularios
const profileForm = ref({
    fullName: '',
    email: '',
    documentNumber: '',
    age: null as number | null,
    country: '',
    city: '',
    phone: '',
    goals: ''
});

const businessForm = ref({
    name: '',
    ruc: '',
    comercialCapacity: '',
    rubric: '',
    socialAddress: ''
});

// Inicializar datos
onMounted(() => {
    userProfile.value = props.userProfile;
    initializeForms();
});

const initializeForms = () => {
    // Inicializar formulario de perfil
    profileForm.value = {
        fullName: userProfile.value.fullName || '',
        email: userProfile.value.email || '',
        documentNumber: userProfile.value.documentNumber || '',
        age: userProfile.value.age || null,
        country: userProfile.value.country || '',
        city: userProfile.value.city || '',
        phone: userProfile.value.phone || '',
        goals: userProfile.value.goals || ''
    };

    // Inicializar formulario de empresa
    if (userProfile.value.business) {
        businessForm.value = {
            name: userProfile.value.business.name || '',
            ruc: userProfile.value.business.ruc || '',
            comercialCapacity: userProfile.value.business.comercialCapacity || '',
            rubric: userProfile.value.business.rubric || '',
            socialAddress: userProfile.value.business.socialAddress || ''
        };
    }
};

// Funciones de edición
const toggleEditProfile = () => {
    isEditingProfile.value = !isEditingProfile.value;
    if (!isEditingProfile.value) {
        // Cancelar cambios al salir del modo de edición
        initializeForms();
        previewImage.value = null;
        pendingPhotoFile.value = null;
    }
};

const toggleEditBusiness = () => {
    isEditingBusiness.value = !isEditingBusiness.value;
    if (!isEditingBusiness.value) {
        // Cancelar cambios al salir del modo de edición
        if (userProfile.value.business) {
            businessForm.value = {
                name: userProfile.value.business.name || '',
                ruc: userProfile.value.business.ruc || '',
                comercialCapacity: userProfile.value.business.comercialCapacity || '',
                rubric: userProfile.value.business.rubric || '',
                socialAddress: userProfile.value.business.socialAddress || ''
            };
        }
    }
};

// Funciones de guardado
const saveProfile = async () => {
    try {
        const profileData = { ...profileForm.value };
        
        // Enviar datos del perfil y foto en la misma petición
        await withSpinner(async () => {
            const response = await updateProfile(profileData, pendingPhotoFile.value || undefined);
            //update local storage auth user  with response.user
            //get auth_user  to json and modify avatar email name  and save it
            const authUser = localStorage.getItem('auth_user');
            const authUserJson = JSON.parse(authUser || '{}');
            authUserJson.avatar = response.user.photoUrl;
            authUserJson.email = response.user.email;
            authUserJson.name = response.user.fullName;
            localStorage.setItem('auth_user', JSON.stringify(authUserJson));
            if (response.success) {
                showSuccess('Perfil actualizado exitosamente', 'El perfil se ha actualizado correctamente')
            } else {
                showError('Error al guardar el perfil', 'Error al guardar el perfil')
            }
        }, 'Guardando perfil...')
        
        // Actualizar el perfil local
        userProfile.value = { ...userProfile.value, ...profileData };
        
        // Limpiar estados
        previewImage.value = null;
        pendingPhotoFile.value = null;
        isEditingProfile.value = false;
        
        // Mostrar notificación de éxito
        console.log('Perfil actualizado exitosamente');
    } catch (error) {
        console.error('Error al guardar el perfil:', error);
    }
};

const saveBusiness = async () => {
    try {
        await withSpinner(async () => {
            const response = await updateBusiness(businessForm.value);
            if (response.success) {
                showSuccess('Empresa actualizada exitosamente', 'La empresa se ha actualizado correctamente')
            } else {
                showError('Error al guardar la empresa', 'Error al guardar la empresa')
            }
        }, 'Guardando empresa...')
        
        // Actualizar la empresa local
        if (userProfile.value.business) {
            userProfile.value.business = { ...userProfile.value.business, ...businessForm.value };
        }
        
        isEditingBusiness.value = false;
        console.log('Empresa actualizada exitosamente');
    } catch (error) {
        console.error('Error al guardar la empresa:', error);
    }
};

const saveGoals = async () => {
    try {   
        await withSpinner(async () => {
            try {
            const response = await updateProfile({ goals: profileForm.value.goals });
            if (response.success) {
                showSuccess('Metas actualizadas exitosamente', 'Las metas se han actualizado correctamente')
            } else {
                showError('Error al guardar las metas', 'Error al guardar las metas')
            }
            } catch (error) {
                console.error('Error al guardar las metas:', error);
            }
        }, 'Guardando metas...')
        userProfile.value.goals = profileForm.value.goals;
        console.log('Metas actualizadas exitosamente');
    } catch (error) {
        console.error('Error al guardar las metas:', error);
    }
};


// Función para abrir el modal de subida de archivos
const openSimpleUploadFile = () => {
    simpleUploadFile.open({
        title: 'Subir foto de perfil',
        withNameField: false,
        onSave: (data: { file: File }) => {
            handlePhotoUpload(data.file);
        },
    });
};

// Manejar la subida de foto
const handlePhotoUpload = (file: File) => {
    // Crear vista previa
    const url = URL.createObjectURL(file);
    previewImage.value = url;
    pendingPhotoFile.value = file;
};

// Limpiar recursos al desmontar
onUnmounted(() => {
    if (previewImage.value) {
        URL.revokeObjectURL(previewImage.value);
    }
});

// Watcher para guardar metas automáticamente
watch(() => profileForm.value.goals, (newGoals) => {
    if (newGoals !== userProfile.value.goals) {
        // Debounce para evitar muchas llamadas
        setTimeout(() => {
            saveGoals();
        }, 1000);
    }
});
</script>
<style scoped>
.save-btn {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;


}

.edit-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
}

.edit-inpu|t {
    border-radius: 4px;
    padding: 0.5rem;
    font-size: 1rem;
}

.divider {
    border: none;
    margin: 1.5rem 0;
    width: 100%;
}

.user-profile {
    display: grid;
    grid-template-areas:
        "profile-header profile-stats profile-goals"
        "profile-header business-details profile-goals";
    grid-template-columns: 1.2fr 2fr 2fr;
    /* La primera columna es más estrecha */
    grid-template-rows: auto auto auto;
    /* Cada fila se ajusta automáticamente */
    gap: 1.5rem;
    padding: 2rem;
}

.profile-stats,
.business-details,
.profile-goals {
 
}

.profile-header {
    align-items: flex-end;
    height: auto;
    /* Ajusta la altura automáticamente */
    display: flex;
    flex-direction: column;
}

.profile-stats {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.business-details,
.profile-goals {
    display: flex;
    flex-direction: column;
    padding: 5%;
}

.profile-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 1rem;
}

.stats-amount {
    font-size: 5rem;
    font-weight: 600;
    color: black;
    font-family: "Sora", Arial, "Helvetica Neue", Helvetica, sans-serif;
}

textarea {
    width: 100%;
    height: 100px;
    border-radius: 8px;
    padding: 0.5rem;
    font-size: 1rem;
    resize: none;
}

.profile-avatar__container {
    position: relative;
    width: 100px;
    height: 100px;
    overflow: hidden;
    margin-bottom: 1rem;
    z-index: 1;
}

.profile-avatar__overlay {
    z-index: 2;
    position: absolute;
    bottom: 0;
    right: 0;
    width: 2em;
    height: 2em;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

}
</style>