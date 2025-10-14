<template>
    <div class="p-4 md:p-8">
        <h1 class="text-lg md:text-xl font-medium text-onix-pro">Mi cuenta</h1>
    </div>

    <div class="user-profile-container">
        <div class="user-profile">
        <!-- Información Personal -->
        <UCard 
            class="profile-header flex" 
            style="grid-area: profile-header;" 
            :key="formKey"
            :ui="{ 
                root: 'w-full',
                body: 'w-full'
            }"
        >
            <div class="edit-header flex flex-row w-full justify-end items-end">
                <UButton variant="ghost" @click="toggleEditProfile"
                    :icon="isEditingProfile ? 'i-heroicons-x-mark' : 'i-heroicons-pencil'"
                    class="h-8 w-8 align-end justify-end items-end">
                </UButton>
            </div>
            <div class="profile-info px-4">
                <div class="pb-10">
                    <div class="profile-avatar__container flex justify-center items-center mx-auto">
                        <UAvatar :src="previewImage || userProfile.photoUrl" alt="Foto de perfil" class="profile-avatar" />

                        <div class="profile-avatar__overlay" v-if="isEditingProfile" @click="openSimpleUploadFile()">
                            <UButton variant="solid" class="h-8 w-8 text-white rounded-full"
                                @click="openSimpleUploadFile()" icon="i-heroicons-camera" color="primary">
                            </UButton>

                            </div>
                        </div>

                        <h2 class="profile-name text-center">{{ userProfile.fullName || userProfile.name || '-' }}</h2>
                        <div class="profile-dni text-center">
                            <span v-if="!isEditingProfile">DNI: {{ userProfile.dni || '-' }}</span>
                            <div v-else class="flex flex-row justify-center items-center gap-2">
                                <label class="text-sm font-medium">DNI:</label>
                                <UInput v-model="profileForm.documentNumber" 
                                    class="edit-input w-32 text-center" 
                                    placeholder="DNI" />
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col gap-1 profile-fields" :class="isEditingProfile ? 'items-center' : 'items-start'">
                        <p class="flex flex-row sm:flex-row place-content-start gap-1 sm:gap-2 profile-field">
                            <strong class="w-full sm:w-30 font-weight: 300; break-words">F.Nacimiento:</strong>
                            <span v-if="!isEditingProfile"
                                class="w-full sm:w-40 word-break break-words">{{
                                    userProfile.birth_date ? `${formatDateTimeToDmy(userProfile.birth_date)}` : 
                                (userProfile.fechaNacimiento ? `${formatDateTimeToDmy(userProfile.fechaNacimiento)}` : '-')
                                }}</span>
                            <UInput v-else type="date" v-model="profileForm.fechaNacimiento"
                                class="edit-input w-full sm:w-40" />
                        </p>
                        <p class="flex flex-row sm:flex-row place-content-start gap-1 sm:gap-2">
                            <strong class="w-full sm:w-30 font-weight: 300;">País:</strong>
                            <span v-if="!isEditingProfile" class="w-full sm:w-40 word-break break-words">{{
                                (typeof userProfile.country === 'string' && isNaN(parseInt(userProfile.country))) 
                                    ? userProfile.country 
                                    : (paises.find(p => p.value == userProfile.country)?.label || '-')
                            }}</span>
                            <USelect v-else v-model="profileForm.country" class="edit-input w-full sm:w-40"
                                :items="paises" placeholder="Seleccionar país" />

                        </p>
                        <p class="flex flex-row sm:flex-row place-content-start gap-1 sm:gap-2">
                            <strong class="w-full sm:w-30 font-weight: 300;">Departamento:</strong>
                            <span v-if="!isEditingProfile" class="w-full sm:w-40 word-break break-words">{{
                                (() => {
                                    const userProfileAny = userProfile as any;
                                    
                                    // Priorizar valor directo si es string (nombre del departamento)
                                    if (userProfileAny.department && typeof userProfileAny.department === 'string' && isNaN(parseInt(userProfileAny.department))) {
                                        return userProfileAny.department;
                                    }
                                    
                                    // Buscar por ID en múltiples fuentes: id_department, department, etc.
                                    const deptId = userProfileAny.id_department || userProfileAny.department;
                                    
                                    if (deptId && !isNaN(parseInt(deptId))) {
                                        const foundDept = departamentos.find(d => d.value == parseInt(deptId));
                                        return foundDept ? foundDept.label : `ID: ${deptId}`;
                                    }
                                    
                                    return '-';
                                })()
                            }}</span>
                            <USelect v-else v-model="profileForm.department" class="edit-input w-full sm:w-40"
                                :items="departamentos" placeholder="Seleccionar departamento"
                                @change="handleDepartmentChange" />
                        </p>
                        <p class="flex flex-row sm:flex-row place-content-start gap-1 sm:gap-2">
                            <strong class="w-full sm:w-30 font-weight: 300;">Provincia:</strong>

                            <span v-if="!isEditingProfile" class="w-full sm:w-40 word-break break-words">{{
                                (() => {
                                    const userProfileAny = userProfile as any;
                                    
                                    // Priorizar province si es un string válido
                                    if (userProfile.province && typeof userProfile.province === 'string' && isNaN(parseInt(userProfile.province))) {
                                        return userProfile.province;
                                    }
                                    
                                    // Buscar por ID en múltiples fuentes: city, province, id_city, etc.
                                    const cityId = userProfileAny.city || userProfileAny.province || userProfileAny.id_city;
                                    
                                    if (cityId) {
                                        const foundProvince = provincias.find(p => p.value == cityId);
                                        return foundProvince ? foundProvince.label : `Cargando...`;
                                    }
                                    return '-';
                                })()
                            }}</span>
                            <USelect v-else v-model="profileForm.city" class="edit-input w-full sm:w-40"
                                :items="provincias" placeholder="Seleccionar provincia"
                                @change="handleProvinceChange" />
                        </p>
                        <p class="flex flex-row sm:flex-row place-content-start gap-1 sm:gap-2">
                            <strong class="w-full sm:w-30 font-weight: 300;">Distrito:</strong>
                            <span v-if="!isEditingProfile" class="w-full sm:w-40 word-break break-words">{{
                                (() => {
                                    const userProfileAny = userProfile as any;
                                    
                                    // Priorizar valor directo si es string (nombre del distrito)
                                    if (userProfileAny.district && typeof userProfileAny.district === 'string' && isNaN(parseInt(userProfileAny.district))) {
                                        return userProfileAny.district;
                                    }
                                    
                                    // Buscar por ID en múltiples fuentes: id_district, district, etc.
                                    const districtId = userProfileAny.id_district || userProfileAny.district;
                                    
                                    if (districtId && !isNaN(parseInt(districtId))) {
                                        const foundDistrict = distritos.find(d => d.value == parseInt(districtId));
                                        return foundDistrict ? foundDistrict.label : `ID: ${districtId}`;
                                    }
                                    
                                    return '-';
                                })()
                            }}</span>
                            <USelect v-else v-model="profileForm.district" class="edit-input w-full sm:w-40"
                                :items="distritos" placeholder="Seleccionar distrito" />
                        </p>
                        <p class="flex flex-row sm:flex-row place-content-start gap-1 sm:gap-2">
                            <strong class="w-full sm:w-30 font-weight: 300;">Correo:</strong>
                            <span v-if="!isEditingProfile" class="w-full sm:w-40 word-break break-words">{{
                                userProfile.email || '-' }}</span>
                            <UInput v-else type="email" v-model="profileForm.email" class="edit-input w-full sm:w-40" />
                        </p>
                        <p class="flex flex-row sm:flex-row place-content-start gap-1 sm:gap-2">
                            <strong class="w-full sm:w-30 font-weight: 300;">Celular:</strong>
                            <span v-if="!isEditingProfile" class="w-full sm:w-40 word-break break-words">{{
                                userProfile.phone || '-' }}</span>
                            <UInput v-else v-model="profileForm.phone" class="edit-input w-full sm:w-40" />
                        </p>
                    </div>
                    <!-- Botón de guardar para el perfil -->
                    <UButton v-if="isEditingProfile" @click="saveProfile" :loading="loading"
                        class="w-full sm:w-60 mx-auto mt-4 py-4 flex items-center justify-center text-white">
                        Guardar
                    </UButton>
                </div>
            </UCard>

            <!-- Estadísticas -->
            <UCard 
                class="profile-stats" 
                style="grid-area: profile-stats;"
                :ui="{ 
                    root: 'w-full',
                    body: 'w-full'
                }"
            >
                <h3>Monto Importado</h3>
                <p class="text-7xl font-bold">{{ formatCurrency(userProfile.importedAmount || 0) }}</p>
                <p>de {{ userProfile.importedContainers || 0 }} importaciones realizadas con éxito</p>
                <h4>CBM total: {{ formatNumber(userProfile.cbm || 0,2) }}</h4>
            </UCard>

            <!-- Información de la Empresa -->
            <UCard 
                class="business-details" 
                style="grid-area: business-details;"
                :ui="{ 
                    root: 'w-full',
                    body: 'w-full sm:p-4'
                }"
            >
                <div class="flex flex-row gap-2 items-center justify-between mb-4">
                    <div class="flex flex-row gap-1">
                        <h3>Mi empresa</h3>
                        <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.5923 4.48047L8.32308 0.388161C7.83846 0.011238 7.15385 0.011238 6.66923 0.388161L1.40769 4.48047C0.507692 5.18047 0 6.22662 0 7.36508V12.0112C0 13.6035 1.29231 14.8959 2.88462 14.8959H12.1154C13.7077 14.8959 15 13.6035 15 12.0112V7.36508C15 6.22662 14.4846 5.18047 13.5923 4.48047ZM4.23077 10.2805H10.7692V11.4343H4.23077V10.2805ZM10.7692 9.12662H4.23077V8.16508C4.23077 8.05739 4.31538 7.97278 4.42308 7.97278H10.5769C10.6846 7.97278 10.7692 8.05739 10.7692 8.16508V9.12662ZM4.23077 12.5882H10.7692V13.742H4.23077V12.5882ZM13.8462 12.0112C13.8462 12.9651 13.0692 13.742 12.1154 13.742H11.9231V8.16508C11.9231 7.42662 11.3154 6.81893 10.5769 6.81893H4.42308C3.68462 6.81893 3.07692 7.42662 3.07692 8.16508V13.742H2.88462C1.93077 13.742 1.15385 12.9651 1.15385 12.0112V7.36508C1.15385 6.58816 1.50769 5.86508 2.11538 5.38816L7.37692 1.29585C7.37692 1.29585 7.45385 1.25739 7.49231 1.25739C7.53077 1.25739 7.57692 1.27278 7.60769 1.29585L12.8692 5.38816C13.4846 5.86508 13.8308 6.58816 13.8308 7.36508V12.0112H13.8462Z" fill="#272A30"/>
                        </svg>

                    </div>
                    <UButton variant="ghost" @click="toggleEditBusiness"
                        :icon="isEditingBusiness ? 'i-heroicons-x-mark' : 'i-heroicons-pencil'" class="h-8 w-8">
                    </UButton>
                </div>
                <div class="flex flex-col gap-4">
                    <p class="flex flex-row sm:flex-row place-content-start gap-1 sm:gap-0">
                        <strong class="w-full sm:w-48 font-weight: 300;">Empresa:</strong>
                        <span v-if="!isEditingBusiness" class="w-full sm:flex-1">{{ userProfile.business?.name }}</span>
                        <UInput v-else v-model="businessForm.name" class="edit-input w-full sm:flex-1" />
                    </p>
                    <p class="flex flex-row sm:flex-row place-content-start gap-1 sm:gap-0">
                        <strong class="w-full sm:w-48 font-weight: 300;">RUC:</strong>
                        <span v-if="!isEditingBusiness" class="w-full sm:flex-1">{{ userProfile.business?.ruc }}</span>
                        <UInput v-else v-model="businessForm.ruc" class="edit-input w-full sm:flex-1" />
                    </p>
            
                    <p class="flex flex-row sm:flex-row place-content-start gap-1 sm:gap-0">
                        <strong class="w-full sm:w-48 font-weight: 300;">Rubro:</strong>
                        <span v-if="!isEditingBusiness" class="w-full sm:flex-1">{{ userProfile.business?.rubric }}</span>
                        <UInput v-else v-model="businessForm.rubric" class="edit-input w-full sm:flex-1" />
                    </p>
                    <p class="flex flex-row sm:flex-row place-content-start gap-1 sm:gap-0">
                        <strong class="w-full sm:w-48 font-weight: 300;">Red social:</strong>
                        <span v-if="!isEditingBusiness" class="w-full sm:flex-1">{{ userProfile.business?.socialAddress
                        }}</span>
                        <UInput v-else v-model="businessForm.socialAddress" class="edit-input w-full sm:flex-1" />
                    </p>
                </div>
                <!-- Botón de guardar para la empresa -->
                <UButton v-if="isEditingBusiness" @click="saveBusiness" :loading="loading"
                    class="w-full sm:w-80 mx-auto mt-4 py-4 flex items-center justify-center text-white">
                    Guardar
                </UButton>
            </UCard>


            <!-- Metas -->
            <UCard 
                class="profile-goals" 
                style="grid-area: profile-goals;"
                :ui="{ 
                    root: 'w-full',
                    body: 'w-full'
                }"
            >
                <div class="flex flex-row gap-2 items-center justify-between mb-4">
                    <div class="flex flex-row gap-2 items-center">
                        <h3>Mis metas</h3>
                        <img src="/assets/icon/star.svg" alt="Metas" class="business-icon mb-4 md:mb-1" />
                    </div>
                    <UButton variant="ghost" @click="toggleEditGoals"
                        :icon="isEditingGoals ? 'i-heroicons-x-mark' : 'i-heroicons-pencil'" class="h-8 w-8">
                    </UButton>
                </div>

                <UTextarea v-model="profileForm.goals" placeholder="Ingresa tus metas personales o las de tu empresa"
                    :disabled="!isEditingGoals" class="w-full" :rows="4"/>
                
                <!-- Botón de guardar para las metas -->
                <UButton v-if="isEditingGoals" @click="saveGoals" :loading="loading"
                    class="w-full sm:w-80 mx-auto mt-4 py-4 flex items-center justify-center text-white">
                    Guardar
                </UButton>
            </UCard>
            </div>
    </div>
