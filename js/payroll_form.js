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
