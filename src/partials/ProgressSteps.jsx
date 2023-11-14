import StepOne from '../pages/TypeAchievementForm'; // Asegúrate de que la ruta sea correcta
import StepTwo from '../pages/BadgeForm'; // Asegúrate de que la ruta sea correcta
import StepThree from '../pages/BadgeStudent'; // Asegúrate de que la ruta sea correcta
import StepFour from '../pages/AchievementForm'; // Asegúrate de que la ruta sea correcta
import StepFive from '../pages/StudentAchievement'; // Asegúrate de que la ruta sea correcta


const ProgressSteps = ({ steps, currentStep }) => {
    const stepComponents = [
      <StepOne />,
      <StepTwo />,
      <StepThree />,
      <StepFour />,
      <StepFive />  // Asegúrate de incluir este si tienes un quinto paso
    ];
  
    return (
      <div>
        <div className="flex justify-between">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col items-center ${
                index <= currentStep ? "text-green-500" : "text-gray-500"
              }`}
            >
              <div
                className={`h-8 w-8 rounded-full ${
                  index <= currentStep ? "bg-green-500" : "bg-gray-300"
                }`}
              ></div>
              <span className="text-sm mt-2">{step}</span>
            </div>
          ))}
        </div>
        <div className="mt-4">
          {stepComponents[currentStep]}
        </div>
      </div>
    );
  };
  export default ProgressSteps;  