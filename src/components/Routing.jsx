import React from "react";
import { Route, Routes } from "react-router-dom";
import { MainLayout } from "../pages/Layout";
import { Instagram } from "react-content-loader";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("../pages/Home"));
const CoinDetailsPage = lazy(() => import("../pages/CoinDetailsPage"));

const Routing = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route
            index
            element={
              <Suspense fallback={<Instagram />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/details/:coinId"
            element={
              <Suspense fallback={<Instagram />}>
                <CoinDetailsPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </div>
  );
};

export default Routing;
