export function sortPriceAceHelper(data){
    return data.sort(function(val1, val2){ return val1.rates[0].deal.adult.base - val2.rates[0].deal.adult.base})
}
export function sortPriceDecHelper(data){
    return data.sort(function(val1, val2){ return val2.rates[0].deal.adult.base - val1.rates[0].deal.adult.base})
}
export function sortDiscountAceHelper(data){    
    return data.sort(function(val1, val2){ return val1.rates[0].deal.adult.discount - val2.rates[0].deal.adult.discount})
}
export function sortDiscountDecHelper(data){
    return data.sort(function(val1, val2){ return val2.rates[0].deal.adult.discount - val1.rates[0].deal.adult.discount})
}
export function sortRecommedAceHelper(data){
    return data.sort(function(val1, val2){ return val1.status.weight - val2.status.weight})
}
export function sortRecommedDecHelper(data){
    return data.sort(function(val1, val2){ return val2.status.weight - val1.status.weight})
}