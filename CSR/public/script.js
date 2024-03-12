async function fetchProducts() {
    const response = await fetch("/api/products");
    const products = await response.json();
    const productList = document.getElementById("product-list");
    productList.innerHTML = products
    .map(
        (product) =>
        `<li>${product.name} - $${product.price} - Rating: ${product.rating}</li>`
    )
    .join("");
}

async function addProduct(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const newProduct = {
    name: formData.get("name"),
    price: formData.get("price"),
    rating: formData.get("rating"),
    };
    const response = await fetch("/api/products", {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify(newProduct),
    });
    if (response.ok) {
    form.reset();
    fetchProducts();
    }
}

document.getElementById("product-form").addEventListener("submit", addProduct);
fetchProducts();
