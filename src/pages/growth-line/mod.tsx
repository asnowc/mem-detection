import React, { useMemo } from "react";
import { Echarts, EChartsOption } from "echarts-comp";
import { WebSocketCpc } from "cpcall";
console.log(WebSocketCpc);

type MemoryData = NodeJS.MemoryUsage & {
  name: string;
};

function createData(memoryData: MemoryData[]) {
  const dimensions = ["name", "arrayBuffers", "external", "heapTotal", "heapUsed", "rss"] as (keyof MemoryData)[];
  const option: EChartsOption = {
    xAxis: { type: "category" },
    yAxis: { type: "value" },
    legend: {},
    tooltip: {
      trigger: "axis",
    },
    dataset: {
      dimensions,
      source: memoryData,
    },
    series: dimensions.map((item) => ({ type: "line" })),
  };
  return option;
}
function randomInt(min: number, max: number) {
  if (max < min) return 0;
  return Math.round(Math.random() * (max - min) + min);
}
function mockData(name: string): MemoryData {
  return {
    name,
    arrayBuffers: randomInt(0, 100),
    external: randomInt(0, 100),
    heapTotal: randomInt(0, 100),
    heapUsed: randomInt(0, 100),
    rss: randomInt(0, 100),
  };
}

export default function App() {
  const option = useMemo(
    () => createData([mockData("1"), mockData("2"), mockData("3"), mockData("4"), mockData("5"), mockData("6")]),
    []
  );
  return <Echarts option={option} style={{ height: 400 }} />;
}
