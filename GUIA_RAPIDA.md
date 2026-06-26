# 🚀 Guía Rápida de Ejecución

## ✅ Cambios Realizados

1. **home.jsx** - Simplificado a solo mostrar bienvenida con el rol del usuario
2. **.env** - Corregido el formato de las variables (estaba en formato incorrecto)
3. **CRUD de usuarios** - Eliminado completamente del home

## 🔧 Para Hacer Funcionar

### 1. Backend
```bash
cd backend
npm install (si no lo hiciste)
node app.js
```

**Importante:** El archivo `.env` está configurado con valores por defecto:
- `DB_USER=root` (sin contraseña)
- `DB_NAME=municipio`

Si tu base de datos tiene contraseña, edita el `.env`:
```
DB_PASSWORD=tu_contraseña_aqui
```

### 2. Frontend
```bash
cd front
npm install (si no lo hiciste)
npm run dev
```

## 🗄️ Base de Datos

Si aún no creaste las tablas, ejecuta esto en tu MySQL:

```sql
CREATE TABLE IF NOT EXISTS cuenta (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  contraseña VARCHAR(255) NOT NULL,
  rol VARCHAR(25) NOT NULL DEFAULT 'usuario'
);
```

## 🧪 Flujo de Prueba

1. Abre http://localhost:5173 (frontend)
2. Haz clic en "¿No tienes cuenta? Regístrate aquí"
3. Registra un usuario nuevo:
   - Email: `test@example.com`
   - Contraseña: `123456` (mínimo 6 caracteres)
   - Rol: usuario o admin
4. Inicia sesión con esas credenciales
5. Verás el home con "¡Bienvenido usuario!" o "¡Bienvenido admin!"

## 🐛 Si aún tienes errores

### Error: "Access denied for user"
Edita `.env` con tus credenciales reales de MySQL

### Error: "database 'municipio' doesn't exist"
Crea la base de datos: `CREATE DATABASE municipio;`

### Error en frontend: "Cannot GET /api/..."
Asegúrate que el backend esté corriendo en puerto 3000
