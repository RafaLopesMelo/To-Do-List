import { createContext, useState } from "react";

const MenuContext = createContext({
    showMenu: false,
    toggleShow: () => {}
})

const MenuProvider: React.FC = (props) => {
    const [showMenu, setShowMenu] = useState(false);
    
    function toggleShow() {
        setShowMenu(prev => !prev)
    }

    return (
        <MenuContext.Provider value={{ showMenu, toggleShow }}>
            {props.children}
        </MenuContext.Provider>
    )
}

export {MenuProvider, MenuContext}