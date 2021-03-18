import React from 'react';

const StoreContext = React.createContext({
    checkout: false,
    setCheckOut: (gotoCheckout) => {}
})

export default StoreContext;