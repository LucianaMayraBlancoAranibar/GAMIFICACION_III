import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react";

export function PageTitle({ heading, children }) {
  return (
    <div className="mx-auto w-full px-4 py-8 text-center lg:w-6/12">
      <Typography variant="h2" style={{ color: '#810236' }} className="mb-2 text-4xl font-semibold">
        {heading}
      </Typography>
      <div className="border-b-3 border-red-900 mx-auto w-1/4"></div> {/* Ajuste aquí */}
      <Typography variant="lead" color="gray-600" className="mt-4 text-lg">
        {children}
      </Typography>
    </div>
  );
}

PageTitle.propTypes = {
  heading: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
