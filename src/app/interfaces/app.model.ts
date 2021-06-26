export interface EmpInterface {
    id: number,
    fname: string;
    lname: string;
    email: string;
    mobile: number;
    salary: number;
    action?:ActionInterface
}

export interface EmpDataInterface {
    employee:Array<EmpInterface>
}

export interface ActionInterface {
    edit?:string;
    delete?:string
}

export interface DialogData{
    empData?:EmpInterface
}