import React from 'react';
import CustomButton from '../CustomButton/CustomButton';
import './CustomTable.css';

const CustomTable = () => {
   return (
      <table>
         <thead>
               <tr>
               <th>#</th>
               <th>User Name</th>
               <th>User Surname</th>
               <th>User Salary</th>
               <th>Actions</th>
            </tr>
         </thead>

         <tbody>
            <tr>
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               <td>
                  <div>
                  </div>
               </td>
            </tr>
         </tbody>
      </table>
   )
}

export default CustomTable;