document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('track');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const viewport = document.querySelector('.carousel-viewport');
    
    if (!track || !prevBtn || !nextBtn || !viewport) return;

    const minGap = 15; 
    let currentScrollAmount = 0;

    function updateLayout() {
        const firstCard = track.firstElementChild;
        // Если карточек нет, выходим без ошибок
        if (!firstCard) return;
        
        const cardWidth = firstCard.offsetWidth;
        // Если элемент скрыт или не отрисован
        if (cardWidth === 0) return;

        const trackStyle = window.getComputedStyle(track);
        const trackPadding = parseFloat(trackStyle.paddingLeft) + parseFloat(trackStyle.paddingRight);
        const availableWidth = viewport.clientWidth - trackPadding;
        
        const maxItems = Math.floor((availableWidth + minGap) / (cardWidth + minGap));
        const visibleItemsCount = Math.max(1, maxItems);
        
        track.style.gap = `${minGap}px`;
        currentScrollAmount = (cardWidth + minGap) * visibleItemsCount;
    }

    // Инициализация при загрузке и ресайзе
    window.addEventListener('resize', () => {
        updateLayout();
        track.style.transform = `translateX(0px)`;
    });
    
    // Следим за изменениями в DOM (добавление карточек)
    const observer = new MutationObserver(() => {
        setTimeout(updateLayout, 50);
    });
    observer.observe(track, { childList: true });

    nextBtn.addEventListener('click', () => {
        updateLayout();
        if (currentScrollAmount === 0) return; // Защита

        const currentTranslate = getCurrentTranslate();
        const maxTranslate = track.scrollWidth - track.parentElement.clientWidth;
        
        if (currentTranslate >= maxTranslate - 5) return;

        let nextTranslate = currentTranslate + currentScrollAmount;
        if (nextTranslate > maxTranslate) nextTranslate = maxTranslate;

        track.style.transform = `translateX(-${nextTranslate}px)`;
    });

    prevBtn.addEventListener('click', () => {
        updateLayout();
        if (currentScrollAmount === 0) return; // Защита

        const currentTranslate = getCurrentTranslate();
        
        if (currentTranslate <= 0) return;

        let nextTranslate = currentTranslate - currentScrollAmount;
        if (nextTranslate < 0) nextTranslate = 0;

        track.style.transform = `translateX(-${nextTranslate}px)`;
    });

    function getCurrentTranslate() {
        const style = window.getComputedStyle(track);
        const matrix = new WebKitCSSMatrix(style.transform);
        return Math.abs(matrix.m41);
    }
});