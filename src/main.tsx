import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import QueryProvider from "./lib/react-query/QueryProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <QueryProvider>
        <App />
      </QueryProvider>
    </AuthProvider>
  </BrowserRouter>
);
