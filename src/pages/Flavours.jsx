import { useState } from "react";
import { FaStar, FaLeaf, FaFire, FaTimes } from "react-icons/fa";

const flavorsList = [
  { id: 1, name: "Belgian Chocolate", desc: "Rich, dense dark chocolate perfection.", color: "from-neutral-800 to-yellow-900", tag: "Best Seller", icon: <FaFire className="text-orange-500" />, price: 120 },
  { id: 2, name: "Madagascar Vanilla", desc: "Classic, creamy with real vanilla bean.", color: "from-yellow-100 to-orange-100", tag: "", icon: null, price: 20 },
  { id: 3, name: "Strawberry Swirl", desc: "Fresh picked strawberries blended smooth.", color: "from-pink-400 to-rose-400", tag: "Popular", icon: <FaStar className="text-yellow-400" />, price: 100 },
  { id: 4, name: "Salted Caramel", desc: "Sweet caramel with a hint of sea salt.", color: "from-amber-400 to-orange-400", tag: "Fan Favorite", icon: <FaStar className="text-yellow-400" />, price: 110 },
  { id: 5, name: "Mint Choco Chip", desc: "Refreshing mint with rich chocolate chips.", color: "from-emerald-300 to-teal-400", tag: "", icon: null, price: 90 },
  { id: 6, name: "Mango Sorbet", desc: "Tropical Alphonso mangoes, dairy-free.", color: "from-yellow-400 to-amber-500", tag: "Vegan", icon: <FaLeaf className="text-green-500" />, price: 90 },
  { id: 7, name: "Cookies & Cream", desc: "Vanilla loaded with chocolate cookies.", color: "from-gray-200 to-gray-400", tag: "New", icon: <FaFire className="text-orange-500" />, price: 100 },
  { id: 8, name: "Pistachio Delight", desc: "Roasted pistachios in a creamy base.", color: "from-lime-300 to-green-400", tag: "", icon: null, price: 130 },
  { id: 9, name: "Raspberry Ripple", desc: "Tart raspberries folded into sweet cream.", color: "from-rose-500 to-red-500", tag: "", icon: null, price: 110 },
  { id: 10, name: "Coffee Espresso", desc: "Bold espresso roast for coffee lovers.", color: "from-stone-600 to-stone-800", tag: "", icon: null, price: 100 },
  { id: 11, name: "Lemon Basil", desc: "Zesty lemon paired with fresh basil.", color: "from-yellow-200 to-lime-200", tag: "Vegan", icon: <FaLeaf className="text-green-500" />, price: 20 },
  { id: 12, name: "Coconut Bliss", desc: "Creamy coconut milk and shredded coconut.", color: "from-slate-100 to-stone-200", tag: "Vegan", icon: <FaLeaf className="text-green-500" />, price: 90 },
  { id: 13, name: "Passionfruit", desc: "Exotic and tart passionfruit rush.", color: "from-orange-300 to-amber-500", tag: "", icon: null, price: 100 },
  { id: 14, name: "Hazelnut Mocha", desc: "Chocolate infused with roasted hazelnut.", color: "from-yellow-700 to-amber-900", tag: "Popular", icon: <FaStar className="text-yellow-400" />, price: 120 },
  { id: 15, name: "Wild Blueberry", desc: "Antioxidant-rich wild blueberries.", color: "from-indigo-400 to-purple-500", tag: "", icon: null, price: 110 },
  { id: 16, name: "Matcha Green Tea", desc: "Earthy, premium Japanese matcha.", color: "from-lime-500 to-emerald-600", tag: "Healthy", icon: <FaLeaf className="text-green-500" />, price: 130 },
  { id: 17, name: "Dulce de Leche", desc: "Sweet, milk caramel from Latin America.", color: "from-amber-200 to-yellow-500", tag: "", icon: null, price: 120 },
  { id: 18, name: "Black Forest", desc: "Cherry, chocolate, and cream mix.", color: "from-red-800 to-neutral-900", tag: "", icon: null, price: 130 },
  { id: 19, name: "Peach Cobbler", desc: "Spiced peaches with biscuit crumbles.", color: "from-orange-200 to-orange-400", tag: "Limited", icon: <FaFire className="text-orange-500" />, price: 140 },
  { id: 20, name: "Cookie Dough", desc: "Vanilla with chunks of chocolate chip dough.", color: "from-yellow-100 to-amber-200", tag: "Best Seller", icon: <FaFire className="text-orange-500" />, price: 110 },
  { id: 21, name: "Watermelon", desc: "Juicy, refreshing summer watermelon.", color: "from-red-400 to-rose-500", tag: "Vegan", icon: <FaLeaf className="text-green-500" />, price: 20 },
  { id: 22, name: "Cotton Candy", desc: "Fun, spun sugar flavor for kids.", color: "from-pink-300 to-cyan-300", tag: "Kids Choice", icon: <FaStar className="text-yellow-400" />, price: 80 },
  { id: 23, name: "Bubblegum", desc: "Classic blue bubblegum taste.", color: "from-cyan-400 to-blue-500", tag: "", icon: null, price: 80 },
  { id: 24, name: "Tiramisu", desc: "Mascarpone, coffee, and cocoa dusted.", color: "from-yellow-600 to-stone-700", tag: "", icon: null, price: 150 },
  { id: 25, name: "Pineapple Coconut", desc: "Piña colada inspired tropical treat.", color: "from-yellow-300 to-yellow-500", tag: "", icon: null, price: 100 },
  { id: 26, name: "Red Velvet", desc: "Cocoa cake flavor with cream cheese icing.", color: "from-red-600 to-rose-800", tag: "", icon: null, price: 130 },
  { id: 27, name: "Lavender Honey", desc: "Floral lavender infused with sweet honey.", color: "from-purple-300 to-fuchsia-400", tag: "Unique", icon: <FaStar className="text-yellow-400" />, price: 120 },
  { id: 28, name: "Cheesecake", desc: "Tangy cream cheese and graham cracker.", color: "from-orange-100 to-yellow-200", tag: "", icon: null, price: 140 },
  { id: 29, name: "Almond Joy", desc: "Coconut, chocolate, and roasted almonds.", color: "from-stone-300 to-stone-500", tag: "", icon: null, price: 110 },
  { id: 30, name: "Guava", desc: "Sweet and tropical pink guava.", color: "from-rose-300 to-pink-500", tag: "Vegan", icon: <FaLeaf className="text-green-500" />, price: 90 },
  { id: 31, name: "Blackberry Smash", desc: "Dark blackberries with a hint of lemon.", color: "from-purple-800 to-fuchsia-900", tag: "", icon: null, price: 110 },
  { id: 32, name: "Cinnamon Crunch", desc: "Cinnamon spice with crunchy cereal bits.", color: "from-orange-300 to-orange-500", tag: "", icon: null, price: 90 },
  { id: 33, name: "Maple Walnut", desc: "Maple syrup sweetness with crunchy walnuts.", color: "from-amber-600 to-amber-800", tag: "", icon: null, price: 130 },
  { id: 34, name: "Key Lime Pie", desc: "Tart lime and sweet crumbled crust.", color: "from-lime-200 to-lime-400", tag: "", icon: null, price: 140 },
  { id: 35, name: "Banana Split", desc: "Banana, chocolate chunks, and walnuts.", color: "from-yellow-200 to-yellow-400", tag: "", icon: null, price: 120 },
  { id: 36, name: "Peanut Butter Cup", desc: "Peanut butter base with chocolate cups.", color: "from-yellow-600 to-amber-700", tag: "Popular", icon: <FaStar className="text-yellow-400" />, price: 130 },
  { id: 37, name: "Oreo Mint", desc: "Minty freshness combined with Oreo.", color: "from-emerald-200 to-teal-400", tag: "", icon: null, price: 110 },
  { id: 38, name: "White Chocolate", desc: "Silky smooth cocoa butter richness.", color: "from-gray-50 to-stone-200", tag: "", icon: null, price: 100 },
  { id: 39, name: "Ube (Taro)", desc: "Sweet purple yam from the Philippines.", color: "from-purple-400 to-purple-600", tag: "Trending", icon: <FaFire className="text-orange-500" />, price: 120 },
  { id: 40, name: "Lychee Sorbet", desc: "Floral and sweet Asian lychee.", color: "from-red-100 to-pink-200", tag: "Vegan", icon: <FaLeaf className="text-green-500" />, price: 110 },
  { id: 41, name: "Earl Grey Tea", desc: "Bergamot infused black tea.", color: "from-stone-300 to-gray-500", tag: "", icon: null, price: 100 },
  { id: 42, name: "Chai Spice", desc: "Cardamom, cinnamon, and ginger blend.", color: "from-amber-500 to-orange-600", tag: "", icon: null, price: 90 },
  { id: 43, name: "Blood Orange", desc: "Deep red, zesty blood orange citrus.", color: "from-orange-500 to-red-500", tag: "", icon: null, price: 110 },
  { id: 44, name: "Pomegranate", desc: "Tart and sweet tropical ruby fruit.", color: "from-rose-600 to-rose-800", tag: "", icon: null, price: 120 },
  { id: 45, name: "Butter Pecan", desc: "Buttery base packed with roasted pecans.", color: "from-amber-300 to-yellow-600", tag: "", icon: null, price: 130 },
  { id: 46, name: "Cherry Vanilla", desc: "Sweet cream layered with dark cherries.", color: "from-pink-100 to-red-400", tag: "", icon: null, price: 110 },
  { id: 47, name: "S'mores", desc: "Toasted marshmallow and graham crackers.", color: "from-stone-200 to-stone-400", tag: "", icon: null, price: 120 },
  { id: 48, name: "Rocky Road", desc: "Chocolate, marshmallows, and almonds.", color: "from-neutral-700 to-black", tag: "", icon: null, price: 120 },
  { id: 49, name: "Toffee Caramel", desc: "Sweet toffee bits swirled in caramel.", color: "from-amber-500 to-yellow-700", tag: "", icon: null, price: 110 },
  { id: 50, name: "Papaya sorbet", desc: "Refreshing, tropical pure papaya.", color: "from-orange-300 to-rose-400", tag: "Vegan", icon: <FaLeaf className="text-green-500" />, price: 90 },
  { id: 22, name: "Tender Coconut", desc: "Smooth coconut water with tender coconut flesh.", color: "from-slate-100 to-stone-200", tag: "Vegan", icon: <FaLeaf className="text-green-500" />, price: 100 },
  { id: 23, name: "Pista", desc: "Nutty pistachio flavor with a creamy texture.", color: "from-lime-300 to-green-400", tag: "Popular", icon: <FaStar className="text-yellow-400" />, price: 110 },
  { id: 24, name: "Kitkat", desc: "Chocolate and wafer crunch inspired by Kitkat.", color: "from-red-600 to-stone-800", tag: "", icon: null, price: 120 },
  { id: 25, name: "Litchi", desc: "Sweet litchi flavor with floral notes.", color: "from-pink-100 to-red-200", tag: "", icon: null, price: 90 },
];

