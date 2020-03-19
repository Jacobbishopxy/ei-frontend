/**
 * Created by Jacob Xie on 3/11/2020.
 */

import moment from 'moment';

const dateFormat = 'YYYYMMDD';
const dateFormat2 = 'YYYY-MM-DD';

export const currentTimeStamp = () => moment().format();
export const stringToTimestamp = time => moment(time).format();
export const timeStampToDateString = time => time.format(dateFormat);
export const numberToDateString = time => moment(time).format(dateFormat2);

export const today = () => moment(new Date());
export const todayString = () => today().format(dateFormat);
