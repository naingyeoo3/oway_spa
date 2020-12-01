import { departureTimeRange } from './constants';


export function calculatePagination (list,per_page){
    let total_page = Math.ceil(list.length/per_page);
    let paginatedList = (list.length > per_page)? list.slice(0,5) : list

    return {
        total_page,
        paginatedList
    }

}

export function setBusClassesForFilter(buses){
    let classesArray = [];
    buses.map(bus=> 
        classesArray.push(bus.seatType)
    );
    if(buses.length === classesArray.length)
    return Array.from(new Set(classesArray));
    
}

export function setOperatorFilter(buses){
    let operatorArray = [];
    buses.map(bus=>
          operatorArray.push(bus.busName)
        )
    if(buses.length === operatorArray.length)
    return Array.from(new Set(operatorArray));
    
}




export function setAmenitiesFilter(buses){
    let amenitiesArray = [];
    buses.map(bus =>{
                
                (bus.amenities) ? 
                    bus.amenities.map(amenity => {
                        if(!amenitiesArray.includes(amenity))
                        amenitiesArray.push(amenity)    
                        }):
                    undefined;    

            }
        )
    return amenitiesArray;  
}

export function sortByBusExpressNameHelper(filteredList,type){
   if(type === 0){
       return filteredList.sort((a,b)=> (a.busName > b.busName)? 1 : -1)
   }
   else{
    return filteredList.sort((a,b)=> (a.busName < b.busName)? 1 : -1)
   }
}

export function sortByBusPriceHelper(filteredList,type){
    if(type === 0){
        return filteredList.sort((a,b)=> (a.rates.deal.adult.base > b.rates.deal.adult.base)? 1 : -1)
    }
    else {
        return filteredList.sort((a,b)=> (a.rates.deal.adult.base < b.rates.deal.adult.base)? 1 : -1)
    }
}

export function sortByBusDurationHelper(filteredList,type){
    if(type === 0){
        return filteredList.sort((a,b)=>(a.durationForSort > b.durationForSort)? 1 :-1)
    }
    else {
        return filteredList.sort((a,b)=>(a.durationForSort < b.durationForSort)? 1:-1)
    }
}

export function sortByBusArrivalHelper(filteredList,type){
    if(type === 0){
       return  filteredList.sort((a,b)=>(a.arrivalTime > b.arrivalTime)? 1 : -1)
    }
    else {
        return  filteredList.sort((a,b)=>(a.arrivalTime < b.arrivalTime)? 1 : -1)
    }
}

export function sortByBusDeptHelper(filteredList,type){
    if(type === 0){
       return  filteredList.sort((a,b)=>(a.depatureTime > b.depatureTime)? 1 : -1)
    }
    else {
        return  filteredList.sort((a,b)=>(a.depatureTime < b.depatureTime)? 1 : -1)
    }
}

export function filterBusListing(listingData,filterBy){
    let filteredData = []; 
    !!filterBy.price != 0 ? filteredData = filterByBusPrice(listingData,filteredData,filterBy) : filteredData;
    !!filterBy.amenities.length > 0 ? filteredData = filterByBusAmenities(listingData,filteredData,filterBy) : filteredData;
    !!filterBy.classes.length > 0 ? filteredData = filterByBusClasses(listingData,filteredData,filterBy) : filteredData;
    !!filterBy.operators.length > 0 ? filteredData = filterByBusOperators(listingData,filteredData,filterBy) : filteredData;
    !!filterBy.depts.length > 0 ? filteredData = filterByBusDept(listingData,filteredData,filterBy) : filteredData;  
    return filteredData;
}

export function filterByBusDept(data,filteredData,filterBy){
    return (filteredData.length === 0)?
        data.filter(
        (bus) => {
            const departureTime = changeTimeToDayPeriod(bus.departureTime);            
            return filterBy.depts.includes(departureTime);                
        }
        )
      :
      filteredData.filter(
        (bus) => {
            const departureTime = changeTimeToDayPeriod(bus.departureTime);          
            return filterBy.depts.includes(departureTime);                
        }
        ) 

}

export const checkAllFilter = (filterType) => filterType.classes.length == 0 && filterType.operators.length == 0 && filterType.depts.length == 0 && filterType.amenities.length == 0 && filterType.price == 0

export function filterByBusPrice(data,filteredData,filterBy){
    return (filteredData.length > 0)?
    filteredData.filter(
    (bus) => bus.rates.deal.adult.base < Number(filterBy.price)
    )
    :
    data.filter(
        (bus) => bus.rates.deal.adult.base < Number(filterBy.price)
        )
}
export function filterByBusClasses(data,filteredData,filteredBy){
    return (filteredData.length === 0 )?
            data.filter(
                (bus)=> filteredBy.classes.includes(bus.seatType)
            ) 
            :
            filteredData.filter(
                (bus)=> filteredBy.classes.includes(bus.seatType)
            )
    
}

export function filterByBusOperators(data,filteredData,filteredBy){
    return (filteredData.length === 0)?
            data.filter(
                (bus)=> filteredBy.operators.includes(bus.busName)
            )
            :
            filteredData.filter(
                (bus)=> filteredBy.operators.includes(bus.busName)
            )

}

export function filterByBusAmenities(data,filteredData,filteredBy){
    return (filteredData.length === 0)?
            data.filter(
                (bus)=>  (bus.amenities)? bus.amenities.some(b=> filteredBy.amenities.includes(b)) : false
            )
            :
            filteredData.filter(
                (bus)=>  (bus.amenities)? bus.amenities.some(b=> filteredBy.amenities.includes(b)) : false
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
