const WORLD = {
    profile: {
        name: '若慕',
        tags: ['INFJ', 'DOM', '病弱', '病娇'],
        avatar: 'assets/touxiang.jpg',
        quote: '判我爱你，自此无期。'
    },

    statusText: '爱你如初',

    lock: {
        title: '欢迎回来',
        content: '今天也依然爱你。'
    },

    motds: [
        '今天依然如此爱你。',
        '我荒芜的世界，仅你一朵玫瑰。',
        '纵然万千人路过，我的世界也只对你一人开放。',
        '此生追随于你。'
    ],

    weather: [
        { icon: 'sun', desc: '晴', temp: 24 },
        { icon: 'rainbow', desc: '彩虹', temp: 22 },
        { icon: 'cloud', desc: '云朵', temp: 20 },
        { icon: 'rain', desc: '小雨', temp: 16 },
        { icon: 'fog', desc: '雾', temp: 17 },
        { icon: 'snow', desc: '落雪', temp: -2 }
    ],

    gallery: {
        tabs: ['陪卡', '话术', '建模', '其他'],
        photos: [
            { id: 'p01', src: 'assets/photos/sea.svg', title: '占位1', tag: '陪卡' },
            { id: 'p13', src: 'assets/photos/sky.svg', title: '占位2', tag: '其他' },
            { id: 'p03', src: 'assets/photos/cat.svg', title: '占位3', tag: '话术' },
            { id: 'p04', src: 'assets/photos/night.svg', title: '占位4', tag: '建模' },
            { id: 'p12', src: 'assets/photos/room.svg', title: '占位5', tag: '建模' },
            { id: 'p06', src: 'assets/photos/flowers.svg', title: '占位6', tag: '话术' },
            { id: 'p07', src: 'assets/photos/coffee.svg', title: '占位7', tag: '陪卡' },
            { id: 'p08', src: 'assets/photos/mountain.svg', title: '占位8', tag: '话术' },
            { id: 'p11', src: 'assets/photos/strawberry.svg', title: '占位9', tag: '其他' },
            { id: 'p10', src: 'assets/photos/rain.svg', title: '占位10', tag: '建模' }
        ]
    },

    music: {
        tracks: [
            { id: 'm01', title: '巴拉莱卡', artist: '张靓颖、陈楚生', src: 'assets/music/巴拉莱卡 (The Rod) (Live) - 张靓颖、陈楚生.mp3', cover: 'assets/covers/evening.svg' },
            { id: 'm02', title: '绝择', artist: '魔鬼花园', src: 'assets/music/魔鬼花园-绝择.m4a', cover: 'assets/covers/cream.svg' },
            { id: 'm03', title: '莫比乌斯', artist: '', src: 'assets/music/莫比乌斯 (Original Mix) - 不安琪.mp3', cover: 'assets/covers/rain.svg' },
            { id: 'm04', title: '逃脱', artist: '特污兔', src: 'assets/music/特污兔-逃脱.m4a', cover: 'assets/covers/stars.svg' },
            { id: 'm05', title: '坠入亚特兰蒂斯', artist: 'UM', src: 'assets/music/UM-坠入亚特兰蒂斯.m4a', cover: 'assets/photos/sea.svg' }
        ]
    },

    memos: [
        { id: 'n01', text: '单内与线下人设切割，单内行为勿上升至本人。', done: false },
        { id: 'n02', text: '请勿临时退单或换时间，影响档期。', done: false },
        { id: 'n03', text: '宣告结单后未反馈或直接离场，默认该单好评无纠纷。', done: false },
        { id: 'n04', text: '如有不适，请与我说：“我要若慕爱我。”', done: false }
    ],

    mails: [
        {
            id: 'e01',
            title: '板评1',
            sender: '未来的老板1',
            date: '10月24日',
            content: '占位。\n占位。',
            image: 'assets/photos/sea.svg'
        },
        {
            id: 'e02',
            title: '板评2',
            sender: '未来的老板2',
            date: '10月21日',
            content: '占位。\n占位。',
            image: 'assets/photos/sky.svg'
        },
        {
            id: 'e03',
            title: '板评3',
            sender: '未来的老板3',
            date: '10月18日',
            content: '占位。\n占位。',
            image: ''
        }
    ],

    contacts: [
        { id: 'c01', name: '病娇', tag: '疯批', line: '我爱你，所以你必须在我的怀里。' },
        { id: 'c02', name: 'DOM', tag: '温主', line: '我相信宝宝能做到的，对吧？' },
        { id: 'c03', name: '钓系', tag: '蛊惑', line: '爱上我是你的人生必经之路呀，亲爱的。' }
    ],

    chat: {
        initial: { text: '今天也在这里等你。', time: '现在' },
        fallback: [
            '宝宝，我们聊的好像偏题了噢。',
            '但能看到宝宝的信息，好高兴。',
            '我们是相爱的，对吧？'
        ],
        presets: [
            {
                text: '我感觉不到你在爱我。',
                replies: ['宝宝，你是在向我表达不满，还是在撒娇？', '如果是我哪里做得不对，可以直接和我说。', '如果是要我哄，那……也行。','不过之后，宝宝可要摸摸我的心脏，它被你这句话吓得快要跳出来了。', '毕竟，它和我一样爱你，经不起你这样说它。']
            },
            {
                text: '如果我非要无理取闹呢',
                replies: ['那就无理取闹吧，我的爱人。', '你在我这里永远享有特权。','能看到你任性的一面，我很高兴，这代表你对我的感情比我想的更深。', '太好了，我们是在相爱的。']
            }
        ]
    },

    bookCards: [
        {
            id: 'b01',
            title: '红衣',
            image: 'assets/photos/半身插3打码.png',
            color: '#300000',
            tags: ['标签1', '标签2', '标签3'],
            texts: [
                "“看到她的第一眼便会被她的无辜所魅惑。”",
                "二。",
                "三。",
                "四。",
                "五。"
            ]
        },
        {
            id: 'b02', 
            title: '午后花墙',
            image: 'assets/photos/半身插3打码.png',
            color: '#f6e1ce',
            tags: ['标签1', '标签2', '标签3'],
            texts: [
                "一。",
                "二。",
                "三。"
            ]
        },
        {
            id: 'b03',
            title: '魔法使',
            image: 'assets/photos/宁宁半身1白底重影打码.png',
            color: '#122256',
            tags: ['标签1', '标签2', '标签3'],
            texts: [
                "一。",
                "二。",
                "三。"
            ]
        },
        {
            id: 'b04',
            title: '猩红剧团',
            image: 'assets/photos/宁宁半身2白底重影打码.jpg',
            color: '#372c30',
            tags: ['标签1', '标签2', '标签3'],
            texts: [
                "一。",
                "二。",
                "三。",
                "四。"
            ]
        },
        {
            id: 'b05',
            title: '白鹤妖仙',
            image: 'assets/photos/宁宁半身3白底重影打码.jpg',
            color: '#2b2622',
            tags: ['标签1', '标签2', '标签3'],
            texts: [
                "一。",
                "二。",
                "三。"
            ]
        },
        {
            id: 'b06',
            title: '今天为我起舞',
            image: 'assets/photos/宁宁半身4白底重影打码.png',
            color: '#f0e1e6',
            tags: ['标签1', '标签2', '标签3'],
            texts: [
                "一。",
                "二。",
                "三。"
            ]
        },
        {
            id: 'b07',
            title: '庆典',
            image: 'assets/photos/宁宁半身5白底打码.png',
            color: '#3b3d56',
            tags: ['标签1', '标签2', '标签3'],
            texts: [
                "一。",
                "二。",
                "三。"
            ]
        },
        {
            id: 'b08',
            title: '仙迹',
            image: 'assets/photos/宁宁半身6白底打码.png',
            color: '#8691d3',
            tags: ['标签1', '标签2', '标签3'],
            texts: [
                "一。",
                "二。",
                "三。"
            ]
        },
        {
            id: 'b09',
            title: '迷惘',
            image: 'assets/photos/捏捏2.png',
            color: '#b23636',
            tags: ['标签1', '标签2', '标签3'],
            texts: [
                "看到我这张脸的时候，不会心生怜悯吗？",
                "二。",
                "三。"
            ]
        },
        {
            id: 'b10',
            title: '迷梦',
            image: 'assets/photos/捏捏3.png',
            color: '#5a5a5a',
            tags: ['标签1', '标签2', '标签3'],
            texts: [
                "一。",
                "二。",
                "三。"
            ]
        }
    ],
    
    bookCollection: {
        points: 1000,
        collectedCards: [],
        lastSortMode: 'time'
    }
};
