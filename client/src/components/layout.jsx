import React from 'react';
import Nav from './nav';

const Layout = ({children}) => {
    return (
        <div className="px-10 lg:px-28 mx:auto">
          
            <main>
            {children}
            </main>
        </div>
    );
}

export default Layout;
