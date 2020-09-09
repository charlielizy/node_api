const fs = require('fs'),
  csvParser = require('csv-parser'),
  promise = require('promise'),
  hl = require('highland');

// read as strean
const stream = fs.createReadStream('sample-data.csv').pipe(csvParser());
const header = {
  TR: 'Total Revenue',
  TC: 'Total Cost',
  TP: 'Total Profit',
  IT: 'ItemTypes',
  CN: 'Countries',
  RA: 'Regions',
};

const mapRegions = new Map(),  //store data after transform
  mapAllItemTypes = new Map(),
  mapYears = new Map(),
  regionObj = {}; //store data after transform as object

const csvModel = function () {
  return new promise(function (resolve, reject) {
    hl(stream)
      .on('data', (data) => {
        // construct map for region
        const region = data.Region;
        const country = data.Country;
        const type = data['Item Type'];

        const tr = parseFloat(data['Total Revenue']);
        const tc = parseFloat(data['Total Cost']);
        const tp = parseFloat(data['Total Profit']);

        const year = data['Order Date'].split('/')[2];
        const month = data['Order Date'].split('/')[0];
        const op = data['Order Priority'];
        const od = data['Order Date'];
        const sd = data['Ship Date'];

        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        const firstDate = new Date(od);
        const secondDate = new Date(sd);
        const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

        const collectionRegion = mapRegions.get(region);
        if (!collectionRegion) {
          const mapRegion = new Map();
          const mapCountries = new Map();
          const mapCountry = new Map();
          const mapTypes = new Map();
          const mapType = new Map();

          mapRegions.set(region, mapRegion);
          mapRegion.set(header.CN, mapCountries);
          mapRegion.set(header.TR, tr)
          mapRegion.set(header.TC, tc);
          mapRegion.set(header.TP, tp);

          mapCountries.set(country, mapCountry)
          mapCountry.set(header.TR, tr)
          mapCountry.set(header.TC, tc)
          mapCountry.set(header.TP, tp)
          mapCountry.set(header.IT, mapTypes)

          mapTypes.set(type, mapType)
          mapType.set(header.TR, tr)
          mapType.set(header.TC, tc)
          mapType.set(header.TP, tp)

        } else {
          const collectionCountry = collectionRegion.get(header.CN).get(country);
          if (!collectionCountry) {
            const mapCountry = new Map();
            const mapTypes = new Map();
            const mapType = new Map();

            collectionRegion.get(header.CN).set(country, mapCountry);
            mapCountry.set(header.TR, tr);
            mapCountry.set(header.TC, tc);
            mapCountry.set(header.TP, tp);
            mapCountry.set(header.IT, mapTypes);

            mapTypes.set(type, mapType);
            mapType.set(header.TR, tr);
            mapType.set(header.TC, tc);
            mapType.set(header.TP, tp);

          } else {
            const collectionType = collectionCountry.get(header.IT).get(type)
            if (!collectionType) {
              const mapType = new Map();

              mapType.set(header.TR, tr);
              mapType.set(header.TC, tc);
              mapType.set(header.TP, tp);
              collectionCountry.get(header.IT).set(type, mapType)
            } else {
              collectionType.set(header.TR, collectionCountry.get(header.TR) + tr);
              collectionType.set(header.TC, collectionCountry.get(header.TC) + tc);
              collectionType.set(header.TP, collectionCountry.get(header.TP) + tp);
              collectionCountry.get(header.IT).set(type, collectionType);

            }
            collectionCountry.set(header.TR, collectionCountry.get(header.TR) + tr);
            collectionCountry.set(header.TC, collectionCountry.get(header.TC) + tc);
            collectionCountry.set(header.TP, collectionCountry.get(header.TP) + tp);
            collectionRegion.get(header.CN).set(country, collectionCountry);

          }
          collectionRegion.set(header.TR, collectionRegion.get(header.TR) + tr);
          collectionRegion.set(header.TC, collectionRegion.get(header.TC) + tc);
          collectionRegion.set(header.TP, collectionRegion.get(header.TP) + tp);
          mapRegions.get(region).set(region, collectionRegion);
        }

        // construct map for item type
        const collectionAllItemType = mapAllItemTypes.get(type);
        if (!collectionAllItemType) {
          const mapItemType = new Map();

          mapItemType.set(header.TR, tr)
          mapItemType.set(header.TC, tc);
          mapItemType.set(header.TP, tp);
          mapAllItemTypes.set(type, mapItemType);
        } else {
          collectionAllItemType.set(header.TR, collectionAllItemType.get(header.TR) + tr);
          collectionAllItemType.set(header.TC, collectionAllItemType.get(header.TC) + tc);
          collectionAllItemType.set(header.TP, collectionAllItemType.get(header.TP) + tp);
          mapAllItemTypes.get(type).set(type, collectionAllItemType);
        }

        // construct map for priority order
        const collectionYear = mapYears.get(year);//mapYears: years data
        if (!collectionYear) {
          const mapYear = new Map();
          const mapMonth = new Map();
          const mapRegions = new Map();
          const mapRegion = new Map();
          const mapCountries = new Map();
          const mapCountry = new Map();

          mapYears.set(year, mapYear);
          mapYear.set(month, mapMonth);
          mapMonth.set("Regions", mapRegions);
          mapRegions.set(region, mapRegion);
          mapRegion.set("Contries", mapCountries);
          mapCountries.set(country, mapCountry);

          mapMonth.set(op, 1);
          mapMonth.set('days', diffDays);
          mapMonth.set('count', 1);

          mapRegion.set('days', diffDays);
          mapRegion.set('count', 1);

          mapCountry.set('days', diffDays);
          mapCountry.set('count', 1);

        } else {
          const collectionMonth = collectionYear.get(month)
          if (!collectionMonth) {

          const mapMonth = new Map();
          const mapRegions = new Map();
          const mapRegion = new Map();
          const mapCountries = new Map();
          const mapCountry = new Map();

          collectionYear.set(month, mapMonth);
          mapMonth.set("Regions", mapRegions);
          mapRegions.set(region, mapRegion);
          mapRegion.set("Contries", mapCountries);
          mapCountries.set(country, mapCountry);
        
          mapMonth.set(op, 1);
          mapMonth.set('days', diffDays);
          mapMonth.set('count', 1);

          mapRegion.set('days', diffDays);
          mapRegion.set('count', 1);

          mapCountry.set('days', diffDays);
          mapCountry.set('count', 1);


          } else {
            
            const collectionRegion = collectionMonth.get("Regions").get(region)
            if (!collectionRegion) {
              const mapRegion = new Map();
              const mapCountries = new Map();
              const mapCountry = new Map();
    
              collectionMonth.get("Regions").set(region, mapRegion);
              mapRegion.set("Contries", mapCountries);
              mapCountries.set(country, mapCountry);

              collectionMonth.get(op) ? collectionMonth.set(op, collectionMonth.get(op) + 1) : collectionMonth.set(op, 1);
              collectionMonth.set('days', collectionMonth.get('days')  + diffDays);
              collectionMonth.set('count', collectionMonth.get('count') + 1);
    
              mapRegion.set('days', diffDays);
              mapRegion.set('count', 1);
    
              mapCountry.set('days', diffDays);
              mapCountry.set('count', 1);
    

            } else {
              const collectionCountry = collectionRegion.get("Contries").get(country);
              if (!collectionCountry) {

                const mapCountry = new Map();
                collectionRegion.get("Contries").set(country, mapCountry);
 
                collectionMonth.get(op) ? collectionMonth.set(op, collectionMonth.get(op) + 1) : collectionMonth.set(op, 1);
                collectionMonth.set('days', collectionMonth.get('days') + diffDays);
                collectionMonth.set('count', collectionMonth.get('count') + 1);
      
                collectionRegion.set('days', collectionRegion.get('days') + diffDays);
                collectionRegion.set('count', collectionRegion.get('count')  + 1);
      
                mapCountry.set('days', diffDays);
                mapCountry.set('count', 1);

              } else {

                collectionMonth.get(op) ? collectionMonth.set(op, collectionMonth.get(op) + 1) : collectionMonth.set(op, 1);
                collectionMonth.set('days', collectionMonth.get('days') + diffDays);
                collectionMonth.set('count', collectionMonth.get('count')  + 1);

                collectionRegion.set('days', collectionRegion.get('days') + diffDays);
                collectionRegion.set('count', collectionRegion.get('count')  + 1);

                collectionCountry.set('days', collectionCountry.get('days') + diffDays);
                collectionCountry.set('count', collectionCountry.get('count')  + 1);

              }
            }
          }
        }
      })
      .on('end', () => {
        resolve({ 'mapRegions': mapRegions, 'mapYears': mapYears });
      })
  });
};