</template>
<script setup lang="ts">
import type { UserProfile, UserBusiness } from '~/types/userprofile';
import SimpleUploadFile from '~/components/commons/SimpleUploadFile.vue';
import { useOverlay } from '#imports';
import { useProfile } from '~/composables/clientes/commons/profile';
import { useSpinner } from '~/composables/commons/useSpinner';
import { useUserRole } from '~/composables/auth/useUserRole';
import { useOptions } from '~/composables/commons/useOptions';
import { useLocation } from '~/composables/commons/useLocation';
import { formatCurrency, formatDateTimeToDmy } from '~/utils/formatters';
const { withSpinner } = useSpinner();
import { useModal } from '~/composables/commons/useModal';
const { showSuccess, showError } = useModal();
const { paises, getPaises } = useOptions()
const { departamentos, provincias, distritos, getDepartamentos, getProvincias, getAllProvincias, getDistritos } = useLocation();

// Desabilitar herencia automática de atributos
defineOptions({
    inheritAttrs: false
})

const overlay = useOverlay();
const simpleUploadFile = overlay.create(SimpleUploadFile);
const { updateProfile, updateBusiness, uploadProfilePhoto, loading } = useProfile();

const props = defineProps({
    userProfile: {
        type: Object as () => UserProfile,
        required: true
    }
});

