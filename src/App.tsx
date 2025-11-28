import { PatientsPage } from "./pages/PatientsPage";
import { ToastContainer } from "react-toastify";
import { PatientsProvider } from "./hooks/use-patients";

function App() {
  return (
    <PatientsProvider>
      <div className="bg-background min-h-screen">
        <PatientsPage />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </PatientsProvider>
  );
}

export default App;
