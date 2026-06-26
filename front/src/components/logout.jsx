import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        // Limpiar localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        
        // Redirigir al login después de 1 segundo
        setTimeout(() => {
            navigate("/");
        }, 1000);
    }, [navigate]);

    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <p>Cerrando sesión...</p>
        </div>
    );
}

export default Logout;