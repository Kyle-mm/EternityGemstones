<script>
const products = [
{ name: "Ruby Necklace", category: "Rubies", price: 250, brand: "Eternity", element: null, sold: 120, date: '2023-10-01', image: "rubynecklace.jpg", button:"detailedproductspagetest.html" },
{ name: "Emerald Ring", category: "Emeralds", price: 400, brand: "Legacy", element: null, sold: 85, date: '2023-09-15', image: "emeraldring.jpg" },
{ name: "Diamond Earrings", category: "Diamonds", price: 800, brand: "Premium Gems", element: null, sold: 45, date: '2023-11-05', image: "diamondearrings.jpg" },
{ name: "Sapphire Bracelet", category: "Sapphires", price: 350, brand: "Eternity", element: null, sold: 70, date: '2023-10-10', image: "sapphirebracelet.jpg" },
{ name: "Ruby Earrings", category: "Rubies", price: 150, brand: "Legacy", element: null, sold: 60, date: '2023-09-20', image: "rubyearrings.jpg" },
{ name: "Emerald Necklace", category: "Emeralds", price: 500, brand: "Premium Gems", element: null, sold: 40, date: '2023-11-01', image: "emeraldknecklace.jpg" },
{ name: "Diamond Ring", category: "Diamonds", price: 1200, brand: "Eternity", element: null, sold: 30, date: '2023-10-25', image: "diamondringn.jpg" },
{ name: "Sapphire Necklace", category: "Sapphires", price: 400, brand: "Legacy", element: null, sold: 55, date: '2023-10-15', image: "sapphirenecklacene.jpg" },
{ name: "Ruby Ring", category: "Sapphires", price: 2300, brand: "Legacy", element: null, sold: 55, date: '2023-10-15', image: "rubyring.jpg" },
{ name: "Emerald Earrings", category: "Sapphires", price: 900, brand: "Legacy", element: null, sold: 55, date: '2023-10-15', image: "emeraldearring.jpg" },
{ name: "Diamond Necklace", category: "Sapphires", price: 2000, brand: "Legacy", element: null, sold: 55, date: '2023-10-15', image: "diamondnecklace.jpg" },
{ name: "Sapphire Ring", category: "Sapphires", price: 1800, brand: "Legacy", element: null, sold: 55, date: '2023-10-15', image: "saphhirering.jpg" },
{ name: "Sapphire Earrings", category: "Sapphires", price: 540, brand: "Legacy", element: null, sold: 55, date: '2023-10-15', image: "sapphireearrings.jpg" },


];


