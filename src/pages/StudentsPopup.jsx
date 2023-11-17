// StudentsPopup.js

function StudentsPopup({ isOpen, students, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      id="static-modal"
      data-modal-backdrop="static"
      tabindex="-1"
      aria-hidden="true"
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center"
    >
      <div className="relative bg-white p-4 w-full  rounded-lg max-w-2xl max-h-full">
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Lista de Estudiantes
          </h3>
          <button
            type="button"
            onClick={onClose}
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="static-modal"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <div class="p-4 md:p-5 space-y-4">
          <ul className="max-h-60 overflow-auto">
            {students.map((student) => (
              <li
                key={student.id}
                className="text-base leading-relaxed text-gray-500 dark:text-gray-400"
              >
                {student.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default StudentsPopup;
