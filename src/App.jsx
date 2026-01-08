import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { MainWrapper } from "./routing/Wrappers/Main.wrapper";



const App = () => {
  return (
    <>
      <MainWrapper />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
    </>
  )
}

export default App
