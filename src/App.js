import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

import './App.css';



function App() {
  const chartRef = useRef(null);

  const fetchedData = [];
  // const chart = createChart(document.body, { width: 400, height: 300 });



  useEffect(() =>{

    const chart = createChart(chartRef.current, {
      width: chartRef.width,
    height: chartRef.height,
      layout: {
          backgroundColor: '#ffffff',
          textColor: 'rgba(33, 56, 77, 1)',
      },
      grid: {
          vertLines: {
              color: 'rgba(197, 203, 206, 0.7)',
          },
          horzLines: {
              color: 'rgba(197, 203, 206, 0.7)',
          },
      },
      localization: {
        dateFormat: 'yyyy/MM/dd',
      },
  });

  const lineSeries = chart.addLineSeries();

    const subscribe = {
        "type": "subscribe",
        "channels": [
            "level2",
            "heartbeat",
            {
                "name": "ticker",
                "product_ids": [
                    "BTC-USD",
                ]
            }
        ]
    }
    const ws = new WebSocket('wss://ws-feed.pro.coinbase.com');
    ws.onopen = () => {
      ws.send(JSON.stringify(subscribe))
    }
    ws.onmessage = e => {
      const value = JSON.parse(e.data);
      if(value.type !== 'ticker'){
        return;
      }

      fetchedData.push({time: parseInt(new Date(value.time).getTime()), value: parseFloat(value.price)});
      lineSeries.setData(fetchedData)
    }

    return () => {
      chart.remove();
      ws.close()
    }
  }, [fetchedData]);


  return (
    <div className="App">
      <header className="App-header">
        BTC-USD Crypto Chart
      </header>
      <div className='chart' ref={chartRef}></div>
    </div>
  );

}

export default App;
