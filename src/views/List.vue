<script setup lang="ts">
import { ref } from 'vue' 
import { useListStore } from '@/stores/list'

const newWordOrigin = ref('')
const newWordTranslation = ref('')


const store = useListStore()

store.fetchLists()

const list = null

function addWord() {
    console.log('adding word');
}

</script>

<template>
    <h2>List jedna</h2>

    <div class="content" v-if="list">
        <h1 class="d-flex align-center" v-if="list">
            <v-avatar rounded color="blue" size="36" class="mr-3">
                <v-icon dark> mdi-format-list-bulleted </v-icon>
            </v-avatar>
            {{ list.name }}
        </h1>
        <div>words: {{ list.words.length }}</div>
    
        <v-form>
            <v-container>
                <v-row>
                    <v-col cols="12" md="5">
                        <v-text-field v-model="newWordOrigin" label="Origin" required></v-text-field>
                    </v-col>
    
                    <v-col cols="12" md="5">
                        <v-text-field v-model="newWordTranslation" label="Translation" required></v-text-field>
                    </v-col>
    
                    <v-col cols="12" md="2" class="pt-6">
                        <v-btn block color="primary" @click="addWord"> Add </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    
        <div v-for="word in list.words" :key="word.id">
            {{ word.origin }} - {{ word.translation }} - {{ word.proficiency }}
        </div>
    </div>
</template>


