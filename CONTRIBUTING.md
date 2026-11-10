# Contributing

Bug reports should include inputs, actual output, expected output and a reproducible calculation supporting the expectation. Please state rate compounding and settlement assumptions.

For changes, keep the calculation engine separate from display logic. Add a meaningful test for a calculation change and run `node --test tests/finance.test.cjs`. Check both calculator modes, examples, CSV export, keyboard controls and narrow screens. Do not round intermediate calculations.

Useful next contributions: dated settlement and accrued interest, keyboard-readable chart data, clearer comparisons of nominal and effective rates, and independent worked-example checks. Discuss larger features before implementing them.

Use original or appropriately licensed material. Explain any new dependencies. Keep contributions respectful and beginner-friendly.
