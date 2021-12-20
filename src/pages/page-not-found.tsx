import React from 'react';
import {Link} from "react-router-dom";

function PageNotFound() {
    return (
        <div>
            <h1>Page not found</h1>
            <h3>U can go on the <Link to="/">main page</Link></h3>
        </div>
    );
}

export default PageNotFound;