// Definir eventos que puede emitir el componente
const emit = defineEmits<{
    profileUpdated: []
}>();

// Estados reactivos
const userProfile = ref({} as UserProfile);
const isEditingProfile = ref(false);
const isEditingBusiness = ref(false);
const isEditingGoals = ref(false);
const previewImage = ref<string | null>(null);
const pendingPhotoFile = ref<File | null>(null);
const formKey = ref(0);
// Formularios
const profileForm = ref({
    fullName: '',
    email: '',
    documentNumber: '',
    fechaNacimiento: '',
    country: null as number | null,
    department: null as number | null,
    city: null as number | null,
    district: null as number | null,
    phone: '',
    goals: ''
});

const businessForm = ref({
    name: '',
    ruc: '',
    rubric: '',
    socialAddress: ''
});

// Inicializar datos
onMounted(async () => {
    userProfile.value = props.userProfile;    
    // Cargar datos de países, departamentos y provincias primero
    await getPaises();
    await getDepartamentos();
    await getAllProvincias();
    
    // Esperar un poco para que se carguen los datos
    await nextTick();
    
    // Si hay una provincia seleccionada, cargar sus distritos
    const userProfileAny = userProfile.value as any;
    
    // Buscar provincia ID - necesitamos el ID numérico, no el nombre
    let provinciaId = null;
    
    // Primero intentar obtener el ID directo
    if (userProfileAny.id_city || userProfileAny.idcity) {
        provinciaId = userProfileAny.id_city || userProfileAny.idcity;
    }
    // Si no hay ID directo pero hay un nombre de provincia, buscar su ID
    else if (userProfileAny.province && typeof userProfileAny.province === 'string') {
        const foundProvince = provincias.value.find(p => 
            p.label && p.label.toLowerCase() === userProfileAny.province.toLowerCase()
        );
        if (foundProvince) {
            provinciaId = foundProvince.value;
        }
    }
    // Si hay un valor city que es numérico
    else if (userProfileAny.city && !isNaN(parseInt(userProfileAny.city))) {
        provinciaId = parseInt(userProfileAny.city);
    }
                       
    if (provinciaId) {
        try {
            console.log('🔍 Debug MOUNT - Cargando distritos para provincia ID:', provinciaId);
            await getDistritos(provinciaId.toString());
        } catch (error) {
            console.error('🔍 Debug MOUNT - Error cargando distritos:', error);
        }
    }
    
    // Luego inicializar los formularios después de que los datos estén cargados
    await initializeForms();
});

