import StackNavigator from './src/navigation/StackNavigator'
import { Provider } from 'react-redux'
import { store, persistor } from './src/store/redux'
import { PersistGate } from 'redux-persist/integration/react'

export default function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<StackNavigator />
			</PersistGate>
		</Provider>
	)
}
