export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    stock: number;
    image: string;
    description: string;
    isRecommended: boolean;
}

export const PRODUCTS: Product[] = [
    {
        id: 1,
        name: "Oli MesinAHM MPX2 10W-40 0,8L",
        category: "Oli Mesin",
        price: 55000,
        stock: 50,
        image: "../product/img1.jpg", // Placeholder for now or assets if valid
        description: "Oli mesin motor AHM berkualitas tinggi.",
        isRecommended: true
    },
    {
        id: 2,
        name: "Oli Mesin YAMALUBE 10W-40 0,8L",
        category: "Oli Mesin",
        price: 52000,
        stock: 40,
        image: "../product/img2.jpg",
        description: "Oli mesin motor YAMALUBE berkualitas tinggi.",
        isRecommended: true
    },
    {
        id: 3,
        name: "Oli Gardan YAMALUBE",
        category: "Oli Gardan",
        price: 17000,
        stock: 30,
        image: "../product/img3.jpg",
        description: "Oli gardan YAMALUBE berkualitas tinggi.",
        isRecommended: false
    },
    {
        id: 4,
        name: "Oli Mesin FEDERAL Matic 10W-30 0,8L",
        category: "Oli Mesin",
        price: 48000,
        stock: 25,
        image: "../product/img4.jpg",
        description: "Oli mesin motor FEDERAL berkualitas tinggi.",
        isRecommended: true
    },
    {
        id: 5,
        name: "Oli Mesin FEDERAL Racing 10W-40 0,8L",
        category: "Oli Mesin",
        price: 68000,
        stock: 30,
        image: "../product/img5.jpg",
        description: "Oli mesin motor FEDERAL berkualitas tinggi.",
        isRecommended: true
    },
    {
        id: 6,
        name: "Oli Gardan FEDERAL Matic 10W-30",
        category: "Oli Gardan",
        price: 17000,
        stock: 15,
        image: "../product/img6.jpg",
        description: "Oli gardan FEDERAL berkualitas tinggi.",
        isRecommended: false
    },
];
