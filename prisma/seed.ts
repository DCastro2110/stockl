import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

const listOfProducts = [
  {
    name: 'Camiseta Estampada - Reserva',
    stock: 150,
    price: 129.9,
  },
  {
    name: 'Calça Jeans Skinny - Colcci',
    stock: 200,
    price: 299.99,
  },
  {
    name: 'Vestido Floral - Farm',
    stock: 80,
    price: 450.0,
  },
  {
    name: 'Bermuda Sarja - Osklen',
    stock: 120,
    price: 220.5,
  },
  {
    name: 'Blusa de Tricô - Hering',
    stock: 180,
    price: 149.9,
  },
  {
    name: 'Jaqueta Corta-Vento - Nike',
    stock: 90,
    price: 350.0,
  },
  {
    name: 'Saia Midi Plissada - Animale',
    stock: 70,
    price: 320.0,
  },
  {
    name: 'Moletom com Capuz - Adidas',
    stock: 110,
    price: 280.0,
  },
  {
    name: 'Camisa Polo - Lacoste',
    stock: 130,
    price: 399.9,
  },
  {
    name: 'Regata Canelada - Zara',
    stock: 250,
    price: 79.9,
  },
  {
    name: 'Calça de Alfaiataria - Le Lis Blanc',
    stock: 60,
    price: 550.0,
  },
  {
    name: 'Blazer Feminino - Dudalina',
    stock: 50,
    price: 799.0,
  },
  {
    name: 'Shorts Jeans Destroyer - Lança Perfume',
    stock: 100,
    price: 250.0,
  },
  {
    name: 'Macacão Pantalona - Shoulder',
    stock: 75,
    price: 480.0,
  },
  {
    name: 'Top Cropped - Amaro',
    stock: 160,
    price: 99.9,
  },
  {
    name: 'Suéter de Lã - Brooksfield',
    stock: 85,
    price: 340.0,
  },
  {
    name: 'Legging Esportiva - Puma',
    stock: 140,
    price: 180.0,
  },
  {
    name: 'Cardigan Alongado - Renner',
    stock: 115,
    price: 169.9,
  },
  {
    name: 'Vestido de Festa - Morena Rosa',
    stock: 40,
    price: 650.0,
  },
  {
    name: 'Calça Jogger - Youcom',
    stock: 135,
    price: 199.9,
  },
  {
    name: 'T-shirt Básica - C&A',
    stock: 300,
    price: 49.99,
  },
  {
    name: 'Jaqueta de Couro Sintético - Riachuelo',
    stock: 65,
    price: 380.0,
  },
  {
    name: "Saia Jeans Curta - Levi's",
    stock: 95,
    price: 230.0,
  },
  {
    name: 'Body Estampado - Salinas',
    stock: 55,
    price: 298.0,
  },
  {
    name: 'Camisa Social Masculina - Aramis',
    stock: 105,
    price: 329.0,
  },
  {
    name: 'Calça Pantalona - Cantão',
    stock: 88,
    price: 379.0,
  },
  {
    name: 'Blusa Ciganinha - Posthaus',
    stock: 170,
    price: 89.9,
  },
  {
    name: 'Colete Acolchoado - Decathlon',
    stock: 78,
    price: 199.99,
  },
  {
    name: 'Pijama de Algodão - Puket',
    stock: 125,
    price: 159.9,
  },
  {
    name: 'Bata Indiana - Mercatto',
    stock: 98,
    price: 139.0,
  },
  {
    name: 'Sobretudo de Lã - John John',
    stock: 45,
    price: 998.0,
  },
  {
    name: 'Chemise Listrada - Maria Filó',
    stock: 68,
    price: 429.0,
  },
  {
    name: 'Calça de Moletom - Fila',
    stock: 155,
    price: 210.0,
  },
  {
    name: 'Blusa Manga Bufante - Dafiti',
    stock: 112,
    price: 119.9,
  },
  {
    name: 'Kimono Estampado - Zinzane',
    stock: 82,
    price: 179.99,
  },
  {
    name: 'Parka Militar - Forever 21',
    stock: 72,
    price: 349.9,
  },
  {
    name: 'Short Saia Alfaiataria - Oh, Boy!',
    stock: 92,
    price: 229.0,
  },
  {
    name: 'Maiô Engana Mamãe - Água de Coco',
    stock: 62,
    price: 499.0,
  },
  {
    name: 'Camiseta Longline - Baw Clothing',
    stock: 145,
    price: 109.0,
  },
  {
    name: 'Salopete Jeans - Malwee',
    stock: 77,
    price: 189.9,
  },
  {
    name: 'Poncho de Lã - Renner',
    stock: 35,
    price: 259.9,
  },
  {
    name: 'Calça Wide Leg - C&A',
    stock: 190,
    price: 179.99,
  },
  {
    name: 'Jardineira Saruel - Farm',
    stock: 48,
    price: 420.0,
  },
  {
    name: 'Blusa Gola Alta - Zara',
    stock: 210,
    price: 129.0,
  },
  {
    name: 'Trench Coat - Burberry',
    stock: 25,
    price: 2500.0,
  },
  {
    name: 'Caftan Estampado - Lenny Niemeyer',
    stock: 42,
    price: 890.0,
  },
  {
    name: 'Calça Cargo - Vans',
    stock: 102,
    price: 310.0,
  },
  {
    name: 'Suquíni Asa Delta - Blue Man',
    stock: 87,
    price: 249.0,
  },
  {
    name: 'Camisa de Flanela Xadrez - Renner',
    stock: 133,
    price: 189.9,
  },
  {
    name: 'Anorak Impermeável - The North Face',
    stock: 58,
    price: 750.0,
  },
];

async function main() {
  const products = await prisma.product.createMany({
    data: listOfProducts,
  });

  console.log(products);
}

main()
  .then(async () => {
    await prisma.$disconnect;
  })
  .catch(async (err) => {
    console.log(err);
    await prisma.$disconnect;
    process.exit(1);
  });
