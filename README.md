# PKScreener Dashboard - NSE/NFO Scanner

A comprehensive web-based scanner dashboard for identifying trading opportunities across NSE stocks and NFO options.

## 🚀 Features

### 📊 Intraday Scanner
- Real-time NSE stock screening
- Volume & price filtering
- Momentum-based signals (BUY/SELL/NEUTRAL)
- High-volume stocks identification
- Ideal for day traders

**Use Case:** Quick identification of volatile stocks with high trading volume during market hours (9:15 AM - 3:30 PM IST)

### 📈 Swing Trading Scanner
- 3-5 day trend analysis
- RSI-based momentum detection
- Support & resistance levels
- Multi-stock filtering
- Risk management levels

**Use Case:** Identify swing trading opportunities with trend confirmation over multiple days

### 🔄 BTST Scanner (Buy Today, Sell Tomorrow)
- Overnight trading setups
- Gap analysis
- Expected move calculation
- Liquidity filtering
- Lower risk overnight holds

**Use Case:** Find stocks likely to gap up/down for quick overnight profits

### 📉 NFO Options Scanner
- Index & Stock Options analysis
- Multi-strategy support:
  - Long Strangle
  - Long Straddle
  - Call/Put Spreads
  - Iron Condor
- Greeks calculation
- Risk/Reward ratio analysis

**Use Case:** Options trading strategies with automated Greeks and P&L calculations

## 📋 Scanner Types Explained

### 1. **Intraday Trading**
- **Time Frame:** Minutes to Hours (within a trading day)
- **Entry-Exit:** Same day
- **Risk:** High, but capital efficient
- **Best For:** Active traders during market hours
- **Key Metrics:** Volume, Volatility, Intraday Range

### 2. **Swing Trading**
- **Time Frame:** 3-5 days
- **Entry-Exit:** Multi-day holds
- **Risk:** Moderate
- **Best For:** Working professionals with limited time
- **Key Metrics:** RSI, Trend Direction, Support/Resistance

### 3. **BTST (Buy Today, Sell Tomorrow)**
- **Time Frame:** 1-2 days (usually overnight)
- **Entry-Exit:** Next day or within 24 hours
- **Risk:** Low to Moderate
- **Best For:** Conservative day traders
- **Key Metrics:** Gap Setup, Liquidity, Expected Move

### 4. **NFO Options**
- **Time Frame:** Intraday to Weeks
- **Entry-Exit:** Flexible
- **Risk:** Limited/Unlimited (depending on strategy)
- **Best For:** Advanced traders
- **Key Metrics:** Greeks, Volatility, Expiry

## 🎯 How to Use

### Getting Started
1. **Navigate to Tabs:** Click on Intraday, Swing, BTST, or NFO tabs
2. **Set Filters:** Adjust price ranges, volume, RSI levels, etc.
3. **Click "Scan Now":** Fetch filtered results
4. **Review Results:** Analyze the data in the table
5. **Take Action:** Use Chart, Watch, or Alert buttons

### Keyboard Shortcuts
- `Ctrl+Shift+S`: Start Intraday Scan
- `Ctrl+Shift+W`: Switch to Swing Tab

### Settings
- Configure data source (Demo/Yahoo Finance/Custom API)
- Enable/Disable notifications and sound alerts
- Save portfolio preferences
- Export data as CSV

## 📊 Table Columns Explained

### Intraday Scanner
| Column | Meaning |
|--------|---------|
| Stock | Stock symbol |
| LTP | Last Traded Price |
| Change % | Intraday percentage change |
| Volume | Trading volume |
| High | Day's high price |
| Low | Day's low price |
| Signal | BUY/SELL/NEUTRAL recommendation |

### Swing Scanner
| Column | Meaning |
|--------|---------|
| Stock | Stock symbol |
| LTP | Last Traded Price |
| 5D Change % | 5-day percentage change |
| RSI (14) | 14-period Relative Strength Index |
| Trend | Uptrend or Downtrend |
| Support | Key support level |
| Resistance | Key resistance level |

