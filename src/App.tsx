import "./App.scss";
import { Outlet } from "@tanstack/react-router";
import { ConnectUserProvider } from "./context/useConnectUser";

function App() {
  return (
    <ConnectUserProvider>
      <Outlet />
    </ConnectUserProvider>
  );
}

export default App;
