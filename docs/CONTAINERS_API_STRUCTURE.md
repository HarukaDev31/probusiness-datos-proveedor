# 📦 Estructura API de Contenedores - Backend

## Endpoint Requerido

### `GET /api/clientes/containers`

**Descripción:** Obtener la lista de contenedores disponibles para el cliente autenticado.

**Headers:**
```http
Authorization: Bearer {token}
Accept: application/json
```

---

## 📋 Estructura de Respuesta Esperada

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "carga": 100,
      "type": 1,
      "progress": 0.94,
      "status": "active",
      "userIsPresent": true,
      "closeDate": "2023-10-01",
      "shipDate": "2023-10-02",
      "arrivalDate": "2023-10-03",
      "deliveryDate": "2023-10-04",
      "createdAt": "2023-09-01T12:00:00Z"
    },
    {
      "id": 2,
      "carga": 50,
      "type": 2,
      "progress": 0.75,
      "status": "inactive",
      "userIsPresent": false,
      "closeDate": "2023-10-05",
      "shipDate": "2023-10-06",
      "arrivalDate": "2023-10-07",
      "deliveryDate": "2023-10-08",
      "createdAt": "2023-09-02T12:00:00Z"
    }
  ],
  "message": "Contenedores obtenidos exitosamente"
}
```

---

## 📊 Descripción de Campos

### Campos Obligatorios

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | `number` | ID único del contenedor |
| `carga` | `number` | Número de carga del contenedor |
| `type` | `number` | Tipo de contenedor (1, 2, 3, etc.) |
| `progress` | `number` | Progreso del contenedor (0.0 a 1.0) |
| `status` | `string` | Estado del contenedor (`active`, `inactive`, `completed`, etc.) |
| `userIsPresent` | `boolean` | Indica si el usuario tiene items en este contenedor |

### Campos Opcionales

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `closeDate` | `string` | Fecha de cierre del contenedor (formato ISO 8601 o YYYY-MM-DD) |
| `shipDate` | `string` | Fecha de envío del contenedor |
| `arrivalDate` | `string` | Fecha de arribo del contenedor |
| `deliveryDate` | `string` | Fecha de entrega del contenedor |
| `createdAt` | `string` | Fecha de creación del registro |

---

## 🎯 Valores Recomendados

### Tipo de Contenedor (`type`)
- `1`: Contenedor tipo 1
- `2`: Contenedor tipo 2
- `3`: Contenedor tipo 3

### Estado (`status`)
- `active`: Contenedor activo
- `inactive`: Contenedor inactivo
- `completed`: Contenedor completado
- `pending`: Contenedor pendiente

### Progreso (`progress`)
- Valor decimal entre 0.0 (0%) y 1.0 (100%)
- Ejemplo: `0.75` = 75% completado

---

## 🔐 Autenticación

El endpoint requiere autenticación mediante Bearer Token:
- El token debe ser obtenido del login de cliente
- Se debe validar que el usuario esté autenticado
- Solo se deben retornar los contenedores donde el cliente tenga participación

---

## ⚠️ Manejo de Errores

### Error 401 - No autorizado
```json
{
  "success": false,
  "message": "Token inválido o expirado",
  "error": "Unauthorized"
}
```

### Error 500 - Error del servidor
```json
{
  "success": false,
  "message": "Error al obtener los contenedores",
  "error": "Internal Server Error"
}
```

---

## 🔍 Lógica de Negocio Sugerida

### Filtrado de Contenedores
El backend debe:
1. Obtener el usuario autenticado desde el token
2. Buscar los contenedores donde el usuario tenga productos/items
3. Calcular el progreso basado en el estado actual del contenedor
4. Determinar si `userIsPresent` es true basado en si el cliente tiene items en ese contenedor
5. Ordenar los contenedores por fecha de creación (más recientes primero)

### Cálculo del Progreso
El campo `progress` puede calcularse basándose en:
- Etapa actual del contenedor (cerrado, enviado, en tránsito, arribado, entregado)
- Ejemplo de cálculo:
  - Creado: 0.0
  - Cerrado: 0.2
  - Enviado: 0.4
  - En tránsito: 0.6
  - Arribado: 0.8
  - Entregado: 1.0

---

## 📝 Ejemplo de Implementación (Laravel)

```php
public function getContainers(Request $request)
{
    $user = $request->user();
    
    $containers = Container::whereHas('items', function ($query) use ($user) {
        $query->where('cliente_id', $user->id);
    })
    ->with(['items' => function ($query) use ($user) {
        $query->where('cliente_id', $user->id);
    }])
    ->get()
    ->map(function ($container) use ($user) {
        return [
            'id' => $container->id,
            'carga' => $container->numero_carga,
            'type' => $container->tipo_contenedor,
            'progress' => $container->calculateProgress(),
            'status' => $container->estado,
            'userIsPresent' => $container->items->count() > 0,
            'closeDate' => $container->fecha_cierre,
            'shipDate' => $container->fecha_envio,
            'arrivalDate' => $container->fecha_arribo,
            'deliveryDate' => $container->fecha_entrega,
            'createdAt' => $container->created_at,
        ];
    });

    return response()->json([
        'success' => true,
        'data' => $containers,
        'message' => 'Contenedores obtenidos exitosamente'
    ]);
}
```

---

## 🚀 Siguiente Paso

Una vez implementado el endpoint, el frontend automáticamente:
1. ✅ Llamará al endpoint al cargar la página principal
2. ✅ Mostrará un skeleton loader mientras carga
3. ✅ Renderizará las tarjetas de contenedores con la información
4. ✅ Mostrará un mensaje si no hay contenedores disponibles

---

## 📞 Contacto

Si necesitas ajustar algún campo o agregar información adicional, comunícalo y se actualizará el frontend según sea necesario.

