import PropTypes from 'prop-types';


export const Filter = ({ value, onChange }) => {
  return (
    <>
      <h2>Find contact by name</h2>
      <input
        type="text"
        name="filter"
        value={value}
        onChange={onChange}
      />
    </>
  );
};

Filter.propType = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};
