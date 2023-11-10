import React, { Component, useState} from "react";
import axios from "axios";
import Select from "react-select";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import ModalConfirmacion from "../partials/ModalConfirmacion";
import { Link } from "react-router-dom";



class StudentAchievement extends Component {
  
  state = {
    selectedStudent: null,
    selectedAchievement: null,
    message: "", 
    studentOptions: [],
    achievementOptions: [],
    sidebarOpen: false,
    modalIsOpen: false,
  };
  setSidebarOpen = (open) => {
    this.setState({ sidebarOpen: open });
  };

  setModalIsOpen = (isOpen) => {
    this.setState({ modalIsOpen: isOpen });
  };
  componentDidMount() {
    this.loadStudentOptions();
    this.loadAchievementOptions();
  }

  loadStudentOptions = () => {
    axios
      .get("https://localhost:7205/api/Students")
      .then((response) => {
        const studentOptions = response.data.map((student) => ({
          value: `${student.firstName}, ${student.lastName}`,
          label: `${student.firstName} ${student.lastName}`,
        }));
        this.setState({ studentOptions });
      })
      .catch((error) => {
        console.error("Error al obtener estudiantes:", error);
      });
  };

  loadAchievementOptions = () => {
    axios
      .get("https://localhost:7205/api/Achievements")
      .then((response) => {
        const achievementOptions = response.data.map((achievement) => ({
          value: achievement.nameAchievemt,
          label: achievement.nameAchievemt,
        }));
        this.setState({ achievementOptions });
      })
      .catch((error) => {
        console.error("Error al obtener logros:", error);
      });
  };

  formatStudentOptionLabel = ({ value, label }) => {
    return label; // Muestra las opciones sin comas
  };

  handleStudentChange = (selectedStudent) => {
    this.setState({ selectedStudent });
  };

  handleAchievementChange = (selectedAchievement) => {
    this.setState({ selectedAchievement });
  };

  assignAchievement = () => {
    const { selectedStudent, selectedAchievement } = this.state;

    if (!selectedStudent || !selectedAchievement) {
      this.setState({
        message: "Por favor, seleccione un estudiante y un logro.",
      });
      return;
    }

    const studentNameParts = selectedStudent.value.split(", ");
    const studentFirstName = studentNameParts[0];
    const studentLastName = studentNameParts[1];
    

    const request = {
      StudentName: studentFirstName,
      StudentLastName: studentLastName,
      AchievementName: selectedAchievement.value,
    };

    axios
      .post(
        "https://localhost:7205/api/StudentAchievements/AssignAchievement",
        request
      )
      .then((response) => {
        this.setState({ message: response.data });
      })
      .catch((error) => {
        this.setState({ message: error.response.data });
      });
  };

  render() {
    
    const {
      selectedStudent,
      selectedAchievement,
      message,
      studentOptions,
      achievementOptions,
      sidebarOpen,
      modalIsOpen
    } = this.state;

    return (
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={this.setSidebarOpen} />
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={this.setSidebarOpen} />
          <div className="relative p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
            <div className="relative">
              <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold mb-1">
                Asignacion de logro{" "}
              </h1>
            </div>
            <br></br>
            <div>
              <div>
                <label>Estudiante </label>
                <br></br>
              
                <Select
                  value={selectedStudent}
                  onChange={this.handleStudentChange}
                  options={studentOptions}
                  formatOptionLabel={this.formatStudentOptionLabel}
                />
              </div>
              <br></br>
      
              <div>
                <label>Logro </label>
                <br></br>
                
                <Select
                  value={selectedAchievement}
                  onChange={this.handleAchievementChange}
                  options={achievementOptions}
                />
              </div>
              <br></br>
              <br></br>
              <button  className="px-10 py-5 leading-5 text-white transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-600"
              type="submit" onClick={this.assignAchievement}>Asignar Logro</button>
              <div>{message}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StudentAchievement;
