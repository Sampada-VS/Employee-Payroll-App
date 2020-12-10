window.addEventListener('DOMContentLoaded',(event)=>{
    createInnerHtml();
});
const createInnerHtml=() =>{
  const headerHtml="<th></th><th>Name</th><th>Gender</th><th>Department</th>"+
                  "<th>Salary</th><th>Start Date</th><th>Actions</th>";
  let innerHtml=`${headerHtml}`;
  let employeePayrollList=createEmployeePayrollJSON();
  for(const employeePayrollData of employeePayrollList){
    innerHtml=`${innerHtml}
    <tr>
      <td><img class="profile" alt="profileImg" src="${employeePayrollData._profileImg}"></td>
      <td>${employeePayrollData._name}</td>
      <td>${employeePayrollData._gender}</td>
      <td>${getDepartmentHtml(employeePayrollData._department)}</td>
      <td>${employeePayrollData._salary}</td>
      <td>${employeePayrollData._startDate}</td>
      <td><img id="${employeePayrollData._id}" onclick="remove(this)" alt="delete" src="../assets/icons/delete-black-18dp.svg">
        <img id="${employeePayrollData._id}" onclick="update(this)" alt="edit" src="../assets/icons/create-black-18dp.svg">
      </td>
    </tr>
  `;
  }
  document.querySelector('#table-display').innerHTML=innerHtml;
}
const getDepartmentHtml=(departmentList) => {
  let departmentHtml='';
  for(const department of departmentList){
    departmentHtml=`${departmentHtml} <div class='dept-label'>${department}</div>`
  }
  return departmentHtml;
}
const createEmployeePayrollJSON=() =>{
  let employeePayrollListLocal=[
    {
      _name:'Terrisa',
      _gender:'Female',
      _department:[
        'HR',
        'Finance'
      ],
      _salary:'300000',
      _startDate:'Thu Dec 03 2020',
      _note:'',
      _id:new Date().getTime(),
      _profileImg:'../assets/profile-images/Ellipse 1.png'
    },
    {
      _name:'Mark',
      _gender:'Male',
      _department:[
        'Finance'
      ],
      _salary:'500000',
      _startDate:'Thu Dec 05 2020',
      _note:'',
      _id:new Date().getTime()+1,
      _profileImg:'../assets/profile-images/Ellipse -2.png'
    }
  ];
  return employeePayrollListLocal
}
