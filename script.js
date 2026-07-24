// ==================== TAB NAVIGATION ====================
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tabName = btn.getAttribute('data-tab');
        showTab(tabName);
    });
});

function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to clicked button
    event.target.closest('.tab-btn').classList.add('active');
}

// ==================== INTRADAY SCANNER ====================
function scanIntraday() {
    const minPrice = parseFloat(document.getElementById('intradayMinPrice').value);
    const maxPrice = parseFloat(document.getElementById('intradayMaxPrice').value);
    const minVolume = parseInt(document.getElementById('intradayMinVolume').value);

    const data = generateIntradayData(minPrice, maxPrice, minVolume);
    displayIntradayResults(data);
    updateLastUpdate();
}

function generateIntradayData(minPrice, maxPrice, minVolume) {
    const stocks = [
        'RELIANCE', 'TCS', 'INFY', 'WIPRO', 'LT', 'HDFC', 'ICICI', 'AXIS',
        'BAJAJ-AUTO', 'MARUTI', 'HERO', 'EICHER', 'ASHOK', 'M&M',
        'TATASTEEL', 'JSTEEL', 'SAIL', 'NMDC', 'VEDL', 'HINDALCO'
    ];

    return stocks.map(stock => {
        const ltp = Math.random() * (maxPrice - minPrice) + minPrice;
        const change = (Math.random() - 0.5) * 5;
        const high = ltp * (1 + Math.random() * 0.02);
        const low = ltp * (1 - Math.random() * 0.02);
        const volume = Math.floor(Math.random() * 500000 + minVolume);
        
        return {
            stock,
            ltp: ltp.toFixed(2),
            change: change.toFixed(2),
            volume: volume.toLocaleString(),
            high: high.toFixed(2),
            low: low.toFixed(2),
            signal: change > 1 ? 'BUY' : change < -1 ? 'SELL' : 'NEUTRAL'
        };
    });
}

