<template>
    <div class="plasma">
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-list two-line>
                        <template v-for="(item, index) in items">
                            <v-list-tile :key="index" avatar ripple @click="onClick(item)">
                                <v-list-tile-avatar size=46 tile>
                                    <img :src="item.logo">
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                    <v-list-tile-title>{{ item.systemName }}</v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-divider v-if="index + 1 < items.length" :key="`divider-${index}`"></v-divider>
                        </template>
                    </v-list>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import GameConsoles from '@/GameConsoles';
import SwitchDialog from '@/components/SwitchDialog.vue';
import fetch from 'node-fetch';

@Component
export default class Crt extends Vue {
    public static analogSupport = true;
    public static digitalSupport = false;

    public async onClick(item: any): Promise<any> {
        const key = item.key;
        // Extron <input:x> <output:3>
        const extron = await fetch('/extron/' + item.input + '/3');
    }

    public data(): object {
        const availableConsoles = new GameConsoles();
        return availableConsoles.getConsoles(Crt.analogSupport, Crt.digitalSupport);
    }
}
</script>