define({ "api": [
  {
    "description": "<p>Average Time to ship, and Number of Orders For Each Month, and by each Country grouped by region, with totals for each level</p>",
    "type": "get",
    "url": "/delivery-days?year=<Number>&month=<Number>&region=<String>&country=<String>",
    "title": "Average Time to ship, and Number of Orders by period and region",
    "group": "Order_Statistics",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "year",
            "description": "<p>the year of order date</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "month",
            "description": "<p>the month of order date</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "region",
            "description": "<p>the region is within 'Sub-Saharan Africa, Middle East and North Africa, Australia and Oceania, Europe, Asia, Australia and Oceania, ...'</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "country",
            "description": "<p>the country within the region</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>the type is within 'Fruits, Clothes, Meat, Beverages, Office Supplies, Cosmetics, Snacks, Personal Care, ...'</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n    {\n      \"code\": \"Ok\",\n      \"message\": null,\n      \"metadata\": {},\n      \"data\": {\n        \"2011\": {\n          \"5\": {\n            \"AverageDaysToShip\": \"25\",\n            \"NumberOfOrders\": 23042,\n            \"Regions\": {\n              \"Australia and Oceania\": {\n                \"AverageDaysToShip\": \"25\",\n                \"NumberOfOrders\": 1892\n              },\n              \"Countries\": {\n                \"Australia\": {\n                  \"AverageDaysToShip\": \"22\",\n                  \"NumberOfOrders\": 128\n                }\n              }\n            }\n          }\n        }\n      }\n    }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/deliveryDays.js",
    "groupTitle": "Order_Statistics",
    "name": "GetDeliveryDaysYearNumberMonthNumberRegionStringCountryString",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-Sitename",
            "description": "<p>HEADER: The sitename of the product</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-LocationId",
            "description": "<p>HEADER: [OPTIONAL]: The location Id</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "409",
            "description": "<p>The code name of the error, when there is inconsistency in the passed data. either in url parameter, query or POST body</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>The code name of the error, this might be triggered if any internal operation within the API fails</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 409 Conflict",
          "content": "HTTP/1.1 409 Conflict\n{\n             \"code\": \"InvalidArgumentError\",\n             \"message\": <message>\n           }",
          "type": "json"
        },
        {
          "title": "HTTP/1.1 500 Internal Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n             \"code\": \"InternalServerError\",\n             \"message\": <message>\n           }",
          "type": "json"
        }
      ]
    }
  },
  {
    "description": "<p>The Total Revenue, Cost and Profit for each region and item type</p>",
    "type": "get",
    "url": "/itemtypes?region=<string>&country=<string>&type=<string>&generaltype=<string>",
    "title": "The Total Revenue, Cost and Profit for each region and item type",
    "group": "Order_Statistics",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "region",
            "description": "<p>the region is within 'Sub-Saharan Africa, Middle East and North Africa, Australia and Oceania, Europe, Asia, Australia and Oceania, ...'</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "country",
            "description": "<p>the country is within the region</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>the type is within 'Fruits, Clothes, Meat, Beverages, Office Supplies, Cosmetics, Snacks, Personal Care, ...'</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "generaltype",
            "description": "<p>the general type is within 'Fruits, Clothes, Meat, Beverages, Office Supplies, Cosmetics, Snacks, Personal Care, ...'</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n    {\n      \"code\": \"Ok\",\n      \"message\": null,\n      \"metadata\": {},\n      \"data\": {\n        \"Regions\": {\n          \"Australia and Oceania\": {\n            \"Total\": {\n              \"Revenue\": \"161527462512.65\",\n              \"Cost\": \"113857305007.15\",\n              \"Profit\": \"47670157505.50\"\n            },\n            \"Countries\": {\n              \"Australia\": {\n                \"Total\": {\n                  \"Revenue\": \"11019528082.81\",\n                  \"Cost\": \"7775461157.84\",\n                  \"Profit\": \"3244066924.97\"\n                },\n                \"ItemTypes\": {\n                  \"Fruits\": {\n                    \"Revenue\": \"11001236635.67\",\n                    \"Cost\": \"7762158785.86\",\n                    \"Profit\": \"3239077849.81\"\n                  }\n                }\n              }\n            }\n          }\n        },\n        \"ItemTypes\": {\n          \"Fruits\": {\n            \"Revenue\": \"5838878235.99\",\n            \"Cost\": \"4330657812.76\",\n            \"Profit\": \"1508220423.23\"\n          }\n        }\n      }\n    }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/itemTypes.js",
    "groupTitle": "Order_Statistics",
    "name": "GetItemtypesRegionStringCountryStringTypeStringGeneraltypeString",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-Sitename",
            "description": "<p>HEADER: The sitename of the product</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-LocationId",
            "description": "<p>HEADER: [OPTIONAL]: The location Id</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "409",
            "description": "<p>The code name of the error, when there is inconsistency in the passed data. either in url parameter, query or POST body</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>The code name of the error, this might be triggered if any internal operation within the API fails</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 409 Conflict",
          "content": "HTTP/1.1 409 Conflict\n{\n             \"code\": \"InvalidArgumentError\",\n             \"message\": <message>\n           }",
          "type": "json"
        },
        {
          "title": "HTTP/1.1 500 Internal Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n             \"code\": \"InternalServerError\",\n             \"message\": <message>\n           }",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/order-priorities?year=<string>&month=<string>",
    "title": "Number of each Priority Orders for each Month",
    "description": "<p>Number of each Priority Orders for each Month</p>",
    "group": "Order_Statistics",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "year",
            "description": "<p>the year of order date</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "month",
            "description": "<p>the month of order date</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n    {\n      \"code\": \"Ok\",\n      \"message\": null,\n      \"metadata\": {},\n      \"data\": {\n        \"2011\": {\n          \"5\": {\n            \"H\": 4251,\n            \"M\": 4091,\n            \"L\": 4243,\n            \"C\": 4183\n          }\n        }\n      }\n    }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/orderPriorities.js",
    "groupTitle": "Order_Statistics",
    "name": "GetOrderPrioritiesYearStringMonthString",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-Sitename",
            "description": "<p>HEADER: The sitename of the product</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-LocationId",
            "description": "<p>HEADER: [OPTIONAL]: The location Id</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "409",
            "description": "<p>The code name of the error, when there is inconsistency in the passed data. either in url parameter, query or POST body</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>The code name of the error, this might be triggered if any internal operation within the API fails</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP/1.1 409 Conflict",
          "content": "HTTP/1.1 409 Conflict\n{\n             \"code\": \"InvalidArgumentError\",\n             \"message\": <message>\n           }",
          "type": "json"
        },
        {
          "title": "HTTP/1.1 500 Internal Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n             \"code\": \"InternalServerError\",\n             \"message\": <message>\n           }",
          "type": "json"
        }
      ]
    }
  }
] });
