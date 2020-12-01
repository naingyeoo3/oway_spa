export const groupByCountryName = (flights) => {                
    const groupBy = key => array =>
        array.reduce((objectsByKeyValue, obj) => {
            const value = obj[key];
            objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
            return objectsByKeyValue;
        }, {});
    
    const countryName = groupBy('countryName');        

    var json = JSON.stringify({ flightSearch : countryName(flights)},null,2);

    var res = JSON.parse(json).flightSearch;        
    var sin_arr = [];
    if(res.Singapore){
      sin_arr[0] = ["Singapore",res.Singapore];
    }    
    var arr = [];    
    for(var i in res){      
      // if popular country is in results, set to the top
        if(i == 'Myanmar'){
          arr.unshift([i, res[i]])
        }else if(i == 'Thailand'){
          arr.unshift([i, res[i]])
        }else if(i == 'Australia'){
          arr.unshift([i, res[i]])        
        }else if(i == 'Indonesia'){
          arr.unshift([i, res[i]])
        }else if(i == 'India'){
          arr.unshift([i, res[i]])
        }else if(i == 'Cambodia'){
          arr.unshift([i, res[i]])
        }else if(i == 'Singapore'){
          // arr.unshift([i, res[i]])
        }else{
          arr.push([i, res[i]])

        }        
    }      
    if(sin_arr.length > 0){
      return sin_arr.concat(arr);
    }else{      
      return arr;
    }    
  }

export  const placeholderData = [
    [
        'Myanmar',
        [
            { 
                id       : 1,
                searchName    : 'Yangon',
                keyword  : 'RGN',
                data_type: 'Yangon (RGN)'
            }, 
            { 
                id       : 2,
                searchName    : 'Mandalay',
                keyword  : 'MDL',
                data_type: 'Mandalay (MDL)'
            }, 
            {
                id       : 3,
                searchName    : 'Nay Pyi Taw',
                keyword  : 'NYT',
                data_type: 'Nay Pyi Taw (NYT)'
            }, 
            { 
                id       : 4,
                searchName    : 'Bagan (Nyaung-U)',
                keyword  : 'NYU',
                data_type: 'Bagan (Nyaung-U) (NYU)'
            }, 
            { 
                id       : 5,
                searchName    : 'Ngapali (Thandwe)',
                keyword  : 'SNW',
                data_type: 'Ngapali (Thandwe) (SNW)'
            }, 
            {
                id       : 6,
                searchName    : 'Inle (Heho)',
                keyword  : 'HEH',
                data_type: 'Inle (Heho) (HEH)'
            }, 
            { 
                id       : 7,
                searchName    : 'Sittwe',
                keyword  : 'AKY',
                data_type: 'Sittwe (AKY)'
            }, 
            { 
                id       : 8,
                searchName    : 'Myeik',
                keyword  : 'MGZ',
                data_type: 'Myeik (MGZ)'
            },
            {
                id       : 9,
                searchName    : 'Myitkyina',
                keyword  : 'MYT',
                data_type: 'Myitkyina (MYT)'
            }
        ]
    ],
    [
        'Asia',
        [
            { 
                id       : 1,
                searchName    : 'Bangkok',
                keyword  : 'BKK',
                data_type: 'Bangkok (BKK)'
            }, 
            { 
                id       : 2,
                searchName    : 'Singapore',
                keyword  : 'SIN',
                data_type: 'Singapore (SIN)'
            }, 
            {
                id       : 3,
                searchName    : 'Kuala Lumpur',
                keyword  : 'KUL',
                data_type: 'Kuala Lumpur (KUL)'
            }, 
            {
                id       : 4,
                searchName    : 'Seoul',
                keyword  : 'ICN',
                data_type: 'Seoul (ICN)'
            }, 
            {
                id       : 5,
                searchName    : 'Ho Chi Minh City',
                keyword  : 'SGN',
                data_type: 'Ho Chi Minh City (SGN)'
            }, 
            {
                id       : 6,
                searchName    : 'Kunming',
                keyword  : 'KMG',
                data_type: 'Kunming (KMG)'
            },
            {
                id       : 7,
                searchName    : 'Doha',
                keyword  : 'DOH',
                data_type: 'Doha (DOH)'
            },
            {
                id       : 8,
                searchName    : 'Dubai',
                keyword  : 'DXB',
                data_type: 'Dubai (DXB)'
            },
            {
                id       : 9,
                searchName    : 'Phnom Penh',
                keyword  : 'PNH',
                data_type: 'Phnom Penh (PNH)'
            }          
        ]
    ],
    [
        'Europe',
        [
            {
                id       : 1,
                searchName    : 'London',
                keyword  : 'LHR',
                data_type: 'London (LHR)'
            }, 
            {
                id       : 2,
                searchName    : 'Frankfurt',
                keyword  : 'FRA',
                data_type: 'Frankfurt (FRA)'
            }, 
            {
                id       : 3,
                searchName    : 'Berlin',
                keyword  : 'TXL',
                data_type: 'Berlin (TXL)'
            }, 
            {
                id       : 4,
                searchName    : 'Paris',
                keyword  : 'CDG',
                data_type: 'Paris (CDG)'
            }, 
            {
                id       : 5,
                searchName    : 'Madrid',
                keyword  : 'MAD',
                data_type: 'Madrid (MAD)'
            },             
            {
                id       : 6,
                searchName    : 'Rome',
                keyword  : 'FCO',
                data_type: 'Rome (FCO)'
            }
        ]
    ],
    [
        'Other Destinations',
        [            
            {
                id       : 1,
                searchName    : 'Tokyo',
                keyword  : 'NRT',
                data_type: 'Tokyo (NRT)'
            }, 
            {
                id       : 2,
                searchName    : 'Hong Kong',
                keyword  : 'HKG',
                data_type: 'Hong Kong (HKG)'
            }, 
            {
                id       : 3,
                searchName    : 'Beijing',
                keyword  : 'PEK',
                data_type: 'Beijing (PEK)'
            }, 
            {
                id       : 4,
                searchName    : 'Chengdu',
                keyword  : 'CTU',
                data_type: 'Chengdu (CTU)'
            }, 
            {
                id       : 5,
                searchName    : 'Noibai Intl',
                keyword  : 'HAN',
                data_type: 'Noibai Intl (HAN)'
            }, 
            {
                id       : 6,
                searchName    : 'Netaji Subhash Chandra Bose Intl',
                keyword  : 'CCU',
                data_type: 'Netaji Subhash Chandra Bose Intl (CCU)'
            }, 
            {
                id       : 7,
                searchName    : 'Bali Ngurah Rai',
                keyword  : 'DPS',
                data_type: 'Bali Ngurah Rai (DPS)'
            }, 
            {
                id       : 8,
                searchName    : 'Siem Reap',
                keyword  : 'REP',
                data_type: 'Siem Reap (REP)'
            }, 
            {
                id       : 8,
                searchName    : 'Indira Gandhi Intl',
                keyword  : 'DEL',
                data_type: 'Indira Gandhi Intl (DEL)'
            }
        ]
    ]                        
]