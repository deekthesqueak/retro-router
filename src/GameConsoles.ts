export default class GameConsoles {
    public static items = [
        {
            digital: true,
            input: 1,
            key: 'nes',
            logo: 'av-famicom.png',
            nativeConnection: 'analog',
            systemName: 'Nintendo Entertinament System',
            upscaleReady: true,
        },
        {
            digital: true,
            input: 2,
            key: 'snes',
            logo: 'snes-mini.png',
            nativeConnection: 'analog',
            systemName: 'Super Nintendo Entertinament System',
            upscaleReady: true,
        },
        {
            digital: false,
            input: 3,
            key: 'n64',
            logo: 'n64.png',
            nativeConnection: 'analog',
            systemName: 'Nintendo 64',
            upscaleReady: true,
        },
        {
            digital: true,
            disabled: true,
            input: 4,
            key: 'gamecube',
            logo: 'gamecube-with-player.png',
            nativeConnection: 'analog',
            systemName: 'Nintendo GameCube',
            upscaleReady: true,
        },
        {
            digital: false,
            input: 5,
            key: 'wii',
            logo: 'wii.png',
            nativeConnection: 'analog',
            systemName: 'Nintendo Wii',
            upscaleReady: true,
        },
        {
            input: 3,
            key: 'wiiu',
            logo: 'wiiu.png',
            nativeConnection: 'digital',
            systemName: 'Nintendo WiiU',
        },
        {
            input: 4,
            key: 'switch',
            logo: 'switch.png',
            nativeConnection: 'digital',
            systemName: 'Nintendo Switch',
        },
        {
            input: 5,
            key: 'ps3',
            logo: 'ps3-fat.png',
            nativeConnection: 'digital',
            systemName: 'Sony Playstation 3',
        },
        {
            input: 1,
            key: 'ps4',
            logo: 'ps4-launch.png',
            nativeConnection: 'digital',
            systemName: 'Sony Playstation 4',
        },
        {
            digital: true,
            input: 7,
            key: 'genesis',
            logo: 'genesis-sega-cd.png',
            nativeConnection: 'analog',
            systemName: 'Sega Genesis/CD/32X',
            upscaleReady: true,
        },
        {
            digital: true,
            input: 8,
            key: 'saturn',
            logo: 'saturn-jp-white.png',
            nativeConnection: 'analog',
            systemName: 'Sega Saturn',
            upscaleReady: true,
        },
        {
            digital: true,
            input: 9,
            key: 'dreamcast',
            logo: 'dreamcast.png',
            nativeConnection: 'analog', // Temporary until VGA cable replaced
            systemName: 'Sega Dreamcast',
            upscaleReady: true,
        },
        {
            digital: true,
            input: 6,
            key: 'xbox',
            logo: 'xbox.png',
            nativeConnection: 'analog',
            systemName: 'Microsoft Xbox',
            upscaleReady: true,
        },
        {
            input: 6,
            key: '360',
            logo: 'xbox-360-elite.png',
            nativeConnection: 'digital',
            systemName: 'Microsoft Xbox 360',
        },
        {
            input: 2,
            key: 'steamlink',
            logo: '',
            nativeConnection: 'digital',
            systemName: 'Steam Link',
        },
    ];

    public getConsoles(analog: boolean, digital: boolean) {

        const results = [];
        for (const gameConsole of GameConsoles.items) {
            if (analog && gameConsole.nativeConnection === 'analog') {
                results.push(gameConsole);
            }
            if (digital && gameConsole.nativeConnection === 'digital') {
                results.push(gameConsole);
            }
        }
        return {items: results};
    }
}
