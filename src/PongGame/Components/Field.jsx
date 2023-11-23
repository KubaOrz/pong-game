import React from 'react';
import './Field.css';

const Field = ({ children }) => {
  return (
    <div>
      <table className="field">
        <tr className="row">
            <td className="topLeft"></td>
            <td className="topRight"></td>
        </tr>
        <tr className="row">
            <td className="midLeft"></td>
        </tr>
        <tr className="row">
            <td className="bottomLeft"></td>
            <td className="bottomRight"></td>
        </tr>
    </table>
    { children }
    </div>
  );
};

export default Field;
