import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { PageTitle} from "../utils/page-title";
import StudentsPopup from "./StudentsPopup";


function RankMain() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showDataListDiamante, setShowDataListDiamante] = useState(false);
  const [showDataListPlatino, setShowDataListPlatino] = useState(false);
  const [showDataListOro, setShowDataListOro] = useState(false);
  const [showDataListPlata, setShowDataListPlata] = useState(false);
  const [showDataListBronce, setShowDataListBronce] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedRankId, setSelectedRankId] = useState(null);
  const [studentsOfSelectedRank, setStudentsOfSelectedRank] = useState([]);

  const fetchStudentsOfRank = async (rankId) => {
    try {
      const response = await axios.get(`https://localhost:7205/api/Students/GetStudentsByRank/${rankId}`);
      setStudentsOfSelectedRank(response.data);
      setIsPopupOpen(true);
    } catch (error) {
      console.error("Error al cargar estudiantes:", error);
    }
  };

  const handleClickRank = (rankId) => {
    setSelectedRankId(rankId);
    fetchStudentsOfRank(rankId);
  };
  
  const toggleDataList = (option) => {
    switch (option) {
      case "DIAMANTE":
        setShowDataListDiamante(!showDataListDiamante);
        break;
      case "PLATINO":
        setShowDataListPlatino(!showDataListPlatino);
        break;
      case "ORO":
        setShowDataListOro(!showDataListOro);
        break;
      case "PLATA":
        setShowDataListPlata(!showDataListPlata);
        break;
      case "BRONCE":
        setShowDataListBronce(!showDataListBronce);
        break;
      default:
        break;
    }
  };

  return (
    <div style={{ background: 'white' }}>
      <PageTitle heading="Ranking Académico de Estudiantes">
      Descubre a los estudiantes destacados de nuestra universidad, clasificados por sus logros académicos y contribuciones extracurriculares. Celebramos su dedicación y excelencia en diversos campos del saber.
          </PageTitle>
      <div className=" flex flex-col items-center pt-5">
        <button
          className="font-bold	text-xl	pt-2 w-2/12 h-24 bg-gradient-to-t from-cyan-300 to-blue-500 shadow rounded flex justify-center items-center"
          onClick={() => toggleDataList("DIAMANTE")}
        >
          <p className="fontSizeRank">DIAMANTE</p>
        </button>
        {showDataListDiamante && (
          <div className="bg-cyan-300 w-2/12 shadow rounded p-4 text-center text-white fade-in">
            <div className="py-2 fontSizeSubrank">
            <a onClick={() => handleClickRank(17)}>Rango 1</a>
            </div>
            <div className="py-2 fontSizeSubrank">
            <a onClick={() => handleClickRank(18)}>Rango 1</a>
            </div>
            <div className="py-2 fontSizeSubrank">
            <a onClick={() => handleClickRank(19)}>Rango 1</a>
            </div>
          </div>
        )}
        <button
          className="font-bold fontSizeRank text-xl	mt-2  w-4/12 h-24 bg-gradient-to-t from-cyan-200 to-gray-200 shadow rounded flex justify-center items-center"
          onClick={() => toggleDataList("PLATINO")}
        >
          <p className="fontSizeRank">PLATINO</p>
        </button>
        {showDataListPlatino && (
          <div className="bg-cyan-200 w-4/12 shadow rounded p-4 text-center text-white fade-in">
            <div className="py-2 fontSizeSubrank">
            <a onClick={() => handleClickRank(14)}>Rango 1</a>
            </div>
            <div className="py-2 fontSizeSubrank">
            <a onClick={() => handleClickRank(15)}>Rango 1</a>
            </div>
            <div className="py-2 fontSizeSubrank">
            <a onClick={() => handleClickRank(16)}>Rango 1</a>
            </div>
          </div>
        )}
        <button
          className="font-bold fontSizeRank text-xl	 mt-2  w-6/12 h-24 bg-gradient-to-t from-yellow-400 to-yellow-200 shadow rounded flex justify-center items-center"
          onClick={() => toggleDataList("ORO")}
        >
          <p className="fontSizeRank">ORO</p>
        </button>
        {showDataListOro && (
          <div className="bg-yellow-400 w-6/12 shadow rounded p-4 text-center text-white	fade-in">
            <div className="py-2 fontSizeSubrank">
            <a onClick={() => handleClickRank(11)}>Rango 1</a>
            </div>
            <div className="py-2 fontSizeSubrank">
            <a onClick={() => handleClickRank(12)}>Rango 1</a>
            </div>
            <div className="py-2 fontSizeSubrank">
            <a onClick={() => handleClickRank(13)}>Rango 1</a>
            </div>
          </div>
        )}
        <button
          className="font-bold fontSizeRank text-xl	 mt-2  w-8/12 h-24 bg-gradient-to-t from-gray-400 to-gray-200 shadow rounded flex justify-center items-center"
          onClick={() => toggleDataList("PLATA")}
        >
          <p className="fontSizeRank">PLATA</p>
        </button>
        {showDataListPlata && (
          <div className="bg-gray-400 w-8/12 shadow rounded p-4 text-center text-white fade-in">
            <div className="py-2 fontSizeSubrank">
              <a onClick={() => handleClickRank(8)}>Rango 1</a>
            </div>
            <div className="py-2 fontSizeSubrank">
              <a onClick={() => handleClickRank(9)}>Rango 2</a>
            </div>
            <div className="py-2 fontSizeSubrank">
              <a onClick={() => handleClickRank(10)}>Rango 3</a>
            </div>
          </div>
        )}
        <button
          className="font-bold fontSizeRank text-xl	 mt-2  w-10/12 h-24 bg-gradient-to-t from-amber-600 to-amber-700 shadow rounded flex justify-center items-center"
          onClick={() => toggleDataList("BRONCE")}
        >
          <p className="fontSizeRank">BRONCE</p>
        </button>
        {showDataListBronce && (
          <div className="bg-amber-600 w-10/12 shadow rounded p-4 text-center text-white fade-in">
            <div className="py-2 fontSizeSubrank">
            <a onClick={() => handleClickRank(5)}>Rango 1</a>
            </div>
            <div className="py-2 fontSizeSubrank">
            <a onClick={() => handleClickRank(6)}>Rango 1</a>
            </div>
            <div className="py-2 fontSizeSubrank">
            <a onClick={() => handleClickRank(7)}>Rango 1</a>
            </div>
          </div>
        )}
      </div>
      <StudentsPopup
        isOpen={isPopupOpen}
        students={studentsOfSelectedRank}
        onClose={() => setIsPopupOpen(false)}
      />
    </div>
  );
}

export default RankMain;
