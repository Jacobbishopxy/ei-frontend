/**
 * Created by Jacob Xie on 4/27/2020.
 */

import React from 'react';


export const Emoji = ({label, symbol}) => (
  <option
    className="emoji"
    aria-label={label || ''}
    aria-hidden={label ? 'false' : 'true'}
    value={label}
  >
    {symbol}
  </option>
);

export default Emoji;
