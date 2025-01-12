import './App.css'
import Info from "./components/Info.jsx";
import Data from "./components/Data.jsx";

function App() {

    return (
        <div className={'wrapper'}>
            <div className={'main'}>
                <div className={'container'}>
                    <div className={'row'}>
                        <Info/>
                        <Data/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