function displayIntradayResults(data) {
    const tbody = document.getElementById('intradayData');
    tbody.innerHTML = '';

    data.forEach(row => {
        const tr = document.createElement('tr');
        const signalClass = row.signal === 'BUY' ? 'signal-buy' : 
                           row.signal === 'SELL' ? 'signal-sell' : 'signal-neutral';
        
        tr.innerHTML = `
            <td><strong>${row.stock}</strong></td>
            <td>₹${row.ltp}</td>
            <td class="${parseFloat(row.change) > 0 ? 'trend-up' : 'trend-down'}">
                ${row.change > 0 ? '+' : ''}${row.change}%
            </td>
            <td>${row.volume}</td>
            <td>₹${row.high}</td>
            <td>₹${row.low}</td>
            <td><span class="${signalClass}">${row.signal}</span></td>
            <td>
                <div class="action-cell">
                    <button onclick="viewChart('${row.stock}')">Chart</button>
                    <button onclick="addToWatchlist('${row.stock}')">Watch</button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function refreshIntraday() {
    scanIntraday();
}

// ==================== SWING SCANNER ====================
function scanSwing() {
    const minPrice = parseFloat(document.getElementById('swingMinPrice').value);
    const rsi = parseInt(document.getElementById('swingRSI').value);
    const trend = document.getElementById('swingTrend').value;

    const data = generateSwingData(minPrice, rsi, trend);
    displaySwingResults(data);
    updateLastUpdate();
}

function generateSwingData(minPrice, rsi, trend) {
    const stocks = [
        'RELIANCE', 'TCS', 'INFY', 'WIPRO', 'LT', 'HDFC', 'ICICI', 'AXIS',
        'BAJAJ-AUTO', 'MARUTI', 'HERO', 'EICHER', 'ASHOK', 'M&M',
        'TATASTEEL', 'JSTEEL', 'SAIL', 'NMDC', 'VEDL', 'HINDALCO'
    ];

    return stocks
        .filter(stock => Math.random() > 0.4)
        .map(stock => {
            const change5d = (Math.random() - 0.5) * 15;
            const isUptrend = change5d > 0;
            const stockRSI = Math.random() * 100;
            const trendStr = isUptrend ? 'Uptrend' : 'Downtrend';
            
            if (trend !== 'all' && 
                ((trend === 'up' && !isUptrend) || (trend === 'down' && isUptrend))) {
                return null;
            }

            const support = minPrice + Math.random() * 100;
            const resistance = support * (1 + Math.random() * 0.1);

            return {
                stock,
                ltp: (minPrice + Math.random() * 500).toFixed(2),
                change5d: change5d.toFixed(2),
                rsi: stockRSI.toFixed(1),
                trend: trendStr,
                support: support.toFixed(2),
                resistance: resistance.toFixed(2)
            };
        })
        .filter(item => item !== null);
}

function displaySwingResults(data) {
    const tbody = document.getElementById('swingData');
    tbody.innerHTML = '';

    data.forEach(row => {
        const tr = document.createElement('tr');
        const trendClass = row.trend === 'Uptrend' ? 'trend-up' : 'trend-down';
        
        tr.innerHTML = `
            <td><strong>${row.stock}</strong></td>
            <td>₹${row.ltp}</td>
            <td class="${parseFloat(row.change5d) > 0 ? 'trend-up' : 'trend-down'}">
                ${row.change5d > 0 ? '+' : ''}${row.change5d}%
            </td>
            <td>${row.rsi}</td>
            <td class="${trendClass}"><strong>${row.trend}</strong></td>
            <td>₹${row.support}</td>
            <td>₹${row.resistance}</td>
            <td>
                <div class="action-cell">
                    <button onclick="viewChart('${row.stock}')">Chart</button>
                    <button onclick="addAlert('${row.stock}')">Alert</button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function refreshSwing() {
    scanSwing();
}

// ==================== BTST SCANNER ====================
function scanBTST() {
    const expectedMove = parseFloat(document.getElementById('btstMove').value);
    const liquidity = parseInt(document.getElementById('btstLiquidity').value);
    const expiry = document.getElementById('btstExpiry').value;

    const data = generateBTSTData(expectedMove, liquidity, expiry);
    displayBTSTResults(data);
    updateLastUpdate();
}

function generateBTSTData(expectedMove, liquidity, expiry) {
    const stocks = [
        'RELIANCE', 'TCS', 'INFY', 'WIPRO', 'LT', 'HDFC', 'ICICI', 'AXIS',
        'BAJAJ-AUTO', 'MARUTI', 'HERO', 'EICHER', 'ASHOK', 'M&M'
    ];

    return stocks.map(stock => {
        const price = 100 + Math.random() * 3000;
        const range = (Math.random() * 2 + expectedMove).toFixed(2);
        const setup = Math.random() > 0.5 ? 'Breakout Gap Up' : 'Support Bounce';
        const liquidity_cr = Math.floor(Math.random() * 500 + liquidity);

        return {
            stock,
            price: price.toFixed(2),
            range: `${price.toFixed(2)} - ${(price * 1.02).toFixed(2)}`,
            setup: setup,
            expectedMove: `${range}%`,
            liquidity: liquidity_cr,
            setupType: setup,
            signal: 'BTST Setup'
        };
    });
}

function displayBTSTResults(data) {
    const tbody = document.getElementById('btstData');
    tbody.innerHTML = '';

    data.forEach(row => {
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td><strong>${row.stock}</strong></td>
            <td>₹${row.price}</td>
            <td>${row.range}</td>
            <td>${row.setup}</td>
            <td class="trend-up"><strong>${row.expectedMove}</strong></td>
            <td>₹${row.liquidity} Cr</td>
            <td><span class="signal-buy">${row.setupType}</span></td>
            <td>
                <div class="action-cell">
                    <button onclick="viewChart('${row.stock}')">Chart</button>
                    <button onclick="addToPortfolio('${row.stock}')">Add</button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function refreshBTST() {
    scanBTST();
}

// ==================== NFO OPTIONS SCANNER ====================
function scanNFO() {
    const underlying = document.getElementById('nfoUnderlying').value;
    const strategy = document.getElementById('nfoStrategy').value;
    const expiry = document.getElementById('nfoExpiry').value;

    const data = generateNFOData(underlying, strategy, expiry);
    displayNFOResults(data);
    updateLastUpdate();
}

function generateNFOData(underlying, strategy, expiry) {
    const basePrice = {
        'NIFTY': 24000,
        'FINNIFTY': 23000,
        'BANKNIFTY': 50000,
        'RELIANCE': 2850,
        'TCS': 3500
    };

    const current = basePrice[underlying];
    const strategies = {
        'strangle': {
            name: 'Long Strangle',
            entry: (current * 0.02).toFixed(2),
            target: (current * 0.05).toFixed(2),
            sl: (current * 0.01).toFixed(2)
        },
        'straddle': {
            name: 'Long Straddle',
            entry: (current * 0.03).toFixed(2),
            target: (current * 0.06).toFixed(2),
            sl: (current * 0.015).toFixed(2)
        },
        'call': {
            name: 'Call Spread',
            entry: (current * 0.015).toFixed(2),
            target: (current * 0.035).toFixed(2),
            sl: (current * 0.008).toFixed(2)
        },
        'put': {
            name: 'Put Spread',
            entry: (current * 0.015).toFixed(2),
            target: (current * 0.035).toFixed(2),
            sl: (current * 0.008).toFixed(2)
        },
        'iron_condor': {
            name: 'Iron Condor',
            entry: (current * 0.01).toFixed(2),
            target: (current * 0.025).toFixed(2),
            sl: (current * 0.02).toFixed(2)
        }
    };

    const stratData = strategies[strategy];
    const target = parseFloat(stratData.target);
    const entry = parseFloat(stratData.entry);
    const sl = parseFloat(stratData.sl);
    const rr = ((target - entry) / (entry - sl)).toFixed(2);

    return [{
        underlying: underlying,
        currentPrice: current.toFixed(2),
        strategy: stratData.name,
        entry: stratData.entry,
        target: stratData.target,
        sl: stratData.sl,
        rr: `1:${rr}`
    }];
}

function displayNFOResults(data) {
    const tbody = document.getElementById('nfoData');
    tbody.innerHTML = '';

    data.forEach(row => {
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td><strong>${row.underlying}</strong></td>
            <td>₹${row.currentPrice}</td>
            <td>${row.strategy}</td>
            <td>₹${row.entry}</td>
            <td class="trend-up">₹${row.target}</td>
            <td class="trend-down">₹${row.sl}</td>
            <td><strong>${row.rr}</strong></td>
            <td>
                <div class="action-cell">
                    <button onclick="viewGreeks('${row.underlying}')">Greeks</button>
                    <button onclick="addTrade('${row.underlying}')">Trade</button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function refreshNFO() {
    scanNFO();
}

// ==================== UTILITY FUNCTIONS ====================
function updateLastUpdate() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    document.getElementById('lastUpdate').textContent = timeString;
}

function viewChart(stock) {
    alert(`Opening chart for ${stock}...\n\nIn production, this would open TradingView or similar.`);
    showNotification(`Chart opened for ${stock}`, 'info');
}

function addToWatchlist(stock) {
    alert(`✓ ${stock} added to watchlist!`);
    localStorage.setItem(`watchlist_${stock}`, JSON.stringify({
        stock: stock,
        addedAt: new Date().toISOString()
    }));
    showNotification(`${stock} added to watchlist`, 'success');
}

function addAlert(stock) {
    const price = prompt(`Set price alert for ${stock}:`);
    if (price) {
        alert(`✓ Price alert set at ₹${price}`);
        showNotification(`Alert set for ${stock} at ₹${price}`, 'success');
    }
}

function addToPortfolio(stock) {
    alert(`✓ ${stock} added to portfolio!`);
    showNotification(`${stock} added to portfolio`, 'success');
}

function viewGreeks(underlying) {
    alert(`Greeks Analysis for ${underlying}\n\nDelta | Gamma | Theta | Vega\n0.45  | 0.02  | -0.5  | 0.35\n\n(Sample data)`);
}

function addTrade(underlying) {
    alert(`✓ Trade added for ${underlying}!`);
    showNotification(`Trade added for ${underlying}`, 'success');
}

function savePortfolio() {
    const portfolioName = document.getElementById('portfolioName').value;
    if (portfolioName) {
        localStorage.setItem('portfolioName', portfolioName);
        alert(`✓ Portfolio "${portfolioName}" saved!`);
        showNotification(`Portfolio saved: ${portfolioName}`, 'success');
    } else {
        alert('Please enter a portfolio name');
    }
}

function exportData() {
    const csv = "Stock,Type,Date,Value\nRELIANCE,BUY,2026-07-24,2850\nTCS,SELL,2026-07-24,3500";
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'scanner-data.csv';
    a.click();
    showNotification('Data exported successfully', 'success');
}

function clearCache() {
    if (confirm('Clear all cached data? This cannot be undone.')) {
        localStorage.clear();
        alert('✓ Cache cleared!');
        showNotification('Cache cleared', 'success');
    }
}

// ==================== NOTIFICATIONS ====================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#16a34a' : '#1e40af'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ==================== INITIALIZE ON LOAD ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 PKScreener Dashboard Loaded');
    updateLastUpdate();
    
    // Set first tab as active
    document.querySelector('.tab-btn').classList.add('active');
    document.querySelector('.tab-content').classList.add('active');
    
    // Request notification permission if enabled
    if (document.getElementById('enableNotifications').checked && 'Notification' in window) {
        if (Notification.permission === 'granted') {
            console.log('✓ Notifications enabled');
        }
    }
});

// ==================== KEYBOARD SHORTCUTS ====================
document.addEventListener('keydown', (e) => {
    // Ctrl+Shift+S: Start intraday scan
    if (e.ctrlKey && e.shiftKey && e.key === 'S') {
        e.preventDefault();
        scanIntraday();
    }
    
    // Ctrl+Shift+W: Switch to swing tab
    if (e.ctrlKey && e.shiftKey && e.key === 'W') {
        e.preventDefault();
        document.querySelector('[data-tab="swing"]').click();
    }
});

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);