window.onload = () => {
const productsContainer = document.querySelector('.products');
products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h4>${product.name}</h4>
        <p>£${product.price}</p>
        <button>Add to Cart</button>
    `;
    product.element = productCard;
    productsContainer.appendChild(productCard);
});
};



// Update selected filters
function updateSelectedFilters(filterLabel, checkbox) {
const selectedFiltersContainer = document.getElementById('selected-filters');

// Create a filter tag if it's checked
if (checkbox.checked) {
    const filterTag = document.createElement('div');
    filterTag.classList.add('filter-tag');
    filterTag.innerHTML = `${filterLabel} <button onclick="removeFilter(this)">x</button>`;
    
    // Store the checkbox reference in the filter tag
    filterTag.checkbox = checkbox;

    selectedFiltersContainer.appendChild(filterTag);
} else {
    // If checkbox is unchecked, ensure the tag is removed
    const tagToRemove = Array.from(selectedFiltersContainer.children)
    .find(tag => tag.innerText.includes(filterLabel));
    if (tagToRemove) {
    selectedFiltersContainer.removeChild(tagToRemove);
    }
}

// Filter products
filterProducts();
}

// Remove a filter when clicked above and uncheck the corresponding checkbox
function removeFilter(button) {
const filterTag = button.parentElement;

// Access the checkbox from the filter tag and uncheck it
if (filterTag.checkbox) {
    filterTag.checkbox.checked = false;  // Uncheck the filter's checkbox
}

// Remove the filter tag
filterTag.remove();

// Update product display
filterProducts();
}

// Filter products based on selected filters
function filterProducts() {
const selectedCategories = Array.from(document.querySelectorAll('.filters input[type="checkbox"]:checked'))
    .filter(input => input.name === 'category')
    .map(input => input.value);

const selectedPriceRanges = Array.from(document.querySelectorAll('.filters input[type="checkbox"]:checked'))
    .filter(input => input.name === 'price')
    .map(input => input.value);

const selectedBrands = Array.from(document.querySelectorAll('.filters input[type="checkbox"]:checked'))
    .filter(input => input.name === 'brand')
    .map(input => input.value);

// Hide or show products based on filters
products.forEach(product => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const priceMatch = selectedPriceRanges.length === 0 || selectedPriceRanges.some(price => {
    if (price === '$0 - $100') return product.price <= 100;
    if (price === '$100 - $500') return product.price > 100 && product.price <= 500;
    if (price === '$500 - $1000') return product.price > 500 && product.price <= 1000;
    return product.price > 1000;
    });
    const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(product.brand);

    if (categoryMatch && priceMatch && brandMatch) {
    product.element.style.display = 'block';  // Show the product
    } else {
    product.element.style.display = 'none';   // Hide the product
    }
});
}

</script>
<!--sort by filter-->
<script>
    function sortProducts() {
const sortOption = document.getElementById('sort-options').value;

// Get product container and product elements
const productsContainer = document.querySelector('.products');
const productCards = Array.from(productsContainer.children);

// Sort based on the selected option
productCards.sort((a, b) => {
const productA = products.find(p => p.name === a.querySelector('h4').textContent);
const productB = products.find(p => p.name === b.querySelector('h4').textContent);

switch (sortOption) {
  case 'price-low-high':
    return productA.price - productB.price;
  case 'price-high-low':
    return productB.price - productA.price;
  case 'alphabetical-az':
    return productA.name.localeCompare(productB.name);
  case 'alphabetical-za':
    return productB.name.localeCompare(productA.name);
  case 'date-old-new':
    return new Date(productA.date) - new Date(productB.date);
  case 'date-new-old':
    return new Date(productB.date) - new Date(productA.date);
  case 'best-selling':
    return productB.sold - productA.sold; // Assuming you have a `sold` property
  default:
    return 0;
}
});

// Re-render sorted products
productCards.forEach(card => productsContainer.appendChild(card));
}

</script>
<!-- cart preview logic-->
 <script>
    // Sample cart data
// Sample cart data
let cart = [
{ name: "Ruby Necklace", price: 250, quantity: 1 },
{ name: "Emerald Ring", price: 400, quantity: 1 },
];

// Function to update the quantity
function increaseQuantity(index) {
cart[index].quantity += 1; 
updateCartPreview();
}

function decreaseQuantity(index) {
if (cart[index].quantity > 1) {
    cart[index].quantity -= 1; 
    updateCartPreview();
}
}

// Function to remove item
function removeItem(index) {
cart.splice(index, 1); // Remove the item from the cart array
updateCartPreview();
}

// Function to update the cart preview display
function updateCartPreview() {
const cartPreview = document.querySelector('.cart-preview');
cartPreview.innerHTML = ''; // Clear the current cart preview

cart.forEach((item, index) => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
        <img src="${item.name.toLowerCase().replace(' ', '') + '.jpg'}" alt="${item.name}">
        <div class="cart-item-info">
            <p class="product-name">${item.name}</p>
            <p class="code">code: 101240</p>
            <p class="instock">In stock</p>
            <p class="product-price">£${item.price}</p>
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="decreaseQuantity(${index})">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn1" onclick="increaseQuantity(${index})">+</button>
            </div>
        </div>
        <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
    `;
    cartPreview.appendChild(cartItem); // Append the cart item to the cart preview
});

// Update cart count (number of items)
document.querySelector('.icon-cart span').innerText = cart.length;
}

 </script>