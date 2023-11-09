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
        window.location.href = "index.html";
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ backgroundColor: "#3498db", color: "black" }}>
            <div className="container">
                <div className="d-flex flex-row justify-content-between align-items-center w-100">
                    <a className="navbar-brand" href="#">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/f/fb/Univalle_bol_cbb_logo.png" alt="Logo" width="80" height="80" className="d-inline-block align-top" />
                    </a>
                    <div className="d-flex align-items-center">
                        <select className="form-select me-2" id="selectAdmin" style={{ padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }} onChange={handleAdminSelectChange}>
                            <option value="">Administrador</option>
                            <option value="estudiante">Estudiante</option>
                            <option value="carrera">Carrera</option>
                            <option value="departamento">Departamento</option>
                        </select>
                        <button className="btn btn-primary" onClick={handleLoginClick}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
