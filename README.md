# Juego del Ahorcado

Un juego clásico del Ahorcado implementado con React, TypeScript y Vite. Esta aplicación permite al usuario adivinar una palabra letra por letra, con la ayuda de pistas opcionales.

## Características

- Selección aleatoria de palabras con pistas
- Teclado virtual y soporte para teclado físico
- Visualización gráfica del ahorcado
- Sistema de pistas opcional
- Interfaz responsiva y amigable
- Contador de intentos restantes
- Mensajes de victoria o derrota

## Tecnologías utilizadas

- React 19
- TypeScript
- Vite
- Firebase (para el despliegue)

## Configuración del entorno local

1. Clona el repositorio
2. Instala las dependencias:
   ```
   npm install
   ```
3. Copia el archivo `.env.example` a `.env` y configura las variables de entorno de Firebase:
   ```
   cp .env.example .env
   ```
4. Ejecuta el proyecto en modo desarrollo:
   ```
   npm run dev
   ```

## Despliegue en Firebase

Para desplegar esta aplicación en Firebase, sigue estos pasos:

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)

2. Instala Firebase CLI si no lo tienes:
   ```
   npm install -g firebase-tools
   ```

3. Inicia sesión en Firebase:
   ```
   firebase login
   ```

4. Actualiza el archivo `.firebaserc` con el ID de tu proyecto:
   ```json
   {
     "projects": {
       "default": "TU_ID_DE_PROYECTO"
     }
   }
   ```

5. Actualiza el archivo `.env` con los datos de tu proyecto Firebase. Puedes encontrar esta información en la configuración de tu proyecto en Firebase Console:
   ```
   VITE_FIREBASE_API_KEY=tu_api_key
   VITE_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=tu_proyecto
   VITE_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
   VITE_FIREBASE_APP_ID=tu_app_id
   VITE_FIREBASE_MEASUREMENT_ID=tu_measurement_id
   ```

6. Construye y despliega la aplicación:
   ```
   npm run deploy
   ```

7. Una vez completado, podrás acceder a tu aplicación en la URL proporcionada por Firebase.

## Desarrollo

- Para ejecutar el servidor de desarrollo:
  ```
  npm run dev
  ```

- Para construir la aplicación:
  ```
  npm run build
  ```

- Para previsualizar la versión construida:
  ```
  npm run preview
  ```