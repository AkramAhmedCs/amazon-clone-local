import { formatMoney } from "../../scripts/utils/money.js";
//to create a test suite use describe
describe('test suite : format currency',()=>{
  //to create a test use it()
  it('converts cents into dollars ',()=>{
    //expect lets u compare 2 values to each other
    expect(formatMoney(2095)).toEqual('20.95');
  }
  )
  it('works with zero', ()=>{
    expect(formatMoney(0)).toEqual('0.00')
  })
  it('rounds up to the nearest cent',()=>{
    expect(formatMoney(2000.5)).toEqual('20.01')
  })
  it('rounds down to the nearest cent',()=>{
    expect(formatMoney(2000.4)).toEqual('20.00')
  })
  it('tests a negative number ',()=>{
    expect(formatMoney(-2000.5)).toEqual('-20.00')
  })
})
