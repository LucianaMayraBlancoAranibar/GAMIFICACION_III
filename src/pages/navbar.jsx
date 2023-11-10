import React from "react";

const Navbar = () => {
    const handleAdminSelectChange = (event) => {
        const selectedOption = event.target.value;
        if (selectedOption === "estudiante") {
            window.location.href = "/EstudianteTable";
        } else if (selectedOption === "carrera") {
            window.location.href = "/CarreraTable";
        } else if (selectedOption === "departamento") {
            window.location.href = "/DepartamentoTable";
        }
    };

    const handleLoginClick = () => {
        window.location.href = "http://localhost:5173/";
    };

    const handleLoginClick2 = () => {
        window.location.href = "/navbarCarrusel";
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ backgroundColor: "rgb(32, 32, 32)", color: "black", marginBottom: "20px", padding: "10px" }}>
            <div className="container">
                <div className="d-flex flex-row justify-content-between align-items-center w-100 text-end">
                    <a className="navbar-brand d-flex align-items-center" href="#" style={{ position: "relative" }}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/f/fb/Univalle_bol_cbb_logo.png" alt="Logo" width="80" height="80" className="d-inline-block align-top" style={{ borderRadius: "50%", boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)" }} />
                        <div className="d-flex align-items-end" style={{ position: "absolute", top: "50%", right: "10px", transform: "translateY(-50%)" }}>
                            <button className="btn btn-primary" onClick={handleLoginClick2} style={{ marginLeft: "10px", padding: "10px 20px", borderRadius: "5px", transition: "background-color 0.3s", color: "#fff" }}>
                                Inicio
                            </button>
                            <select className="form-select me-2" id="selectAdmin" style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc", backgroundColor: "rgb(32, 32, 32)", color: "#fff", fontWeight: "bold", transition: "background-color 0.3s" }} onChange={handleAdminSelectChange}>
                                <option value="">Administrador</option>
                                <option value="estudiante">Estudiante</option>
                                <option value="carrera">Carrera</option>
                                <option value="departamento">Departamento</option>
                            </select>
                            <button className="btn btn-primary" onClick={handleLoginClick} style={{ marginLeft: "10px", padding: "10px 20px", borderRadius: "5px", transition: "background-color 0.3s", color: "#fff" }}>
                                Login
                            </button>
                        </div>
                    </a>
                </div>
            </div>            
        </nav>
    );
};

export default Navbar;
