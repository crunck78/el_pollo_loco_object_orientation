const CHARACTER_ASSETS = {

    AUDIOS: {
        BOTTLE: new Audio('audio/bottle.mp3'),
        COIN: new Audio('audio/coin.mp3'),
        MOVE: new Audio('audio/walk.mp3'),
        JUMP: new Audio('audio/jump.mp3'),
        HIT: new Audio('audio/hit.mp3'),
        LAND: new Audio('audio/land.mp3')
    },

    IMAGES: {
        DEAD: [
            'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-51.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-52.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-53.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-54.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-55.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-56.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-57.png'
        ],
        HIT: [
            'img/2.Secuencias_Personaje-Pepe-corrección/4.Herido/H-41.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/4.Herido/H-42.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/4.Herido/H-43.png'
        ],
        ATTACK: [
            'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-38.png'
        ],
        LAUNCH: [
            'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-33.png'
        ],
        JUMP: [
            'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-34.png',
            // 'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-36.png',
        ],
        MID_AIR: [
            'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-35.png'
        ],
        LANDING: [
            'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-37.png'
        ],
        LANDED: [
            'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-38.png',
        ],
        WALKING: [
            'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-21.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-22.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-23.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-24.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-25.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-26.png'
        ],
        IDLE: [
            'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-1.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-2.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-3.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-4.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-5.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-6.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-7.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-8.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-9.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-10.png',
        ],
        LONG_IDLE: [
            'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-11.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-12.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-13.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-14.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-15.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-16.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-17.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-18.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-19.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-20.png',
        ]
    },

    IMAGES_HIT_POINTS_BAR: [
        'img/7.Marcadores/Barra/Marcador vida/azul/0_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/20_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/40_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/60_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/80_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/100_.png'
    ],
    IMAGES_COINS_BAR: [
        'img/7.Marcadores/Barra/Marcador moneda/azul/0_.png',
        'img/7.Marcadores/Barra/Marcador moneda/azul/20_.png',
        'img/7.Marcadores/Barra/Marcador moneda/azul/40_.png',
        'img/7.Marcadores/Barra/Marcador moneda/azul/60_.png',
        'img/7.Marcadores/Barra/Marcador moneda/azul/80_.png',
        'img/7.Marcadores/Barra/Marcador moneda/azul/100_.png'
    ],
    IMAGES_BOTTLES_BAR: [
        'img/7.Marcadores/Barra/Marcador_botella/Azul/0_.png',
        'img/7.Marcadores/Barra/Marcador_botella/Azul/20_.png',
        'img/7.Marcadores/Barra/Marcador_botella/Azul/40_.png',
        'img/7.Marcadores/Barra/Marcador_botella/Azul/60_.png',
        'img/7.Marcadores/Barra/Marcador_botella/Azul/80_.png',
        'img/7.Marcadores/Barra/Marcador_botella/Azul/100_.png'
    ]
};

const END_BOSS = {
    AUDIOS: {
        HIT: new Audio('audio/chicken.mp3'),
        KILL: new Audio('audio/chicken.mp3')
    },

    IMAGES: {
        ALERT: [
            'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G5.png',
            'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G6.png',
            'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G7.png',
            'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G8.png',
            'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G9.png',
            'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G10.png',
            'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G11.png',
            'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G12.png'
        ],
        WALKING: [
            'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/1.Caminata/G1.png',
            'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/1.Caminata/G2.png',
            'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/1.Caminata/G3.png',
            'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/1.Caminata/G4.png'
        ],
        ATTACK: [
            'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G13.png',
            'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G14.png',
            'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G15.png',
            'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G16.png',
            'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G17.png',
            'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G18.png',
            'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G19.png',
            'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G20.png'
        ],
        HIT: [
            'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/3.Herida/G21.png',
            'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/3.Herida/G22.png',
            'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/3.Herida/G23.png'
        ],
        DEAD: [
            'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/4.Muerte/G24.png',
            'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/4.Muerte/G25.png',
            'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/4.Muerte/G26.png'
        ],

        IDLE: [
            //'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/1.Caminata/G4.png',
            'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G6.png',
            'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G9.png',
            //'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G20.png'
        ],

        IMAGES_HIT_POINTS_BAR: [
            'img/7.Marcadores/Barra/Marcador vida/Naranja/0_ .png',
            'img/7.Marcadores/Barra/Marcador vida/Naranja/20__1.png',
            'img/7.Marcadores/Barra/Marcador vida/Naranja/40_ .png',
            'img/7.Marcadores/Barra/Marcador vida/Naranja/60_ .png',
            'img/7.Marcadores/Barra/Marcador vida/Naranja/80_ .png',
            'img/7.Marcadores/Barra/Marcador vida/Naranja/100_ .png'
        ],
    }
}

const CHICKEN_ASSETS = {
    AUDIOS: {
        STAMP: new Audio('audio/rubber_chicken.mp3'),
        KILL: new Audio('audio/chicken.mp3')
    },

    IMAGES: {
        WALKING: [
            'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png',
            'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/2-Ga_centro.png',
            'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/3.Ga_paso izquierdo.png'
        ],

        DEAD: ['img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/4.G_muerte.png']
    }
}

const THROWABLE_OBJECT_ASSETS = {
    AUDIOS: {
        BREAK: new Audio('audio/glassBreak.mp3'),
        THROW: new Audio('audio/throw.mp3'),
    },

    IMAGES: {
        ROTATION_BOTTLE: [
            'img/6.botella/Rotación/Mesa de trabajo 1 copia 3.png',
            'img/6.botella/Rotación/Mesa de trabajo 1 copia 4.png',
            'img/6.botella/Rotación/Mesa de trabajo 1 copia 5.png',
            'img/6.botella/Rotación/Mesa de trabajo 1 copia 6.png'
        ],

        SPLASH: [
            'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 7.png',
            'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 8.png',
            'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 9.png',
            'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 10.png',
            'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 11.png',
            'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 12.png'
        ]
    }
}

const LEVEL_ASSETS = {
    AUDIOS: {
        BACKGROUND: new Audio('audio/background.mp3')
    }
}