var itemTypes = async function (queryRegion, queryCountry, queryType, queryGeneralType) {
  var csvModeles = await csvModel();
  const mapRegions = csvModeles['mapRegions'];
  var region = queryRegion.charAt(0).toUpperCase() + queryRegion.slice(1);
  var country = queryCountry.charAt(0).toUpperCase() + queryCountry.slice(1);
  var type = queryType.charAt(0).toUpperCase() + queryType.slice(1);
  var generaltype = queryGeneralType.charAt(0).toUpperCase() + queryGeneralType.slice(1);
  return new promise(function (resolve, reject) {
    try {
      const mapRegion = mapRegions.get(region);
      if (!mapRegion) {
        reject('invalid region or no record under the region');
        return;
      }
      const mapCountry = mapRegions.get(region).get(header.CN).get(country);
      if (!mapCountry) {
        reject('invalid country or no record under the country');
        return;
      }
      const mapType = mapRegions.get(region).get(header.CN).get(country).get(header.IT).get(type);
      if (!mapType) {
        reject('invalid type or no record under the type');
        return;
      }
      // All Regions
      regionObj[header.RA] = { [region]: { 'Total': { 'Revenue': mapRegion.get(header.TR).toFixed(2), 'Cost': mapRegion.get(header.TC).toFixed(2), 'Profit': mapRegion.get(header.TP).toFixed(2) } } };

      // all Countries
      const countryObj = {};
      countryObj[header.CN] = { [country]: { 'Total': { 'Revenue': mapCountry.get(header.TR).toFixed(2), 'Cost': mapCountry.get(header.TC).toFixed(2), 'Profit': mapCountry.get(header.TP).toFixed(2) } } };
      regionObj[header.RA][region][header.CN] = countryObj[header.CN];

      // all Types
      const typeObj = {};
      typeObj[header.IT] = { [type]: { 'Revenue': mapType.get(header.TR).toFixed(2), 'Cost': mapType.get(header.TC).toFixed(2), 'Profit': mapType.get(header.TP).toFixed(2) } };
      regionObj[header.RA][region][header.CN][country][header.IT] = typeObj[header.IT];

      const mapAllItemType = mapAllItemTypes.get(generaltype);
      if (!mapAllItemType) {
        reject("invalid argument 'generaltype'");
        return;
      }
      // all Item Types
      regionObj[header.IT] = { [generaltype]: { 'Revenue': mapAllItemType.get(header.TR).toFixed(2), 'Cost': mapAllItemType.get(header.TC).toFixed(2), 'Profit': mapAllItemType.get(header.TP).toFixed(2) } };
      resolve({ data: regionObj });
    } catch (err) {
      reject('data query error');
    }
  })
};

