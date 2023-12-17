import React, { useMemo } from "react";
import { createHashRouter, RouterProvider, RouteObject } from "react-router-dom";
import GrowthLine from "./growth-line/mod.tsx";

const routerConfig: RouteObject[] = [
  {
    path: "/",
    Component() {
      return <div>HOME</div>;
    },
  },
  {
    path: "/growth",
    Component: GrowthLine,
  },
];
export function App() {
  const router = useMemo(() => createHashRouter(routerConfig), []);
  return <RouterProvider router={router} />;
}
