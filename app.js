(() => {
    'use strict';

    const $ = (id) => document.getElementById(id);
    const pad = (value) => String(value).padStart(2, '0');
    const WEEK = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (ch) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[ch]));

    const icon = (inner) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;

    const I = {
        user: icon('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),
        gallery: icon('<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/>'),
        memo: icon('<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>'),
        music: icon('<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>'),
        mail: icon('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-9 5.7a2 2 0 0 1-2 0L2 7"/>'),
        phone: icon('<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7 12.8 12.8 0 0 0 .7 2.8 2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5 12.8 12.8 0 0 0 2.8.7 2 2 0 0 1 1.7 2.1Z"/>'),
        message: icon('<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>'),
        browser: icon('<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14.5 14.5 0 0 1 0 18"/><path d="M12 3a14.5 14.5 0 0 0 0 18"/>'),
        close: icon('<path d="M18 6 6 18"/><path d="m6 6 12 12"/>'),
        back: icon('<path d="m15 18-6-6 6-6"/>'),
        search: icon('<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>'),
        check: icon('<path d="m5 12 5 5L20 7"/>'),
        play: icon('<path d="m7 4 13 8-13 8Z" fill="currentColor" stroke="none"/>'),
        pause: icon('<rect x="6" y="4" width="4" height="16" rx="1" fill="currentColor" stroke="none"/><rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor" stroke="none"/>'),
        prev: icon('<path d="M19 20 9 12l10-8Z" fill="currentColor" stroke="none"/><path d="M5 19V5"/>'),
        next: icon('<path d="m5 4 10 8L5 20Z" fill="currentColor" stroke="none"/><path d="M19 5v14"/>'),
        image: icon('<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/>'),
        send: icon('<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>'),
        sparkle: icon('<path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7Z"/><path d="M19 16v4"/><path d="M17 18h4"/>'),
        sun: icon('<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.9 4.9 1.4 1.4"/><path d="m17.7 17.7 1.4 1.4"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.3 17.7-1.4 1.4"/><path d="m19.1 4.9-1.4 1.4"/>'),
        rainbow: icon('<path d="M22 17a10 10 0 0 0-20 0"/><path d="M6 17a6 6 0 0 1 12 0"/><path d="M10 17a2 2 0 0 1 4 0"/>'),
        cloud: icon('<path d="M20 12.5A4.5 4.5 0 0 0 17.5 5a6 6 0 0 0-5-2.5 5.5 5.5 0 0 0-5.3 3.8A4 4 0 0 0 6.3 16h10a4.5 4.5 0 0 0 3.7-3.5Z"/>'),
        rain: icon('<path d="M4 14.9A7 7 0 1 1 15.7 8h1.8a4.5 4.5 0 0 1 2.5 8.2"/><path d="M16 14v6"/><path d="M8 14v6"/>'),
        fog: icon('<path d="M4 14.9A7 7 0 1 1 15.7 8h1.8a4.5 4.5 0 0 1 2.5 8.2"/><path d="M16 17H7"/><path d="M17 21H9"/>'),
        snow: icon('<path d="m10 8.5-1-2L6 6"/><path d="M14 8.5 15 6.5 18 6"/><path d="M12 2v6"/><path d="m10 15.5-1 2-3 .5"/><path d="M14 15.5 15 17.5l3 .5"/><path d="M12 16v6"/><path d="M12 11v5"/>'),
        book: icon('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/>'),
        bookmark: icon('<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>'),
        refresh: icon('<path d="M21 12a9 9 0 0 0-9-9 9.8 9.8 0 0 0-3.3.6"/><path d="M3 12a9 9 0 0 0 9 9 9.8 9.8 0 0 0 3.3-.6"/><path d="m9 15 3-3-3-3"/><path d="m15 9-3 3 3 3"/>'),
        filter: icon('<path d="M22 3H2l8 9.5V21l4 2v-9.5z"/>'),
        grid: icon('<path d="M3 3h18v18H3z"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/><path d="M15 3v18"/>'),
        menu: icon('<path d="M3 12h18"/><path d="M3 6h18"/><path d="M3 18h18"/>'),
        delete: icon('<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M8 6v-2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>'),
        star: icon('<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>'),
        coins: icon('<circle cx="8" cy="8" r="6"/><circle cx="8" cy="8" r="2.5" fill="currentColor"/><circle cx="16" cy="8" r="6"/><circle cx="16" cy="8" r="2.5" fill="currentColor"/><path d="M18 11a6 6 0 0 1-12 0"/><path d="M6 11a6 6 0 0 1 12 0"/>'),
        history: icon('<path d="M3 12c0-6 6-9 9-9 5 0 9 4 9 9s-4 9-9 9c-3 0-6-21-8-6"/><path d="M3 6v6h6"/>'),
        sort: icon('<path d="m3 8 5-5 5 5"/><path d="M8 3v18"/><path d="m21 16-5 5-5-5"/><path d="M16 21V3"/>')
    };

    const APPS = [
        { label: '关于我', app: 'about', icon: I.user, tone: 'tone-1' },
        { label: '图库', app: 'gallery', icon: I.gallery, tone: 'tone-2' },
        { label: '备忘录', app: 'memo', icon: I.memo, tone: 'tone-4' },
        { label: '音乐', app: 'music', icon: I.music, tone: 'tone-5' },
        { label: '邮件', app: 'mail', icon: I.mail, tone: 'tone-6' },
        { label: '书城', app: 'bookStore', icon: I.book, tone: 'tone-3' }
    ];

    const DOCK_APPS = [
        { label: '电话', app: 'contacts', icon: I.phone, tone: 'tone-7' },
        { label: '信息', app: 'messages', icon: I.message, tone: 'tone-8' },
        { label: '浏览器', app: 'browser', icon: I.browser, tone: 'tone-3' }
    ];

    const SEQUENCE = ['about', 'memo', 'contacts', 'mail', 'messages', 'gallery', 'bookStore'];

    // 愿望口令配置
    const WISHES = [
        { code: '520', points: 520, name: '我爱你' },
        { code: '521', points: 521, name: '我很爱你' },
        { code: '1314', points: 1314, name: '一生一世' }
    ];

    // 数据持久化管理器
    const DataManager = {
        storageKey: 'shouji_book_collection',
        
        getInitialData() {
            return {
                points: 1000,
                collectedCards: [],
                totalDraws: 0,
                drawHistory: [],
                lastSortMode: 'time',
                sortingEnabled: false,
                bookOrder: [],
                cardPositions: {},
                usedWishes: []
            };
        },
        
        load() {
            try {
                const saved = localStorage.getItem(this.storageKey);
                if (saved) {
                    const parsed = JSON.parse(saved);
                    // 合并默认值，确保有新字段
                    return { ...this.getInitialData(), ...parsed };
                }
            } catch (e) {
                console.warn('Failed to load saved data:', e);
            }
            return this.getInitialData();
        },
        
        save(data) {
            try {
                localStorage.setItem(this.storageKey, JSON.stringify(data));
            } catch (e) {
                console.warn('Failed to save data:', e);
            }
        },
        
        getCardData(cardId) {
            return WORLD.bookCards.find(card => card.id === cardId);
        },
        
        formatTime(timestamp) {
            const date = new Date(timestamp);
            return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
        }
    };

    // 加载持久化数据
    const userData = DataManager.load();

    const state = {
        activeApp: null,
        history: [],
        galleryFilter: '全部',
        mailDetailId: null,
        readMails: new Set(),
        trackIndex: 0,
        chatMessages: [],
        chatBusy: false,
        chatTyping: false,
        chatTimers: [],
        audioMuted: false,
        needsGesture: false,
        suppressClickUntil: 0,
        bookStore: {
            points: userData.points,
            collectedCards: userData.collectedCards,
            totalDraws: userData.totalDraws,
            drawHistory: userData.drawHistory,
            lastSortMode: userData.lastSortMode,
            sortingEnabled: userData.sortingEnabled,
            bookOrder: userData.bookOrder,
            cardPositions: userData.cardPositions,
            usedWishes: userData.usedWishes || [], // 从userData加载，兼容旧数据
            currentTab: 'store',
            selectedCard: null,
            selectedCardIndex: 0,
            drawResults: []
        }
    };
    
    // 将状态暴露给全局，供拖拽排序等功能使用
    window.state = state;

    const lockScreen = $('lockScreen');
    const homeScreen = $('homeScreen');
    const appLayer = $('appLayer');
    const photoViewer = $('photoViewer');
    const wishModal = $('wishModal');
    const restartModal = $('restartModal');
    const decomposeModal = $('decomposeModal');
    const wishInput = $('wishInput');
    const wishHint = $('wishHint');
    const decomposeHint = $('decomposeHint');
    const confirmWishBtn = $('confirmWishBtn');
    const confirmRestartBtn = $('confirmRestartBtn');
    const confirmDecomposeBtn = $('confirmDecomposeBtn');
    const toastEl = $('toast');
    const appViews = {};

    const getDateText = (date = new Date()) => `${WEEK[date.getDay()]} ${date.getMonth() + 1}月${date.getDate()}日`;
    const getTimeText = (date = new Date()) => `${pad(date.getHours())}:${pad(date.getMinutes())}`;
    const formatClock = (seconds) => {
        if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
        return `${Math.floor(seconds / 60)}:${pad(Math.floor(seconds % 60))}`;
    };

    const weather = WORLD.weather[Math.floor(Math.random() * WORLD.weather.length)];
    const motd = WORLD.motds[Math.floor(Math.random() * WORLD.motds.length)];

    function tick() {
        const now = new Date();
        const time = getTimeText(now);
        const date = getDateText(now);
        $('statusTime').textContent = time;
        $('lockTime').textContent = time;
        $('homeTime').textContent = time;
        $('lockDate').textContent = date;
        $('homeDate').textContent = date;
    }

    function buildApp(app, dock = false) {
        return `<button class="app" type="button" data-launch="${esc(app.app)}" aria-label="${esc(app.label)}">
            <span class="app-icon ${app.tone}">${app.icon}</span>
            ${dock ? '' : `<span class="app-name">${esc(app.label)}</span>`}
        </button>`;
    }

    function renderHome() {
        $('appGrid').innerHTML = APPS.map((app) => buildApp(app)).join('');
        $('homeDock').innerHTML = DOCK_APPS.map((app) => buildApp(app, true)).join('');
        $('statusText').textContent = WORLD.statusText;
        $('notificationTitle').textContent = WORLD.lock.title;
        $('notificationContent').textContent = WORLD.lock.content;
        $('notificationIcon').innerHTML = I.sparkle;
        $('weatherIcon').innerHTML = I[weather.icon] || I.sun;
        $('weatherTemp').textContent = `${weather.temp}°`;
        $('weatherDesc').textContent = weather.desc;
        $('motd').textContent = motd;
        if (weather.icon === 'rain') {
            for (let i = 0; i < 22; i++) {
                const drop = document.createElement('span');
                drop.className = 'rain-drop';
                drop.style.left = `${Math.random() * 100}%`;
                drop.style.animationDelay = `${Math.random() * 2.4}s`;
                drop.style.animationDuration = `${0.7 + Math.random() * 0.8}s`;
                homeScreen.appendChild(drop);
            }
        }
    }

    function renderAppGridOnly() {
        $('appGrid').innerHTML = APPS.map((app) => buildApp(app)).join('');
        $('homeDock').innerHTML = DOCK_APPS.map((app) => buildApp(app, true)).join('');
    }

    function unlockScreen() {
        if (document.body.classList.contains('unlocked')) return;
        document.body.classList.add('unlocked');
        lockScreen.style.transform = 'translateY(-102%)';
        lockScreen.style.opacity = '0';
        lockScreen.style.pointerEvents = 'none';
        state.suppressClickUntil = Date.now() + 400;
        updateMusicFab();
    }

    let lockStartY = 0;
    let lockDragging = false;

    function lockStart(event) {
        if (event.touches && event.touches.length !== 1) return;
        lockStartY = event.touches ? event.touches[0].clientY : event.clientY;
        lockDragging = true;
    }

    function lockMove(event) {
        if (!lockDragging) return;
        const currentY = event.touches ? event.touches[0].clientY : event.clientY;
        const delta = currentY - lockStartY;
        if (delta < 0) {
            lockScreen.style.transform = `translateY(${delta}px)`;
            lockScreen.style.opacity = String(Math.max(0.2, 1 - Math.abs(delta) / 520));
        }
    }

    function lockEnd(event) {
        if (!lockDragging) return;
        lockDragging = false;
        const currentY = event.changedTouches ? event.changedTouches[0].clientY : event.clientY;
        if (currentY - lockStartY < -65) {
            unlockScreen();
        } else {
            lockScreen.style.transform = '';
            lockScreen.style.opacity = '';
        }
    }

    lockScreen.addEventListener('touchstart', lockStart, { passive: true });
    lockScreen.addEventListener('touchmove', lockMove, { passive: true });
    lockScreen.addEventListener('touchend', lockEnd);
    lockScreen.addEventListener('mousedown', lockStart);
    window.addEventListener('mousemove', lockMove);
    window.addEventListener('mouseup', lockEnd);

    $('lockHint').addEventListener('click', () => {
        unlockScreen();
    });

    const audio = new Audio();
    audio.preload = 'auto';
    audio.volume = 0.45;

    const tracks = WORLD.music.tracks;
    const musicFab = $('musicFab');

    function currentTrack() {
        return tracks[state.trackIndex] || null;
    }

    function setTrack(index, autoplay = true) {
        if (!tracks.length) return;
        state.trackIndex = (index + tracks.length) % tracks.length;
        const track = currentTrack();
        audio.src = track.src;
        audio.load();
        updateMusicChrome();
        if (autoplay) {
            audio.muted = false;
            state.audioMuted = false;
            audio.play().catch(() => {
                state.needsGesture = true;
                updateMusicChrome();
            });
        }
    }

    function togglePlay() {
        if (!tracks.length) return;
        if (!audio.src) setTrack(state.trackIndex, false);
        if (audio.paused) {
            audio.muted = false;
            state.audioMuted = false;
            audio.play().catch(() => showToast('暂时无法播放，请再点一次'));
        } else {
            audio.pause();
        }
    }

    function nextTrack(step) {
        if (!tracks.length) return;
        setTrack(state.trackIndex + step, true);
        if (state.activeApp === 'music') renderMusic();
    }

    function updateMusicFab() {
        const track = currentTrack();
        const img = musicFab.querySelector('img');
        const cover = track ? track.cover : '';
        if (img.getAttribute('src') !== cover) img.src = cover;
        musicFab.classList.toggle('playing', !audio.paused);
        musicFab.classList.toggle('needs-tap', state.needsGesture || state.audioMuted);
        const hidden = ['music', 'messages'].includes(state.activeApp);
        musicFab.classList.toggle('visible', document.body.classList.contains('unlocked') && !hidden);
    }

    function updateMusicChrome() {
        updateMusicFab();
        const track = currentTrack();
        if (!track) return;
        const playing = !audio.paused;
        const cover = $('musicCover');
        if (cover && cover.getAttribute('src') !== track.cover) cover.src = track.cover;
        const title = $('musicTitle');
        if (title && title.textContent !== track.title) title.textContent = track.title;
        const artist = $('musicArtist');
        if (artist && artist.textContent !== track.artist) artist.textContent = track.artist;
        const play = $('musicPlay');
        if (play && play.dataset.playing !== String(playing)) {
            play.innerHTML = playing ? I.pause : I.play;
            play.dataset.playing = String(playing);
            play.setAttribute('aria-label', playing ? '暂停' : '播放');
        }
        const label = $('musicPlayLabel');
        if (label && label.textContent !== (playing ? '暂停' : '播放')) label.textContent = playing ? '暂停' : '播放';
        const current = $('musicCurrent');
        if (current) current.textContent = formatClock(audio.currentTime || 0);
        const duration = $('musicDuration');
        if (duration) duration.textContent = formatClock(audio.duration || 0);
        const progress = $('musicProgress');
        if (progress && document.activeElement !== progress && Number.isFinite(audio.duration) && audio.duration > 0) {
            progress.value = String((audio.currentTime / audio.duration) * 1000);
        }
        document.querySelectorAll('[data-track-id]').forEach((row) => {
            row.classList.toggle('active', row.dataset.trackId === track.id);
        });
        const player = document.querySelector('.music-player-card');
        if (player) player.classList.toggle('is-playing', playing);
    }

    function bootAudio() {
        if (!tracks.length) return;
        state.trackIndex = Math.floor(Math.random() * tracks.length);
        const track = currentTrack();
        audio.src = track.src;
        audio.muted = true;
        state.audioMuted = true;
        audio.load();
        const tryPlay = () => {
            audio.play().then(() => {
                updateMusicChrome();
            }).catch(() => {
                state.audioMuted = false;
                state.needsGesture = true;
                audio.muted = false;
                updateMusicChrome();
            });
        };
        tryPlay();
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible' && audio.paused && !state.needsGesture) {
                state.audioMuted = true;
                audio.muted = true;
                tryPlay();
            }
        });
    }

    function unlockAudio() {
        let changed = false;
        if (state.needsGesture) {
            state.needsGesture = false;
            audio.muted = false;
            changed = true;
            if (audio.paused) audio.play().catch(() => {});
        } else if (state.audioMuted) {
            state.audioMuted = false;
            audio.muted = false;
            changed = true;
        }
        if (changed) updateMusicChrome();
    }

    audio.addEventListener('loadedmetadata', updateMusicChrome);
    audio.addEventListener('timeupdate', updateMusicChrome);
    audio.addEventListener('play', updateMusicChrome);
    audio.addEventListener('pause', updateMusicChrome);
    audio.addEventListener('ended', () => {
        if (tracks.length > 1) nextTrack(1);
        else {
            audio.currentTime = 0;
            audio.play().catch(() => {});
        }
    });

    document.addEventListener('pointerdown', () => {
        unlockAudio();
    }, { capture: true });

    function ensureView(id) {
        if (appViews[id]) return appViews[id];
        const view = document.createElement('section');
        view.className = 'app-view';
        view.dataset.app = id;
        view.setAttribute('aria-hidden', 'true');
        appLayer.appendChild(view);
        appViews[id] = view;
        return view;
    }

    function appHeader(title, { back = false, subtitle = '', actions = '', showClose = true } = {}) {
        return `<header class="app-header">
            <div class="app-head-left">
                ${back ? `<button class="head-btn" type="button" data-act="back" aria-label="返回">${I.back}</button>` : ''}
            </div>
            <div class="app-head-center">
                <h1>${esc(title)}</h1>
                ${subtitle ? `<p>${esc(subtitle)}</p>` : ''}
            </div>
            <div class="app-head-right">
                ${actions}
                ${showClose ? `<button class="head-btn" type="button" data-act="close-app" aria-label="关闭">${I.close}</button>` : ''}
            </div>
        </header>`;
    }

    function emptyState(title, description = '') {
        return `<div class="empty-state">
            <span class="empty-icon">${I.sparkle}</span>
            <h3>${esc(title)}</h3>
            ${description ? `<p>${esc(description)}</p>` : ''}
        </div>`;
    }

    function renderAbout() {
        const view = ensureView('about');
        const profile = WORLD.profile;
        view.innerHTML = `
            ${appHeader('关于我', { subtitle: 'ABOUT ME' })}
            <div class="app-body about-body">
                <div class="about-hero">
                    <div class="about-avatar"><img src="${esc(profile.avatar)}" alt="${esc(profile.name)}的头像"></div>
                    <div class="about-info">
                        <h2>${esc(profile.name)}</h2>
                        <div class="about-tags">${profile.tags.map((tag) => `<span class="tag-pill">${esc(tag)}</span>`).join('')}</div>
                    </div>
                </div>
                <blockquote class="about-quote">
                    <span class="quote-mark">“</span>
                    <p>${esc(profile.quote)}</p>
                    <cite>— ${esc(profile.name)}</cite>
                </blockquote>
                <div class="about-meta">
                    <span>${I.image} ${WORLD.gallery.photos.length} 张照片</span>
                    <span>${I.music} ${WORLD.music.tracks.length} 首音乐</span>
                    <span>${I.mail} ${WORLD.mails.length} 封来信</span>
                </div>
                <p class="swipe-hint">向左滑动，继续了解我 → </p>
                <div class="about-actions">
                    <button class="action-btn wish-btn" type="button" data-act="make-wish" id="wishBtn">
                        <span class="action-icon">${I.star}</span>
                        <span>向我许愿</span>
                    </button>
                    <button class="action-btn restart-btn" type="button" data-act="restart-app" id="restartBtn">
                        <span class="action-icon">${I.refresh}</span>
                        <span>重新开始</span>
                    </button>
                </div>
            </div>
        `;
    }

    function galleryTabs() {
        return ['全部', ...WORLD.gallery.tabs.filter((tag) => tag !== '全部')];
    }

    function filteredPhotos() {
        return state.galleryFilter === '全部'
            ? WORLD.gallery.photos
            : WORLD.gallery.photos.filter((photo) => photo.tag === state.galleryFilter);
    }

    function renderGallery() {
        const view = ensureView('gallery');
        if (!galleryTabs().includes(state.galleryFilter)) state.galleryFilter = '全部';
        const photos = filteredPhotos();
        view.innerHTML = `
            ${appHeader('图库', { subtitle: `${WORLD.gallery.photos.length} PHOTOS` })}
            <div class="app-body gallery-body">
                <div class="masonry">
                    ${photos.length ? photos.map((photo) => `
                        <figure class="photo-card">
                            <button class="photo-main" type="button" data-act="open-photo" data-id="${esc(photo.id)}" aria-label="查看 ${esc(photo.title)}">
                                <img src="${esc(photo.src)}" alt="${esc(photo.title)}" loading="lazy">
                            </button>
                            <figcaption><span>${esc(photo.title)}</span><em>${esc(photo.tag)}</em></figcaption>
                        </figure>
                    `).join('') : emptyState('这个分类还没有照片', '换一个分类看看吧')}
                </div>
            </div>
            <nav class="gallery-tabs" aria-label="图库分类">
                ${galleryTabs().map((tag) => {
                    const count = tag === '全部' ? WORLD.gallery.photos.length : WORLD.gallery.photos.filter((photo) => photo.tag === tag).length;
                    return `<button class="gallery-tab ${state.galleryFilter === tag ? 'active' : ''}" type="button" data-act="filter-gallery" data-tag="${esc(tag)}">
                        <span>${esc(tag)}</span><small>${count}</small>
                    </button>`;
                }).join('')}
            </nav>
        `;
    }

    function openPhoto(id) {
        const photo = WORLD.gallery.photos.find((item) => item.id === id);
        if (!photo) return;
        
        // 确保viewer-card在photoViewer中
        let viewerCard = document.querySelector('.viewer-card');
        if (!viewerCard || viewerCard.parentNode !== photoViewer) {
            // 如果viewer-card不存在或不在正确位置，重建它
            if (viewerCard && viewerCard.parentNode !== photoViewer) {
                viewerCard.parentNode.removeChild(viewerCard);
            }
            // 重建viewer-card
            viewerCard = document.createElement('figure');
            viewerCard.className = 'viewer-card';
            viewerCard.innerHTML = `
                <img id="viewerImage" alt="">
                <figcaption>
                    <strong id="viewerTitle"></strong>
                    <span id="viewerTag"></span>
                </figcaption>
                <button class="viewer-close" type="button" data-viewer-close aria-label="关闭">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
            `;
            photoViewer.appendChild(viewerCard);
        }
        
        // 设置内容
        $('viewerImage').src = photo.src;
        $('viewerImage').alt = photo.title;
        $('viewerTitle').textContent = photo.title;
        $('viewerTag').textContent = photo.tag;
        
        // 确保viewer-card完全可见且可交互
        viewerCard.style.opacity = '';
        viewerCard.style.pointerEvents = 'auto';
        viewerCard.style.transform = '';
        viewerCard.style.display = '';  // 恢复显示
        viewerCard.style.zIndex = '';
        viewerCard.style.position = '';
        
        photoViewer.classList.add('open');
        photoViewer.setAttribute('aria-hidden', 'false');
        // 强制重排，确保样式更新
        void photoViewer.offsetHeight;
    }

    function openBookPhoto(src, title, tag) {
        // 确保viewer-card在photoViewer中
        let viewerCard = document.querySelector('.viewer-card');
        if (!viewerCard || viewerCard.parentNode !== photoViewer) {
            // 如果viewer-card不存在或不在正确位置，重建它
            if (viewerCard && viewerCard.parentNode !== photoViewer) {
                viewerCard.parentNode.removeChild(viewerCard);
            }
            // 重建viewer-card
            viewerCard = document.createElement('figure');
            viewerCard.className = 'viewer-card';
            viewerCard.innerHTML = `
                <img id="viewerImage" alt="">
                <figcaption>
                    <strong id="viewerTitle"></strong>
                    <span id="viewerTag"></span>
                </figcaption>
                <button class="viewer-close" type="button" data-viewer-close aria-label="关闭">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
            `;
            photoViewer.appendChild(viewerCard);
        }
        
        // 设置内容
        $('viewerImage').src = src;
        $('viewerImage').alt = title;
        $('viewerTitle').textContent = title;
        $('viewerTag').textContent = tag || '书籍卡片';
        
        // 确保viewer-card完全可见且可交互
        viewerCard.style.opacity = '';
        viewerCard.style.pointerEvents = 'auto';
        viewerCard.style.transform = '';
        viewerCard.style.display = '';  // 恢复显示
        viewerCard.style.zIndex = '';
        viewerCard.style.position = '';
        
        photoViewer.classList.add('open');
        photoViewer.setAttribute('aria-hidden', 'false');
        // 强制重排，确保样式更新
        void photoViewer.offsetHeight;
    }

    function closePhoto() {
        photoViewer.classList.remove('open');
        photoViewer.setAttribute('aria-hidden', 'true');
        // 确保焦点回到适当的位置
        if (state.activeApp === 'bookStoreDetail' && document.activeElement) {
            document.activeElement.blur();
        }
        
        // 修复：确保viewer-card在photoViewer中并且完全隐藏
        let viewerCard = document.querySelector('.viewer-card');
        if (!viewerCard) {
            // 如果没有找到viewer-card，直接返回
            void photoViewer.offsetHeight;
            return;
        }
        
        // 如果viewer-card不在photoViewer中，移动到正确的位置
        if (viewerCard.parentNode !== photoViewer) {
            // 先克隆一个干净的副本
            const newViewerCard = viewerCard.cloneNode(true);
            // 移除旧的viewer-card
            viewerCard.parentNode.removeChild(viewerCard);
            // 添加新的干净的viewer-card到photoViewer
            photoViewer.appendChild(newViewerCard);
            viewerCard = newViewerCard;
        }
        
        // 关键修复：确保viewer-card完全隐藏且不接收事件
        viewerCard.style.opacity = '0';
        viewerCard.style.pointerEvents = 'none';
        viewerCard.style.transform = '';
        viewerCard.style.display = 'none';  // 完全隐藏，不仅仅是透明
        viewerCard.style.zIndex = '';
        viewerCard.style.position = '';
        
        // 强制重排，确保样式更新
        void photoViewer.offsetHeight;
    }

    function renderMemo() {
        const view = ensureView('memo');
        const done = WORLD.memos.filter((memo) => memo.done).length;
        view.innerHTML = `
            ${appHeader('备忘录', { subtitle: 'LITTLE NOTES' })}
            <div class="app-body memo-body">
                <div class="memo-summary">
                    <span><strong>${WORLD.memos.length}</strong> 条记录</span>
                    <span><strong>${done}</strong> 已完成</span>
                </div>
                <div class="memo-list">
                    ${WORLD.memos.length ? WORLD.memos.map((memo) => `
                        <article class="memo-item ${memo.done ? 'done' : ''}">
                            <span class="memo-check ${memo.done ? 'checked' : ''}" aria-hidden="true">${memo.done ? I.check : ''}</span>
                            <p>${esc(memo.text)}</p>
                        </article>
                    `).join('') : emptyState('还没有写下什么')}
                </div>
            </div>
        `;
    }

    function renderMail() {
        const view = ensureView('mail');
        view.innerHTML = `
            ${appHeader('邮件', { subtitle: `${WORLD.mails.length} LETTERS` })}
            <div class="app-body mail-body">
                <div class="mail-list">
                    ${WORLD.mails.length ? WORLD.mails.map((mail) => `
                        <article class="mail-row">
                            <button class="mail-main" type="button" data-act="open-mail" data-id="${esc(mail.id)}">
                                <span class="mail-dot ${state.readMails.has(mail.id) ? '' : 'unread'}" aria-hidden="true"></span>
                                <span class="mail-copy"><strong>${esc(mail.title)}</strong><small>${esc(mail.sender)}</small></span>
                                <time>${esc(mail.date)}</time>
                            </button>
                        </article>
                    `).join('') : emptyState('收件箱空空的')}
                </div>
            </div>
        `;
    }

    function renderMailDetail() {
        const view = ensureView('mailDetail');
        const mail = WORLD.mails.find((item) => item.id === state.mailDetailId);
        if (!mail) {
            view.innerHTML = `${appHeader('邮件详情', { back: true })}<div class="app-body">${emptyState('这封邮件已经不在了')}</div>`;
            return;
        }
        view.innerHTML = `
            ${appHeader('邮件详情', { back: true })}
            <div class="app-body mail-detail-body">
                <article class="mail-detail-card">
                    <div class="mail-detail-head">
                        <span class="mail-avatar">${esc(mail.sender.slice(0, 1))}</span>
                        <div><strong>${esc(mail.sender)}</strong><small>写给我 · ${esc(mail.date)}</small></div>
                    </div>
                    <h2>${esc(mail.title)}</h2>
                    <div class="mail-content">${mail.content.split('\n').map((line) => `<p>${esc(line)}</p>`).join('')}</div>
                    ${mail.image ? `<img class="mail-image" src="${esc(mail.image)}" alt="邮件配图">` : ''}
                    <p class="mail-signature">— 来自我的小小世界</p>
                </article>
            </div>
        `;
    }

    function renderContacts() {
        const view = ensureView('contacts');
        view.innerHTML = `
            ${appHeader('联系人', { subtitle: 'PEOPLE I LOVE' })}
            <div class="app-body contacts-body">
                <div class="contact-list">
                    ${WORLD.contacts.length ? WORLD.contacts.map((contact) => `
                        <article class="contact-card">
                            <div class="contact-top"><h2>${esc(contact.name)}</h2><span class="contact-tag">${esc(contact.tag)}</span></div>
                            <p>${esc(contact.line)}</p>
                        </article>
                    `).join('') : emptyState('还没有联系人卡片')}
                </div>
            </div>
        `;
    }

    function clearChatTimers() {
        state.chatTimers.forEach((timer) => clearTimeout(timer));
        state.chatTimers = [];
    }

    function renderMessages() {
        const view = ensureView('messages');
        clearChatTimers();
        state.chatBusy = false;
        state.chatTyping = false;
        const presets = WORLD.chat.presets;
        view.innerHTML = `
            ${appHeader('信息', { subtitle: 'MESSAGES' })}
            <div class="chat-wrap">
                <div class="chat-contact">
                    <img src="${esc(WORLD.profile.avatar)}" alt="">
                    <div><strong>${esc(WORLD.profile.name)}</strong><span><i></i>在线</span></div>
                </div>
                <div class="chat-body" id="chatBody"></div>
                <div class="chat-presets" id="chatPresets">
                    <p class="preset-label">想说的话</p>
                    <div class="preset-scroll">
                        ${presets.map((preset, index) => `<button class="preset-chip" type="button" data-act="preset" data-index="${index}">${esc(preset.text)}</button>`).join('')}
                    </div>
                </div>
                <div class="chat-composer">
                    <input id="chatInput" type="text" maxlength="120" placeholder="点击这里，选择一句想说的话" autocomplete="off" enterkeyhint="send">
                    <button class="send-btn" id="sendBtn" type="button" data-act="send-message" aria-label="发送">${I.send}</button>
                </div>
            </div>
        `;
        state.chatMessages = [{ from: 'them', text: WORLD.chat.initial.text, time: WORLD.chat.initial.time }];
        renderChatMessages();
        const input = $('chatInput');
        if (input) {
            input.addEventListener('focus', () => $('chatPresets')?.classList.add('show'));
            input.addEventListener('click', () => $('chatPresets')?.classList.add('show'));
            input.addEventListener('input', () => {
                $('chatPresets')?.classList.toggle('show', !input.value.trim());
            });
        }
    }

    function renderChatMessages() {
        const body = $('chatBody');
        if (!body) return;
        body.innerHTML = state.chatMessages.map((message) => `
            <div class="bubble-row ${message.from === 'me' ? 'mine' : 'theirs'}">
                ${message.from === 'them' ? `<span class="bubble-avatar"><img src="${esc(WORLD.profile.avatar)}" alt=""></span>` : ''}
                <div class="bubble-stack">
                    <div class="bubble">${esc(message.text)}</div>
                    <small>${esc(message.time)}</small>
                </div>
            </div>
        `).join('') + (state.chatTyping ? `
            <div class="bubble-row theirs">
                <span class="bubble-avatar"><img src="${esc(WORLD.profile.avatar)}" alt=""></span>
                <div class="bubble typing"><i></i><i></i><i></i></div>
            </div>
        ` : '');
        body.scrollTop = body.scrollHeight;
    }

    function sendChatText(value) {
        if (state.chatBusy) {
            showToast('等对方把话说完吧');
            return;
        }
        const text = String(value || '').trim();
        if (!text) return;
        const input = $('chatInput');
        if (input) input.value = '';
        $('chatPresets')?.classList.remove('show');
        state.chatMessages.push({ from: 'me', text, time: getTimeText() });
        renderChatMessages();
        state.chatBusy = true;
        $('sendBtn')?.classList.add('busy');
        clearChatTimers();
        state.chatTyping = false;
        const preset = WORLD.chat.presets.find((item) => item.text === text);
        const replies = preset ? preset.replies : WORLD.chat.fallback;
        state.chatTimers.push(setTimeout(() => {
            state.chatTyping = true;
            renderChatMessages();
        }, 800));
        const firstDelay = 3200 + Math.random() * 1400;
        replies.forEach((reply, index) => {
            state.chatTimers.push(setTimeout(() => {
                state.chatTyping = index < replies.length - 1;
                state.chatMessages.push({ from: 'them', text: reply, time: getTimeText() });
                renderChatMessages();
                if (index === replies.length - 1) {
                    state.chatBusy = false;
                    $('sendBtn')?.classList.remove('busy');
                }
            }, index === 0 ? firstDelay : firstDelay + index * 1350));
        });
    }

    function renderMusic() {
        const view = ensureView('music');
        const track = currentTrack();
        const playing = !audio.paused && !!track;
        view.innerHTML = `
            ${appHeader('音乐', { subtitle: 'NOW PLAYING' })}
            <div class="app-body music-body">
                ${track ? `
                    <div class="music-player-card ${playing ? 'is-playing' : ''}">
                        <div class="album-wrap">
                            <img class="album-cover" id="musicCover" src="${esc(track.cover)}" alt="${esc(track.title)}">
                        </div>
                        <div class="track-info">
                            <h2 id="musicTitle">${esc(track.title)}</h2>
                            <p id="musicArtist">${esc(track.artist)}</p>
                            <span class="music-source">内置曲目 · 轻触播放</span>
                        </div>
                        <div class="progress-wrap">
                            <span id="musicCurrent">${formatClock(audio.currentTime || 0)}</span>
                            <input id="musicProgress" type="range" min="0" max="1000" value="0" aria-label="播放进度">
                            <span id="musicDuration">${formatClock(audio.duration || 0)}</span>
                        </div>
                        <div class="player-controls">
                            <button class="control-btn" type="button" data-act="music-prev" aria-label="上一首">${I.prev}</button>
                            <button class="control-btn play" type="button" data-act="music-play" id="musicPlay" data-playing="${playing}" aria-label="${playing ? '暂停' : '播放'}">${playing ? I.pause : I.play}</button>
                            <button class="control-btn" type="button" data-act="music-next" aria-label="下一首">${I.next}</button>
                        </div>
                        <p class="play-label" id="musicPlayLabel">${playing ? '暂停' : '播放'}</p>
                    </div>
                ` : emptyState('播放列表还是空的')}
                <section class="playlist-section">
                    <div class="playlist-head">
                        <div><h3>播放列表</h3><p>${tracks.length} 首歌曲${state.audioMuted ? ' · 轻触页面开启声音' : ''}</p></div>
                    </div>
                    <div class="playlist">
                        ${tracks.map((item, index) => `
                            <div class="playlist-row ${track && item.id === track.id ? 'active' : ''}" data-track-id="${esc(item.id)}">
                                <button class="playlist-main" type="button" data-act="music-track" data-id="${esc(item.id)}">
                                    <span class="track-index">${track && item.id === track.id ? '<i class="playing-bars"><b></b><b></b><b></b></i>' : pad(index + 1)}</span>
                                    <img src="${esc(item.cover)}" alt="">
                                    <span class="track-copy"><strong>${esc(item.title)}</strong><small>${esc(item.artist)}</small></span>
                                    <span class="track-play">${I.play}</span>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </section>
            </div>
        `;
        const progress = $('musicProgress');
        if (progress) {
            progress.addEventListener('input', () => {
                if (Number.isFinite(audio.duration) && audio.duration > 0) {
                    audio.currentTime = (Number(progress.value) / 1000) * audio.duration;
                }
            });
        }
        updateMusicChrome();
    }

    // 书城相关函数
    function getCardById(cardId) {
        return WORLD.bookCards.find(card => card.id === cardId);
    }

    function getCollectedCard(cardId) {
        return state.bookStore.collectedCards.find(card => card.cardId === cardId);
    }

    function getUnlockLevel(totalDrawn) {
        if (totalDrawn >= 9) return 7;
        if (totalDrawn >= 7) return 5;
        if (totalDrawn >= 5) return 3;
        if (totalDrawn >= 3) return 2;
        return 1;
    }

    function getNextUnlockRequirement(totalDrawn) {
        if (totalDrawn >= 5) return 9; // 已解锁全部
        if (totalDrawn >= 3) return 9; // 已解锁4级，需要9张解锁5级
        if (totalDrawn >= 3) return 7; // 已解锁3级，需要7张解锁4级
        if (totalDrawn >= 3) return 5; // 已解锁2级，需要5张解锁3级
        if (totalDrawn >= 1) return 3; // 已解锁1级，需要3张解锁2级
        return 1; // 还未获得卡片，需要1张解锁1级
    }

    function drawCard() {
        if (state.bookStore.points < 100) {
            showToast('积分不足');
            return null;
        }
        
        state.bookStore.points -= 100;
        state.bookStore.totalDraws++;
        
        const result = drawCardWithoutCost();
        
        if (result) {
            // 保存数据
            DataManager.save({
                points: state.bookStore.points,
                collectedCards: state.bookStore.collectedCards,
                totalDraws: state.bookStore.totalDraws,
                drawHistory: state.bookStore.drawHistory,
                lastSortMode: state.bookStore.lastSortMode,
                sortingEnabled: state.bookStore.sortingEnabled,
                bookOrder: state.bookStore.bookOrder,
                cardPositions: state.bookStore.cardPositions,
                usedWishes: state.bookStore.usedWishes
            });
        }
        
        return result;
    }

    function drawFiveCards() {
        if (state.bookStore.points < 400) {
            showToast('积分不足');
            return [];
        }
        
        state.bookStore.points -= 400;
        state.bookStore.totalDraws += 5;
        const results = [];
        
        for (let i = 0; i < 5; i++) {
            const result = drawCardWithoutCost(); // 使用不扣除积分的抽卡函数
            if (result) {
                results.push(result);
            }
        }
        
        // 保存数据
        DataManager.save({
            points: state.bookStore.points,
            collectedCards: state.bookStore.collectedCards,
            totalDraws: state.bookStore.totalDraws,
            drawHistory: state.bookStore.drawHistory,
            lastSortMode: state.bookStore.lastSortMode,
            sortingEnabled: state.bookStore.sortingEnabled,
            bookOrder: state.bookStore.bookOrder,
            cardPositions: state.bookStore.cardPositions
        });
        
        return results;
    }
    
    function drawCardWithoutCost() {
        // 抽卡逻辑：加权随机，未拥有的卡片有更高概率
        const allCards = WORLD.bookCards;
        const weights = allCards.map(card => {
            const collected = getCollectedCard(card.id);
            return collected ? 1 : 5; // 未拥有的卡片权重更高
        });
        
        const totalWeight = weights.reduce((a, b) => a + b, 0);
        let random = Math.random() * totalWeight;
        let selectedIndex = 0;
        
        for (let i = 0; i < weights.length; i++) {
            random -= weights[i];
            if (random <= 0) {
                selectedIndex = i;
                break;
            }
        }
        
        const selectedCard = allCards[selectedIndex];
        const timestamp = Date.now();
        const timeText = DataManager.formatTime(timestamp);
        
        // 记录抽卡历史
        state.bookStore.drawHistory.unshift({
            cardId: selectedCard.id,
            cardTitle: selectedCard.title,
            time: timeText,
            timestamp: timestamp
        });
        if (state.bookStore.drawHistory.length > 20) {
            state.bookStore.drawHistory = state.bookStore.drawHistory.slice(0, 20);
        }
        
        // 更新收集的卡片
        let collectedCard = getCollectedCard(selectedCard.id);
        let isNewCard = false;
        
        if (collectedCard) {
            collectedCard.count++;
            collectedCard.totalDrawn++;
            collectedCard.latestObtainedTimestamp = timestamp;
        } else {
            isNewCard = true;
            collectedCard = {
                cardId: selectedCard.id,
                count: 1,
                totalDrawn: 1,
                firstObtainedTimestamp: timestamp,
                latestObtainedTimestamp: timestamp
            };
            state.bookStore.collectedCards.push(collectedCard);
            // 如果在排序模式，将新卡片添加到顺序末尾
            if (state.bookStore.sortingEnabled) {
                state.bookStore.bookOrder.push(selectedCard.id);
            }
        }
        
        return { card: selectedCard, isNewCard, unlockLevel: getUnlockLevel(collectedCard.totalDrawn) };
    }

    function decomposeCard(cardId) {
        const collected = getCollectedCard(cardId);
        if (!collected || collected.count <= 1) {
            showToast('至少需要保留一张卡片');
            return false;
        }
        
        collected.count--;
        state.bookStore.points += 20;
        
        // 如果数量为0，从收集列表中移除（但保留totalDrawn记录）
        if (collected.count === 0) {
            state.bookStore.collectedCards = state.bookStore.collectedCards.filter(c => c.cardId !== cardId);
        }
        
        // 保存数据
        DataManager.save({
            points: state.bookStore.points,
            collectedCards: state.bookStore.collectedCards,
            totalDraws: state.bookStore.totalDraws,
            drawHistory: state.bookStore.drawHistory,
            lastSortMode: state.bookStore.lastSortMode,
            sortingEnabled: state.bookStore.sortingEnabled,
            bookOrder: state.bookStore.bookOrder,
            cardPositions: state.bookStore.cardPositions
        });
        
        showToast(`分解成功，获得20积分`);
        return true;
    }

    function decomposeAllRepeatedBooks() {
        const repeatableBooks = state.bookStore.collectedCards.filter(card => card.count > 1);
        
        if (repeatableBooks.length === 0) {
            showToast('当前没有可分解的重复记忆');
            return { success: false, message: '没有重复记忆可分解' };
        }
        
        let totalPoints = 0;
        let totalDecomposed = 0;
        
        repeatableBooks.forEach(card => {
            const repeatCount = card.count - 1;
            card.count = 1;
            totalPoints += repeatCount * 20;
            totalDecomposed += repeatCount;
        });
        
        // 清理数量为0的卡片
        state.bookStore.collectedCards = state.bookStore.collectedCards.filter(c => c.count > 0);
        
        // 更新积分
        state.bookStore.points += totalPoints;
        
        // 保存数据
        DataManager.save({
            points: state.bookStore.points,
            collectedCards: state.bookStore.collectedCards,
            totalDraws: state.bookStore.totalDraws,
            drawHistory: state.bookStore.drawHistory,
            lastSortMode: state.bookStore.lastSortMode,
            sortingEnabled: state.bookStore.sortingEnabled,
            bookOrder: state.bookStore.bookOrder,
            cardPositions: state.bookStore.cardPositions
        });
        
        // 关闭模态框并返回成功结果
        closeAllModals();
        
        return {
            success: true,
            message: `成功分解 ${repeatableBooks.length} 份重复的 ${totalDecomposed} 次记忆，获得 ${totalPoints} 积分`,
            totalPoints,
            totalDecomposed,
            booksCount: repeatableBooks.length
        };
    }

    function bookStoreTabs(currentTab) {
        return [
            { id: 'store', label: '书城', icon: I.book },
            { id: 'shelf', label: '书架', icon: I.bookmark }
        ].map(tab => `
            <button class="bookstore-tab ${currentTab === tab.id ? 'active' : ''}" 
                    type="button" data-act="book-tab" data-tab="${esc(tab.id)}">
                <span class="tab-icon">${tab.icon}</span>
                <span class="tab-label">${esc(tab.label)}</span>
            </button>
        `).join('');
    }

    function renderBookStore() {
        const view = ensureView('bookStore');
        const currentTab = state.bookStore.currentTab;
        
        view.innerHTML = `
            ${appHeader('书城', { subtitle: currentTab === 'store' ? 'BOOK STORE' : 'BOOK SHELF' })}
            <div class="app-body">
                ${currentTab === 'store' ? renderBookStorePage() : renderBookShelfPage()}
            </div>
            <nav class="bookstore-tabs" aria-label="书城分类">
                ${bookStoreTabs(currentTab)}
            </nav>
        `;
    }

    function renderBookStorePage() {
        const stats = `
            <div class="book-store-stats">
                <div class="book-stat-item">
                    <span class="book-stat-label">积分</span>
                    <span class="book-stat-value">${state.bookStore.points}</span>
                </div>
                <div class="book-stat-item">
                    <span class="book-stat-label">累计抽取</span>
                    <button class="book-stat-value-link" type="button" data-act="show-history">
                        ${state.bookStore.totalDraws}次
                    </button>
                </div>
                <div class="book-stat-item">
                    <span class="book-stat-label">已收集</span>
                    <span class="book-stat-value">${state.bookStore.collectedCards.length}/${WORLD.bookCards.length}</span>
                </div>
            </div>
        `;
        
        const drawButtons = `
            <div class="book-draw-controls">
                <button class="book-draw-btn single" type="button" data-act="draw-single">
                    <span class="draw-btn-icon">${I.search}</span>
                    <span class="draw-btn-label">一览藏书</span>
                    <span class="draw-btn-cost">1次/100积分</span>
                </button>
                <button class="book-draw-btn multi" type="button" data-act="draw-multi">
                    <span class="draw-btn-icon">${I.refresh}</span>
                    <span class="draw-btn-label">遍寻藏书</span>
                    <span class="draw-btn-cost">5次/400积分</span>
                </button>
            </div>
        `;
        
        return `
            <div class="book-store-content">
                ${stats}
                ${drawButtons}
                <p class="book-store-hint">来一场回忆里的捉迷藏？</p>
            </div>
        `;
    }

    function renderBookShelfPage() {
        const collectedCards = state.bookStore.collectedCards;
        
        if (collectedCards.length === 0) {
            return emptyState('书架空空如也', '快去书城寻觅过往吧');
        }
        
        // 根据排序模式排序卡片
        let sortedCards = [...collectedCards];
        if (state.bookStore.sortingEnabled && state.bookStore.bookOrder.length > 0) {
            // 按自定义顺序排序（拖拽调整）
            sortedCards = [];
            for (const cardId of state.bookStore.bookOrder) {
                const card = collectedCards.find(c => c.cardId === cardId);
                if (card) sortedCards.push(card);
            }
            // 添加不在顺序中的卡片
            collectedCards.forEach(card => {
                if (!state.bookStore.bookOrder.includes(card.cardId)) {
                    sortedCards.push(card);
                }
            });
        } else if (state.bookStore.lastSortMode === 'name' && state.bookStore.bookOrder.length > 0) {
            // 按名称排序
            sortedCards = [];
            for (const cardId of state.bookStore.bookOrder) {
                const card = collectedCards.find(c => c.cardId === cardId);
                if (card) sortedCards.push(card);
            }
            // 添加不在顺序中的卡片
            collectedCards.forEach(card => {
                if (!state.bookStore.bookOrder.includes(card.cardId)) {
                    sortedCards.push(card);
                }
            });
        } else {
            // 默认按时间排序：最近获得的在前
            sortedCards.sort((a, b) => b.latestObtainedTimestamp - a.latestObtainedTimestamp);
        }
        
        const menuButton = I.menu;
        const cardsGrid = sortedCards.map(collectedCard => {
            const cardData = getCardById(collectedCard.cardId);
            if (!cardData) return '';
            
            const unlockLevel = getUnlockLevel(collectedCard.totalDrawn);
            
            return `
                <div class="book-card-shelf" data-card-id="${esc(cardData.id)}">
                    <button class="book-card-shelf-main" type="button" data-act="view-card-detail" data-id="${esc(cardData.id)}">
                        <div class="book-card-shelf-image">
                            <img src="${esc(cardData.image)}" alt="${esc(cardData.title)}">
                            <span class="card-count-badge">${collectedCard.count}</span>
                        </div>
                        <div class="book-card-shelf-info">
                            <h3>${esc(cardData.title)}</h3>
                            <div class="book-card-tags">
                                ${cardData.tags.map(tag => `<span class="book-tag-pill">${esc(tag)}</span>`).join('')}
                            </div>
                            <div class="book-unlock-levels">
                                ${[1, 2, 3].map(level => `
                                    <span class="unlock-level-dot ${level <= unlockLevel ? 'unlocked' : 'locked'}" 
                                          title="${level <= unlockLevel ? '已解锁' : '未解锁'}" 
                                          data-act="view-card-text" data-id="${esc(cardData.id)}" data-level="${level}">
                                        ${level}
                                    </span>
                                `).join('')}
                            </div>
                        </div>
                    </button>
                </div>
            `;
        }).join('');
        
        return `
            <div class="book-shelf-content">
                <div class="book-shelf-header">
                    <h3>收藏的藏书</h3>
                    <button class="book-shelf-menu" type="button" data-act="open-shelf-menu">
                        ${menuButton}
                    </button>
                </div>
                <div class="book-shelf-grid ${state.bookStore.sortingEnabled ? 'sorting-mode' : ''}" id="bookShelfGrid">
                    ${cardsGrid}
                </div>
                ${state.bookStore.sortingEnabled ? `
                    <div class="sorting-hint">
                        <p>拖动卡片调整顺序，点击完成排序</p>
                        <button class="sorting-done-btn" type="button" data-act="finish-sorting">
                            完成排序
                        </button>
                    </div>
                ` : ''}
            </div>
            <script>
                // 延迟初始化拖拽排序，确保DOM完全加载
                setTimeout(() => {
                    if (window.initSortingDragDrop && ${state.bookStore.sortingEnabled}) {
                        window.initSortingDragDrop();
                    }
                }, 100);
            </script>
        `;
    }

    function showDrawHistory() {
        const view = ensureView('bookStoreHistory');
        const history = state.bookStore.drawHistory;
        
        view.innerHTML = `
            ${appHeader('抽卡记录', { back: true })}
            <div class="app-body">
                <div class="book-history-list">
                    ${history.length > 0 ? history.map((record) => `
                        <div class="book-history-item">
                            <div class="history-time">${record.time}</div>
                            <div class="history-card">
                                <strong>${record.cardTitle}</strong>
                            </div>
                        </div>
                    `).join('') : emptyState('还没有抽卡记录')}
                </div>
            </div>
        `;
    }

    function showCardDetail(cardId) {
        const cardData = getCardById(cardId);
        if (!cardData) return;
        
        const collected = getCollectedCard(cardId);
        if (!collected) return;
        
        const selectedTextIndex = Math.min(state.bookStore.selectedCardIndex, getUnlockLevel(collected.totalDrawn) - 1);
        const view = ensureView('bookStoreDetail');
        
        view.innerHTML = `
            ${appHeader('卡片详情', { back: true })}
            <div class="app-body book-detail-body">
                <div class="book-detail-card">
                    <div class="book-detail-image">
                        <button class="book-detail-image-button" type="button" data-act="open-book-photo" data-src="${esc(cardData.image)}" data-title="${esc(cardData.title)}" data-tag="${esc(cardData.tags.join(', '))}">
                            <img src="${esc(cardData.image)}" alt="${esc(cardData.title)}">
                            ${collected.count > 1 ? `<span class="detail-count-badge">拥有 ${collected.count} 张</span>` : ''}
                        </button>
                    </div>
                    <div class="book-detail-info">
                        <h2>${esc(cardData.title)}</h2>
                        <div class="book-detail-tags">
                            ${cardData.tags.map(tag => `<span class="book-tag-pill large">${esc(tag)}</span>`).join('')}
                        </div>
                        
                        <div class="book-text-tabs">
                            ${cardData.texts.map((text, index) => {
                                const levelRequired = index + 1;
                                // 使用getUnlockLevel函数判断解锁状态
                                const unlocked = getUnlockLevel(collected.totalDrawn) >= levelRequired;
                                return `
                                    <button class="text-tab ${index === selectedTextIndex ? 'active' : ''} ${unlocked ? 'unlocked' : 'locked'}" 
                                            type="button" data-act="select-text" data-level="${levelRequired}"
                                            ${!unlocked ? 'disabled' : ''}>
                                        ${levelRequired}
                                    </button>
                                `;
                            }).join('')}
                        </div>
                        
                        <div class="book-detail-text">
                            <p>${esc(cardData.texts[selectedTextIndex])}</p>
                        </div>
                        ${getUnlockLevel(collected.totalDrawn) < cardData.texts.length ? `
                                <p class="text-progress-hint">再获得 ${getNextUnlockRequirement(collected.totalDrawn) - collected.totalDrawn} 张此卡片可解锁下一篇文案</p>
                            ` : ''}
                        <br />
                        ${collected.count > 1 ? `
                            <button class="book-decompose-btn" type="button" data-act="decompose-card" data-id="${esc(cardId)}">
                                ${I.delete} 分解多余卡片 (${collected.count - 1}张可分解，每张20积分)
                            </button>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    function renderDrawResult(results) {
        const view = ensureView('bookDrawResult');
        const isSingleDraw = results.length === 1;
        
        view.innerHTML = `
            ${appHeader(isSingleDraw ? '获得新卡片' : '获得藏书', { 
                back: false,
                actions: `<button class="head-btn" type="button" data-act="close-draw-result" aria-label="关闭">${I.close}</button>`,
                showClose: false
            })}
            <div class="app-body book-draw-result-body" data-act="close-draw-result">
                ${isSingleDraw ? `
                    <div class="book-result-single">
                        ${renderSingleCardResult(results[0])}
                    </div>
                ` : `
                    <div class="book-result-multi">
                        ${results.map((result, index) => renderMultiCardResult(result, index)).join('')}
                    </div>
                `}
            </div>
        `;
    }

    function renderSingleCardResult(result) {
        const { card, isNewCard, unlockLevel } = result;
        
        return `
            <div class="book-result-card">
                <div class="result-card-main">
                    <div class="result-card-image">
                        <img src="${esc(card.image)}" alt="${esc(card.title)}">
                        ${isNewCard ? '<span class="result-new-badge">NEW</span>' : ''}
                    </div>
                    <div class="result-card-info">
                        <h2>${esc(card.title)}</h2>
                        <div class="result-card-tags">
                            ${card.tags.map(tag => `<span class="result-tag">${esc(tag)}</span>`).join('')}
                        </div>
                        <p class="result-unlock-hint">解锁第${unlockLevel}段文案</p>
                    </div>
                </div>
                <div class="result-card-text">
                    <p>${esc(card.texts[unlockLevel - 1])}</p>
                </div>
            </div>
        `;
    }

    function renderMultiCardResult(result, index) {
        const { card, isNewCard, unlockLevel } = result;
        
        return `
            <div class="book-result-multi-card" data-index="${index}">
                <div class="multi-card-image">
                    <img src="${esc(card.image)}" alt="${esc(card.title)}">
                    ${isNewCard ? '<span class="multi-new-badge">NEW</span>' : ''}
                </div>
                <div class="multi-card-title">${esc(card.title)}</div>
                <div class="multi-card-unlock">解锁:${unlockLevel}</div>
            </div>
        `;
    }

    // 愿望相关功能
    

    function showShelfMenu() {
        const menuHTML = `
            <div class="shelf-menu-modal" data-act="close-shelf-menu">
                <div class="shelf-menu-content">
                    <div class="shelf-menu-header">
                        <h3>书架菜单</h3>
                        <button class="shelf-menu-close" type="button" data-act="close-shelf-menu" aria-label="关闭">
                            ${I.close}
                        </button>
                    </div>
                    <div class="shelf-menu-options">
                        <button class="shelf-menu-item" type="button" data-act="toggle-sorting">
                            <span class="menu-icon">${I.sort}</span>
                            <span class="menu-text">${state.bookStore.sortingEnabled ? '完成排序' : '调整排序'}</span>
                        </button>
                        <button class="shelf-menu-item" type="button" data-act="decompose-multiple">
                            <span class="menu-icon">${I.delete}</span>
                            <span class="menu-text">分解书籍</span>
                        </button>
                        <button class="shelf-menu-item" type="button" data-act="sort-by-time">
                            <span class="menu-icon">${I.history}</span>
                            <span class="menu-text">按时间排序</span>
                        </button>
                        <button class="shelf-menu-item" type="button" data-act="sort-by-name">
                            <span class="menu-icon">${I.filter}</span>
                            <span class="menu-text">按名称排序</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        const menuEl = document.createElement('div');
        menuEl.id = 'shelfMenuModal';
        menuEl.className = 'shelf-menu-container';
        menuEl.innerHTML = menuHTML;
        
        // 添加到页面
        document.body.appendChild(menuEl);
        
        // 动画显示
        setTimeout(() => {
            menuEl.classList.add('visible');
        }, 10);
    }
    
    function closeShelfMenu() {
        const menuEl = document.getElementById('shelfMenuModal');
        if (menuEl) {
            menuEl.classList.remove('visible');
            setTimeout(() => {
                if (menuEl.parentNode) {
                    document.body.removeChild(menuEl);
                }
            }, 250);
        }
    }

    function renderApp(id) {
        switch (id) {
            case 'about': renderAbout(); break;
            case 'gallery': renderGallery(); break;
            case 'memo': renderMemo(); break;
            case 'music': renderMusic(); break;
            case 'mail': renderMail(); break;
            case 'mailDetail': renderMailDetail(); break;
            case 'contacts': renderContacts(); break;
            case 'messages': renderMessages(); break;
            case 'bookStore': renderBookStore(); break;
            case 'bookStoreDetail': showCardDetail(state.bookStore.selectedCard); break;
            case 'bookStoreHistory': showDrawHistory(); break;
            case 'bookShelfMenu': showShelfMenu(); break;
            case 'bookDrawResult': renderDrawResult(state.bookStore.drawResults || []); break;
            default: break;
        }
    }

    let hideTimer = null;
    let underView = null;
    function settleUnderView(hide) {
        clearTimeout(hideTimer);
        hideTimer = null;
        if (underView) {
            if (hide) {
                underView.style.display = 'none';
                underView.style.zIndex = '';
                underView.setAttribute('aria-hidden', 'true');
            }
            underView = null;
        }
    }

    function showApp(id, direction = 'right', push = false) {
        if (!document.body.classList.contains('unlocked')) return;
        if (state.activeApp === id) {
            renderApp(id);
            return;
        }
        const view = ensureView(id);
        const prev = state.activeApp;
        const prevView = prev ? appViews[prev] : null;
        if (push && prev) state.history.push(prev);
        renderApp(id);
        settleUnderView(true);
        if (prevView) {
            prevView.style.zIndex = '1';
            prevView.classList.remove('page-out-right', 'page-out-left');
            underView = prevView;
        }
        view.style.zIndex = '2';
        view.style.display = 'flex';
        view.setAttribute('aria-hidden', 'false');
        view.classList.remove('page-in-right', 'page-in-left', 'page-out-right', 'page-out-left');
        void view.offsetWidth;
        view.classList.add(direction === 'left' ? 'page-in-left' : 'page-in-right');
        state.activeApp = id;
        document.body.classList.add('app-open');
        document.body.dataset.app = id;
        updateMusicFab();
        clearTimeout(hideTimer);
        hideTimer = setTimeout(() => {
            settleUnderView(true);
        }, 400);
        if (id === 'messages') requestAnimationFrame(() => {
            const body = $('chatBody');
            if (body) body.scrollTop = body.scrollHeight;
        });
    }

    function openApp(id, { from = 'right', stack = false } = {}) {
        if (!document.body.classList.contains('unlocked')) return;
        showApp(id, from, stack);
    }

    function closeApp() {
        if (!state.activeApp) return;
        settleUnderView(true);
        const view = appViews[state.activeApp];
        const old = state.activeApp;
        if (view) {
            view.style.zIndex = '';
            view.classList.remove('page-in-right', 'page-in-left');
            view.classList.add('page-out-right');
            setTimeout(() => {
                if (state.activeApp === old) return;
                view.style.display = 'none';
                view.classList.remove('page-out-right');
                view.setAttribute('aria-hidden', 'true');
            }, 290);
        }
        state.activeApp = null;
        state.history = [];
        document.body.classList.remove('app-open');
        delete document.body.dataset.app;
        updateMusicFab();
    }

    function backApp() {
        const previous = state.history.pop();
        if (previous) {
            showApp(previous, 'left');
        } else {
            closeApp();
        }
    }

    function navigateSequence(step) {
        if (!state.activeApp) {
            openApp(step > 0 ? 'about' : 'gallery', { from: step > 0 ? 'right' : 'left' });
            return;
        }
        const index = SEQUENCE.indexOf(state.activeApp);
        if (index < 0) return;
        const next = (index + step + SEQUENCE.length) % SEQUENCE.length;
        state.history = [];
        showApp(SEQUENCE[next], step > 0 ? 'right' : 'left');
    }

    // 模态框管理函数
    function closeAllModals() {
        // 移除焦点避免 aria-hidden 警告
        const activeElement = document.activeElement;
        if (activeElement && (activeElement === wishInput || activeElement.closest('.modal'))) {
            activeElement.blur();
        }
        
        wishModal.setAttribute('aria-hidden', 'true');
        restartModal.setAttribute('aria-hidden', 'true');
        decomposeModal.setAttribute('aria-hidden', 'true');
        // 清空输入和提示
        if (wishInput) {
            wishInput.value = '';
        }
        if (wishHint) {
            wishHint.textContent = '';
            wishHint.style.color = '';
        }
        if (decomposeHint) {
            decomposeHint.textContent = '';
        }
    }
    
    function openWishModal() {
        closeAllModals();
        wishModal.setAttribute('aria-hidden', 'false');
        // 焦点移动到输入框
        setTimeout(() => {
            if (wishInput) {
                wishInput.focus();
            }
        }, 100);
    }
    
    function openRestartModal() {
        closeAllModals();
        restartModal.setAttribute('aria-hidden', 'false');
    }

    function openDecomposeModal() {
        closeAllModals();
        
        const repeatableBooks = state.bookStore.collectedCards.filter(card => card.count > 1);
        const totalCardsToDecompose = repeatableBooks.reduce((sum, card) => sum + (card.count - 1), 0);
        const totalPoints = totalCardsToDecompose * 20;
        
        if (totalCardsToDecompose === 0) {
            showToast('当前没有可分解的记忆');
            return;
        }
        
        // 更新提示文本
        if (decomposeHint) {
            decomposeHint.textContent = `共 ${repeatableBooks.length} 份重复记忆，分解可获得 ${totalPoints} 积分`;
        }
        
        decomposeModal.setAttribute('aria-hidden', 'false');
    }
    
    // 处理愿望输入
    function processWish() {
        const wishCode = wishInput.value.trim();
        
        if (!wishCode) {
            wishHint.textContent = '请输入愿望……';
            wishHint.style.color = 'rgba(239, 68, 68, 0.9)';
            return;
        }
        
        // 查找匹配的愿望
        const wish = WISHES.find(w => w.code === wishCode);
        
        if (!wish) {
            wishHint.textContent = `"${wishCode}"？这样的愿望似乎无法实现`;
            wishHint.style.color = 'rgba(239, 68, 68, 0.9)';
            return;
        }
        
        // 检查口令是否已使用
        if (state.bookStore.usedWishes.includes(wish.code)) {
            wishHint.textContent = `关于"${wish.name}"的愿望已经被完成过了`;
            wishHint.style.color = 'rgba(239, 68, 68, 0.9)';
            return;
        }
        
        // 验证成功，执行愿望
        state.bookStore.points += wish.points;
        state.bookStore.usedWishes.push(wish.code);
        
        // 保存数据
        DataManager.save({
            points: state.bookStore.points,
            collectedCards: state.bookStore.collectedCards,
            totalDraws: state.bookStore.totalDraws,
            drawHistory: state.bookStore.drawHistory,
            lastSortMode: state.bookStore.lastSortMode,
            sortingEnabled: state.bookStore.sortingEnabled,
            bookOrder: state.bookStore.bookOrder,
            cardPositions: state.bookStore.cardPositions,
            usedWishes: state.bookStore.usedWishes
        });
        
        // 关闭模态框
        closeAllModals();
        
        // 显示成功信息
        showToast(`许愿成功！获得了 ${wish.points} 积分`);
        
        // 如果有书城界面打开着，刷新它
        if (appViews.bookStore && state.bookStore.currentTab === 'store') {
            renderBookStore();
        }
    }
    
    // 处理重置
    function processRestart() {
        // 重新开始：重置数据
        state.bookStore.points = 1000;
        state.bookStore.collectedCards = [];
        state.bookStore.totalDraws = 0;
        state.bookStore.drawHistory = [];
        state.bookStore.usedWishes = [];
        state.bookStore.bookOrder = [];
        state.bookStore.cardPositions = {};
        state.bookStore.sortingEnabled = false;
        
        // 保存重置后的数据
        DataManager.save({
            points: state.bookStore.points,
            collectedCards: state.bookStore.collectedCards,
            totalDraws: state.bookStore.totalDraws,
            drawHistory: state.bookStore.drawHistory,
            lastSortMode: state.bookStore.lastSortMode,
            sortingEnabled: state.bookStore.sortingEnabled,
            bookOrder: state.bookStore.bookOrder,
            cardPositions: state.bookStore.cardPositions,
            usedWishes: state.bookStore.usedWishes
        });
        
        // 关闭模态框
        closeAllModals();
        
        showToast('很高兴你愿意再认识我一次');
        
        // 如果有书城界面打开着，刷新它
        if (appViews.bookStore) {
            renderBookStore();
        }
    }
    
    // 显示拖动排序反馈函数

    let toastTimer = null;
    function showToast(message) {
        clearTimeout(toastTimer);
        toastEl.textContent = message;
        toastEl.classList.add('show');
        toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2200);
    }

    let pulseTimer = null;
    function pulseBrowser(button) {
        const iconEl = button.querySelector('.app-icon');
        if (!iconEl) return;
        iconEl.classList.remove('browser-pulse');
        void iconEl.offsetWidth;
        iconEl.classList.add('browser-pulse');
        clearTimeout(pulseTimer);
        pulseTimer = setTimeout(() => iconEl.classList.remove('browser-pulse'), 420);
    }

    let swipe = null;
    function isInteractiveTarget(target) {
        return !!(target && target.closest && target.closest('input, textarea, select, button, a, [contenteditable="true"]'));
    }

    document.addEventListener('pointerdown', (event) => {
        if (!document.body.classList.contains('unlocked')) return;
        if (event.pointerType === 'mouse' && event.button !== 0) return;
        if (photoViewer.classList.contains('open')) return;
        if (isInteractiveTarget(event.target)) return;
        if (state.activeApp && !SEQUENCE.includes(state.activeApp)) return;
        swipe = { x: event.clientX, y: event.clientY, time: Date.now() };
    }, { passive: true });

    document.addEventListener('pointerup', (event) => {
        if (!swipe) return;
        const dx = event.clientX - swipe.x;
        const dy = event.clientY - swipe.y;
        const elapsed = Date.now() - swipe.time;
        const horizontal = Math.abs(dx) > Math.abs(dy) * 1.35;
        const farEnough = Math.abs(dx) > Math.min(90, window.innerWidth * 0.2);
        swipe = null;
        if (!horizontal || !farEnough || elapsed > 850) return;
        state.suppressClickUntil = Date.now() + 360;
        navigateSequence(dx < 0 ? 1 : -1);
    }, { passive: true });

    document.addEventListener('pointercancel', () => {
        swipe = null;
    }, { passive: true });

    document.addEventListener('click', (event) => {
        if (Date.now() < state.suppressClickUntil) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        // 处理图片查看器关闭
        if (photoViewer.classList.contains('open')) {
            // 只在点击事件目标在photoViewer内部时才关闭
            if (photoViewer.contains(event.target)) {
                closePhoto();
                return;
            }
        }
        if (event.target.closest('[data-modal-close]')) {
            closeAllModals();
            return;
        }
        const launch = event.target.closest('[data-launch]');
        if (launch) {
            event.preventDefault();
            const app = launch.dataset.launch;
            if (app === 'browser') {
                pulseBrowser(launch);
                return;
            }
            openApp(app);
            return;
        }
        const actionEl = event.target.closest('[data-act]');
        if (!actionEl) return;
        event.preventDefault();
        const act = actionEl.dataset.act;
        switch (act) {
            case 'close-app': closeApp(); break;
            case 'back': backApp(); break;
            case 'filter-gallery':
                state.galleryFilter = actionEl.dataset.tag || '全部';
                renderGallery();
                break;
            case 'open-photo': openPhoto(actionEl.dataset.id); break;
            case 'open-book-photo': openBookPhoto(actionEl.dataset.src, actionEl.dataset.title, actionEl.dataset.tag); break;
            case 'open-mail': {
                state.readMails.add(actionEl.dataset.id);
                if (appViews.mail) renderMail();
                state.mailDetailId = actionEl.dataset.id;
                openApp('mailDetail', { stack: true });
                break;
            }
            case 'preset': {
                const preset = WORLD.chat.presets[Number(actionEl.dataset.index)];
                if (preset) sendChatText(preset.text);
                break;
            }
            case 'send-message': sendChatText($('chatInput')?.value || ''); break;
            case 'music-play': togglePlay(); break;
            case 'music-prev': nextTrack(-1); break;
            case 'music-next': nextTrack(1); break;
            // 书城相关事件
            case 'book-tab':
                state.bookStore.currentTab = actionEl.dataset.tab;
                if (appViews.bookStore) renderBookStore();
                break;
            case 'show-history':
                openApp('bookStoreHistory', { stack: true });
                break;
            case 'draw-single': {
                const result = drawCard();
                if (result) {
                    state.bookStore.drawResults = [result];
                    openApp('bookDrawResult', { stack: true });
                }
                break;
            }
            case 'draw-multi': {
                const results = drawFiveCards();
                if (results.length > 0) {
                    state.bookStore.drawResults = results;
                    openApp('bookDrawResult', { stack: true });
                }
                break;
            }
            case 'close-draw-result':
                // 返回到书城应用，保持当前状态
                const currentTab = state.bookStore.currentTab;
                showApp('bookStore', 'left');
                // 确保保持当前标签页
                state.bookStore.currentTab = currentTab;
                if (appViews.bookStore) renderBookStore();
                break;
            case 'view-card-detail':
                state.bookStore.selectedCard = actionEl.dataset.id;
                state.bookStore.selectedCardIndex = 0;
                openApp('bookStoreDetail', { stack: true });
                break;
            case 'view-card-text':
                state.bookStore.selectedCard = actionEl.dataset.id;
                state.bookStore.selectedCardIndex = parseInt(actionEl.dataset.level) - 1;
                openApp('bookStoreDetail', { stack: true });
                break;
            case 'select-text':
                state.bookStore.selectedCardIndex = parseInt(actionEl.dataset.level) - 1;
                if (appViews.bookStoreDetail) showCardDetail(state.bookStore.selectedCard);
                break;
            case 'decompose-card':
                if (decomposeCard(actionEl.dataset.id)) {
                    if (appViews.bookStoreDetail) showCardDetail(actionEl.dataset.id);
                    if (appViews.bookStore) renderBookStore();
                }
                break;
            case 'open-shelf-menu':
                openApp('bookShelfMenu', { stack: true });
                break;
            case 'close-shelf-menu':
                closeShelfMenu();
                backApp();
                break;
            case 'toggle-sorting':
                state.bookStore.sortingEnabled = !state.bookStore.sortingEnabled;
                if (state.bookStore.sortingEnabled && state.bookStore.bookOrder.length === 0) {
                    // 初始化顺序为当前顺序
                    state.bookStore.bookOrder = state.bookStore.collectedCards.map(c => c.cardId);
                } else if (state.bookStore.sortingEnabled) {
                    // 确保所有已收集的卡片都在bookOrder数组中
                    const currentOrder = state.bookStore.bookOrder;
                    const allCardIds = state.bookStore.collectedCards.map(c => c.cardId);
                    const missingCards = allCardIds.filter(id => !currentOrder.includes(id));
                    if (missingCards.length > 0) {
                        state.bookStore.bookOrder = [...currentOrder, ...missingCards];
                    }
                }
                DataManager.save({
                    points: state.bookStore.points,
                    collectedCards: state.bookStore.collectedCards,
                    totalDraws: state.bookStore.totalDraws,
                    drawHistory: state.bookStore.drawHistory,
                    lastSortMode: state.bookStore.lastSortMode,
                    sortingEnabled: state.bookStore.sortingEnabled,
                    bookOrder: state.bookStore.bookOrder,
                    cardPositions: state.bookStore.cardPositions
                });
                closeShelfMenu();
                backApp();
                // 只在书架页面时重新渲染并初始化排序
                if (state.bookStore.currentTab === 'shelf' && appViews.bookStore) {
                    // 先保存当前排序状态
                    DataManager.save({
                        points: state.bookStore.points,
                        collectedCards: state.bookStore.collectedCards,
                        totalDraws: state.bookStore.totalDraws,
                        drawHistory: state.bookStore.drawHistory,
                        lastSortMode: state.bookStore.lastSortMode,
                        sortingEnabled: state.bookStore.sortingEnabled,
                        bookOrder: state.bookStore.bookOrder,
                        cardPositions: state.bookStore.cardPositions
                    });
                    
                    // 然后重新渲染
                    renderBookStore();
                    
                    // 如果启用了排序模式，稍后初始化拖拽功能
                    if (state.bookStore.sortingEnabled) {
                        setTimeout(() => {
                            if (window.initSortingDragDrop) {
                                window.initSortingDragDrop();
                            }
                        }, 200);
                    }
                }
                break;
            case 'finish-sorting':
                state.bookStore.sortingEnabled = false;
                DataManager.save({
                    points: state.bookStore.points,
                    collectedCards: state.bookStore.collectedCards,
                    totalDraws: state.bookStore.totalDraws,
                    drawHistory: state.bookStore.drawHistory,
                    lastSortMode: state.bookStore.lastSortMode,
                    sortingEnabled: state.bookStore.sortingEnabled,
                    bookOrder: state.bookStore.bookOrder,
                    cardPositions: state.bookStore.cardPositions
                });
                // 完成排序后，保持在书架界面，只刷新显示
                if (appViews.bookStore) {
                    renderBookStore();
                }
                showToast('排序已完成');
                break;
            case 'sort-by-time':
                state.bookStore.sortingEnabled = false;
                state.bookStore.lastSortMode = 'time';
                // 清除自定义顺序，使用时间排序
                state.bookStore.bookOrder = [];
                DataManager.save({
                    points: state.bookStore.points,
                    collectedCards: state.bookStore.collectedCards,
                    totalDraws: state.bookStore.totalDraws,
                    drawHistory: state.bookStore.drawHistory,
                    lastSortMode: state.bookStore.lastSortMode,
                    sortingEnabled: state.bookStore.sortingEnabled,
                    bookOrder: state.bookStore.bookOrder,
                    cardPositions: state.bookStore.cardPositions
                });
                closeShelfMenu();
                backApp();
                if (appViews.bookStore) renderBookStore();
                break;
            case 'sort-by-name':
                state.bookStore.sortingEnabled = false;
                state.bookStore.lastSortMode = 'name';
                // 清除自定义顺序，按名称排序的数组
                state.bookStore.bookOrder = state.bookStore.collectedCards
                    .map(c => ({
                        cardId: c.cardId,
                        title: getCardById(c.cardId)?.title || ''
                    }))
                    .sort((a, b) => a.title.localeCompare(b.title, 'zh-CN'))
                    .map(item => item.cardId);
                DataManager.save({
                    points: state.bookStore.points,
                    collectedCards: state.bookStore.collectedCards,
                    totalDraws: state.bookStore.totalDraws,
                    drawHistory: state.bookStore.drawHistory,
                    lastSortMode: state.bookStore.lastSortMode,
                    sortingEnabled: state.bookStore.sortingEnabled,
                    bookOrder: state.bookStore.bookOrder,
                    cardPositions: state.bookStore.cardPositions
                });
                closeShelfMenu();
                backApp();
                if (appViews.bookStore) renderBookStore();
                break;
            case 'decompose-multiple':
                // 打开分解书籍模态框
                openDecomposeModal();
                closeShelfMenu();
                backApp();
                break;
            case 'music-track': {
                const index = tracks.findIndex((track) => track.id === actionEl.dataset.id);
                if (index >= 0) {
                    setTrack(index, true);
                    renderMusic();
                }
                break;
            }
            case 'make-wish':
                openWishModal();
                break;
            case 'restart-app':
                openRestartModal();
                break;
            default: break;
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            if (photoViewer.classList.contains('open')) closePhoto();
            else if (state.activeApp) closeApp();
            return;
        }
        if (event.key === 'Enter' && event.target.id === 'chatInput') {
            event.preventDefault();
            sendChatText(event.target.value);
        }
    });

    window.addEventListener('resize', () => {
        if (!document.body.classList.contains('unlocked')) return;
        renderAppGridOnly();
    });

    musicFab.addEventListener('click', () => {
        openApp('music');
    });

    tick();
    setInterval(tick, 1000);
    renderHome();
    bootAudio();
    updateMusicFab();
    
    // 增强的拖拽排序功能 - 使用鼠标/触摸事件实现平滑动画
    window.initSortingDragDrop = function() {
        
        const shelfGrid = document.getElementById('bookShelfGrid');
        if (!shelfGrid) {
            console.error('书架网格未找到');
            return;
        }
        
        if (!window.state || !window.state.bookStore || !window.state.bookStore.sortingEnabled) {
            return;
        }
        
        
        // 获取卡片元素
        const cards = Array.from(shelfGrid.querySelectorAll('.book-card-shelf'));
        
        // 声明将在多个函数中使用的变量
        let draggedCard = null;
        let offsetX = 0, offsetY = 0;
        let floatingCard = null;
        let placeholder = null;
        let startX = 0, startY = 0;
        let draggedCardOriginalOpacity = '';
        let lastUpdateTime = 0;
        const UPDATE_THROTTLE_MS = 50; // 50ms防抖时间
        
        // 清理可能存在的旧事件
        cards.forEach(card => {
            card.onmousedown = null;
            card.ontouchstart = null;
        });
        
        // 鼠标移动
        const handleMouseMove = (e) => {
            if (!draggedCard) return;
            onDrag(e.clientX, e.clientY);
        };
        
        // 触摸移动
        const handleTouchMove = (e) => {
            if (!draggedCard || e.touches.length !== 1) return;
            e.preventDefault();
            onDrag(e.touches[0].clientX, e.touches[0].clientY);
        };
        
        // 停止拖拽
        const handleMouseUp = () => stopDrag();
        const handleTouchEnd = () => stopDrag();
        
        // 添加全局事件监听
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('touchend', handleTouchEnd);
        document.addEventListener('mouseleave', handleMouseUp);
        
        // 为每个卡片添加拖拽功能
        cards.forEach(card => {
            // 设置卡片样式
            card.style.cursor = 'grab';
            card.style.userSelect = 'none';
            card.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
            
            // 鼠标按下开始拖拽
            card.addEventListener('mousedown', function(e) {
                if (e.button !== 0) return; // 只响应左键
                startDrag(this, e.clientX, e.clientY);
            });
            
            // 触摸开始
            card.addEventListener('touchstart', function(e) {
                if (e.touches.length !== 1) return;
                e.preventDefault();
                startDrag(this, e.touches[0].clientX, e.touches[0].clientY);
            });
            
            // 防止点击事件干扰
            card.addEventListener('click', function(e) {
                if (draggedCard) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            }, true);
        });
        
        function startDrag(card, clientX, clientY) {
            draggedCard = card;
            const rect = card.getBoundingClientRect();
            
            startX = clientX;
            startY = clientY;
            offsetX = clientX - rect.left;
            offsetY = clientY - rect.top;
            
            // 创建浮动卡片
            floatingCard = card.cloneNode(true);
            floatingCard.id = 'floating-card-' + Date.now();
            floatingCard.className = 'floating-card';
            floatingCard.style.position = 'fixed';
            floatingCard.style.zIndex = '9999';
            floatingCard.style.width = rect.width + 'px';
            floatingCard.style.height = rect.height + 'px';
            floatingCard.style.left = rect.left + 'px';
            floatingCard.style.top = rect.top + 'px';
            floatingCard.style.transform = 'scale(1.1)';
            floatingCard.style.boxShadow = '0 25px 60px rgba(0, 0, 0, 0.4)';
            floatingCard.style.cursor = 'grabbing';
            floatingCard.style.pointerEvents = 'none';
            floatingCard.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
            
            document.body.appendChild(floatingCard);
            
            // 保存原始不透明度并设置半透明
            draggedCardOriginalOpacity = card.style.opacity || '';
            card.style.opacity = '0.3';
            
            // 创建占位符
            placeholder = document.createElement('div');
            placeholder.className = 'card-placeholder';
            placeholder.style.width = rect.width + 'px';
            placeholder.style.height = rect.height + 'px';
            placeholder.style.margin = getComputedStyle(card).margin;
            placeholder.style.border = '2px dashed #4CAF50'; // 更明显的颜色
            placeholder.style.backgroundColor = 'rgba(76, 175, 80, 0.05)'; // 半透明绿色
            placeholder.style.borderRadius = '18px'; // 与卡片圆角一致
            placeholder.style.transition = 'all 0.3s ease-out'; // 平滑过渡
            placeholder.style.boxShadow = '0 4px 12px rgba(76, 175, 80, 0.2)'; // 添加阴影效果
            card.parentNode.insertBefore(placeholder, card);
                        
            // 添加全局事件监听
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('touchmove', onTouchMove);
            document.addEventListener('mouseup', onMouseUp);
            document.addEventListener('touchend', onTouchEnd);
        }
        
        function onMouseMove(e) {
            onDrag(e.clientX, e.clientY);
        }
        
        function onTouchMove(e) {
            if (e.touches.length !== 1) return;
            e.preventDefault();
            onDrag(e.touches[0].clientX, e.touches[0].clientY);
        }
        
        function onMouseUp() {
            stopDrag();
        }
        
        function onTouchEnd() {
            stopDrag();
        }
        
        function onDrag(clientX, clientY) {
            if (!draggedCard || !floatingCard) return;
            
            const newX = clientX - offsetX;
            const newY = clientY - offsetY;
            
            floatingCard.style.left = newX + 'px';
            floatingCard.style.top = newY + 'px';
            
            // 更新其他卡片位置（让位效果）
            updateCardPositions(clientX, clientY);
        }
        
        function updateCardPositions(x, y) {
            if (!draggedCard || !placeholder) {
                return;
            }
            
            // 防抖：如果距离上次更新时间太短，跳过
            const now = Date.now();
            if (now - lastUpdateTime < UPDATE_THROTTLE_MS) {
                return;
            }
            lastUpdateTime = now;
            
            // 重新获取所有卡片（排除占位符和浮动卡片）
            const currentCards = Array.from(shelfGrid.querySelectorAll('.book-card-shelf'));
            
            // 查找最接近鼠标位置的卡片
            let closestCard = null;
            let minDistance = Infinity;
            
            currentCards.forEach(card => {
                if (card === draggedCard) return;
                
                const rect = card.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
                
                if (distance < minDistance) {
                    minDistance = distance;
                    closestCard = card;
                }
            });
                       
            // 如果找到最近的卡片，将占位符移动到它前面或后面
            if (closestCard && placeholder.parentNode === shelfGrid) {
                const closestRect = closestCard.getBoundingClientRect();
                
                // 判断是放在卡片前面还是后面
                if (x < closestRect.left + closestRect.width / 2) {
                    // 放在卡片前面
                    // 添加闪烁动画效果
                    placeholder.style.animation = 'none';
                    placeholder.offsetHeight; // 触发重排
                    placeholder.style.animation = 'placeholder-pulse 0.5s ease';
                    shelfGrid.insertBefore(placeholder, closestCard);
                } else {
                    // 放在卡片后面
                    // 添加闪烁动画效果
                    placeholder.style.animation = 'none';
                    placeholder.offsetHeight; // 触发重排
                    placeholder.style.animation = 'placeholder-pulse 0.5s ease';
                    if (closestCard.nextSibling) {
                        shelfGrid.insertBefore(placeholder, closestCard.nextSibling);
                    } else {
                        shelfGrid.appendChild(placeholder);
                    }
                }
                
                // 简单的视觉提示：目标位置的卡片稍微移动
                currentCards.forEach(card => {
                    if (card === draggedCard) return;
                    
                    if (card === closestCard) {
                        // 目标卡片有轻微移动提示
                        const direction = x < closestRect.left + closestRect.width / 2 ? -1 : 1;
                        card.style.transform = `translateX(${direction * 10}px)`;
                        card.style.transition = 'transform 0.2s ease';
                    } else {
                        card.style.transform = '';
                    }
                });
            }
        }
        
        
        
        function stopDrag() {
            if (!draggedCard) {
                console.error('停止拖拽时draggedCard为null');
                return;
            }
            
           
            // 恢复所有卡片的transform
            cards.forEach(card => {
                card.style.transform = '';
                card.style.transition = 'transform 0.3s ease';
            });
            
            // 执行交换逻辑
            if (placeholder && placeholder.parentNode) {
                // 获取当前所有卡片和占位符的位置
                const allElements = Array.from(shelfGrid.children);
                const placeholderIndex = allElements.indexOf(placeholder);
                const draggedIndex = allElements.indexOf(draggedCard);
                
                
                if (placeholderIndex !== -1 && draggedIndex !== -1 && placeholderIndex !== draggedIndex) {
                   
                    // 在移除占位符之前获取插入的目标元素
                    const targetInsertElement = allElements[placeholderIndex + 1] || null;
                    
                    // 移除占位符并立即设置为null
                    placeholder.parentNode.removeChild(placeholder);
                    placeholder = null;
                    
                    // 确保拖拽卡片在DOM中
                    if (!shelfGrid.contains(draggedCard)) {
                        // 如果拖拽卡片不在DOM中，可能是浮动卡片的情况
                        // 我们需要获取原始卡片（它应该还在原位置，只是半透明）
                        const originalCard = document.querySelector(`.book-card-shelf[data-card-id="${draggedCard.dataset.cardId}"]`);
                        if (originalCard && originalCard !== draggedCard) {
                            draggedCard = originalCard;
                        }
                    }
                    
                    // 将拖动卡片插入到占位符的位置
                    if (targetInsertElement && shelfGrid.contains(targetInsertElement)) {
                        shelfGrid.insertBefore(draggedCard, targetInsertElement);
                    } else {
                        // 如果没有目标元素，添加到末尾
                        shelfGrid.appendChild(draggedCard);
                    }
                    
                    // 保存排序
                    updateBookOrder();
                    showToast('排序已更新');
                }
            }
            
            // 清理
            cleanup();
        }
        
        function cleanup() {
            // 移除浮动卡片
            if (floatingCard && floatingCard.parentNode) {
                floatingCard.style.transition = 'all 0.3s ease';
                floatingCard.style.opacity = '0';
                floatingCard.style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    if (floatingCard.parentNode) {
                        floatingCard.parentNode.removeChild(floatingCard);
                    }
                    floatingCard = null;
                }, 300);
            }
            
            // 恢复拖拽卡片的样式
            if (draggedCard) {
                draggedCard.style.opacity = draggedCardOriginalOpacity;
                draggedCard = null;
            }
            
            // 清理占位符
            if (placeholder && placeholder.parentNode) {
                placeholder.parentNode.removeChild(placeholder);
                placeholder = null;
            }
            
            // 移除全局事件监听
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('touchmove', onTouchMove);
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('touchend', onTouchEnd);
        }
        
        function updateBookOrder() {
            const currentCards = shelfGrid.querySelectorAll('.book-card-shelf');
            const updatedOrder = Array.from(currentCards).map(card => card.dataset.cardId);
            
            if (window.state && window.state.bookStore) {
                window.state.bookStore.bookOrder = updatedOrder.filter(id => id);
                
                // 保存到localStorage
                DataManager.save({
                    points: window.state.bookStore.points,
                    collectedCards: window.state.bookStore.collectedCards,
                    totalDraws: window.state.bookStore.totalDraws,
                    drawHistory: window.state.bookStore.drawHistory,
                    lastSortMode: window.state.bookStore.lastSortMode,
                    sortingEnabled: window.state.bookStore.sortingEnabled,
                    bookOrder: window.state.bookStore.bookOrder,
                    cardPositions: window.state.bookStore.cardPositions,
                    usedWishes: window.state.bookStore.usedWishes
                });
            }
        }
    }
    
    
    // 为模态框按钮添加事件监听
    if (confirmWishBtn) {
        confirmWishBtn.addEventListener('click', processWish);
    }
    
    if (confirmRestartBtn) {
        confirmRestartBtn.addEventListener('click', processRestart);
    }
    
    // 为愿望输入框添加回车键支持
    if (wishInput) {
        wishInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                processWish();
            }
        });
    }

    // 分解书籍确认按钮事件
    if (confirmDecomposeBtn) {
        confirmDecomposeBtn.addEventListener('click', () => {
            const result = decomposeAllRepeatedBooks();
            if (result.success) {
                showToast(result.message);
                // 刷新书架显示
                if (state.bookStore.currentTab === 'shelf' && appViews.bookStore) {
                    renderBookStore();
                }
            }
        });
    }
})();
