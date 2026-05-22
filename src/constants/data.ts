export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

export type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  image: string;
  menu: MenuItem[];
};

const img = (id: string, w = 600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

function buildMenu(
  restaurantId: string,
  items: Omit<MenuItem, "id">[],
): MenuItem[] {
  return items.map((item, index) => ({
    ...item,
    id: `${restaurantId}-item-${index + 1}`,
  }));
}

export const RESTAURANTS: Restaurant[] = [
  {
    id: "123",
    name: "Bombay Spice House",
    cuisine: "Indian",
    rating: 4.8,
    deliveryTime: "25–35 min",
    image: img("photo-1604908176997-125f25cc6f3d"),
    menu: buildMenu("123", [
      { name: "Butter Chicken", description: "Creamy tomato curry with tender chicken", price: 14.99, image: img("photo-1603894584374-5b4c0a31a848", 400), category: "Mains" },
      { name: "Chicken Biryani", description: "Fragrant basmati rice with spiced chicken", price: 13.49, image: img("photo-1563379091339-03246963d96c", 400), category: "Mains" },
      { name: "Paneer Tikka", description: "Grilled cottage cheese with peppers", price: 11.99, image: img("photo-1565557623262-b51c255ef06c", 400), category: "Starters" },
      { name: "Dal Makhani", description: "Slow-cooked black lentils in cream", price: 10.49, image: img("photo-1546833999-b9c581a517c9", 400), category: "Mains" },
      { name: "Garlic Naan", description: "Soft flatbread with garlic butter", price: 3.99, image: img("photo-1601055921390-9a935afaa627", 400), category: "Sides" },
      { name: "Mango Lassi", description: "Sweet yogurt drink with mango", price: 4.49, image: img("photo-1626200480055-2a156c31993e", 400), category: "Drinks" },
      { name: "Samosas (2 pcs)", description: "Crispy pastry with spiced potato filling", price: 5.99, image: img("photo-1601055921390-9a935afaa627", 400), category: "Starters" },
      { name: "Palak Paneer", description: "Spinach curry with fresh paneer", price: 12.49, image: img("photo-1585937421612-70a008296fbe", 400), category: "Mains" },
      { name: "Chicken Tikka Masala", description: "Char-grilled chicken in rich masala sauce", price: 15.49, image: img("photo-1565557623262-b51c255ef06c", 400), category: "Mains" },
      { name: "Gulab Jamun", description: "Warm milk dumplings in rose syrup", price: 6.99, image: img("photo-1587241321921-58b1c9a9e9f2", 400), category: "Desserts" },
      { name: "Vegetable Korma", description: "Mixed vegetables in mild coconut curry", price: 11.49, image: img("photo-1546833999-b9c581a517c9", 400), category: "Mains" },
      { name: "Masala Chai", description: "Traditional spiced tea with milk", price: 3.49, image: img("photo-1571934811356-7cc10640fc2f", 400), category: "Drinks" },
    ]),
  },
  {
    id: "456",
    name: "Andheri Burger Point",
    cuisine: "American",
    rating: 4.5,
    deliveryTime: "20–30 min",
    image: img("photo-1550547660-d9450f859349"),
    menu: buildMenu("456", [
      { name: "Classic Cheeseburger", description: "Beef patty, cheddar, pickles, special sauce", price: 11.99, image: img("photo-1568909243921-4dcc4c0c0b0b", 400), category: "Burgers" },
      { name: "BBQ Bacon Burger", description: "Smoky BBQ sauce with crispy bacon", price: 13.99, image: img("photo-1553979459-370b7f1932e3", 400), category: "Burgers" },
      { name: "Crispy Chicken Burger", description: "Fried chicken breast with ranch slaw", price: 12.49, image: img("photo-1606755962773-840e9a1a7740", 400), category: "Burgers" },
      { name: "Truffle Fries", description: "Golden fries with truffle oil and parmesan", price: 6.49, image: img("photo-1573080496219-b864a93f89a7", 400), category: "Sides" },
      { name: "Onion Rings", description: "Beer-battered rings with dipping sauce", price: 5.99, image: img("photo-1630384060428-c5b4a8a6a9a6", 400), category: "Sides" },
      { name: "Chicken Wings (8)", description: "Buffalo or honey garlic glaze", price: 10.99, image: img("photo-1527477396000-e27163b481c2", 400), category: "Starters" },
      { name: "Veggie Deluxe", description: "Plant-based patty with avocado", price: 12.99, image: img("photo-1520072959219-cdfcdc0a0d0b", 400), category: "Burgers" },
      { name: "Chocolate Milkshake", description: "Thick shake topped with whipped cream", price: 5.49, image: img("photo-1572490122747-3968b75c699f", 400), category: "Drinks" },
      { name: "Coleslaw Cup", description: "Creamy cabbage and carrot salad", price: 3.49, image: img("photo-1626082927389-6c2db050e4f8", 400), category: "Sides" },
      { name: "Double Stack Burger", description: "Two patties, double cheese, all the fixings", price: 15.99, image: img("photo-1550547660-d9450f859349", 400), category: "Burgers" },
      { name: "Soft Drink", description: "Coke, Sprite, or Fanta — 500ml", price: 2.49, image: img("photo-1622483767028-3ff66e09daff", 400), category: "Drinks" },
      { name: "Brownie Sundae", description: "Warm brownie with vanilla ice cream", price: 7.99, image: img("photo-1606313564200-e75d5e30476f", 400), category: "Desserts" },
    ]),
  },
  {
    id: "789",
    name: "Colaba Sushi Bar",
    cuisine: "Japanese",
    rating: 4.9,
    deliveryTime: "30–40 min",
    image: img("photo-1579584425555-c3ce17fd1871"),
    menu: buildMenu("789", [
      { name: "Salmon Nigiri (2 pcs)", description: "Fresh salmon over seasoned rice", price: 8.99, image: img("photo-1617195737768-786a2e1c8b8e", 400), category: "Sushi" },
      { name: "California Roll", description: "Crab, avocado, cucumber — 8 pieces", price: 10.99, image: img("photo-1579584425555-c3ce17fd1871", 400), category: "Rolls" },
      { name: "Spicy Tuna Roll", description: "Tuna, chili mayo, sesame — 8 pieces", price: 12.49, image: img("photo-1579584425555-c3ce17fd1871", 400), category: "Rolls" },
      { name: "Dragon Roll", description: "Eel, avocado, sweet glaze — 8 pieces", price: 14.99, image: img("photo-1617195737768-786a2e1c8b8e", 400), category: "Rolls" },
      { name: "Miso Soup", description: "Traditional soybean soup with tofu", price: 4.49, image: img("photo-1547592160-28ac329c9c5e", 400), category: "Starters" },
      { name: "Edamame", description: "Steamed soybeans with sea salt", price: 5.49, image: img("photo-1547592160-28ac329c9c5e", 400), category: "Starters" },
      { name: "Chicken Teriyaki Bowl", description: "Grilled chicken, rice, teriyaki glaze", price: 13.99, image: img("photo-1546069901-ba9599a7e63c", 400), category: "Bowls" },
      { name: "Prawn Tempura (5)", description: "Lightly battered prawns with tentsuyu", price: 11.99, image: img("photo-1546069901-ba9599a7e63c", 400), category: "Starters" },
      { name: "Veggie Roll", description: "Cucumber, carrot, avocado — 8 pieces", price: 9.49, image: img("photo-1579584425555-c3ce17fd1871", 400), category: "Rolls" },
      { name: "Green Tea", description: "Hot Japanese sencha", price: 2.99, image: img("photo-1571934811356-7cc10640fc2f", 400), category: "Drinks" },
      { name: "Matcha Ice Cream", description: "Creamy green tea frozen dessert", price: 5.99, image: img("photo-1563805042-7684c019e1cb", 400), category: "Desserts" },
      { name: "Rainbow Roll", description: "Assorted fish over California roll", price: 15.49, image: img("photo-1617195737768-786a2e1c8b8e", 400), category: "Rolls" },
    ]),
  },
  {
    id: "101",
    name: "Bandra Pizza Corner",
    cuisine: "Italian",
    rating: 4.6,
    deliveryTime: "22–32 min",
    image: img("photo-1513104890138-7c749659a591"),
    menu: buildMenu("101", [
      { name: "Margherita Pizza", description: "Tomato, mozzarella, fresh basil", price: 12.99, image: img("photo-1574071318508-1cdbab80d002", 400), category: "Pizza" },
      { name: "Pepperoni Feast", description: "Double pepperoni and extra cheese", price: 14.99, image: img("photo-1628840042765-356cda07504e", 400), category: "Pizza" },
      { name: "BBQ Chicken Pizza", description: "Grilled chicken, red onion, BBQ drizzle", price: 15.49, image: img("photo-1565299624946-b28f40a0ae38", 400), category: "Pizza" },
      { name: "Four Cheese Pizza", description: "Mozzarella, gorgonzola, parmesan, ricotta", price: 15.99, image: img("photo-1513104890138-7c749659a591", 400), category: "Pizza" },
      { name: "Garlic Bread", description: "Toasted baguette with herb butter", price: 5.49, image: img("photo-1619535852120-4599f551aab8", 400), category: "Sides" },
      { name: "Caesar Salad", description: "Romaine, parmesan, croutons, Caesar dressing", price: 8.99, image: img("photo-1546793665-c74683f339c1", 400), category: "Salads" },
      { name: "Pasta Carbonara", description: "Spaghetti, pancetta, egg, pecorino", price: 13.49, image: img("photo-1621996346565-e3dbc646d7a9", 400), category: "Pasta" },
      { name: "Penne Arrabbiata", description: "Spicy tomato sauce with garlic", price: 11.99, image: img("photo-1563379926896-05c745ad0fb4", 400), category: "Pasta" },
      { name: "Tiramisu", description: "Espresso-soaked ladyfingers and mascarpone", price: 7.49, image: img("photo-1571877227200-a0d98ea607e9", 400), category: "Desserts" },
      { name: "Sparkling Water", description: "500ml Italian mineral water", price: 2.99, image: img("photo-1622483767028-3ff66e09daff", 400), category: "Drinks" },
      { name: "Meat Lovers Pizza", description: "Sausage, ham, bacon, beef crumble", price: 16.99, image: img("photo-1628840042765-356cda07504e", 400), category: "Pizza" },
      { name: "Caprese Salad", description: "Tomato, mozzarella, balsamic glaze", price: 9.49, image: img("photo-1546793665-c74683f339c1", 400), category: "Salads" },
    ]),
  },
];

export function getRestaurantById(id: string): Restaurant | undefined {
  return RESTAURANTS.find((r) => r.id === id);
}

export function searchFood(query: string): {
  restaurants: Restaurant[];
  items: { restaurant: Restaurant; item: MenuItem }[];
} {
  const q = query.trim().toLowerCase();
  if (!q) return { restaurants: RESTAURANTS, items: [] };

  const restaurants = RESTAURANTS.filter(
    (r) =>
      r.name.toLowerCase().includes(q) ||
      r.cuisine.toLowerCase().includes(q),
  );

  const items: { restaurant: Restaurant; item: MenuItem }[] = [];
  for (const restaurant of RESTAURANTS) {
    for (const item of restaurant.menu) {
      if (
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      ) {
        items.push({ restaurant, item });
      }
    }
  }

  return { restaurants, items };
}