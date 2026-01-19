import { createContext } from "react";
import { backendUrl } from "../App.jsx";

export const StoreContext =  createContext(null)

const ContextProvider = (props) =>{

    const contextValue ={
        backendUrl
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContext