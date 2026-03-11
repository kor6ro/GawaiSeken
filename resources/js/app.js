import './bootstrap';

import Alpine from 'alpinejs';
import { createIcons, icons } from 'lucide';

window.Alpine = Alpine;

// Expose lucide globally so views can call it too (e.g. after AJAX updates)
window.lucide = { createIcons, icons };

// Helper: run createIcons on a specific root (or whole document), safely
function renderIcons(root) {
    createIcons({
        icons,
        attrs: { 'stroke-width': 2 },
        nameAttr: 'data-lucide',
        root: root || document.body,
    });
}
window.renderIcons = renderIcons;

Alpine.store('theme', {
    isDark: localStorage.getItem('theme') === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches),

    toggle() {
        this.isDark = !this.isDark;
        localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', this.isDark);

        // Re-render icons after Alpine re-shows the correct sun/moon span
        Alpine.nextTick(() => renderIcons(document.body));
    }
});

// Run icons AFTER Alpine has started so x-cloak elements are already visible
document.addEventListener('alpine:initialized', () => {
    renderIcons(document.body);
});

Alpine.start();
