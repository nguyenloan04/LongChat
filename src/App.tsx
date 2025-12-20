// import { useEffect } from 'react'
// import type { ReduxState } from './constants/ReduxState'
// import { useSelector } from 'react-redux'

import { RouterProvider } from 'react-router-dom'
import router from './routes/index.tsx'
import './App.css'

function App() {
    //FIXME: Implement a dialog to display websocket error
    // const socketState = useSelector((state: ReduxState) => state.socketState)
    // useEffect(() => {
    //     if (socketState.errorMessage) {
    //         alert(socketState.errorMessage)
    //     }
    // }, [socketState.errorMessage])

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App
