/**
 * Created by Jacob Xie on 3/10/2020.
 */



class HeadConfig {
  constructor(key, name) {
    this.key = key;
    this.name = name;
  }
}

const colConfig = (key, name) => new HeadConfig(key, name);

const dateCol = new HeadConfig('date', '日期');

/**
 * 水泥数据
 * 价格/库存/出货/产量/熟料价格/熟料库存/熟料产量/粉磨开工率
 *
 */

const cementPrice = [
  dateCol,
  colConfig('all', '全国'),
  colConfig('hb', '华北'),
  colConfig('db', '东北'),
  colConfig('hd', '华东'),
  colConfig('zn', '中南'),
  colConfig('xn', '西南'),
  colConfig('xb', '西北'),
];

const cementStock = cementPrice;

const cementShipment = [
  dateCol,
  colConfig('all', '全国'),
  colConfig('jjj', '京津冀'),
  colConfig('db', '东北'),
  colConfig('hz', '华中'),
  colConfig('hn', '华南'),
  colConfig('xn', '西南'),
  colConfig('xb', '西北'),
  colConfig('hb', '华北'),
  colConfig('hd', '华东'),
  colConfig('zn', '中南'),
];

const cementProduction = cementPrice;

const clinkerPrice = cementPrice;

const clinkerStock = cementPrice;

const clinkerProduction = cementPrice;

const clinkerCapacity = cementPrice;

export {
  cementPrice,
  cementStock,
  cementShipment,
  cementProduction,
  clinkerPrice,
  clinkerStock,
  clinkerProduction,
  clinkerCapacity,
}