const initializeForms = () => {
    console.log('🔧 Inicializando formularios con userProfile props:', userProfile.value);
    console.log('🔧 userProfile.value.name:', userProfile.value.name);
    console.log('🔧 userProfile.value.fullName:', (userProfile.value as any).fullName);
    console.log('🔧 userProfile.value.fechaNacimiento:', userProfile.value.fechaNacimiento);
    console.log('🔧 userProfile.value.birth_date:', (userProfile.value as any).birth_date);
    console.log('🔧 userProfile.value.dni:', userProfile.value.dni);
    
    // Usar únicamente los datos de userProfile (props)
    const userProfileAny = userProfile.value as any;
    
    // Convertir country a número buscando en la lista de países
    let countryAsNumber = null;
    if (userProfileAny.country) {
        if (typeof userProfileAny.country === 'string' && isNaN(parseInt(userProfileAny.country))) {
            // Buscar por nombre del país
            const foundCountry = paises.value.find(p => 
                p.label.toLowerCase() === userProfileAny.country.toLowerCase()
            );
            countryAsNumber = foundCountry ? foundCountry.value : null;
        } else {
            countryAsNumber = parseInt(userProfileAny.country) || null;
        }
    }
    
    // Convertir department a número buscando en la lista de departamentos
    let departmentAsNumber = null;
    // Buscar en múltiples fuentes: id_department, department, etc.
    const deptId = userProfileAny.id_department || userProfileAny.department;
    
    console.log('🔧 Department ID encontrado:', deptId, 'de userProfile:', { 
        userProfileDept: userProfileAny.department,
        userProfileIdDept: userProfileAny.id_department
    });
    
    if (deptId) {
        if (typeof deptId === 'string' && isNaN(parseInt(deptId))) {
            // Buscar por nombre del departamento
            const foundDepartment = departamentos.value.find(d => 
                d.label.toLowerCase() === deptId.toLowerCase()
            );
            departmentAsNumber = foundDepartment ? foundDepartment.value : null;
            console.log('🔧 Department buscado por nombre:', deptId, 'encontrado:', foundDepartment);
        } else {
            departmentAsNumber = parseInt(deptId) || null;
            console.log('🔧 Department parseado como número:', departmentAsNumber);
        }
    }
    
    // Priorizar province sobre city y buscar el ID correspondiente
    let cityAsNumber = null;
    // Buscar por ID en múltiples fuentes: city, province, id_city, etc.
    const cityId = userProfileAny.city || userProfileAny.province || userProfileAny.id_city;
    
    if (cityId) {
        if (typeof cityId === 'string' && isNaN(parseInt(cityId))) {
            const foundProvince = provincias.value.find(p => 
                p.label.toLowerCase() === cityId.toLowerCase()
            );
            cityAsNumber = foundProvince ? foundProvince.value : null;
        } else {
            cityAsNumber = parseInt(cityId) || null;
        }
    }
    
    // Convertir district a número buscando en la lista de distritos
    let districtAsNumber = null;
    // Buscar en múltiples fuentes: id_district, district, etc.
    const districtId = userProfileAny.id_district || userProfileAny.district;
    
    console.log('🔧 District ID encontrado:', districtId, 'de userProfile:', { 
        userProfileDistrict: userProfileAny.district,
        userProfileIdDistrict: userProfileAny.id_district
    });
    
    if (districtId) {
        if (typeof districtId === 'string' && isNaN(parseInt(districtId))) {
            // Buscar por nombre del distrito
            const foundDistrict = distritos.value.find(d => 
                d.label.toLowerCase() === districtId.toLowerCase()
            );
            districtAsNumber = foundDistrict ? foundDistrict.value : null;
            console.log('🔧 District buscado por nombre:', districtId, 'encontrado:', foundDistrict);
        } else {
            districtAsNumber = parseInt(districtId) || null;
            console.log('🔧 District parseado como número:', districtAsNumber);
        }
    } 

    // Inicializar formulario de perfil usando únicamente userProfile
    profileForm.value = {
        fullName: userProfileAny.fullName || userProfile.value.fullName || userProfileAny.name || userProfile.value.name || '',
        email: userProfileAny.email || userProfile.value.email || '',
        documentNumber: userProfileAny.dni || userProfileAny.documentNumber || userProfile.value.dni || '',
        fechaNacimiento: formatDateForInput(userProfileAny.birth_date || userProfileAny.fechaNacimiento || userProfile.value.birth_date || userProfile.value.fechaNacimiento) || '',
        country: countryAsNumber,
        department: departmentAsNumber,
        city: cityAsNumber,
        district: districtAsNumber,
        phone: userProfileAny.phone || userProfile.value.phone || '',
        goals: userProfileAny.goals || userProfile.value.goals || ''
    };

    console.log('🔧 Formulario inicializado con valores:', {
        department: departmentAsNumber,
        city: cityAsNumber,
        district: districtAsNumber,
        country: countryAsNumber
    });

    // Inicializar formulario de empresa
    if (userProfile.value.business) {
        businessForm.value = {
            name: userProfile.value.business.name || '',
            ruc: userProfile.value.business.ruc || '',
            rubric: userProfile.value.business.rubric || '',
            socialAddress: userProfile.value.business.socialAddress || ''
        };
    }
};

