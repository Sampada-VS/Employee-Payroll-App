let empPayrollList;
window.addEventListener('DOMContentLoaded',(event)=>{
  if(site_properties.use_local_storage.match("true")){
    getEmployeePayrollDataFromStorage();
  }
  else  getEmployeePayrollDataFromServer();
});

const getEmployeePayrollDataFromStorage=() =>{
  empPayrollList= localStorage.getItem("EmployeePayrollList") ?
                JSON.parse(localStorage.getItem("EmployeePayrollList")) : [];
  processEmployeePayrollDataResponse();
}

const processEmployeePayrollDataResponse=() => {
  document.querySelector(".emp-count").textContent=empPayrollList.length;
  createInnerHtml();
  localStorage.removeItem('editEmp');
}

const getEmployeePayrollDataFromServer=() =>{
  makeServiceCall("GET",site_properties.server_url,true)
    .then(responseText =>{
      empPayrollList=JSON.parse(responseText);
      processEmployeePayrollDataResponse();
    })
    .catch(error => {
      console.log("GET Error status: "+JSON.stringify(error));
      empPayrollList=[];
      processEmployeePayrollDataResponse();
    });
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
      <td>${stringifyDate(empPayrollData._startDate)}</td>
      <td><img id="${empPayrollData.id}" onclick="remove(this)" alt="delete" src="../assets/icons/delete-black-18dp.svg">
          <img id="${empPayrollData.id}" onclick="update(this)" alt="edit" src="../assets/icons/create-black-18dp.svg">
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
  let empPayrollData=empPayrollList.find(empData => empData.id == node.id);
  if(!empPayrollData) return;
  const index=empPayrollList.map(empData => empData.id)
                                .indexOf(empPayrollData.id);
  empPayrollList.splice(index,1);
  if(site_properties.use_local_storage.match("true")){
    localStorage.setItem("EmployeePayrollList",JSON.stringify(empPayrollList));
    document.querySelector(".emp-count").textContent=empPayrollList.length;
    createInnerHtml();
  }
  else{
    const deleteURL=site_properties.server_url+empPayrollData.id.toString();
    makeServiceCall("DELETE",deleteURL,false)
      .then(responseText =>{
        document.querySelector(".emp-count").textContent=empPayrollList.length;
        createInnerHtml();
      })
      .catch(error => {
        console.log("DELETE Error status: "+JSON.stringify(error));
      });
  }
}
