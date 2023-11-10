import React, { Component } from "react";
import axios from "axios";
import Select from "react-select";
import { useParams } from "react-router-dom";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import ModalEdit from "../partials/ModalEdit";

function AssignmentEditWithParams() {
  const { id } = useParams();
  return <AssignmentEdit assignmentId={id} />;
}
class AssignmentEdit extends Component {
  state = {
    selectedStudent: null,
    selectedAchievement: null,
    studentOptions: [],
    achievementOptions: [],
    loading: false,
    error: null,
    modalIsOpen: false,
    sidebarOpen: false,
  };
  setSidebarOpen = (open) => {
    this.setState({ sidebarOpen: open });
  };
  setModalIsOpen = (isOpen) => {
    this.setState({ modalIsOpen: isOpen });
  };
  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };
  componentDidMount() {
    this.loadStudentOptions();
    this.loadAchievementOptions();
    const { id } = this.props;
    if (id) {
      this.loadAssignmentData(id);
    }
  }
  loadStudentOptions = () => {
    axios;
    return axios
      .get("https://localhost:7205/api/Students")
      .then((response) => {
        const studentOptions = response.data.map((student) => ({
          value: student.id, // Suponiendo que cada estudiante tiene un ID
          label: `${student.firstName} ${student.lastName}`,
        }));
        this.setState({ studentOptions });
      })
      .catch((error) => this.setState({ error: error.toString() }));
  };

  loadAchievementOptions = () => {
    axios;
    return axios
      .get("https://localhost:7205/api/Achievements")
      .then((response) => {
        const achievementOptions = response.data.map((achievement) => ({
          value: achievement.id, // Suponiendo que cada logro tiene un ID
          label: achievement.nameAchievemt,
        }));
        this.setState({ achievementOptions });
      })
      .catch((error) => this.setState({ error: error.toString() }));
  };

  loadAssignmentData = () => {
    const { assignmentId } = this.props;
    if (!assignmentId) {
      console.error("assignmentId is undefined");
      return;
    }
    this.setState({ loading: true });
    axios
      .get(`https://localhost:7205/api/StudentAchievements/${assignmentId}`)
      .then((response) => {
        const data = response.data;
        this.setState({
          selectedStudent: this.state.studentOptions.find(
            (option) => option.value === data.studentId
          ),
          selectedAchievement: this.state.achievementOptions.find(
            (option) => option.value === data.achievementId
          ),
          loading: false,
        });
      })
      .catch((error) =>
        this.setState({ error: error.toString(), loading: false })
      );
  };

  handleStudentChange = (selectedStudent) => {
    this.setState({ selectedStudent });
  };

  handleAchievementChange = (selectedAchievement) => {
    this.setState({ selectedAchievement });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { assignmentId } = this.props;
    const { selectedStudent, selectedAchievement } = this.state;
    const assignmentDto = {
      IdStudent: selectedStudent.value,
      IdAchievement: selectedAchievement.value,
      Points: selectedAchievement.points, // Asumiendo que los puntos vienen con la opción del logro
    };

    this.setState({ loading: true });
    axios
      .put(
        `https://localhost:7205/api/StudentAchievements/${assignmentId}`,
        assignmentDto
      )
      .then(() => {
        this.setState({ loading: false });
        this.setModalIsOpen(true);
      })
      .catch((error) =>
        this.setState({ error: error.toString(), loading: false })
      );
  };

  render() {
    const {
      selectedStudent,
      selectedAchievement,
      studentOptions,
      achievementOptions,
      loading,
      sidebarOpen,
      error,
      modalIsOpen,
    } = this.state;

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
      <div className="flex h-screen overflow-hidden">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={this.setSidebarOpen}
        />
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <Header
            sidebarOpen={sidebarOpen}
            setSidebarOpen={this.setSidebarOpen}
          />
          <div className="relative p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
            <div className="relative">
              <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold mb-1">
                Editar Asignacion{" "}
              </h1>
            </div>
            <br></br>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="student">Estudiante</label>
                <Select
                  id="student"
                  value={selectedStudent}
                  onChange={this.handleStudentChange}
                  options={studentOptions}
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              </div>
              <br></br>
              <div className="form-group">
                <label htmlFor="achievement">Logro</label>
                <Select
                  id="achievement"
                  value={selectedAchievement}
                  onChange={this.handleAchievementChange}
                  options={achievementOptions}
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              </div>
              <br></br>
              <br></br>
              <button
                type="submit"
                className="px-10 py-5 leading-5 text-white transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-600"
              >
                Guardar Cambios
              </button>
            </form>
            <ModalEdit
              modalIsOpen={modalIsOpen}
              setModalIsOpen={this.setModalIsOpen}
              closeModal={this.closeModal}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default AssignmentEditWithParams;
