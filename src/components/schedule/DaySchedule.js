import React, { useContext } from 'react';
import { timeFormat } from '../../utils/dateUtil';
import { MaasContext } from './../context/Context';

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
          props.schedule.map((hour, index) => {
            // TODO: replace with the real logic
            const employee_id = Math.floor(1 + Math.random() * Math.floor(4));
            const employee = maasContext.employees.find(employee => {
              return employee.id === employee_id
            });

            return (
              <tr key={index}>

                <td className={`hour ${employee ? 'green' : 'red'}`}>
                  {timeFormat(hour)}
                </td>

                <td className={`employee employee-${employee_id}`}>
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
