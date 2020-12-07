window.addEventListener('DOMContentLoaded',(event)=>{
  const name=document.querySelector('#name');
  const textError=document.querySelector('.text-error');
  name.addEventListener('input',function(){
    if(name.value.lenth == 0){
      textError.textContent="";
      return;
    }
    try{
      (new EmployeePayrollData()).name=name.value;
      textError.textContent="";
    }catch(e){
      textError.textContent=e;
    }
  });

  const start_date=document.querySelector('#startDate');
  const dateError=document.querySelector('.date-error');
  start_date.addEventListener('input',function(){
    if(start_date.value == 0){
      dateError.textContent="";
      return;
    }
    try{
      (new EmployeePayrollData()).startDate=start_date.value;
      dateError.textContent="";
    }catch(e){
      dateError.textContent=e;
    }
  });

  const salary=document.querySelector('#salary');
  const salaryOutput=document.querySelector('.salary-output');
  salaryOutput.textContent=salary.value;
  salary.addEventListener('input',function(){
    salaryOutput.textContent=salary.value;
  });
});

const save = () => {
  try{
    let employeePayrollData=createEmployeePayroll();
    createAndUpdateStorage(employeePayrollData);
  }catch(e){
    return;
  }
}
function createAndUpdateStorage(employeePayrollData){
  let employeePayrollList=JSON.parse(localStorage.getItem("EmployeePayrollList"));
  if(employeePayrollList != undefined){
    employeePayrollList.push(employeePayrollData);
  }
  else{
    employeePayrollList=[employeePayrollData];
  }
  alert(employeePayrollList.toString());
  localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList));
}
const createEmployeePayroll = () => {
  let employeePayrollData=new EmployeePayrollData();
  try{
    employeePayrollData.name=getInputValueById('#name');
  }catch(e){
    setTextValue('.text-error',e);
    throw e;
  }
  employeePayrollData.profileImg=getSelectedValues('[name=profile]').pop();
  employeePayrollData.gender=getSelectedValues('[name=gender]').pop();
  employeePayrollData.department=getSelectedValues('[name=department]');
  employeePayrollData.salary=getInputValueById('#salary');
  employeePayrollData.notes=getInputValueById('#notes');
  employeePayrollData.startDate=getInputValueById('#startDate');
  alert(employeePayrollData.toString());
  return employeePayrollData;
}
const getSelectedValues=(propertyValue) => {
  let allItems=document.querySelectorAll(propertyValue);
  let selItems=[];
  allItems.forEach(item => {
    if(item.checked)
      selItems.push(item.value);
  });
  return selItems;
}
const getInputValueById=(id) => {
  let value=document.querySelector(id).value;
  return value;
}
