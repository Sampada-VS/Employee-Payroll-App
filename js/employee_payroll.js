class EmployeePayrollData{
    get id(){ return this._id; }
    set id(id){
        this._id=id;
    }
    get name(){ return this._name; }
    set name(name){
        this._name=name;
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
    get day(){ return this._day; }
    set day(day){
        this._day=day;
    }
    get month(){ return this._month; }
    set month(month){
        this._month=month;
    }
    get year(){ return this._year; }
    set year(year){
        this._year=year;
    }
    get notes(){ return this._notes; }
    set notes(notes){
        this._notes=notes;
    }
    toString(){
        return "Id: "+this.id+", Name: "+this.name+", Gender: "+this.gender+", ProfileImage: "+
        this.profileImg+", Department: "+this.department+", Salary: "+this.salary+", Start date: "+
        this.day+"/"+this.month+"/"+this.year+", Note: "+this.notes;
    }
}