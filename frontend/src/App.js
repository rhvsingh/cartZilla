import "./style.css"

import Ecommerce from "./ecommerce/Ecommerce"
import UserState from "./ecommerce/contexts/userContext/UserState"
import { HelmetProvider } from "react-helmet-async"

function App() {
    return (
        <UserState>
            <HelmetProvider>
                <Ecommerce />
            </HelmetProvider>
        </UserState>
    )
}

export default App
