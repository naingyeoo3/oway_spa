import { departureTimeRange } from './constants';

export function setFlightNamesForFilter(flights) {
    let airlineArrays = [];
    let lookup = {}
    flights.map(flight => {
        let flightname = flight.route[0].carrier.airlineName;
        if (!(flightname in lookup)) {
            lookup[flightname]= 1;              
            airlineArrays.push(
                {
                    name: flight.route[0].carrier.airlineName,
                    currency: flight.rates.deal.currencyCode,
                    price : flight.rates.deal.total.base
                }); 
        }
    })
    return airlineArrays;
}
export function setFlightClassesForFilter(flights) {
    let classArrays = [];
    flights.map(flight => {
        classArrays.push(flight.route[0].class);
    })
    if (flights.length === classArrays.length)
        return Array.from(new Set(classArrays));
}

export function setStopsForFilter(flights) {
    let steps = [];
    flights.map(flight => {
        switch (flight.route.length) {
            case 1: steps.push({ name: 'Non Stop', value: 0 }); break;
            case 2: steps.push({ name: '1 Stop', value: 1 }); break;
            case 3: steps.push({ name: '2 Stops', value: 2 }); break;
            case 4: steps.push({ name: '3 Stops', value: 3 }); break;
        }
    })
    if (flights.length === steps.length) {
        return removeDuplicates(steps, 'name');

    }

}

export function removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
}

export const checkAllFilter = (filterType) => filterType.stops.length == 0 && filterType.airlineNames.length == 0 && filterType.classes.length == 0 && filterType.classes.length == 0 && filterType.depart.length == 0


export function calculatePagination (list,per_page){
    let total_page = Math.ceil(list.length/per_page);
    let paginatedList = (list.length > per_page)? list.slice(0,5) : list

    return {
        total_page,
        paginatedList
    }

}

export function sortByAirlinesHelper(filteredList,type){
    if (type === 0){
        return filteredList.sort((a, b) => (a.route[0].carrier.airlineName > b.route[0].carrier.airlineName) ? 1 : -1);
    }else{
        return filteredList.sort((a, b) => (a.route[0].carrier.airlineName < b.route[0].carrier.airlineName) ? 1 : -1);
    }
}
export function sortByDurationHelper(filteredList, type){
    if (type === 0){
            return filteredList.sort((a, b) => (a.totalDuration < b.totalDuration) ? 1 : -1);
        }else{
            return filteredList.sort((a, b) => (a.totalDuration > b.totalDuration) ? 1 : -1);
        }
}

export function sortByDepartHelper(filteredList, type){
    if (type === 0){
        return filteredList.sort((a, b) => (a.route[0].departure.departureTime < b.route[0].departure.departureTime) ? 1 : -1);
    }else{
        return filteredList.sort((a, b) => (a.route[0].departure.departureTime > b.route[0].departure.departureTime) ? 1 : -1);
    }
}
export function sortByArrivalHelper(filteredList, type){
    if(type === 0){
        filteredList.sort((a, b) => {
            let firstArrival = [...a.route].pop().arrival;
            let secondArrival = [...b.route].pop().arrival;
            return (compareDateString(firstArrival.arrivalDate, secondArrival.arrivalDate, '<') === 0) ? 
                    ((firstArrival.arrivalTime < secondArrival.arrivalTime) ? 1 : -1) : -1;
        })        
    }else{
        filteredList.sort((a, b) => {
            let firstArrival = [...a.route].pop().arrival;
            let secondArrival = [...b.route].pop().arrival;
            return (compareDateString(firstArrival.arrivalDate, secondArrival.arrivalDate, '>') === 0) ? 
                ((firstArrival.arrivalTime > secondArrival.arrivalTime) ? 1 : -1) : -1
        })
    }    
}
export function sortByPriceHelper(filteredList, type){
    if(type === 0){
        return filteredList.sort((a,b)=> (a.rates.deal.total.base > b.rates.deal.total.base)? 1:-1);
    }else{
        return filteredList.sort((a,b)=> (a.rates.deal.total.base < b.rates.deal.total.base)? 1:-1);  
    }
}
export function compareDateString(firstDate,secondDate, operator) {
    let date1 = new Date(firstDate).getTime();
    let date2 = new Date(secondDate).getTime();
    switch (operator) {
        case ">": return (date1 > date2) ? 1 : (date1 === date2) ? 0 : -1;
        case "<": return (date1 < date2) ? -1 : (date1 === date2) ? 0 : 1;
    }
}

export function filterFlightListingOutwards(listingData,filterBy){
    let filteredData = [];
    !!filterBy.airlineNames.length > 0 ? filteredData = filterByAirlineName(listingData,filteredData,filterBy) : filteredData; 
    !!filterBy.price != 0 ? filteredData = filterByPrice(listingData,filteredData,filterBy) : filteredData;
    !!filterBy.stops.length > 0 ? filteredData = filterByStops(listingData,filteredData,filterBy) : filteredData;
    !!filterBy.classes.length > 0 ? filteredData = filterByClasses(listingData,filteredData,filterBy) : filteredData;
    !!filterBy.depart.length > 0 ? filteredData = filterByDepartureTime(listingData,filteredData,filterBy) : filteredData;  
    return filteredData;
}

export function filterByPrice(data,filteredData,filterBy) {
    return (filteredData.length > 0)?
            filteredData.filter(
            (flight) => flight.rates.deal.total.base < Number(filterBy.price)
            )
            :
            data.filter(
                (flight) => flight.rates.deal.total.base < Number(filterBy.price)
                )

}

export function filterByStops(data,filteredData,filterBy) {
 return   (filteredData.length > 0)?
     filteredData.filter(
        (flight) => filterBy.stops
            .includes(String(flight.route.length - 1)))
     :
     data.filter(
        (flight) => filterBy.stops
            .includes(String(flight.route.length - 1)))
            
}

export function filterByAirlineName(data,filteredData,filterBy) {
   return (filteredData.length > 0)?
     filteredData.filter(
        (flight) => {
            return filterBy.airlineNames
                .includes(flight.route[0].carrier.airlineName)
        }
    )
    :
     data.filter(
        (flight) => {
            return filterBy.airlineNames
                .includes(flight.route[0].carrier.airlineName)
        }
    )
}
export function filterByClasses(data,filteredData,filterBy) {
    return (filteredData.length > 0)?
          filteredData.filter(
            (flight) => {
                return filterBy.classes
                    .includes(flight.route[0].class);
             }
          )
        :
         data.filter(
            (flight) => {
                return filterBy.classes
                    .includes(flight.route[0].class);
            }
        )
}
export function filterByDepartureTime(data,filteredData,filterBy) {
   return (filteredData.length > 0)?
        filteredData.filter(
        (flight) => {
            const departureTime = changeTimeToDayPeriod(flight.route[0].departure.departureTime);            
            return filterBy.depart.includes(departureTime);                
        }
        )
      :
      data.filter(
        (flight) => {
            const departureTime = changeTimeToDayPeriod(flight.route[0].departure.departureTime);           
            return filterBy.depart.includes(departureTime);                
        }
        ) 
}
export function changeTimeToDayPeriod(departureTime) {
    let hourMinArray = departureTime.split(':');
    let departureHour = parseInt(hourMinArray[0]);
    for (let i = 0; i < departureTimeRange.length; i++) {
        if (departureHour >= departureTimeRange[i].start && departureHour < departureTimeRange[i].end)
            return departureTimeRange[i].name;
    }
    return undefined;
}