import React, { useContext } from 'react';
import { timeFormat } from '../../utils/dateUtil';
import { MaasContext } from '../context/Context';

export default function DaySchedule(props) {
  const maasContext = useContext(MaasContext);

  return (
    <table key={props.index} className='table table-bordered'>
      <thead className='schedule-day-head'>
        <tr>
          <th colSpan='2'>{props.day}</th>
        </tr>
      </thead>
      
      <tbody className='schedule-day-body'>
        {
          Object.keys(props.schedule).map((hour, index) => {
            const employeeId = props.schedule[hour];
            const employee = maasContext.employees.find(employee => {
              return employee.id === employeeId;
            });

            return (
              <tr key={index}>
                <td className={`hour ${employee ? 'green' : 'red'}`}>
                  {timeFormat(hour)}
                </td>

                <td className={`employee employee-${employeeId}`}>
                  {
                    employee ? employee.name : '⚠️'
                  }
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}