### BTST Scanner
| Column | Meaning |
|--------|---------|
| Stock | Stock symbol |
| Price | Current price |
| Intraday Range | Range of price movement |
| Gap Setup | Type of gap (Gap Up/Gap Down) |
| Expected Move | Predicted price move % |
| Liquidity | Market cap/liquidity in Crores |
| Setup Type | Breakout Gap Up or Support Bounce |

### NFO Options
| Column | Meaning |
|--------|---------|
| Underlying | Index/Stock name |
| Current Price | Current underlying price |
| Strategy | Options strategy name |
| Entry Price | Recommended entry premium |
| Target | Target profit level |
| SL | Stop loss level |
| Risk/Reward | Risk-reward ratio |

## ⚙️ Filters Available

### Intraday
- Min/Max Price (₹)
- Min Volume

### Swing
- Min Price (₹)
- 5-Day RSI Minimum
- Trend Filter (Up/Down/All)

### BTST
- Expected Move % Range
- Min Liquidity (₹ Crores)
- Time to Expiry

### NFO
- Index/Stock Selection
- Strategy Type
- Weekly/Monthly Expiry

## 💡 Trading Tips

1. **Risk Management**
   - Always use stop loss
   - Maintain 1:2 risk-reward ratio minimum
   - Don't risk more than 2% of capital per trade

2. **Intraday Trading**
   - Trade during high volume hours (10-11 AM, 2-3 PM)
   - Follow support/resistance levels
   - Use 5-minute or 15-minute charts for confirmation

3. **Swing Trading**
   - Confirm signals with daily/4-hour charts
   - Wait for RSI confirmation (not overbought/oversold)
   - Use trailing stop loss for profit protection

4. **BTST Trading**
   - Check previous day close and gaps
   - Look for strong support/resistance at open
   - Exit at first target or use trailing stop

5. **Options Trading**
   - Understand Greeks before trading
   - Trade only liquid contracts
   - Use defined-risk strategies (spreads)
   - Check days to expiry before entry

## 📱 Responsive Design

The dashboard is fully responsive and works on:
- Desktop browsers
- Tablets
- Mobile phones

## 🔐 Data & Privacy

- **Demo Mode:** Uses sample data for demonstration
- **Local Storage:** Your portfolio data is stored locally
- **No Server:** Personal data never leaves your device
- **Export:** Download your data anytime

## 🚀 Deployment

### GitHub Pages Deployment (Already Configured!)
```bash
git add .
git commit -m "Deploy PKScreener Dashboard"
git push origin main
```

Your dashboard is live at: `https://shaelegance-del.github.io/pkscreener-dashboard/`

### Manual Deployment Options
1. **Netlify:** Drag and drop files
2. **Vercel:** Connect GitHub repo
3. **Firebase:** Use Firebase Hosting
4. **AWS S3:** Static website hosting

## 📈 Future Enhancements

- [ ] Live data integration (NSE API)
- [ ] Real-time price updates
- [ ] Advanced charting (TradingView)
- [ ] Email/SMS alerts
- [ ] Mobile app
- [ ] Machine learning predictions
- [ ] Multi-account support
- [ ] Strategy backtesting

## ⚠️ Disclaimer

This is an educational tool. Always do your own research before trading. Past performance is not indicative of future results. Trading and investments carry risk. Seek professional financial advice before making investment decisions.

## 📝 License

MIT License - Feel free to fork and modify

## 🤝 Contributing

Contributions welcome! Submit issues and pull requests for:
- Bug fixes
- Feature requests
- Performance improvements
- Documentation updates

## 📞 Support

For questions or issues:
1. Check the FAQ section
2. Review the tips section
3. Contact support or create an issue on GitHub

---

**Happy Trading! 📈**

*Last Updated: July 24, 2026*
