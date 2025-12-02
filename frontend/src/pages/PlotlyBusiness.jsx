import { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist';

export default function PlotlyBusiness({ data, color, type = 'income' }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !data || data.length === 0) return;

    const quarters = data.map(item => item.quarter);
    const amounts = data.map(item => item.amount);

    const plotData = [{
      type: 'bar',
      x: quarters,
      y: amounts,
      marker: {
        color: color,
        line: {
          width: 0
        }
      },
      text: amounts.map(amt => `$${(amt / 1000).toFixed(0)}k`),
      textposition: 'outside',
      textfont: {
        size: 14,
        weight: 600,
        color: '#555'
      },
      hovertemplate: '<b>%{x}</b><br>$%{y:,.0f}<extra></extra>',
      cliponaxis: false
    }];

    const layout = {
      showlegend: false,
      margin: { t: 40, b: 50, l: 50, r: 20 },
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      height: 250,
      xaxis: {
        tickfont: {
          size: 16,
          weight: 600,
          color: '#333'
        },
        showgrid: false,
        showline: false,
        zeroline: false
      },
      yaxis: {
        visible: false,
        showgrid: false,
        showline: false,
        zeroline: false,
        range: [0, Math.max(...amounts) * 1.15]
      },
      bargap: 0.4
    };

    const config = {
      displayModeBar: false,
      responsive: true
    };

    Plotly.newPlot(chartRef.current, plotData, layout, config);

    return () => {
      if (chartRef.current) {
        Plotly.purge(chartRef.current);
      }
    };
  }, [data, color]);

  return <div ref={chartRef} style={{ width: '100%' }} />;
}