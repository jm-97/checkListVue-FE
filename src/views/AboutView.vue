<script setup lang="ts">
import { watch, reactive } from 'vue'
import SelectItem from '../components/SelectItem.vue'
const fases = ['PRE-Release', ' During Release', 'POST Release']
const activitiesPreReleases = [
  'Sviluppo lato policy Studio per accogliere le nuove modifiche seguendo l’ATE.',
  'SIT',
  'UAT',
  'No regression in qa',
  'Aprire TASK su Change  CHG00285183, CHG00285240, CHG00285269',
  'caricamento endpoint KPS e testFacility update',
  'Caricamento swagger .docs h.0.28 su API Portal joomla per le 4 macchine',
  'Aprire task per update dns',
  'Aprire task per certificato',
  'Caricamento yaml countrySpecific h.0.28 su API Portal',
  'Verificare su tutte le macchine',
  'Verificare download degli swagger downloadables',
  'Verificare accesso scripts e testare etc host',
  'Aggiornamento test facility',
  'Aprire task per caricamento pagine mockate sandbox',
  'Aprire task per i plugin per il download in yaml',
  'sviluppo della collection Change con newman',
]
const activitiesDuringReleases = [
  'Deployare real security feature/PJ003316 da gandalf in prod',
  'deploy plugin for the download of yaml',
  'Caricamento delle pagine mockate sandbox da vts',
  'Caricamento pagina api catalog not logged',
  'Numerino a h.0.27',
  'Aggiunta di tabs basket e bulk per bg not logged',
  'test mirati per nuove funzionalità in PROD',
  'Aggiornamento API Manager APIM CLI, con swagger h.0.28',
  'cambiare etc/host e lanciare tutta soapUI per sandbox e (real)',
  'soapUI pronto lato sandbox e real',
  'verificare test facility, getting startedPublic e gettingStartedLogged, DOCUMENTATION(loged)',
  'Controllare sulle 4 macchine di REAL+SANDBOX che FE APIs, BE APIs, e Catalog siano aggiornati correttamente',
  'Controllare sulle 4 macchine di Portale che Catalog siano aggiornati correttamente',
  'PYTHON swagger downloadable BY BRUTE FORCE',
  'Upload del newman report',
]
const activitiesPostReleases = [
  'merge feature branch to master di real security',
  'swaggers APIM in repository bitbucket to master',
  'Merge soapUI del  feature branch con il branch master per sandbox',
  'Upload degli swagger su confluence per ogni cambiamento',
  'Eliminazione dei feature branch',
]
const stati = [
  { value: 'non_completato', color: 'red' },
  { value: 'non_necessario', color: 'brown' },
  { value: 'ongoing', color: 'blue' },
  { value: 'completato', color: 'green' },
]
const preSelectedStatus = { value: 'non_completato', color: 'red' }
const newStatus = reactive({})
watch(newStatus, (nuovo) => {
  console.log('emitter', nuovo)
})
</script>
<template>
  <div class="about">
    {{ fases[0] }}
    <ul>
      <li v-for="(activity, index) in activitiesPreReleases" :key="index">
        <SelectItem
          :stati="stati"
          :preSelectedStatus="preSelectedStatus"
          @currentStatus="(status) => Object.assign(newStatus, status)"
        ></SelectItem>
        {{ activity }}
      </li>
    </ul>

    {{ fases[1] }}
    <ul>
      <li v-for="(activity, index) in activitiesDuringReleases" :key="index">
        <SelectItem
          :stati="stati"
          :preSelectedStatus="preSelectedStatus"
          @currentStatus="(status) => Object.assign(newStatus, status)"
        ></SelectItem>
        {{ activity }}
      </li>
    </ul>

    {{ fases[2] }}
    <ul>
      <li v-for="(activity, index) in activitiesPostReleases" :key="index">
        <SelectItem
          :stati="stati"
          :preSelectedStatus="preSelectedStatus"
          @currentStatus="(status) => Object.assign(newStatus, status)"
        ></SelectItem>
        {{ activity }}
      </li>
    </ul>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
  }
}
</style>
