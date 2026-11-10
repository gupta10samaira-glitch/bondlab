const {test}=require('node:test');const assert=require('node:assert/strict');const {value,ytm}=require('../dist/finance.js');const b={face:1000,coupon:5,years:5,frequency:2};const near=(a,b,t=1e-8)=>assert.ok(Math.abs(a-b)<t,`${a} != ${b}`);
test('par at matching coupon and yield',()=>near(value(b,5).price,1000));
test('independent annuity valuation',()=>near(value(b,6).price,25*(1-1.03**-10)/.03+1000*1.03**-10));
test('zero yield equals undiscounted cash flows',()=>near(value(b,0).price,1250));
test('zero coupon closed form and duration',()=>{const z={...b,coupon:0};near(value(z,6).price,1000/1.03**10);near(value(z,6).duration,5);});
test('yield solver round trips including negative yields',()=>{for(const f of [1,2,4,12])for(const y of [-2,0,4,12]){const a={...b,frequency:f};near(ytm(a,value(a,y).price),y);}});
test('duration and convexity match numerical derivatives',()=>{const v=value(b,6),h=.0001,up=value(b,6+h*100).price,down=value(b,6-h*100).price;near(-(up-down)/(2*h*v.price),v.modified,1e-5);near((up-2*v.price+down)/(h*h*v.price),v.convexity,1e-5);});
test('reject invalid maturity, face, price and frequency',()=>{assert.throws(()=>value({...b,years:1.2},6));assert.throws(()=>value({...b,face:0},6));assert.throws(()=>ytm(b,0));assert.throws(()=>value({...b,frequency:3},6));});
test('price falls with yield; PV sum equals price',()=>{const v=value(b,6);assert.ok(value(b,7).price<v.price);near(v.flows.reduce((s,f)=>s+f.pv,0),v.price);});
