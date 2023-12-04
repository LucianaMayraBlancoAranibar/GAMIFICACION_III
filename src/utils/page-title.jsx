import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react";

export function PageTitle({ heading, children }) {
  return (
    <div className="mx-auto w-full px-4 py-8 text-center lg:w-6/12">
      <Typography variant="h2" style={{ color: 'black' }} className="mb-2 text-4xl font-semibold">
        {heading}
      </Typography>
      <div className="border-b-3 bg-slate-950 mx-auto w-1/4"></div> 
      <Typography variant="lead" color="bg-slate-950" className="mt-4 text-lg">
        {children}
      </Typography>
    </div>
  );
}

PageTitle.propTypes = {
  heading: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
