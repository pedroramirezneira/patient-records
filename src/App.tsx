import { PatientsPage } from "./pages/PatientsPage";
import { ToastContainer } from "react-toastify";

function App() {
  return (
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
  );
}

export default App;
