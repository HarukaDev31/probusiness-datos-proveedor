import type { AuthMenu } from "~/services/authService";

export interface UserProfile{
    id:number,
    name:string,
    fullName?:string,  // Agregar fullName como opcional
    photoUrl:string,
    email:string,
    dni:string,
    fechaNacimiento:string,
    birth_date?:string,  // Agregar birth_date como opcional
    country:string,
    idcity:number,
    city?:string,
    department?:number,
    idprovince?:number,
    province?:string,
    district?:number,
    phone?:string,
    business?:UserBusiness,   
    importedAmount:number,
    importedContainers:number,
    goals?:string,
    cbm?:number, // Campo CBM que viene del backend
}
export interface UserBusiness{
    id:number,
    name:string,
    ruc:string,
    comercialCapacity:string,
    rubric:string,
    socialAddress?:string,
}
/** 'success' => true,
                'user' => [
                    'id' => $user->id,
                    'fullName' => $user->full_name,
                    'photoUrl' => $user->photo_url,
                    'email' => $user->email,
                    'documentNumber' => null, // Campo no disponible en la estructura actual
                    'age' => null, // Campo no disponible en la estructura actual
                    'country' => null, // Campo no disponible en la estructura actual
                    'city' => null, // Campo no disponible en la estructura actual
                    'phone' => $user->whatsapp,
                    'business' => $business,
                    'importedAmount' => 0, // Campo no disponible en la estructura actual
                    'importedContainers' => 0, // Campo no disponible en la estructura actual
                    'goals' => $user->goals,
                ],
                'iCantidadAcessoUsuario' => 1,
                'iIdEmpresa' => null,
                'menus' => $menus */
export interface UserProfileResponse{
    success:boolean,
    user:UserProfile,
    iCantidadAcessoUsuario:number,
    iIdEmpresa:number|null,
    menus:AuthMenu[],
}