export class Register {
    id: number;
    FirstName: string;
    LastName: string;
    Email: string;
    Phone: string;
    Password: string;
    Imageurl: string;
    City: string;
    Address: string;
}
export class Product {
    ProductName: string;
    Productprice: string;
    productDescription: string;
    ProductImage: string;
    DiscountPrice: string;
    category: string;
}

export class SocialLog {
    FirstName: string;
    LastName: string;
    Email: string;
    Role: string;
    Imageurl: string;
    provider: string;
}

export class Cart {
    _id: string;
    ProductName: string;
    Productprice: string;
    productDescription: string;
    ProductImage: string;
    DiscountPrice: string;
    category: string;
    email: string;
}
