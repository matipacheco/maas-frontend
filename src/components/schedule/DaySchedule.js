import React, { Fragment, useContext } from 'react';
import { timeFormat } from '../../utils/dateUtil';
import { MaasContext } from './../context/Context';

export default function DaySchedule(props) {
  const maasContext = useContext(MaasContext);
  const editModeOn = maasContext.editModeOn;

  return (
    <table key={props.index} className='table table-bordered'>
      <thead className='schedule-day-head'>
        <tr>
          <th colSpan={editModeOn ? '1' : '2'}>{props.day}</th>
          {
            editModeOn &&
            <Fragment>
              {
                maasContext.employees.map(employee => {
                  return <th key={employee.id}>{employee.name}</th>
                })
              }
            </Fragment>
          }
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
              <tr key={index} className={`${editModeOn ? 'editable-row' : ''}`}>

                <td className={`hour ${employee ? 'green' : 'red'}`}>
                  {timeFormat(hour)}
                </td>

                {
                  !editModeOn &&
                  <td className={`employee employee-${employee_id}`}>
                    {
                      employee ? employee.name : '⚠️'
                    }
                  </td>
                }

                {
                  editModeOn &&
                  maasContext.employees.map(employee => {
                    return (
                      <td key={employee.id}>
                        <input type='checkbox' value={employee.employee_id} />
                      </td>
                    )
                  })
                }

              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}
