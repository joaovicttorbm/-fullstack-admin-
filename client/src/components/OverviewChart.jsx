import React, { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { useGetSalesQuery } from "state/api";

// Função responsável por formatar os dados de vendas e unidades totais
const formatChartData = (monthlyData, palette) => {
  const initialData = { sales: 0, units: 0 };

  const totalSalesLine = {
    id: "totalSales",
    color: palette.secondary.main,
    data: [],
  };

  const totalUnitsLine = {
    id: "totalUnits",
    color: palette.secondary[600],
    data: [],
  };

  const accumulatedData = Object.values(monthlyData).reduce(
    (acc, { month, totalSales, totalUnits }) => {
      const curSales = acc.sales + totalSales;
      const curUnits = acc.units + totalUnits;

      totalSalesLine.data.push({ x: month, y: curSales });
      totalUnitsLine.data.push({ x: month, y: curUnits });

      return { sales: curSales, units: curUnits };
    },
    initialData
  );

  return [totalSalesLine, totalUnitsLine];
};

// Função responsável pela renderização do gráfico
const renderChart = (data, view, isDashboard, palette) => (
  <ResponsiveLine
    data={view === "sales" ? [data[0]] : [data[1]]}
    theme={generateChartTheme(palette)}
    margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
    xScale={{ type: "point" }}
    yScale={{ type: "linear", min: "auto", max: "auto", stacked: false, reverse: false }}
    yFormat=" >-.2f"
    curve="catmullRom"
    enableArea={isDashboard}
    axisTop={null}
    axisRight={null}
    axisBottom={generateAxisBottomConfig(isDashboard)}
    axisLeft={generateAxisLeftConfig(isDashboard, view)}
    enableGridX={false}
    enableGridY={false}
    pointSize={10}
    pointColor={{ theme: "background" }}
    pointBorderWidth={2}
    pointBorderColor={{ from: "serieColor" }}
    pointLabelYOffset={-12}
    useMesh={true}
    legends={isDashboard ? undefined : generateLegendsConfig()}
  />
);

// Gera tema customizado do gráfico
const generateChartTheme = (palette) => ({
  axis: {
    domain: {
      line: { stroke: palette.secondary[200] },
    },
    legend: {
      text: { fill: palette.secondary[200] },
    },
    ticks: {
      line: { stroke: palette.secondary[200], strokeWidth: 1 },
      text: { fill: palette.secondary[200] },
    },
  },
  legends: {
    text: { fill: palette.secondary[200] },
  },
  tooltip: {
    container: { color: palette.primary.main },
  },
});

// Gera configuração para o eixo X
const generateAxisBottomConfig = (isDashboard) => ({
  format: (v) => (isDashboard ? v.slice(0, 3) : v),
  orient: "bottom",
  tickSize: 5,
  tickPadding: 5,
  tickRotation: 0,
  legend: isDashboard ? "" : "Month",
  legendOffset: 36,
  legendPosition: "middle",
});

// Gera configuração para o eixo Y
const generateAxisLeftConfig = (isDashboard, view) => ({
  orient: "left",
  tickValues: 5,
  tickSize: 5,
  tickPadding: 5,
  tickRotation: 0,
  legend: isDashboard ? "" : `Total ${view === "sales" ? "Revenue" : "Units"} for Year`,
  legendOffset: -60,
  legendPosition: "middle",
});

// Gera configuração para as legendas
const generateLegendsConfig = () => [
  {
    anchor: "bottom-right",
    direction: "column",
    justify: false,
    translateX: 30,
    translateY: -40,
    itemsSpacing: 0,
    itemDirection: "left-to-right",
    itemWidth: 80,
    itemHeight: 20,
    itemOpacity: 0.75,
    symbolSize: 12,
    symbolShape: "circle",
    symbolBorderColor: "rgba(0, 0, 0, .5)",
    effects: [
      {
        on: "hover",
        style: {
          itemBackground: "rgba(0, 0, 0, .03)",
          itemOpacity: 1,
        },
      },
    ],
  },
];

// Componente principal do gráfico
const OverviewChart = ({ isDashboard = false, view }) => {
  const { palette } = useTheme();
  const { data, isLoading } = useGetSalesQuery();

  const chartData = useMemo(() => {
    if (!data) return [];
    return formatChartData(data.monthlyData, palette);
  }, [data, palette]);

  if (isLoading || !data) return "Loading...";

  return renderChart(chartData, view, isDashboard, palette);
};

export default OverviewChart;
