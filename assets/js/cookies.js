// Cookie Consent Manager
(function() {
    const COOKIE_CONSENT_NAME = 'cookie_consent';
    const COOKIE_EXPIRY_DAYS = 365;

    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i].trim();
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
        }
        return null;
    }

    function showCookieBanner() {
        const consent = getCookie(COOKIE_CONSENT_NAME);
        if (!consent) {
            const banner = document.createElement('div');
            banner.id = 'cookie-banner';
            banner.innerHTML = `
                <div class="cookie-content">
                    <p>This page uses cookies to improve your experience. You can find more information in our <a href="privacy.html">Privacy Policy</a>.</p>
                    <div class="cookie-buttons">
                        <button id="accept-cookies" class="btn btn-primary">Accept</button>
                        <button id="reject-cookies" class="btn btn-secondary">Reject</button>
                    </div>
                </div>
            `;
            document.body.appendChild(banner);

            document.getElementById('accept-cookies').addEventListener('click', function() {
                setCookie(COOKIE_CONSENT_NAME, 'accepted', COOKIE_EXPIRY_DAYS);
                banner.remove();
                // Enable analytics, tracking scripts, etc.
                loadAnalytics();
            });

            document.getElementById('reject-cookies').addEventListener('click', function() {
                setCookie(COOKIE_CONSENT_NAME, 'rejected', COOKIE_EXPIRY_DAYS);
                banner.remove();
            });
        }
    }

    function loadAnalytics() {
        // Add your analytics scripts here
        // e.g., Google Analytics, Hotjar, etc.
        console.log('Analytics loaded after cookie consent');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', showCookieBanner);
    } else {
        showCookieBanner();
    }
})();
