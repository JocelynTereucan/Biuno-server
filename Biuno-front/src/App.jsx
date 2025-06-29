import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EducatorDashboard from "./pages/EducatorDashboard";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <EducatorDashboard />
    </QueryClientProvider>
  );
}

export default App;
