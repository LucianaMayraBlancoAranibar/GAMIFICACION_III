import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';

class StudentAchievement extends Component {
  state = {
    selectedStudent: null,
    selectedAchievement: null,
    message: '', // Mensaje para mostrar en caso de éxito o error
    studentOptions: [],
    achievementOptions: [],
  };

  componentDidMount() {
    this.loadStudentOptions();
    this.loadAchievementOptions();
  }

  loadStudentOptions = () => {
    axios.get('https://localhost:7005/api/Students')
      .then((response) => {
        const studentOptions = response.data.map((student) => ({
          value: `${student.firstName}, ${student.lastName}`,
          label: `${student.firstName} ${student.lastName}`,
        }));
        this.setState({ studentOptions });
      })
      .catch((error) => {
        console.error('Error al obtener estudiantes:', error);
      });
  };

  loadAchievementOptions = () => {
    axios.get('https://localhost:7005/api/Achievements')
      .then((response) => {
        const achievementOptions = response.data.map((achievement) => ({
          value: achievement.nameAchievemt,
          label: achievement.nameAchievemt,
        }));
        this.setState({ achievementOptions });
      })
      .catch((error) => {
        console.error('Error al obtener logros:', error);
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
      this.setState({ message: 'Por favor, seleccione un estudiante y un logro.' });
      return;
    }

    const studentNameParts = selectedStudent.value.split(', ');
    const studentFirstName = studentNameParts[0];
    const studentLastName = studentNameParts[1];

    const request = {
      StudentName: studentFirstName,
      StudentLastName: studentLastName,
      AchievementName: selectedAchievement.value,
    };

    axios
      .post('https://localhost:7005/api/StudentAchievements/AssignAchievement', request)
      .then((response) => {
        this.setState({ message: response.data });
      })
      .catch((error) => {
        this.setState({ message: error.response.data });
      });
  };

  render() {
    const { selectedStudent, selectedAchievement, message, studentOptions, achievementOptions } = this.state;

    return (
      <div>
        <div>
          <label>Estudiante: </label>
          <Select
            value={selectedStudent}
            onChange={this.handleStudentChange}
            options={studentOptions}
            formatOptionLabel={this.formatStudentOptionLabel}
          />
        </div>
        <div>
          <label>Logro: </label>
          <Select
            value={selectedAchievement}
            onChange={this.handleAchievementChange}
            options={achievementOptions}
          />
        </div>
        <button onClick={this.assignAchievement}>Asignar Logro</button>
        <div>{message}</div>
      </div>
    );
  }
}

export default StudentAchievement;
