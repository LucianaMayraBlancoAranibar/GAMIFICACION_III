import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Asegúrate de que la ruta de importación sea la correcta

function ProtectedRoute({ children, ...rest }) {
    const { currentUser } = useAuth();

    return (
        <Route
            {...rest}
            render={({ location }) =>
                currentUser ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

export default ProtectedRoute;
