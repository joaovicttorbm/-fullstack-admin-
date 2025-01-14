import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { Box, Typography, useTheme } from "@mui/material";
import { useGetSalesQuery } from "state/api";

// Função para formatar dados
const formatData = (salesByCategory, colors) => {
  return Object.entries(salesByCategory).map(([category, sales], i) => ({
    id: category,
    label: category,
    value: sales,
    color: colors[i],
  }));
};

// Função para renderizar o gráfico
const PieChart = ({ data, theme, isDashboard }) => (
  <ResponsivePie
    data={data}
    theme={{
      axis: {
        domain: {
          line: { stroke: theme.palette.secondary[200] },
        },
        legend: {
          text: { fill: theme.palette.secondary[200] },
        },
        ticks: {
          line: { stroke: theme.palette.secondary[200], strokeWidth: 1 },
          text: { fill: theme.palette.secondary[200] },
        },
      },
      legends: {
        text: { fill: theme.palette.secondary[200] },
      },
      tooltip: {
        container: { color: theme.palette.primary.main },
      },
    }}
    colors={{ datum: "data.color" }}
    margin={
      isDashboard
        ? { top: 40, right: 80, bottom: 100, left: 50 }
        : { top: 40, right: 80, bottom: 80, left: 80 }
    }
    sortByValue
    innerRadius={0.45}
    activeOuterRadiusOffset={8}
    borderWidth={1}
    borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
    enableArcLinkLabels={!isDashboard}
    arcLinkLabelsTextColor={theme.palette.secondary[200]}
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: "color" }}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
    legends={[
      {
        anchor: "bottom",
        direction: "row",
        justify: false,
        translateX: isDashboard ? 20 : 0,
        translateY: isDashboard ? 50 : 56,
        itemsSpacing: 0,
        itemWidth: 85,
        itemHeight: 18,
        itemTextColor: "#999",
        itemDirection: "left-to-right",
        itemOpacity: 1,
        symbolSize: 18,
        symbolShape: "circle",
        effects: [
          {
            on: "hover",
            style: {
              itemTextColor: theme.palette.primary[500],
            },
          },
        ],
      },
    ]}
  />
);

const BreakdownChart = ({ isDashboard = false }) => {
  const { data, isLoading } = useGetSalesQuery();
  const theme = useTheme();

  if (!data || isLoading) return "Loading...";

  const colors = [
    theme.palette.secondary[500],
    theme.palette.secondary[300],
    theme.palette.secondary[300],
    theme.palette.secondary[500],
  ];

  const formattedData = formatData(data.salesByCategory, colors);

  return (
    <Box
      height={isDashboard ? "400px" : "100%"}
      minHeight={isDashboard ? "325px" : undefined}
      minWidth={isDashboard ? "325px" : undefined}
      position="relative"
    >
      <PieChart data={formattedData} theme={theme} isDashboard={isDashboard} />
      
      <Box
        position="absolute"
        top="50%"
        left="50%"
        color={theme.palette.secondary[400]}
        textAlign="center"
        pointerEvents="none"
        sx={{
          transform: isDashboard
            ? "translate(-75%, -170%)"
            : "translate(-50%, -100%)",
        }}
      >
        <Typography variant="h6">
          {!isDashboard && "Total:"} ${data.yearlySalesTotal}
        </Typography>
      </Box>
    </Box>
  );
};

export default BreakdownChart;
