/**
 * Sticky Header Script
 * Makes a header element sticky when scrolling past its original position
 */

class StickyHeader {
    constructor(headerSelector = '#sticky-header', options = {}) {
        this.header = document.querySelector(headerSelector);
        this.stickyClass = options.stickyClass || 'is-sticky';
        this.offset = options.offset || 0;
        this.throttleDelay = options.throttleDelay || 100;
        
        if (!this.header) {
            console.error(`Sticky header element not found: ${headerSelector}`);
            return;
        }

        this.originalPosition = 0;
        this.isSticky = false;
        this.throttleTimeout = null;

        this.init();
    }

    init() {
        // Set initial position
        this.originalPosition = this.header.offsetTop;

        // Add scroll event listener with throttling
        window.addEventListener('scroll', () => this.handleScroll());

        // Handle window resize to recalculate position
        window.addEventListener('resize', () => {
            this.originalPosition = this.header.offsetTop;
        });
    }

    handleScroll() {
        // Throttle scroll event
        if (this.throttleTimeout) return;

        this.throttleTimeout = setTimeout(() => {
            const scrollPosition = window.scrollY || document.documentElement.scrollTop;

            if (scrollPosition > this.originalPosition - this.offset) {
                this.makeSticky();
            } else {
                this.removeSticky();
            }

            this.throttleTimeout = null;
        }, this.throttleDelay);
    }

    makeSticky() {
        if (!this.isSticky) {
            this.header.classList.add(this.stickyClass);
            this.isSticky = true;
        }
    }

    removeSticky() {
        if (this.isSticky) {
            this.header.classList.remove(this.stickyClass);
            this.isSticky = false;
        }
    }

    destroy() {
        this.header.classList.remove(this.stickyClass);
        window.removeEventListener('scroll', () => this.handleScroll());
    }
}

// Initialize sticky header when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Create sticky header instance with custom options
    const stickyHeader = new StickyHeader('#sticky-header', {
        stickyClass: 'is-sticky',
        offset: 0,           // Distance from top before header becomes sticky
        throttleDelay: 100   // Milliseconds to throttle scroll events
    });
});

// Alternative: Simple vanilla JS implementation (no class)
/*
function initStickyHeader(headerSelector = '#sticky-header', stickyClass = 'is-sticky') {
    const header = document.querySelector(headerSelector);
    if (!header) return;

    let originalPosition = header.offsetTop;
    let isSticky = false;

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;

        if (scrollPosition > originalPosition && !isSticky) {
            header.classList.add(stickyClass);
            isSticky = true;
        } else if (scrollPosition <= originalPosition && isSticky) {
            header.classList.remove(stickyClass);
            isSticky = false;
        }
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initStickyHeader();
});
*/
