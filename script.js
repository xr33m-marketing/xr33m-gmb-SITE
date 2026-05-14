// =============================================================
// Ryan Local — minimal interactivity:
//  • Theme toggle (system default + manual override, no storage)
//  • Sticky-header scrolled state
//  • Footer year
//  • ROI calculator
// =============================================================

(function () {
  // Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Theme toggle ----------
  const root = document.documentElement;
  const toggle = document.querySelector('[data-theme-toggle]');

  const sunIcon =
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>';
  const moonIcon =
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  function applyTheme(mode) {
    root.setAttribute('data-theme', mode);
    if (toggle) {
      toggle.innerHTML = mode === 'dark' ? sunIcon : moonIcon;
      toggle.setAttribute(
        'aria-label',
        'Switch to ' + (mode === 'dark' ? 'light' : 'dark') + ' mode'
      );
    }
  }

  let mode = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
  applyTheme(mode);

  if (toggle) {
    toggle.addEventListener('click', () => {
      mode = mode === 'dark' ? 'light' : 'dark';
      applyTheme(mode);
    });
  }

  // ---------- Header scrolled state ----------
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ---------- ROI calculator ----------
  const roiInputs = {
    trade: document.querySelector('[data-roi-input="trade"]'),
    area: document.querySelector('[data-roi-input="area"]'),
    closeRate: document.querySelector('[data-roi-input="closeRate"]'),
    jobValue: document.querySelector('[data-roi-input="jobValue"]'),
    margin: document.querySelector('[data-roi-input="margin"]'),
    lifetime: document.querySelector('[data-roi-input="lifetime"]'),
  };

  const tradeDefaults = {
    plumbing: { small: 550, mid: 1200, major: 2400, value: 850 },
    bathrooms: { small: 260, mid: 700, major: 1400, value: 5500 },
    landscaping: { small: 360, mid: 950, major: 1800, value: 3200 },
    builders: { small: 220, mid: 520, major: 1100, value: 12000 },
    roofing: { small: 300, mid: 850, major: 1700, value: 3800 },
    driveways: { small: 240, mid: 650, major: 1250, value: 6000 },
    electricians: { small: 400, mid: 1050, major: 2100, value: 650 },
  };

  const roiOutputs = {
    closeRate: document.querySelector('[data-roi-output="closeRate"]'),
    jobValue: document.querySelector('[data-roi-output="jobValue"]'),
    margin: document.querySelector('[data-roi-output="margin"]'),
    lifetime: document.querySelector('[data-roi-output="lifetime"]'),
    searches: document.querySelector('[data-roi-result="searches"]'),
    calls: document.querySelector('[data-roi-result="calls"]'),
    jobs: document.querySelector('[data-roi-result="jobs"]'),
    revenue: document.querySelector('[data-roi-result="revenue"]'),
    profit: document.querySelector('[data-roi-result="profit"]'),
    netProfit: document.querySelector('[data-roi-result="netProfit"]'),
    roi: document.querySelector('[data-roi-result="roi"]'),
    roiBar: document.querySelector('[data-roi-result="roiBar"]'),
  };

  const money = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  });

  const number = new Intl.NumberFormat('en-GB', {
    maximumFractionDigits: 0,
  });

  function setText(selector, value) {
    const el = document.querySelector(selector);
    if (el) el.textContent = value;
  }

  function formatLifetime(value) {
    const years = Number(value);
    return years === 1 ? '1 yr' : years.toFixed(years % 1 ? 1 : 0) + ' yrs';
  }

  function syncRangeProgress(input) {
    if (!input || input.type !== 'range') return;
    const min = Number(input.min || 0);
    const max = Number(input.max || 100);
    const val = Number(input.value || 0);
    const pct = ((val - min) / (max - min)) * 100;
    input.style.setProperty('--range-progress', pct + '%');
  }

  function updateJobValueFromTrade() {
    if (!roiInputs.trade || !roiInputs.jobValue) return;
    const trade = roiInputs.trade.value;
    const nextValue = tradeDefaults[trade]?.value;
    if (nextValue) roiInputs.jobValue.value = nextValue;
  }

  function updateRoi() {
    if (!roiInputs.trade || !roiInputs.area || !roiInputs.closeRate || !roiInputs.jobValue) return;

    const trade = roiInputs.trade.value;
    const area = roiInputs.area.value;
    const monthlySearches = tradeDefaults[trade]?.[area] || 1000;
    const closeRate = Number(roiInputs.closeRate.value);
    const jobValue = Number(roiInputs.jobValue.value);
    const margin = Number(roiInputs.margin?.value || 35);
    const lifetime = Number(roiInputs.lifetime?.value || 1);

    const topThreeClicks = monthlySearches * 0.28;
    const capturedTraffic = topThreeClicks * 0.1;
    const callsGenerated = capturedTraffic * 0.35;
    const bufferedCalls = callsGenerated * 0.85;
    const jobs = Math.max(1, Math.round(bufferedCalls * (closeRate / 100)));
    const monthlyRevenue = jobs * jobValue * lifetime;
    const monthlyProfit = monthlyRevenue * (margin / 100);
    const setupFee = 1997;
    const monthlyFee = 497;
    const annualInvestment = setupFee + monthlyFee * 12;
    const netProfit = monthlyProfit * 12 - annualInvestment;
    const roi = annualInvestment > 0 ? (netProfit / annualInvestment) * 100 : 0;

    if (roiOutputs.closeRate) roiOutputs.closeRate.textContent = closeRate + '%';
    if (roiOutputs.jobValue) roiOutputs.jobValue.textContent = money.format(jobValue);
    if (roiOutputs.margin) roiOutputs.margin.textContent = margin + '%';
    if (roiOutputs.lifetime) roiOutputs.lifetime.textContent = formatLifetime(lifetime);
    if (roiOutputs.searches) roiOutputs.searches.textContent = number.format(monthlySearches);
    if (roiOutputs.calls) roiOutputs.calls.textContent = number.format(Math.round(bufferedCalls));
    if (roiOutputs.jobs) roiOutputs.jobs.textContent = number.format(jobs);
    if (roiOutputs.revenue) roiOutputs.revenue.textContent = money.format(monthlyRevenue);
    if (roiOutputs.profit) roiOutputs.profit.textContent = money.format(monthlyProfit);
    if (roiOutputs.netProfit) roiOutputs.netProfit.textContent = money.format(netProfit);
    if (roiOutputs.roi) roiOutputs.roi.textContent = Math.round(roi).toLocaleString('en-GB') + '%';
    if (roiOutputs.roiBar) roiOutputs.roiBar.style.width = Math.max(4, Math.min(100, roi / 30)) + '%';

    setText('[data-roi-breakdown="searches"]', number.format(monthlySearches));
    setText('[data-roi-breakdown="clicks"]', number.format(Math.round(topThreeClicks)) + ' visits');
    setText('[data-roi-breakdown="share"]', number.format(Math.round(capturedTraffic)) + ' visitors');
    setText('[data-roi-breakdown="calls"]', number.format(Math.round(callsGenerated)) + ' calls');
    setText('[data-roi-breakdown="buffered"]', number.format(Math.round(bufferedCalls)) + ' calls');
    setText('[data-roi-breakdown="jobs"]', number.format(jobs));
    setText('[data-roi-breakdown="multiplier"]', formatLifetime(lifetime));
    setText('[data-roi-breakdown="revenue"]', money.format(monthlyRevenue));
    setText('[data-roi-breakdown="profit"]', money.format(monthlyProfit));
    setText('[data-roi-breakdown="investment"]', money.format(annualInvestment));
    setText('[data-roi-breakdown="netProfit"]', money.format(netProfit));

    Object.values(roiInputs).forEach(syncRangeProgress);
  }

  Object.values(roiInputs).forEach((input) => {
    if (input) input.addEventListener('input', updateRoi);
  });
  if (roiInputs.trade) {
    roiInputs.trade.addEventListener('change', () => {
      updateJobValueFromTrade();
      updateRoi();
    });
  }
  updateJobValueFromTrade();
  updateRoi();
})();
