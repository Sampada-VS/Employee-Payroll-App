let empPayrollList;
window.addEventListener('DOMContentLoaded',(event)=>{
  empPayrollList=getEmployeePayrollDataFromStorage();
  document.querySelector(".emp-count").textContent=empPayrollList.length;
  createInnerHtml();
});

const getEmployeePayrollDataFromStorage=() =>{
  return localStorage.getItem("EmployeePayrollList") ?
                JSON.parse(localStorage.getItem("EmployeePayrollList")) : [];
}
const createInnerHtml=() =>{
  if(empPayrollList.length == 0) return;
  const headerHtml="<th></th><th>Name</th><th>Gender</th><th>Department</th>"+
                  "<th>Salary</th><th>Start Date</th><th>Actions</th>";
  let innerHtml=`${headerHtml}`;
  for(const empPayrollData of empPayrollList){
    innerHtml=`${innerHtml}
    <tr>
      <td><img class="profile" alt="profileImg" src="${empPayrollData._profileImg}"></td>
      <td>${empPayrollData._name}</td>
      <td>${empPayrollData._gender}</td>
      <td>${getDepartmentHtml(empPayrollData._department)}</td>
      <td>${empPayrollData._salary}</td>
      <td>${empPayrollData._startDate}</td>
      <td><img id="${empPayrollData._id}" onclick="remove(this)" alt="delete" src="../assets/icons/delete-black-18dp.svg">
          <img id="${empPayrollData._id}" onclick="update(this)" alt="edit" src="../assets/icons/create-black-18dp.svg">
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
const remove= (node) => {
  let empPayrollData=empPayrollList.find(empData => empData._id == node._id);
  if(!empPayrollData) return;
  const index=empPayrollList.map(empData => empData._id)
                                .indexOf(empPayrollData._id);
  empPayrollList.splice(index,1);
  localStorage.setItem("EmployeePayrollList",JSON.stringify(empPayrollList));
  document.querySelector(".emp-count").textContent=empPayrollList.length;
  createInnerHtml();
}
