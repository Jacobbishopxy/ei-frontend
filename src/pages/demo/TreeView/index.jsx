import React from 'react';
import ReactEcharts from 'echarts-for-react';

const data = {
  "children": [
    {
      "children": [
        {
          "lastModifiedTime": "2019-08-07T14:27:33Z",
          "name": "20190807 平安银行 000001.SZ-外部-数据模型-平安银行零售模型-中金公司.xlsx",
          "size": 1012209
        },
        {
          "lastModifiedTime": "2019-12-06T05:55:34.092596Z",
          "name": "20191021 平安银行 000001.SZ-内部-数据模型-平安银行跟踪-段涛涛.xlsx",
          "size": 351675
        }
      ],
      "name": "数据与模型"
    },
    {
      "children": [
        {
          "lastModifiedTime": "2019-06-13T10:24:13.762944Z",
          "name": "20190613 平安银行 000001.SZ-内部-观点策略-平安银行问题探讨-段涛涛.pdf",
          "size": 838485
        }
      ],
      "name": "观点与策略"
    },
    {
      "children": [
        {
          "lastModifiedTime": "2019-11-05T01:02:54.135369Z",
          "name": "20190808 平安银行 000001.SZ-外部-深度报告-买入-黑马的转型进阶之路-安信证券.pdf",
          "size": 2019360
        },
        {
          "lastModifiedTime": "2019-11-05T01:02:20.351681Z",
          "name": "20190821 平安银行 000001.SZ-外部-深度报告-增持-不一样的银行，不一样的估值-国泰君安.pdf",
          "size": 1011932
        }
      ],
      "name": "调查与深度"
    },
    {
      "children": [
        {
          "lastModifiedTime": "2019-03-06T15:34:39Z",
          "name": "20190306 平安银行 000001.SZ-内部-业绩点评-持有-平银FY18业绩点评-段涛涛.pdf",
          "size": 645297
        },
        {
          "lastModifiedTime": "2019-04-23T15:37:19.408885Z",
          "name": "20190423 平安银行 000001.SZ-内部-业绩点评-持有-平银1Q19业绩点评-段涛涛.pdf",
          "size": 472173
        },
        {
          "lastModifiedTime": "2019-08-07T13:00:15Z",
          "name": "20190807 平安银行 000001.SZ-内部-业绩点评-持有-平银1H19业绩点评-段涛涛.pdf",
          "size": 536515
        },
        {
          "lastModifiedTime": "2019-11-05T01:01:06.807535Z",
          "name": "20191021 平安银行 000001.SZ-内部-业绩点评-持有-平银3Q19业绩点评-段涛涛.pdf",
          "size": 425980
        }
      ],
      "name": "财报与业绩"
    },
    {
      "children": [
        {
          "lastModifiedTime": "2019-11-28T09:35:12.774040Z",
          "name": "20190307 平安银行 000001.SZ-内部-观点策略-平安银行FY18业绩会纪要-段涛涛.pdf",
          "size": 312777
        },
        {
          "lastModifiedTime": "2019-11-28T09:34:50.924232Z",
          "name": "20190808 平安银行 000001.SZ-内部-观点策略-平安银行1H19业绩会纪要-段涛涛.pdf",
          "size": 322428
        }
      ],
      "name": "路演与会议"
    }
  ],
  "name": ""
};

const option = {
  tooltip: {
    trigger: 'item',
    triggerOn: 'mousemove'
  },
  series: [
    {
      type: 'tree',
      name: 'file-tree',
      data: [data],

      top: '10%',
      left: '5%',
      bottom: '10%',
      right: '50%',

      symbolSize: 7,

      edgeShape: 'polyline',
      initialTreeDepth: -1,

      lineStyle: {
        width: 2
      },

      label: {
        position: 'left',
        verticalAlign: 'middle',
        align: 'right'
      },

      leaves: {
        label: {
          position: 'right',
          verticalAlign: 'middle',
          align: 'left'
        }
      },

      expandAndCollapse: true,
      animationDuration: 550,
      animationDurationUpdate: 750
    }
  ]
};
export default () => {
  return (
    <ReactEcharts
      style={{height: '900px', width: '100%'}}
      option={option}
    />
  );
};
