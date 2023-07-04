import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import { SearchContextProvider } from './context/SearchContext.js'
import { AuthContextProvider } from './context/AuthContext.js'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthContextProvider>
            <SearchContextProvider>
                <App />
            </SearchContextProvider>
        </AuthContextProvider>
    </React.StrictMode>,
)