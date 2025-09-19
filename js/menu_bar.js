const navIcons = document.querySelectorAll('.nav-icon');
const sections = document.querySelectorAll('section');
const progressLine = document.getElementById('progressLine');

navIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        const targetSection = document.getElementById(icon.dataset.section);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

function updateNavigation() {
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    let currentSectionIndex = 0;
    let progressToNextSection = 0;

    if (scrollTop === 0) {
        currentSectionIndex = 0;
        progressToNextSection = 0;
    } else {
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollTop + windowHeight / 2 >= sectionTop) {
                currentSectionIndex = index;

                const scrollIntoSection = (scrollTop + windowHeight / 2) - sectionTop;
                progressToNextSection = Math.min(scrollIntoSection / sectionHeight, 1);
            }
        });
    }

    // Icons aktualisieren
    navIcons.forEach((icon, index) => {
        icon.classList.remove('active', 'passed');

        if (index === currentSectionIndex) {
            icon.classList.add('active');
        } else if (index < currentSectionIndex) {
            icon.classList.add('passed');
        }
    });

    if (sections.length > 1) {
        const segmentWidth = 100 / (sections.length - 1);
        const baseProgress = currentSectionIndex * segmentWidth;
        const additionalProgress = progressToNextSection * segmentWidth;

        let totalProgress = baseProgress + additionalProgress;

        totalProgress = Math.max(0, Math.min(100, totalProgress));

        progressLine.style.width = totalProgress + '%';
    }
}

window.addEventListener('scroll', updateNavigation);
window.addEventListener('load', updateNavigation);