// import { useState } from "react";
import Routing from "./components/Routing";
// import { CurrencyContext } from "./context/CurrencyContext.js";

function App() {
  // const [currency, setCurrency] = useState("usd");
  return (
    <>
      {/* <CurrencyContext.Provider value={{ currency, setCurrency }}> */}
      <Routing />
      {/* </CurrencyContext.Provider> */}
    </>
  );
}

export default App;
