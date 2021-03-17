import React from 'react';

const StoreContext = React.createContext({
    checkout: false,
    setCheckOut: () => {}
})

export default StoreContext;