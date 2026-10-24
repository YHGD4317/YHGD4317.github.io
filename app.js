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
        files: icon('<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>'),
        memo: icon('<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>'),
        music: icon('<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>'),
        mail: icon('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-9 5.7a2 2 0 0 1-2 0L2 7"/>'),
        phone: icon('<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7 12.8 12.8 0 0 0 .7 2.8 2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5 12.8 12.8 0 0 0 2.8.7 2 2 0 0 1 1.7 2.1Z"/>'),
        message: icon('<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>'),
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
        snow: icon('<path d="m10 8.5-1-2L6 6"/><path d="M14 8.5 15 6.5 18 6"/><path d="M12 2v6"/><path d="m10 15.5-1 2-3 .5"/><path d="M14 15.5 15 17.5l3 .5"/><path d="M12 16v6"/><path d="M12 11v5"/>')
    };

    const APPS = [
        { label: '关于我', app: 'about', icon: I.user, tone: 'tone-1' },
        { label: '图库', app: 'gallery', icon: I.gallery, tone: 'tone-2' },
        { label: '文件管理', app: 'files', icon: I.files, tone: 'tone-3' },
        { label: '备忘录', app: 'memo', icon: I.memo, tone: 'tone-4' },
        { label: '音乐', app: 'music', icon: I.music, tone: 'tone-5' },
        { label: '邮件', app: 'mail', icon: I.mail, tone: 'tone-6' }
    ];

    const DOCK_APPS = [
        { label: '电话', app: 'contacts', icon: I.phone, tone: 'tone-7' },
        { label: '信息', app: 'messages', icon: I.message, tone: 'tone-8' },
        { label: '图库', app: 'gallery', icon: I.gallery, tone: 'tone-2' },
        { label: '音乐', app: 'music', icon: I.music, tone: 'tone-5' }
    ];

    const SEQUENCE = ['about', 'memo', 'mail', 'messages', 'gallery'];
    const TITLES = {
        about: '关于我',
        gallery: '图库',
        files: '文件管理',
        memo: '备忘录',
        music: '音乐',
        mail: '邮件',
        mailDetail: '邮件详情',
        contacts: '联系人',
        messages: '信息'
    };

    const state = {
        activeApp: null,
        history: [],
        galleryFilter: '全部',
        fileTab: 'images',
        fileQuery: '',
        mailDetailId: null,
        trackIndex: 0,
        chatMessages: [],
        chatBusy: false,
        chatTyping: false,
        chatTimers: [],
        audioMuted: false,
        needsGesture: false,
        suppressClickUntil: 0
    };

    const lockScreen = $('lockScreen');
    const homeScreen = $('homeScreen');
    const appLayer = $('appLayer');
    const photoViewer = $('photoViewer');
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
        const track = currentTrack();
        audio.src = track.src;
        audio.muted = true;
        state.audioMuted = true;
        audio.load();
        audio.play().then(() => {
            updateMusicChrome();
        }).catch(() => {
            state.audioMuted = false;
            state.needsGesture = true;
            audio.muted = false;
            updateMusicChrome();
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

    function appHeader(title, { back = false, subtitle = '', actions = '' } = {}) {
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
                <button class="head-btn" type="button" data-act="close-app" aria-label="关闭">${I.close}</button>
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
                <p class="swipe-hint">向左滑动，继续逛：备忘录 · 邮件 · 信息 · 图库</p>
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
        $('viewerImage').src = photo.src;
        $('viewerImage').alt = photo.title;
        $('viewerTitle').textContent = photo.title;
        $('viewerTag').textContent = photo.tag;
        photoViewer.classList.add('open');
        photoViewer.setAttribute('aria-hidden', 'false');
    }

    function closePhoto() {
        photoViewer.classList.remove('open');
        photoViewer.setAttribute('aria-hidden', 'true');
    }

    function filteredImages() {
        const query = state.fileQuery.trim().toLowerCase();
        return WORLD.gallery.photos.filter((photo) => !query || `${photo.title} ${photo.tag}`.toLowerCase().includes(query));
    }

    function filteredMusic() {
        const query = state.fileQuery.trim().toLowerCase();
        return WORLD.music.tracks.filter((track) => !query || `${track.title} ${track.artist}`.toLowerCase().includes(query));
    }

    function renderFiles() {
        const view = ensureView('files');
        const images = filteredImages();
        const music = filteredMusic();
        const imageRows = images.map((photo) => `
            <article class="file-row">
                <button class="file-thumb" type="button" data-act="open-photo" data-id="${esc(photo.id)}" aria-label="查看 ${esc(photo.title)}">
                    <img src="${esc(photo.src)}" alt="">
                </button>
                <div class="file-meta">
                    <strong>${esc(photo.title)}</strong>
                    <span>图片 · ${esc(photo.tag)} · 内置素材</span>
                </div>
            </article>
        `).join('');
        const musicRows = music.map((track) => `
            <article class="file-row">
                <button class="file-thumb music-thumb" type="button" data-act="file-play" data-id="${esc(track.id)}" aria-label="播放 ${esc(track.title)}">
                    <img src="${esc(track.cover)}" alt="">
                </button>
                <div class="file-meta">
                    <strong>${esc(track.title)}</strong>
                    <span>音乐 · ${esc(track.artist)} · 内置曲目</span>
                </div>
            </article>
        `).join('');
        view.innerHTML = `
            ${appHeader('文件管理', { subtitle: 'ALL COLLECTIONS' })}
            <div class="app-body files-body">
                <div class="file-stats">
                    <div class="stat-card"><span class="stat-icon">${I.image}</span><strong>${WORLD.gallery.photos.length}</strong><small>图库图片</small></div>
                    <div class="stat-card"><span class="stat-icon">${I.music}</span><strong>${WORLD.music.tracks.length}</strong><small>音乐曲目</small></div>
                    <div class="stat-card"><span class="stat-icon">${I.files}</span><strong>${WORLD.gallery.photos.length + WORLD.music.tracks.length}</strong><small>文件总数</small></div>
                </div>
                <label class="search-box">
                    ${I.search}
                    <input id="fileSearch" type="search" placeholder="搜索文件名或标签" value="${esc(state.fileQuery)}" autocomplete="off">
                </label>
                <div class="segmented">
                    <button class="${state.fileTab === 'images' ? 'active' : ''}" type="button" data-act="file-tab" data-tab="images">图片 <small>${WORLD.gallery.photos.length}</small></button>
                    <button class="${state.fileTab === 'music' ? 'active' : ''}" type="button" data-act="file-tab" data-tab="music">音乐 <small>${WORLD.music.tracks.length}</small></button>
                </div>
                <div class="file-list">
                    ${state.fileTab === 'images'
                        ? (images.length ? imageRows : emptyState('没有匹配的图片', '换一个关键词试试'))
                        : (music.length ? musicRows : emptyState('没有匹配的音乐', '换一个关键词试试'))}
                </div>
            </div>
        `;
        const search = $('fileSearch');
        if (search) {
            let timer = null;
            search.addEventListener('input', () => {
                state.fileQuery = search.value;
                clearTimeout(timer);
                timer = setTimeout(() => {
                    renderFiles();
                    const next = $('fileSearch');
                    if (next) {
                        next.focus({ preventScroll: true });
                        next.setSelectionRange(state.fileQuery.length, state.fileQuery.length);
                    }
                }, 220);
            });
        }
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
                    ${WORLD.mails.length ? WORLD.mails.map((mail, index) => `
                        <article class="mail-row">
                            <button class="mail-main" type="button" data-act="open-mail" data-id="${esc(mail.id)}">
                                <span class="mail-dot ${index === 0 ? 'unread' : ''}" aria-hidden="true"></span>
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

    function renderApp(id) {
        switch (id) {
            case 'about': renderAbout(); break;
            case 'gallery': renderGallery(); break;
            case 'files': renderFiles(); break;
            case 'memo': renderMemo(); break;
            case 'music': renderMusic(); break;
            case 'mail': renderMail(); break;
            case 'mailDetail': renderMailDetail(); break;
            case 'contacts': renderContacts(); break;
            case 'messages': renderMessages(); break;
            default: break;
        }
    }

    function showApp(id, direction = 'right', push = false) {
        if (!document.body.classList.contains('unlocked')) return;
        if (state.activeApp === id) {
            renderApp(id);
            return;
        }
        const view = ensureView(id);
        if (push && state.activeApp) state.history.push(state.activeApp);
        renderApp(id);
        if (state.activeApp && appViews[state.activeApp]) {
            appViews[state.activeApp].style.display = 'none';
            appViews[state.activeApp].setAttribute('aria-hidden', 'true');
        }
        view.style.display = 'flex';
        view.setAttribute('aria-hidden', 'false');
        view.classList.remove('page-in-right', 'page-in-left', 'page-out-right', 'page-out-left');
        void view.offsetWidth;
        view.classList.add(direction === 'left' ? 'page-in-left' : 'page-in-right');
        state.activeApp = id;
        document.body.classList.add('app-open');
        document.body.dataset.app = id;
        updateMusicFab();
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
        const view = appViews[state.activeApp];
        const old = state.activeApp;
        if (view) {
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
        const next = index + step;
        if (next < 0 || next >= SEQUENCE.length) {
            closeApp();
            return;
        }
        state.history = [];
        showApp(SEQUENCE[next], step > 0 ? 'right' : 'left');
    }

    let toastTimer = null;
    function showToast(message) {
        clearTimeout(toastTimer);
        toastEl.textContent = message;
        toastEl.classList.add('show');
        toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2200);
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
        if (event.target.closest('[data-viewer-close]')) {
            closePhoto();
            return;
        }
        const launch = event.target.closest('[data-launch]');
        if (launch) {
            event.preventDefault();
            openApp(launch.dataset.launch);
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
            case 'open-mail':
                state.mailDetailId = actionEl.dataset.id;
                openApp('mailDetail', { stack: true });
                break;
            case 'file-tab':
                state.fileTab = actionEl.dataset.tab === 'music' ? 'music' : 'images';
                renderFiles();
                break;
            case 'file-play': {
                const index = tracks.findIndex((track) => track.id === actionEl.dataset.id);
                if (index >= 0) {
                    setTrack(index, true);
                    openApp('music', { stack: true });
                }
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
            case 'music-track': {
                const index = tracks.findIndex((track) => track.id === actionEl.dataset.id);
                if (index >= 0) {
                    setTrack(index, true);
                    renderMusic();
                }
                break;
            }
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

    tick();
    setInterval(tick, 1000);
    renderHome();
    bootAudio();
    updateMusicFab();
})();
