import DashBord from "./pages/DashBord";
import { Provider } from 'react-redux';
import { store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store/store';

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <DashBord />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;



