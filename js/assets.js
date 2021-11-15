const CHARACTER_ASSETS = {

    AUDIOS: {
        bottle: new Audio('audio/bottle.mp3'),
        coin: new Audio('audio/coin.mp3'),
        move: new Audio('audio/walk.mp3'),
        jump: new Audio('audio/jump.mp3'),
        hit: new Audio('audio/hit.mp3'),
        throw: new Audio('audio/throw.mp3'),
        land: new Audio('audio/land.mp3')
    },

    IMAGES: {
        dead: [
            'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-51.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-52.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-53.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-54.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-55.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-56.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-57.png'
        ],
        hit: [
            'img/2.Secuencias_Personaje-Pepe-corrección/4.Herido/H-41.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/4.Herido/H-42.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/4.Herido/H-43.png'
        ],
        attack: [
            'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-38.png'
        ],
        launch: [
            'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-33.png'
        ],
        jump: [
            'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-34.png',
            // 'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-36.png',
        ],
        midAir: [
            'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-35.png'
        ],
        landing: [
            'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-37.png'
        ],
        landed: [
            'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-38.png',
        ],
        walking: [
            'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-21.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-22.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-23.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-24.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-25.png',
            'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-26.png'
        ],
        idle: [
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
        longIdle: [
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