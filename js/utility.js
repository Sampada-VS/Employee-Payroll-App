const update=(node) => {
    let empPayrollData=empPayrollList.find(empData => empData._id == node._id);
    if(!empPayrollData) return;
    localStorage.setItem('editEmp',JSON.stringify(empPayrollData));
    window.location.replace(site_properties.form_page);
}