// Función para formatear fecha para input type="date"
const formatDateForInput = (dateString: string): string => {
    if (!dateString) return '';
    
    try {
        // Si la fecha ya está en formato YYYY-MM-DD, devolverla tal como está
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
            return dateString;
        }
        
        // Si la fecha está en formato DD/MM/YYYY, convertirla
        if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) {
            const [day, month, year] = dateString.split('/');
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        }
        
        // Intentar parsear como fecha y formatear
        const date = new Date(dateString);
        if (!isNaN(date.getTime())) {
            return date.toISOString().split('T')[0];
        }
        
        return '';
    } catch (error) {
        console.error('Error al formatear fecha:', error);
        return '';
    }
};

const handleDepartmentChange = async () => {
    // Limpiar provincia y distrito solo cuando cambie el departamento
    profileForm.value.city = null;
    profileForm.value.district = null;
    // Cargar las nuevas provincias para el departamento seleccionado
    await loadProvincesForDepartment();
};

const handleProvinceChange = async () => {
    // Limpiar solo el distrito cuando cambie la provincia
    profileForm.value.district = null;
    // Cargar los nuevos distritos para la provincia seleccionada
    await loadDistrictsForProvince();
};

const loadProvincesForDepartment = async () => {
    if (profileForm.value.department) {
        try {
            await getProvincias(profileForm.value.department.toString());
        } catch (error) {
            console.error('Error al cargar provincias:', error);
        }
    }
};

