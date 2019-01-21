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
export default class Capture extends Vue {
    public static analogSupport = true;
    public static digitalSupport = true;

    public async onClick(item: any): Promise<any> {
      const key = item.key;
      if (item.nativeConnection === 'analog') {
        // HDMI <input:2> <output:2>
        // Extron <input:item.input> <output:1>
        const hdmiMatrix = await fetch('/matrix/2/2');
        const extron = await fetch('/extron/' + item.input + '/1');
      }

      if (item.nativeConnection === 'digital') {
        // HDMI <input:1> <output:2>
        // Switch <input:item.input>
        const hdmiMatrix = await fetch('/matrix/1/2');
        const hdmiSwitch = await fetch('/hdmi/' + item.input);
      }
    }

    public data(): object {
        const availableConsoles = new GameConsoles();
        return availableConsoles.getConsoles(Capture.analogSupport, Capture.digitalSupport);
    }
}
</script>