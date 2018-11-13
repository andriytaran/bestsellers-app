import {
  BESTSELLERS_DEPARTMENT,
  ALL_STORE,
} from './domain';

export const departmentImage = (department, shop) => {
  var temp = '';
  try {
    if (shop === ALL_STORE) {
      const path = department.value.toLowerCase() + '/' + BESTSELLERS_DEPARTMENT + '.png';
      try {
        temp = require('../img/' + path);
      } catch {
        temp = require('../img/best-seller/Best-Seller.png');
      }
    } else if (department.value === BESTSELLERS_DEPARTMENT) {
      try {
        temp = require('../img/' + shop.toLowerCase() + '/' + department.display + '.png');
      } catch {
        temp = require('../img/best-seller/Best-Seller.png');
      }
    } else {
      temp = require('../img/' + shop.toLowerCase() + '/' + department.display + '.png');
    }
  }
  catch {
    temp = require('../img/no_image.png');
  }
  return temp;
}
