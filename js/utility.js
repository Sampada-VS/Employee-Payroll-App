const stringifyDate=(date) => {
    const options={day:'numeric',month:'short',year:'numeric'};
    const newDate=!date ? 
                    "undefined" :
                    new Date(date).toLocaleDateString('en-GB',options);
    return newDate;
}

const checkName=(name) =>{
    let nameRegex=RegExp('^[A-Z][a-z]{2,}$');
        if(!nameRegex.test(name))
            throw 'Name is incorrect.';
}

const checkStartDate=(startDate) =>{
    let now=new Date();
        if(startDate > now ) throw 'Start date is a future date';
        var diff=Math.abs(now.getTime()-new Date(startDate).getTime());
        if(diff / (1000*60*60*24) > 30)
            throw 'Start Date is beyond 30 days!';
}

const update=(node) => {
    let empPayrollData=empPayrollList.find(empData => empData.id == node.id);
    if(!empPayrollData) return;
    localStorage.setItem('editEmp',JSON.stringify(empPayrollData));
    window.location.replace(site_properties.form_page);
}