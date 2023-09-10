import "./style.css"

import Ecommerce from "./ecommerce/Ecommerce"
import UserState from "./ecommerce/contexts/userContext/UserState"

function App() {
    return (
        <UserState>
            <Ecommerce />
        </UserState>
    )
}

export default App
