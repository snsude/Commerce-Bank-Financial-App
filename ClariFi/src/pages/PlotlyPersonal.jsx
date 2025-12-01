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

export default function PlotlyPersonal({ data, hoveredIndex = null }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !data || data.length === 0) return;

    const labels = data.map(cat => cat.name);
    const values = data.map(cat => cat.value);
    
    
    const colors = data.map(cat => 
      cat.color || CATEGORY_COLORS[cat.name] || CATEGORY_COLORS['Other']
    );

    
    const pull = data.map(() => 0);

    const plotData = [{
      type: 'pie',
      labels: labels,
      values: values,
      marker: {
        colors: colors
      },
      textinfo: 'none',
      hovertemplate: '<b>%{label}</b><br>$%{value}<br>%{percent}<extra></extra>',
      hole: 0.3,
      pull: pull
    }];

    const layout = {
      showlegend: false,
      margin: { t: 20, b: 20, l: 20, r: 20 },
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      autosize: true,
      transition: {
        duration: 200,
        easing: 'cubic-in-out'
      }
    };

    const config = {
      displayModeBar: false,
      responsive: true
    };

    Plotly.newPlot(chartRef.current, plotData, layout, config);

    // Handle resize
    const handleResize = () => {
      if (chartRef.current) {
        Plotly.Plots.resize(chartRef.current);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartRef.current) {
        Plotly.purge(chartRef.current);
      }
    };
  }, [data]);

 
  useEffect(() => {
    if (!chartRef.current) return;

    const pull = data.map((_, i) => i === hoveredIndex ? 0.1 : 0);

    Plotly.restyle(chartRef.current, { pull: [pull] });
  }, [hoveredIndex, data]);

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
}