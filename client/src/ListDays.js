import React from "react";

const ListDays = ({ total = 0, days = [] }) => (
  <table border={1} cellPadding={5}>
    <thead>
      <tr>
        <th colSpan={3}>{total} days</th>
      </tr>
    </thead>
    <tbody>
      {days.map(day => (
        <tr key={day.id}>
          <td>{day.mountain}</td>
          <td>{day.date}</td>
          <td>{day.conditions}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ListDays;