const Flavours = () => {
  const [selectedFlavor, setSelectedFlavor] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Pink Hero Banner */}
      <div className="bg-primary text-white w-full pt-36 pb-28 text-center shadow-md">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Unique Flavours</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto font-medium">
            Discover our collection of 50 handcrafted, mouth-watering ice pops and ice creams. Made with love and premium ingredients.
          </p>
        </div>
      </div>

      <div className="container-custom py-16 flex-grow">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {flavorsList.map((flavor) => (
            <div 
              key={flavor.id} 
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col transform hover:-translate-y-2 border border-gray-100"
            >
              {/* Product Placeholder Image (Gradient) */}
              <div className={`h-40 w-full bg-gradient-to-br ${flavor.color} relative overflow-hidden flex items-center justify-center`}>
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                {/* Visual Stick representation */}
                <div className="absolute bottom-[-10px] w-6 h-12 bg-amber-200 rounded-lg shadow-inner z-10 transform scale-y-110"></div>
                <div className="w-20 h-32 bg-white/20 backdrop-blur-sm rounded-t-full rounded-b-xl shadow-lg border border-white/30 z-20 flex items-center justify-center">
                  <span className="text-white/80 font-bold text-xs uppercase tracking-widest rotate-[-90deg] whitespace-nowrap">Chillpops</span>
                </div>
                
                {/* Tag */}
                {flavor.tag && (
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm flex items-center gap-1 z-30">
                    {flavor.icon}
                    {flavor.tag}
                  </div>
                )}
              </div>

              {/* Flavor Details */}
              <div className="p-5 flex-grow flex flex-col text-center">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{flavor.name}</h3>
                <p className="text-sm text-gray-500 mb-3 flex-grow">{flavor.desc}</p>
                <div className="text-xl font-bold text-primary mb-4">₹{flavor.price}</div>
                <button 
                  onClick={() => setSelectedFlavor(flavor)}
                  className="mt-auto w-full py-2 rounded-lg bg-pink-50 text-primary font-semibold text-sm hover:bg-primary hover:text-white transition-colors"
                >
                  View Detail
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Flavor Details Popup Modal */}
      {selectedFlavor && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedFlavor(null)}
        >
          <div 
            className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-3xl w-full flex flex-col md:flex-row relative transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedFlavor(null)}
              className="absolute top-4 right-4 z-20 text-gray-400 hover:text-gray-800 transition-colors p-1"
            >
              <FaTimes className="text-2xl" />
            </button>
            
            {/* Visual Panel */}
            <div className={`w-full md:w-2/5 min-h-[300px] flex flex-col items-center justify-center bg-gradient-to-br ${selectedFlavor.color} relative overflow-hidden`}>
              <div className="absolute inset-0 bg-white/20 opacity-30"></div>
              {selectedFlavor.tag && (
                 <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm flex items-center gap-1 z-30">
                    {selectedFlavor.icon}
                    {selectedFlavor.tag}
                  </div>
              )}
              
              <div className="relative mt-4 flex flex-col items-center justify-center">
                 {/* Stick */}
                 <div className="absolute bottom-[-20px] w-8 h-20 bg-amber-200/90 rounded-lg shadow-inner z-10 mx-auto"></div>
                 {/* Popsicle Body */}
                 <div className="w-32 h-48 bg-white/20 backdrop-blur-md rounded-t-full rounded-b-xl shadow-2xl border border-white/40 z-20 flex items-center justify-center">
                    <span className="text-white/90 font-black tracking-widest rotate-[-90deg] whitespace-nowrap text-xl shadow-sm">CHILLPOPS</span>
                 </div>
              </div>
            </div>

            {/* Information Panel */}
            <div className="w-full md:w-3/5 p-8 flex flex-col justify-center bg-white relative z-10">
              <h2 className="text-3xl font-black text-gray-800 mb-2">{selectedFlavor.name}</h2>
              <p className="text-gray-500 mb-6 text-lg">{selectedFlavor.desc}</p>
              
              <div className="bg-gray-50 rounded-xl p-5 mb-6 border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-500 font-medium">Price per unit</span>
                  <span className="text-3xl font-black text-primary">₹{selectedFlavor.price}</span>
                </div>
                
                <div className="h-px bg-gray-200 w-full mb-4"></div>
                
                <div className="text-sm text-gray-600 space-y-3">
                  <p className="flex flex-col">
                    <strong className="text-gray-800 uppercase tracking-wide text-xs">Ingredients</strong>
                    <span>Premium ice cream base, natural {selectedFlavor.name.split(' ')[0]} flavor extracts, cane sugar, plant-based stabilizers.</span>
                  </p>
                  <p className="flex flex-col">
                    <strong className="text-gray-800 uppercase tracking-wide text-xs">Dietary Info</strong>
                    <span>{selectedFlavor.tag === "Vegan" ? "100% Dairy-Free & Vegan." : "Contains milk and dairy."} May contain traces of nuts.</span>
                  </p>
                  <p className="flex flex-col">
                    <strong className="text-gray-800 uppercase tracking-wide text-xs">Nutritional Facts</strong>
                    <span>Approx. {selectedFlavor.tag === "Healthy" || selectedFlavor.tag === "Vegan" ? "85" : "140"} kcal per serving | No artificial preservatives.</span>
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => setSelectedFlavor(null)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl transition-colors shadow-sm"
                >
                  Back to Menu
                </button>
                <button className="flex-[2] bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-colors shadow-md hover:shadow-lg">
                  Place Wholesale Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Flavours;
