const _ = require("lodash");
const propertiesCategories = require("./PropertiesCategories.js");

function TestObject(properties, obj) {
    for (let i = 0; i <= properties.length - 1; i++) {
        this[properties[i]] = obj[properties[i]];
    }
}

function compare(x, y) {
    if(x != undefined && x != null && y != undefined && y != null){
        const seqNo1 = x.seqNo;
        const seqNo2 = y.seqNo;
    
        if (seqNo1 > seqNo2) {
            return 1;
        } else if (seqNo1 <= seqNo2) {
            return -1;
        }
    }
}

function createTestObjectWithProperties(anyObj, properties) {
    if(anyObj != null && anyObj != undefined){
        if (Array.isArray(anyObj)) {
            _.forEach(anyObj, function (obj, i) {
                if (obj != null && obj != undefined) {
                    anyObj[i] = new TestObject(properties, obj);
                }
            });
            anyObj.sort(compare);
            return anyObj;
        } else {
            return new TestObject(properties, anyObj);
        }
    }
}

module.exports = function (obj, propertiesCategoriesArray) {
    const allProperties = [];

    for (let i = 0; i <= propertiesCategoriesArray.length - 1; i++) {
        const temp = propertiesCategories[propertiesCategoriesArray[i]];

        for (let j = 0; j <= temp.length - 1; j++) {
            allProperties.push(temp[j]);
        }
    }
    
    return createTestObjectWithProperties(obj, allProperties);
}