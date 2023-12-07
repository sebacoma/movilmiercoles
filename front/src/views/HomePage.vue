<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Perfil Profesional</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title>{{ usuario.name }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-list>
            <ion-item>
              <ion-label>Email:</ion-label>
              <ion-text>{{ usuario.email }}</ion-text>
            </ion-item>
            <ion-item>
              <ion-label>Estudios:</ion-label>
              <ion-text>{{ usuario.Estudios }}</ion-text>
            </ion-item>
            <ion-item>
              <ion-label>Proyectos:</ion-label>
              <ion-text>{{ usuario.Proyectos }}</ion-text>
            </ion-item>
            <ion-item>
              <ion-label>Frameworks:</ion-label>
              <ion-text>{{ usuario.Frameworks }}</ion-text>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup>
// Importar componentes específicos de Ionic para Vue
import { ref, onMounted } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonText } from '@ionic/vue';
import axios from 'axios';

// Definir la variable reactiva 'usuario'
const usuario = ref({});

// Definir el hook 'mounted' con 'onMounted'
onMounted(async () => {
  // Realizar solicitud a la API con Axios
  console.log('a');
  try {
    const response = await axios.get('http://localhost:3000/yo');
    // Asignar los datos obtenidos a la variable 'usuario'
    usuario.value = response.data[0];
    console.log(usuario.value.email);
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
});
</script>
