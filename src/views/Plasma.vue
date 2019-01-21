<template>
    <div class="plasma">
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-list two-line>
                        <v-list-tile 
                            v-for="(item, index) in items"
                            :key="index" 
                            avatar 
                            ripple 
                            @click="onClick(item)"
                        >
                            <v-list-tile-avatar size=46 tile>
                                <img :src="item.logo">
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                                <v-list-tile-title>{{ item.systemName }}</v-list-tile-title>
                                <v-list-tile-sub-title>
                                    <v-switch 
                                        v-if="item.upscaleReady"
                                        :label="item.digital ? 'Digital' : 'Aanalog'"
                                        v-model="item.digital"
                                        @click.native.stop
                                    >
                                    </v-switch>
                                </v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-divider v-if="index + 1 < items.length" :key="`divider-${index}`"></v-divider>
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
export default class Plasma extends Vue {
    public static analogSupport = true;
    public static digitalSupport = true;

    public async onClick(item: any): Promise<any> {
        const key = item.key;


        if (item.digital || item.nativeConnection === 'digital') {
            // TV -> HDMI2
            const tv = await fetch('/tv/ims:h2');
            if (item.nativeConnection === 'digital') {
                // HDMI <input:1> <output:1>
                const hdmiMatrix = await fetch('/matrix/1/1');
                // Switch <input:item.input>
                const hdmiSwitch = await fetch('/hdmi/' + item.input);
            } else {
                if (key === 'dreamcast') {
                    const ossc = await fetch('/ossc/vga');
                } else {
                    const ossc = await fetch('/ossc/component');
                }
                // HDMI <input:2> <output:1>
                const hdmiMatrix = await fetch('/matrix/2/1');
                // Extron <input:item.input> <output:1>
                const extron = await fetch('/extron/' + item.input + '/1');
            }
        }

        if (!item.digital && item.nativeConnection === 'analog') {
            // TV -> Component1
            // Extron <input:item.input> <output:2>
            const tv = await fetch('/tv/ims:c1');
            const extron = await fetch('/extron/' + item.input + '/2');
        }
    }

    public data(): object {
        const availableConsoles = new GameConsoles();
        return availableConsoles.getConsoles(Plasma.analogSupport, Plasma.digitalSupport);
    }
}
</script>