const loadDistrictsForProvince = async () => {
    if (profileForm.value.city) {
        try {
            await getDistritos(profileForm.value.city.toString());
        } catch (error) {
            console.error('Error al cargar distritos:', error);
        }
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
        formKey.value++;
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
                rubric: userProfile.value.business.rubric || '',
                socialAddress: userProfile.value.business.socialAddress || ''
            };
        }
    }
};

const toggleEditGoals = () => {
    isEditingGoals.value = !isEditingGoals.value;
    if (!isEditingGoals.value) {
        // Cancelar cambios al salir del modo de edición
        profileForm.value.goals = userProfile.value.goals || '';
    }
};

// Funciones de guardado
const saveProfile = async () => {
    try {
        // Mapear correctamente los campos del frontend al backend
        const apiData: any = {};
        
        // SIEMPRE incluir estos campos, incluso si están vacíos
        apiData.email = profileForm.value.email || '';
        apiData.phone = profileForm.value.phone || '';
        apiData.dni = profileForm.value.documentNumber || '';
        apiData.fecha_nacimiento = profileForm.value.fechaNacimiento || '';
        apiData.goals = profileForm.value.goals || '';
        
        // Campos de ubicación - SIEMPRE incluir si tienen valores
        if (profileForm.value.country !== null && profileForm.value.country !== undefined) {
            apiData.country = profileForm.value.country.toString();
        }
        
        if (profileForm.value.department !== null && profileForm.value.department !== undefined) {
            apiData.departamento = profileForm.value.department.toString();
        }
        
        if (profileForm.value.city !== null && profileForm.value.city !== undefined) {
            apiData.city = profileForm.value.city.toString();
        }
        
        if (profileForm.value.district !== null && profileForm.value.district !== undefined) {
            apiData.distrito = profileForm.value.district.toString();
        }
        
        console.log('🔍 Debug SAVE PROFILE - Datos mapeados correctamente:', apiData);
        console.log('🔍 Debug SAVE PROFILE - profileForm.value completo:', profileForm.value);
        
        // Enviar datos del perfil y foto en la misma petición
        await withSpinner(async () => {
            const response = await updateProfile(apiData, pendingPhotoFile.value || undefined);
            console.log('🔍 Debug SAVE PROFILE - Respuesta del servidor:', response);
            
            if (response.success) {
                showSuccess('Perfil actualizado exitosamente', 'El perfil se ha actualizado correctamente');
                // Emitir evento para que el componente padre recargue los datos
                emit('profileUpdated');
            } else {
                showError('Error al guardar el perfil', 'Error al guardar el perfil');
            }
        }, 'Guardando perfil...')

        // Actualizar el perfil local
        userProfile.value = { ...userProfile.value, ...apiData };
        formKey.value++;
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
            showSuccess('Empresa actualizada exitosamente', 'La empresa se ha actualizado correctamente');
            // Emitir evento para que el componente padre recargue los datos
            emit('profileUpdated');
        }, 'Guardando empresa...')

        // Actualizar la empresa local
        if (userProfile.value.business) {
            userProfile.value.business = { ...userProfile.value.business, ...businessForm.value };
        }
        formKey.value++;

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
                // Simplificar: usar solo los datos del formulario
                const updateData: any = {
                    goals: profileForm.value.goals || '',
                    email: profileForm.value.email || '',
                    phone: profileForm.value.phone || '',
                    dni: profileForm.value.documentNumber || '',
                    fecha_nacimiento: profileForm.value.fechaNacimiento || '',
                };
                
                // Mapear campos de ubicación correctamente
                if (profileForm.value.country !== null && profileForm.value.country !== undefined) {
                    updateData.country = profileForm.value.country.toString();
                }
                
                if (profileForm.value.department !== null && profileForm.value.department !== undefined) {
                    updateData.departamento = profileForm.value.department.toString();
                }
                
                if (profileForm.value.city !== null && profileForm.value.city !== undefined) {
                    updateData.city = profileForm.value.city.toString();
                }
                
                if (profileForm.value.district !== null && profileForm.value.district !== undefined) {
                    updateData.distrito = profileForm.value.district.toString();
                }
                
                console.log('🔍 Debug GOALS - Datos mapeados correctamente a enviar:', updateData);
                console.log('🔍 Debug GOALS - profileForm.value completo:', profileForm.value);
                
                const response = await updateProfile(updateData);
                if (response.success) {
                    showSuccess('Metas actualizadas exitosamente', 'Las metas se han actualizado correctamente');
                    // Emitir evento para que el componente padre recargue los datos
                    emit('profileUpdated');
                    isEditingGoals.value = false;
                } else {
                    showError('Error al guardar las metas', 'Error al guardar las metas')
                }
            } catch (error) {
                console.error('Error al guardar las metas:', error);
                showError('Error al guardar las metas', 'Error al guardar las metas')
            }
        }, 'Guardando metas...')
        userProfile.value.goals = profileForm.value.goals;
        console.log('Metas actualizadas exitosamente');
    } catch (error) {
        console.error('Error al guardar las metas:', error);
        showError('Error al guardar las metas', 'Error al guardar las metas')
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

// Watcher para reaccionar a cambios en las props del userProfile
watch(() => props.userProfile, (newUserProfile) => {
    if (newUserProfile) {
        console.log('🔄 UserProfile props changed, updating local data:', newUserProfile);
        userProfile.value = newUserProfile;
        // Forzar actualización del formKey para que el componente se re-renderice
        formKey.value++;
        // Solo reinicializar formularios si no estamos editando
        if (!isEditingProfile.value && !isEditingBusiness.value && !isEditingGoals.value) {
            nextTick(() => {
                initializeForms();
            });
        }
    }
}, { deep: true, immediate: true });

// Watchers para reinicializar cuando se carguen los datos
watch([paises, departamentos, provincias, distritos], ([newPaises, newDepartamentos, newProvincias, newDistritos]) => {
    // Solo reinicializar si NO estamos en modo de edición
    if (newPaises.length > 0 && newDepartamentos.length > 0 && newProvincias.length > 0 && !isEditingProfile.value) {
        initializeForms();
    }
}, { deep: true });

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

.edit-input {
    border-radius: 4px;
    padding: 0.5rem;
    font-size: 1rem;
}

.divider {
    border: none;
    margin: 1.5rem 0;
    width: 100%;
}

.user-profile-container {
    width: 100%;
    max-width: 100vw;
    overflow-x: auto;
    padding: 0;
}

.user-profile {
    display: grid;
    grid-template-areas:
        "profile-header profile-stats profile-goals"
        "profile-header business-details profile-goals";
    grid-template-columns: 1fr 1.5fr 1fr;
    grid-template-rows: auto auto;
    gap: 1.5rem;
    padding: 2rem;
    max-width: 100%;
    overflow: hidden;
}

/* Pantallas grandes - ajuste para mejor distribución */
@media (min-width: 1400px) {
    .user-profile {
        grid-template-columns: 1fr 2fr 1.2fr;
        padding: 2.5rem;
    }
}

/* Tablet grande - 3 columnas más equilibradas */
@media (max-width: 1280px) {
    .user-profile {
        grid-template-columns: 1fr 1.3fr 1fr;
        padding: 1.5rem;
        gap: 1rem;
    }
}


/* Tablet - 2 columnas */
@media (max-width: 1440px) {
    .user-profile {
        grid-template-areas:
        "profile-header profile-stats profile-goals"
        "profile-header business-details profile-goals";
        grid-template-columns: 1.2fr 1.2fr 1fr;
        grid-template-rows: auto auto auto;
        gap: 1rem;
        padding: 1.5rem;
    }
}

/* Tablet pequeño */
@media (max-width: 900px) {
    .user-profile {
        grid-template-areas:
            "profile-header"
            "profile-stats"
            "business-details"
            "profile-goals";
        grid-template-columns: 1fr;
        grid-template-rows: repeat(4, auto);
        gap: 1rem;
        padding: 1rem;
    }
}

/* Mobile - 1 columna */
@media (max-width: 768px) {
    .user-profile {
        grid-template-areas:
            "profile-header"
            "profile-stats"
            "business-details"
            "profile-goals";
        grid-template-columns: 1fr;
        grid-template-rows: repeat(4, auto);
        gap: 1rem;
        padding: 1rem;
    }
}

/* Estilos base para las tarjetas */

.profile-header {
    align-items: flex-end;
    height: auto;
    display: flex;
    flex-direction: column;
    min-height: fit-content;
    width: 100%;
}

/* Responsive para profile-header */
@media (max-width: 768px) {
    .profile-header {
        align-items: center;
        text-align: center;
        min-height: auto;
    }
}

.profile-stats {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 1.5rem;
    min-height: fit-content;
    width: 100%;
}

/* Responsive para profile-stats */
@media (max-width: 1024px) {
    .profile-stats .text-7xl {
        font-size: 4rem;
    }
}

@media (max-width: 768px) {
    .profile-stats {
        padding: 1rem;
    }

    .profile-stats h3 {
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
    }

    .profile-stats .text-7xl {
        font-size: 3rem;
    }
}

.business-details,
.profile-goals {
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    height: fit-content;
    width: 100%;
}

.profile-goals {
    max-width: 100%;
    min-width: 0; /* Permite que se contraiga más */
}

/* Responsive para business-details y profile-goals */
@media (max-width: 1280px) {
    .business-details,
    .profile-goals {
        padding: 1.2rem;
    }
}

@media (max-width: 1024px) {
    .business-details,
    .profile-goals {
        padding: 1rem;
    }
}

@media (max-width: 768px) {
    .business-details,
    .profile-goals {
        padding: 1rem;
    }

    .business-details h3,
    .profile-goals h3 {
        font-size: 1.2rem;
        margin-bottom: 1rem;
    }
}

.profile-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
}

