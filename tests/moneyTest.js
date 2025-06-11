import { formatMoney } from "../scripts/utils/money.js";

console.log('test suite : format currency')
console.log('converts cents to dollars')
if(formatMoney(2095)==='20.95'){
  console.log('passed')
}
else{console.log('failed')

}

console.log('works with zero')
if(formatMoney(0)==='0.00'){
  console.log('passed');
}
else{
  console.log('failed')
}
console.log('rounds up to the nearest cent')
if(formatMoney(2000.5)==='20.01'){
  console.log('passed');
}
else{
  console.log('failed')
}