var orderPriorities = async function (queryYear, queryMonth) {
  var csvModeles = await csvModel();
  const mapYears = csvModeles['mapYears'];
  var year = queryYear;
  var month = queryMonth;
  var orderObj = {};

  return new promise(function (resolve, reject) {
    try {
      const mapYear = mapYears.get(year);
      if (!mapYear) {
        reject('invalid year or no record under the year'+ year);
        return;
      }
      const mapMonth = mapYears.get(year).get(month);
      if (!mapMonth) {
        reject('invalid month or no record under the month');
        return;
      }
      
      function strMapToObj(strMap) {
        let obj = Object.create(null);
        for (let [k,v] of strMap) {
          if(['M','L','H','C'].includes(k)) {
            obj[k] = v;
          }
        }
        return obj;
      }

      let objOP = strMapToObj(mapMonth);
      orderObj = { [year]: { [month]: objOP } };
      resolve({ data: orderObj });
    } catch (err) {
      reject('data query error');
    }
  })
};

var deliveryDays = async function (queryYear, queryMonth, queryRegion, queryCountry) {
  const csvModeles = await csvModel();
  const mapYears = csvModeles['mapYears'];

  var region = queryRegion.charAt(0).toUpperCase() + queryRegion.slice(1);
  var country = queryCountry.charAt(0).toUpperCase() + queryCountry.slice(1);
  var year = queryYear;
  var month = queryMonth;
  var orderObj = {};

  return new promise(function (resolve, reject) {
    try {
      const mapYear = mapYears.get(year);
      if (!mapYear) {
        reject('invalid year or no record under the year');
        return;
      }
      const mapMonth = mapYears.get(year).get(month);
      if (!mapMonth) {
        reject('invalid month or no record under the month');
        return;
      }
      const mapRegion = mapYears.get(year).get(month).get('Regions').get(region);
      if (!mapRegion) {
        reject('invalid region or no record under the region');
        return;
      }
      const mapCountry = mapYears.get(year).get(month).get('Regions').get(region).get('Contries').get(country);
      if (!mapCountry) {
        reject('invalid country or no record under the country');
        return;
      }

      let DDays = { 'AverageDaysToShip': (mapMonth.get('days') / mapMonth.get('count')).toFixed(0), 'NumberOfOrders': mapMonth.get('count') };
      let DDaysR = { 'AverageDaysToShip': (mapRegion.get('days') / mapRegion.get('count')).toFixed(0), 'NumberOfOrders': mapRegion.get('count') };
      let DDaysC = { 'AverageDaysToShip': (mapCountry.get('days') / mapCountry.get('count')).toFixed(0), 'NumberOfOrders': mapCountry.get('count') };

      orderObj = { [year]: { [month]: DDays } };
      orderObj[year][month]['Regions'] = { [region]: DDaysR };
      orderObj[year][month]['Regions']['Countries'] = { [country]: DDaysC };


      resolve({ data: orderObj });
    } catch (err) {
      reject('data query error');
    }
  })
};


module.exports = {
  itemTypes,
  orderPriorities,
  deliveryDays
}
