import React from "react";
import "./Loader.css";
import { Watch } from "react-loader-spinner";
import propTypes from "prop-types";

const Loader = ({ loading }) => (
  <div className="LoaderItem">
    <Watch
      visible={loading}
      heigth="100"
      width="80"
      color="white"
      ariaLabel="loading"
    ></Watch>
  </div>
);
export default Loader;

Loader.propTypes = {
  loading: propTypes.bool,
};
