# Estructura de Payload para Backend - Perfil de Usuario

## Endpoints y Payloads

### 1. Actualizar Perfil de Usuario
**Endpoint:** `PUT /api/auth/clientes/me`

**Payload (FormData):**
```typescript
{
  full_name: string,           // Nombre completo del usuario
  email: string,              // Email del usuario
  document_number: string,     // Número de documento (DNI)
  age: number,                // Edad del usuario
  country: string,            // País del usuario
  city: string,               // Ciudad del usuario
  phone: string,              // Teléfono/celular del usuario
  goals: string,              // Metas personales o empresariales
  photo: File                 // Archivo de imagen (opcional)
}
```

**Ejemplo de uso:**
```javascript
const formData = new FormData();
formData.append('full_name', 'Juan Pérez');
formData.append('email', 'juan@email.com');
formData.append('document_number', '12345678');
formData.append('age', '30');
formData.append('country', 'Perú');
formData.append('city', 'Lima');
formData.append('phone', '+51987654321');
formData.append('goals', 'Expandir mi negocio internacionalmente');
// Si hay foto
if (photoFile) {
    formData.append('photo', photoFile);
}
```

### 2. Actualizar Información de Empresa
**Endpoint:** `PUT /api/auth/clientes/me/business`

**Payload (FormData):**
```typescript
{
  business_name: string,       // Nombre de la empresa
  business_ruc: string,       // RUC de la empresa
  comercial_capacity: string,  // Capacidad comercial
  rubric: string,             // Rubro de la empresa
  social_address: string      // Red social de la empresa
}
```

**Ejemplo de uso:**
```javascript
const formData = new FormData();
formData.append('business_name', 'Mi Empresa SAC');
formData.append('business_ruc', '20123456789');
formData.append('comercial_capacity', 'Alta');
formData.append('rubric', 'Importaciones');
formData.append('social_address', '@miempresa');
```


## Respuestas del Backend

### Respuesta Exitosa - Perfil
```json
{
  "success": true,
  "user": {
    "id": 1,
    "fullName": "Juan Pérez",
    "photoUrl": "https://example.com/photos/user1.jpg",
    "email": "juan@email.com",
    "documentNumber": "12345678",
    "age": 30,
    "country": "Perú",
    "city": "Lima",
    "phone": "+51987654321",
    "business": {
      "id": 1,
      "name": "Mi Empresa SAC",
      "ruc": "20123456789",
      "comercialCapacity": "Alta",
      "rubric": "Importaciones",
      "socialAddress": "@miempresa"
    },
    "importedAmount": 50000,
    "importedContainers": 10,
    "goals": "Expandir mi negocio internacionalmente"
  },
  "iCantidadAcessoUsuario": 1,
  "iIdEmpresa": 1,
  "menus": [...]
}
```

### Respuesta Exitosa - Empresa
```json
{
  "business": {
    "id": 1,
    "name": "Mi Empresa SAC",
    "ruc": "20123456789",
    "comercialCapacity": "Alta",
    "rubric": "Importaciones",
    "socialAddress": "@miempresa"
  }
}
```


## Validaciones Recomendadas

### Perfil de Usuario
- `full_name`: Requerido, mínimo 2 caracteres
- `email`: Requerido, formato de email válido
- `document_number`: Requerido, formato válido según país
- `age`: Opcional, número positivo
- `country`: Opcional, máximo 100 caracteres
- `city`: Opcional, máximo 100 caracteres
- `phone`: Opcional, formato de teléfono válido
- `goals`: Opcional, máximo 500 caracteres

### Empresa
- `business_name`: Requerido, mínimo 2 caracteres
- `business_ruc`: Requerido, formato válido según país
- `comercial_capacity`: Opcional, máximo 50 caracteres
- `rubric`: Opcional, máximo 100 caracteres
- `social_address`: Opcional, máximo 100 caracteres

### Foto
- `photo`: Requerido, archivo de imagen
- Tipos permitidos: JPG, JPEG, PNG
- Tamaño máximo: 5MB
- Dimensiones recomendadas: 300x300px mínimo

## Códigos de Error

- `400`: Datos de entrada inválidos
- `401`: No autorizado
- `422`: Error de validación
- `500`: Error interno del servidor

## Notas de Implementación

1. **FormData**: Todos los endpoints usan FormData para permitir envío de archivos
2. **Autenticación**: Todos los endpoints requieren token de autenticación
3. **Validación**: El backend debe validar todos los campos antes de guardar
4. **Imágenes**: Las fotos se envían junto con los datos del perfil en la misma petición
5. **Transacciones**: Los cambios deben ser atómicos (todo o nada)
6. **Foto opcional**: El campo `photo` es opcional, solo se incluye si el usuario selecciona una nueva imagen