/* Responsive para profile-avatar */
@media (max-width: 768px) {
    .profile-avatar {
        width: 80px;
        height: 80px;
        margin-bottom: 0.5rem;
    }
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
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Responsive para profile-avatar__container */
@media (max-width: 768px) {
    .profile-avatar__container {
        margin-bottom: 0.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
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

/* Estilos específicos para móvil EN MODO EDICIÓN únicamente */
@media (max-width: 768px) {
    /* Solo aplicar layout vertical compacto cuando está editando */
    .profile-fields.items-center {
        display: flex !important;
        flex-direction: column !important;
        gap: 0.75rem;
        align-items: center !important;
    }
    
    .profile-fields.items-center p {
        display: flex !important;
        flex-direction: column !important;
        gap: 0.25rem;
        margin-bottom: 0;
        width: 100%;
        max-width: 320px;
        min-height: 2.2em; /* Altura mínima uniforme para todos los campos */
        align-items: flex-start; /* Alineación vertical superior */
        justify-content: center;
    }
    
    .profile-fields.items-center p strong {
        width: auto !important;
        font-size: 0.875rem;
        font-weight: 500;
        color: #6b7280;
        margin-bottom: 0.25rem;
        text-align: left;
    }
    
    .profile-fields.items-center p span,
    .profile-fields.items-center p .edit-input {
        width: 100% !important;
        font-size: 0.875rem;
        word-break: break-word;
        overflow-wrap: break-word;
        hyphens: auto;
    }
    
    .profile-fields.items-center p span {
        color: #374151;
        padding: 0.25rem 0;
    }
}

/* Estilos generales para manejo de texto largo en todos los campos del perfil */
.profile-fields p span,
.profile-fields p .edit-input {
    word-break: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
    max-width: 100%;
    box-sizing: border-box;
}

/* Específicamente para campos de correo y texto largo */
.profile-fields p {
    min-width: 0; /* Permite que el contenedor se contraiga */
    flex: 1;
}

/* Asegurar que los inputs también respeten el ancho */
.edit-input {
    box-sizing: border-box;
    width: 100%;
    word-break: break-word;
    overflow-wrap: break-word;
}
</style>