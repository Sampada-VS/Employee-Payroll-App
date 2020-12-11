class EmployeePayrollData{
    get id(){ return this._id; }
    set id(id){
        this._id=id;
    }
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
        let inputDate=startDate.split("-");
        let date=inputDate[2];
        let month=inputDate[1];
        let year=inputDate[0];
        let fullDate=new Date(year+','+month+','+date);
        let currentDate=new Date();
        if(fullDate < currentDate){
          this._startDate=new Date(startDate).toDateString();
        }
        else throw 'Start Date is incorrect.';
    } 
    get notes(){ return this._notes; }
    set notes(notes){
        this._notes=notes;
    }
    toString(){
        return "Id: "+this.id+", Name: "+this.name+", ProfileImage: "+this.profileImg+
        ", Gender: "+this.gender+", Department: "+this.department+", Salary: "+this.salary+", Start date: "+
        this.startDate+", Note: "+this.notes;
    }
}
