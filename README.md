# README

## Dependencies

* App developed using Node version 12.

* Run `yarn install` to install application dependencies.

* Run `yarn start` to start the app on http://localhost:3001. The start script is configured to launch the app on that port, not further configuration needed.

### Notes

The application is mainly composed of the following 3 components.

## 1. Menu

This section shows the information about the Services, Employees, and Weeks registered in the API. This information is gathered requesting information form the following API endpoints respectively:

- Employees: `/api/v1/employees`
- Weeks: `/api/v1/weeks`
- Services: `/api/v1/services`

Note: The information shown on the `employees` table, regarding the number of hours an employee will work on a given week is calculated dynamically. No endpoint request related to this information.

## 2. Navbar

The main component of this section is the _Edit_ button on its rightmost side. Clicking this button changes the content displayed on the third main component of the app, the Schedule.

### 3. Schedule

This component changes its content according to the value of a global state called `editModeOn`.

###### `editModeOn === false`

Shows the confirmed shifts for a given Service, on a particular Week. This information is gathered requesting information from the `/api/v1/monitoring_shifts` API endpoint, giving the Week and Service IDs.


###### `editModeOn === true`

Shows the employee availabilities for a given Service, on a particular Week. This information is gathered requesting information from the `/api/v1/monitoring_shifts/:id/availabilities` API endpoint, giving the Monitoring Shift ID. The employee availabilities displayed on this view are editable. Every time one of the checkboxes is clicked, a PUT request is sent to the `/api/v1/monitoring_shifts/:id/availabilities` API's endpoint, to update that employee's availability.

Note: Once the availabilities update is complete, a PUT request is sent to the `/api/v1/monitoring_shifts` to re-generate the confirmed shifts for that Week-Service pair.
