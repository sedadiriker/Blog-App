import { Provider } from "react-redux";
import AppRouter from "./router/AppRouter";
import { ToastContainer } from "react-toastify";
import store, { persistor } from "./app/store";
import { PersistGate } from 'redux-persist/integration/react'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
    return (
      <>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}> 
      <AppRouter/>
      </PersistGate>
      </Provider>
          <ToastContainer />
          </>
    );

}

export default App;
