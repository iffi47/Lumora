const photo = (id, width = 700) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;
const products = [
 {id:'lumora-1',name:'Everyday Wireless Headphones',price:79.99,category:'electronics',imageUrl:photo('photo-1546435770-a3e426bf472b'),badge:'Best seller',rating:124},
 {id:'lumora-2',name:'Classic Leather Watch',price:89.99,category:'bags',imageUrl:photo('photo-1524805444758-089113d48a6d'),rating:98},
 {id:'lumora-3',name:'Everyday Sneakers',price:69.99,category:'footwear',imageUrl:photo('photo-1549298916-b41d501d3772'),badge:'New',rating:210},
 {id:'lumora-4',name:'The Everyday Shoulder Bag',price:59.99,category:'bags',imageUrl:photo('photo-1548036328-c9fa89d128fa'),rating:86},
 {id:'lumora-5',name:'Daily Ritual Face Serum',price:34.99,oldPrice:44,category:'beauty',imageUrl:photo('photo-1608571423902-eed4a5ad8108'),badge:'20% off',rating:73},
 {id:'lumora-6',name:'Soft Glow Table Lamp',price:49.99,category:'home-decor',imageUrl:photo('photo-1507473885765-e6ed057f782c'),rating:91},
 {id:'lumora-7',name:'The Relaxed Linen Shirt',price:54.99,category:'fashion',imageUrl:photo('photo-1598033129183-c4f50c736f10'),badge:'New',rating:42},
 {id:'lumora-8',name:'Slow Morning Ceramic Mug',price:24.99,category:'kitchen',imageUrl:photo('photo-1514228742587-6b1558fcca3d'),rating:67},
 {id:'lumora-9',name:'A Little Everyday Luxury',price:39.99,oldPrice:49.99,category:'gifts',imageUrl:photo('photo-1607344645866-009c320b63e0'),badge:'Sale',rating:32},
 {id:'lumora-10',name:'The Reading Corner Chair',price:189.99,category:'home-decor',imageUrl:photo('photo-1567538096630-e0c55bd6374c'),rating:58},
 {id:'lumora-11',name:'Weekend Sunglasses',price:29.99,oldPrice:39.99,category:'bags',imageUrl:photo('photo-1511499767150-a48a237f0083'),badge:'Sale',rating:103},
 {id:'lumora-12',name:'Botanical Living Planter',price:32.99,category:'home-decor',imageUrl:photo('photo-1485955900006-10f4d324d411'),rating:76},
];
const categories = [
 ['home-decor','Home Decor',9],['electronics','Electronics',0],['bags','Bags & Accessories',3],['fashion','Fashion',6],['footwear','Footwear',2],['beauty','Beauty & Personal Care',4],['kitchen','Kitchen & Dining',7],['gifts','Gifts & More',8]
].map(([slug,name,index])=>({slug,name,image:products[index].imageUrl}));

// Used only by the explicit, one-time Firebase seed command.
export const SHOP_DATA = categories.map((category, order) => ({
 title: category.slug, name: category.name, image: category.image, order,
 items: products.filter(product => product.category === category.slug),
}));
