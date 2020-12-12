let isUpdate=false;
let employeePayrollObj={};

window.addEventListener('DOMContentLoaded',(event)=>{
  const name=document.querySelector('#name');
  name.addEventListener('input',function(){
    if(name.value.lenth == 0){
      setTextValue('.text-error',"");
      return;
    }
    try{
      (new EmployeePayrollData()).name=name.value;
      setTextValue('.text-error',"");
    }catch(e){
      setTextValue('.text-error',e);
    }
  });

  const salary=document.querySelector('#salary');
  const salaryOutput=document.querySelector('.salary-output');
  salaryOutput.textContent=salary.value;
  salary.addEventListener('input',function(){
    salaryOutput.textContent=salary.value;
  });

  const date=document.querySelector('#date');
  date.addEventListener('input', function (){
    let startDate=getInputValueById('#day')+" "+getInputValueById('#month')+
                  " "+getInputValueById('#year');
    try{
      (new EmployeePayrollData()).startDate=new Date(Date.parse(startDate));
      setTextValue('.date-error',"");
    }catch(e){
      setTextValue('.date-error',e);
    }
  });

  checkForUpdate();
});

const save = (event) => {
  event.preventDefault();
  event.stopPropagation();
  try{
    setEmployeePayrollObject();
    createAndUpdateStorage();
    resetForm();
    window.location.replace(site_properties.home_page);
  }catch(e){
    return;
  }
}
const setEmployeePayrollObject=()=> {
  employeePayrollObj._name=getInputValueById('#name');
  employeePayrollObj._profileImg=getSelectedValues('[name=profile]').pop();
  employeePayrollObj._gender=getSelectedValues('[name=gender]').pop();
  employeePayrollObj._department=getSelectedValues('[name=department]');
  employeePayrollObj._salary=getInputValueById('#salary');
  employeePayrollObj._notes=getInputValueById('#notes');
  let date=getInputValueById('#day')+" "+getInputValueById('#month')+
            " "+getInputValueById('#year');
  employeePayrollObj._startDate=date;
}

const createAndUpdateStorage=()=>{
  let employeePayrollList=JSON.parse(localStorage.getItem("EmployeePayrollList"));
  if(employeePayrollList){
    let employeePayrollData=employeePayrollList
                          .find(empData => empData._id == employeePayrollObj._id);
    if(!employeePayrollData){
      employeePayrollList.push(createEmployeePayrollData());
    }else{
      const index=employeePayrollList.map(empData => empData._id)
                                    .indexOf(employeePayrollData._id);
      employeePayrollList.splice(index,1,createEmployeePayrollData(employeePayrollData._id));
    }
  }
  else{
    employeePayrollList=[createEmployeePayrollData()];
  }
  localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList));
}

const createEmployeePayrollData=(id)=>{
  let employeePayrollData=new EmployeePayrollData();
  if(!id)
    employeePayrollData.id=createNewEmployeeId();
  else
    employeePayrollData.id=id;
  setEmployeePayrollData(employeePayrollData);
  return employeePayrollData;
}

const setEmployeePayrollData=(employeePayrollData) =>{
  try{
    employeePayrollData.name=getInputValueById('#name');
  }catch(e){
    setTextValue('.text-error',e);
    throw e;
  }
  employeePayrollData.profileImg=employeePayrollObj._profileImg;
  employeePayrollData.gender=employeePayrollObj._gender;
  employeePayrollData.department=employeePayrollObj._department;
  employeePayrollData.salary=employeePayrollObj._salary;
  employeePayrollData.notes=employeePayrollObj._notes;
  try{
    employeePayrollData.startDate=new Date(Date.parse(employeePayrollObj._startDate));
  }catch(e){
    setTextValue('.date-error',e);
    throw e;
  }
  alert(employeePayrollData.toString());
}

const createNewEmployeeId=() =>{
  let empId=localStorage.getItem("EmployeeID");
  empId=!empId ? 1 : (parseInt(empId)+1).toString();
  localStorage.setItem("EmployeeID",empId);
  return empId;
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
const setForm=() => {
  setValue('#name',employeePayrollObj._name);
  setSelectedValues('[name=profile]',employeePayrollObj._profileImg);
  setSelectedValues('[name=gender]',employeePayrollObj._gender);
  setSelectedValues('[name=department]',employeePayrollObj._department);
  setValue('#salary',employeePayrollObj._salary);
  setTextValue('.salary-output',employeePayrollObj._salary);
  setValue('#notes',employeePayrollObj._notes);
  let date=stringifyDate(employeePayrollObj._startDate).split(" ");
  setValue('#day',date[0]);
  setValue('#month',date[1]);
  setValue('#year',date[2]);
}
const resetForm = () => {
  setValue('#name','');
  unsetSelectedValues('[name=profile]');
  unsetSelectedValues('[name=gender]');
  unsetSelectedValues('[name=department]');
  setValue('#salary','');
  setTextValue('.salary-output',400000);
  setValue('#notes','');
  setValue('#day','Day');
  setValue('#month','Month');
  setValue('#year','Year');
  setTextValue('.text-error','');
  setTextValue('.date-error','');
}
const unsetSelectedValues= (propertyValue) => {
  let allItems=document.querySelectorAll(propertyValue);
  allItems.forEach(item => {
    item.checked=false;
  });
}
const setSelectedValues=(propertyValue,value) => {
  let allItems=document.querySelectorAll(propertyValue);
  allItems.forEach(item => {
    if(Array.isArray(value)){
      if(value.includes(item.value)){
        item.checked=true;
      }
    }
    else if(item.value === value)
      item.checked=true;
  });
}
const setValue=(id,value) => {
  const element=document.querySelector(id);
  element.value=value;
}
const setTextValue=(id,value) => {
  const element=document.querySelector(id);
  element.textContent=value;
}
const setSelectedIndex=(id,index) => {
  const element=document.querySelector(id);
  element.setSelectedIndex=index;
}
const checkForUpdate = () => {
  const employeePayrollJson=localStorage.getItem('editEmp');
  isUpdate=employeePayrollJson ? true : false;
  if(!isUpdate) return;
  employeePayrollObj=JSON.parse(employeePayrollJson);
  setForm();
}
