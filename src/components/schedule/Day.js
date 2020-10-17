import React from 'react';
import { timeFormat } from './../../utils/dateUtil';

export default function DaySchedule(props) {
  return (
    <table key={props.index} className='table table-bordered'>
      <thead className='schedule-day-head'>
        <tr>
          <th colSpan='2'>{props.day}</th>
        </tr>
      </thead>
      
      <tbody className='schedule-day-body'>
        {
          props.schedule.map((hour) => {
            return (
              <tr>

                <td className='hour'>
                  {timeFormat(hour)}
                </td>

                <td className='employee'>
                  asignado
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}
