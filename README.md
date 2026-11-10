# BondLab

A small, MIT-licensed bond learning tool. Change assumptions, inspect cash flows and understand how yield affects value.

## Run
Open `dist/index.html` in a modern browser. No installation, account, API key or internet connection is required. Alternatively, run `python3 -m http.server 8000 --directory dist` and open http://localhost:8000.

## Features
- Price from yield, or yield from market price
- Annual, semiannual, quarterly and monthly coupons
- Macaulay duration, modified duration and convexity
- Price/yield curve and yield-shock comparisons
- Transparent payment-by-payment workings and CSV export
- Original discount, premium and zero-coupon examples

## Check the calculations
Install Node.js (18 or later), then run `node --test tests/finance.test.cjs`.
Tests check par value, an independent annuity formula, zero-yield and zero-coupon limits, solver recovery across payment frequencies and negative yields, finite-difference duration and convexity, invalid inputs, and price monotonicity.

## Model conventions
Face value and price use the same arbitrary currency unit. Yield and coupon inputs are annual percentage rates; yield is nominal, compounded at coupon frequency m. Maturity must contain a whole number of payment periods. Valuation is immediately after a coupon payment on a coupon date. Accrued interest is zero, so clean and dirty prices coincide.

For N periods, coupon C = face × annual coupon / m and periodic yield r = annual yield / m (rates expressed as decimals). Price = sum of CF_t / (1+r)^t. The final cash flow includes principal. Macaulay duration = sum((t/m) × PV_t) / price. Modified duration = Macaulay duration / (1+r). Convexity = sum(t(t+1) × PV_t) / (price × m² × (1+r)²). Yield is solved by bisection.

This is a deterministic classroom model. It does not model settlement calendars, day counts, accrued interest between coupons, credit events, floating coupons, calls, transaction costs or a term structure. Duration is a local approximation, not an exact prediction. Extreme inputs can exceed floating-point limits. The UI price-input yield range is −50% to 100%; the yield solver can return rates outside that range.

## Project structure
- `dist/finance.js`: dependency-free calculation engine, usable in browser or Node
- `dist/app.js`: UI and chart interactions
- `dist/index.html` / `style.css`: accessible, responsive static interface
- `tests/finance.test.cjs`: numerical regression checks

## Contributing
See CONTRIBUTING.md. Original examples only; do not upload course slides, proprietary data or copyrighted teaching materials.

## Current status
Version 0.1: working initial prototype. No claims of users, adoption, external contributors or educational impact are made. Public GitHub publication and student feedback are next steps, not completed milestones. This project is not affiliated with Anthropic, NUS or any course.

## License
MIT, see LICENSE.
