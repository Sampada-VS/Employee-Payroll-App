class EmployeePayrollData{
    id;
    
    get name(){ return this._name; }
    set name(name){
        let nameRegex=RegExp('^[A-Z][a-z]{2,}$');
        if(nameRegex.test(name))
            this._name=name;
        else
            throw 'Name is incorrect.';
    }
    get profileImg(){ return this._profileImg; }
    set profileImg(profileImg){
        this._profileImg=profileImg;
    }
    get gender(){ return this._gender; }
    set gender(gender){
        this._gender=gender;
    }
    get department(){ return this._department; }
    set department(department){
        this._department=department;
    }
    get salary(){ return this._salary; }
    set salary(salary){
        this._salary=salary;
    }
    get startDate(){ return this._startDate; }
    set startDate(startDate){
        let now=new Date();
        if(startDate > now ) throw 'Start date is a future date';
        var diff=Math.abs(now.getTime()-new Date(startDate).getTime());
        if(diff / (1000*60*60*24) > 30)
            throw 'Start Date is beyond 30 days!';
        this._startDate=startDate;
    } 
    get notes(){ return this._notes; }
    set notes(notes){
        this._notes=notes;
    }
    toString(){
        const options={year:'numeric',month:'short',day:'numeric'};

        const empDate=!this.startDate? "undefined" :
                        new Date(this.startDate).toLocaleDateString("en-GB",options);
        return "Id: "+this.id+", Name: "+this.name+", ProfileImage: "+this.profileImg+
        ", Gender: "+this.gender+", Department: "+this.department+", Salary: "+this.salary+", Start date: "+
        empDate+", Note: "+this.notes;
    }
}
