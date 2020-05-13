import React, { useState, useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

import './App.css';
import TvChart from './components/tvchart';
import Filter from './components/filter';



function App() {
  const chartRef = useRef(null);
  const [loading, setLoading ] = useState(true);
  const [fetchedData, setFetchedData] = useState([])

  useEffect(() => {
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
      timeScale: {
        timeVisible: true,
        secondsVisible: false
      }
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
        ],
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
      setLoading(false); 
      setFetchedData(prevData => [...prevData, {time: parseInt(new Date(value.time).getTime()), value: parseFloat(value.price)}])
      console.log(fetchedData)
    }

    lineSeries.setData(fetchedData)

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
      {
        loading ? 'loading...' :  <Filter />
      }
      <TvChart ref={chartRef} />

    </div>
  );

}

export default App;
