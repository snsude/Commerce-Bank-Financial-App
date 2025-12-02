import { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist';

// Categories
const CATEGORY_COLORS = {
  'Food': '#FF6384',
  'Transportation': '#36A2EB',
  'Entertainment': '#FFCE56',
  'Housing': '#4BC0C0',
  'Utilities': '#9966FF',
  'Healthcare': '#FF9F40',
  'Shopping': '#E7E9ED',
  'Personal': '#8B5CF6',
  'Other': '#C9CBCF'
};

export default function PlotlyPersonal({ data }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !data || data.length === 0) return;

    const labels = data.map(cat => cat.name);
    const values = data.map(cat => cat.value);
    
    // Assign colors based on category
    const colors = data.map(cat => 
      CATEGORY_COLORS[cat.name] || CATEGORY_COLORS['Other']
    );

    const plotData = [{
      type: 'pie',
      labels: labels,
      values: values,
      marker: {
        colors: colors
      },
      textinfo: 'none',
      hovertemplate: '<b>%{label}</b><br>$%{value}<br>%{percent}<extra></extra>',
      hole: 0
    }];

    const layout = {
      showlegend: false,
      margin: { t: 0, b: 0, l: 0, r: 0 },
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      height: 180,
      width: 180
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
  }, [data]);

  return <div ref={chartRef} />;
}