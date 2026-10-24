// 修改入口：个人信息 profile、图库 gallery、音乐 music、备忘 memos、邮件 mails、联系人 contacts、信息 chat
// 图片位置：assets/photos/；头像位置：assets/avatar.svg；音乐位置：assets/music/；封面位置：assets/covers/

const WORLD = {
    // 个人信息与头像：头像文件在 assets/avatar.svg
    profile: {
        name: '林小满',
        tags: ['INFP', '爱拍照', '夜猫子', '一点点浪漫'],
        avatar: 'assets/avatar.svg',
        quote: '把喜欢的日子，收进这一小块屏幕里。'
    },

    statusText: '爱你如初',

    lock: {
        title: '欢迎回来',
        content: '今天也依然爱你。'
    },

    motds: [
        '愿今天的风，替你吹走所有烦恼。',
        '心里住着一个小晴天，走到哪里都发光。',
        '偶尔也要对自己撒个娇，生活才会甜一点。',
        '把愿望轻轻放进心里，慢慢等它开花。',
        '慢一点也没关系，温柔本身就很了不起。',
        '愿你眼里有星辰，心中有奶油草莓。',
        '今天的云朵，是天空寄来的信。',
        '世界很大，先照顾好自己的小情绪。',
        '做个像糖果一样的人，甜甜地活在今天。',
        '别紧张，你正在成为更好的自己。'
    ],

    weather: [
        { icon: 'sun', desc: '晴', temp: 24 },
        { icon: 'rainbow', desc: '彩虹', temp: 22 },
        { icon: 'cloud', desc: '云朵', temp: 20 },
        { icon: 'rain', desc: '小雨', temp: 16 },
        { icon: 'fog', desc: '雾', temp: 17 },
        { icon: 'snow', desc: '落雪', temp: -2 }
    ],

    // 图库图片：图片文件在 assets/photos/，下方 src 填写对应文件名
    gallery: {
        tabs: ['截图', '其他'],
        photos: [
            { id: 'p01', src: 'assets/photos/sea.svg', title: '海边的黄昏', tag: '其他' },
            { id: 'p02', src: 'assets/photos/screenshot-chat.svg', title: '和你的第 108 次对话', tag: '截图' },
            { id: 'p03', src: 'assets/photos/cat.svg', title: '猫猫在光里睡着了', tag: '其他' },
            { id: 'p04', src: 'assets/photos/night.svg', title: '月亮今晚营业', tag: '其他' },
            { id: 'p05', src: 'assets/photos/screenshot-notes.svg', title: '今天的备忘录', tag: '截图' },
            { id: 'p06', src: 'assets/photos/flowers.svg', title: '春天把花藏在这里', tag: '其他' },
            { id: 'p07', src: 'assets/photos/coffee.svg', title: '下午三点的咖啡', tag: '其他' },
            { id: 'p08', src: 'assets/photos/mountain.svg', title: '山湖之间', tag: '其他' },
            { id: 'p09', src: 'assets/photos/screenshot-files.svg', title: '文件都收好啦', tag: '截图' },
            { id: 'p10', src: 'assets/photos/rain.svg', title: '雨落窗台', tag: '其他' },
            { id: 'p11', src: 'assets/photos/strawberry.svg', title: '草莓奶油日', tag: '其他' },
            { id: 'p12', src: 'assets/photos/room.svg', title: '我的小房间', tag: '其他' },
            { id: 'p13', src: 'assets/photos/sky.svg', title: '一只漂过云层的热气球', tag: '其他' }
        ]
    },

    // 音乐：音频文件在 assets/music/，封面文件在 assets/covers/，下方 src 与 cover 填写对应文件名
    music: {
        tracks: [
            { id: 'm01', title: '晚风来信', artist: '小满电台', src: 'assets/music/evening.wav', cover: 'assets/covers/evening.svg' },
            { id: 'm02', title: '奶油色的梦', artist: 'Moonlit', src: 'assets/music/cream.wav', cover: 'assets/covers/cream.svg' },
            { id: 'm03', title: '雨落窗台', artist: '白噪音房间', src: 'assets/music/rain.wav', cover: 'assets/covers/rain.svg' },
            { id: 'm04', title: '星星收藏家', artist: '小满电台', src: 'assets/music/stars.wav', cover: 'assets/covers/stars.svg' }
        ]
    },

    memos: [
        { id: 'n01', text: '买草莓和奶油，顺便带一束洋桔梗', done: false },
        { id: 'n02', text: '今晚早点睡，不许再刷手机', done: false },
        { id: 'n03', text: '周六去海边，带相机和野餐垫', done: false },
        { id: 'n04', text: '给阳台的绣球花浇水', done: true }
    ],

    // 邮件配图：image 填写 assets/photos/ 下的文件名，留空则不显示图片
    mails: [
        {
            id: 'e01',
            title: '关于周六的小小计划',
            sender: '阿梨',
            date: '10月24日',
            content: '天气预报说周六是晴天。\n我带了野餐垫，你记得带上相机。\n我们去看海，然后慢慢走回来。',
            image: 'assets/photos/sea.svg'
        },
        {
            id: 'e02',
            title: '一朵云的观测报告',
            sender: '天空邮局',
            date: '10月21日',
            content: '今天 16:42，东边的天空出现了一朵很像奶油泡芙的云。\n它停留了大约十分钟，然后被风吹散。\n特此记录，分享给你。',
            image: 'assets/photos/sky.svg'
        },
        {
            id: 'e03',
            title: '欢迎来到我的世界',
            sender: '小满',
            date: '10月18日',
            content: '这里收着我喜欢的照片、音乐、碎碎念和小小的心事。\n不用急着离开，随便逛逛吧。\n如果你看到月亮，记得替我向它问好。',
            image: ''
        }
    ],

    contacts: [
        { id: 'c01', name: '林女士', tag: '妈妈', line: '记得按时吃饭，周末回家给你炖汤。' },
        { id: 'c02', name: '阿梨', tag: '最好的朋友', line: '下次见面还要一起去海边看日落，带两杯冰美式。' },
        { id: 'c03', name: '小满', tag: '自己', line: '允许自己慢一点，也别忘了给生活留一点奶油和花。' }
    ],

    chat: {
        initial: { text: '今天也在这里等你。', time: '现在' },
        fallback: [
            '看到啦，我在认真听。',
            '你慢慢说，不着急。',
            '不管怎样，今天也谢谢你来找我。'
        ],
        presets: [
            {
                text: '今天过得怎么样？',
                replies: ['还不错呀，刚刚在整理我们的照片。', '看到你发来的消息，心情突然就变好了。', '你呢？今天有没有好好吃饭？']
            },
            {
                text: '我有一点想你了',
                replies: ['好吧，只允许你想我一点点。', '其实我也是。刚刚还在看上次海边拍的那张照片。', '等周末见面，再把想念慢慢说完。']
            },
            {
                text: '晚饭吃了吗？',
                replies: ['吃啦，是热乎乎的番茄面。', '你也要记得吃饭，不许用咖啡糊弄过去。', '下次我做给你吃，加很多很多芝士。']
            },
            {
                text: '晚安呀',
                replies: ['晚安，今天也辛苦啦。', '把手机放下，去喝一小杯温水。', '明天醒来，记得先看看窗外的天气。']
            }
        ]
    }
};
