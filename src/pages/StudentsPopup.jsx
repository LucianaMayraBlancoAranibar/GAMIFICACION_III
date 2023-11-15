// StudentsPopup.js

function StudentsPopup({ isOpen, students, onClose }) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
        <div className="relative bg-white rounded-lg shadow-lg p-5 md:p-8 max-w-lg mx-auto">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-700">Lista de Estudiantes</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7.707 7.707a1 1 0 011.414-1.414L10 8.586l1.293-1.293a1 1 0 111.414 1.414L11.414 10l1.293 1.293a1 1 0 01-1.414 1.414L10 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L8.586 10 7.293 8.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="mt-3">
            <ul className="max-h-60 overflow-auto">
              {students.map(student => (
                <li key={student.id} className="py-1 border-b border-gray-200">{student.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
  
  export default StudentsPopup;
  