import './bootstrap';

import Alpine from 'alpinejs';

import { createIcons, icons } from 'lucide';

window.Alpine = Alpine;
window.lucide = { createIcons, icons };

Alpine.store('theme', {
    isDark: localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches),

    toggle() {
        this.isDark = !this.isDark;
        localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', this.isDark);

        Alpine.nextTick(() => {
            createIcons({ icons });
        });
    }
});

Alpine.start();

// Initial icon generation
createIcons({ icons });
