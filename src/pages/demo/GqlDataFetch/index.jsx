import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { GraphQLClient } from 'graphql-request';


const endpoint = 'http://api.ei.infore.com/rdl_zyyx';

const client = new GraphQLClient(endpoint, {headers: {}});

const indexPricesQuery = `
query IndexPricesEOD($tickers: [String!]! $start: String! $end: String!) {
  getIndexPricesEOD(tickers: $tickers start: $start end: $end) {
    ticker
    name
    tCap
    mCap
    volume
    amount
    deals
    changeRate
    open
    high
    low
    close
    preClose
    date
    exchange
  }
}
`;

const variables = {start: '20200301', end: '20200303'};

const DataFetchDemo = () => {
  const [data, setData] = useState({getIndexPricesEOD: []});
  const [query, setQuery] = useState('000001');
  const [search, setSearch] = useState('');

  useEffect(() => {

    const fetchData = async () => {
      const vars = {...variables, tickers: [query]};
      const result = await client.request(indexPricesQuery, vars);

      setData(result);
    };

    fetchData();
  }, [search]);

  return (
    <>
      <input
        type='text'
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
      <Button
        onClick={() => setSearch(query)}
      >
        Search
      </Button>

      <ul>
        {
          data.getIndexPricesEOD.map(item => (
            <li key={`${item.ticker}-${item.date}`}>
              `${item.ticker}-${item.date}`
            </li>
          ))
        }
      </ul>
    </>
  )
};


export default () => (
  <PageHeaderWrapper>
    <DataFetchDemo/>
  </PageHeaderWrapper>
);
