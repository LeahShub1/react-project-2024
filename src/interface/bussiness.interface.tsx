export interface Service{
    name: string;
    price: number;
    duration:string;
    description:string;
}

export interface Detail{
    id: string;
    name: string;
    address:string;
    phone:string;
    email:string;
    description:string;
}

export interface Meeting {
    id: number;
    serviceType: string;
    date: Date;
    time:string;
    note: string;
    customerName: string;
    email: string;
}