/* =====================================================
   SAVORA KITCHEN
   Main JavaScript file
   Technologies: HTML, CSS, Bootstrap and JavaScript
   Storage: Browser localStorage (prototype)
===================================================== */


/* =====================================================
   1. LOCAL STORAGE AND GENERAL FUNCTIONS
===================================================== */

const STORAGE = {
    users: "savoraUsers",
    session: "savoraSession",
    products: "savoraProducts",
    cart: "savoraCart",
    orders: "savoraOrders"
};

function getData(key, fallback = []) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : fallback;
    } catch (error) {
        console.error("Could not read saved data:", error);
        return fallback;
    }
}

function saveData(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        alert("Your browser storage is full. Try using a smaller image.");
        console.error("Could not save data:", error);
        return false;
    }
}

function makeId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[character]);
}

function formatMoney(amount) {
    return "₦" + Number(amount || 0).toLocaleString("en-NG");
}

function getSession() {
    return getData(STORAGE.session, null);
}

function getProducts() {
    return getData(STORAGE.products, []);
}

function getCart() {
    return getData(STORAGE.cart, []);
}

function getOrders() {
    return getData(STORAGE.orders, []);
}

function getCurrentUserEmail() {
    const session = getSession();
    return session ? session.email : null;
}


/* =====================================================
   2. STARTER PRODUCTS
   These appear when the application is opened
   for the first time.
===================================================== */

const starterProducts = [
    {
        id: "meal001",
        name: "Jollof Rice & Chicken",
        category: "Meals",
        price: 3500,
        description: "Delicious Nigerian jollof rice served with grilled chicken.",
        image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=900&q=85",
        availability: "Available",
        vendorEmail: "savora-demo"
    },
    {
        id: "meal002",
        name: "Fried Rice & Chicken",
        category: "Meals",
        price: 4000,
        description: "Freshly prepared fried rice with tasty chicken.",
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=85",
        availability: "Available",
        vendorEmail: "savora-demo"
    },
    {
        id: "meal003",
        name: "Noodles & Egg",
        category: "Meals",
        price: 2000,
        description: "Hot noodles served with freshly prepared eggs.",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=85",
        availability: "Available",
        vendorEmail: "savora-demo"
    },
    {
        id: "meal004",
        name: "Plantain & Egg",
        category: "Meals",
        price: 2500,
        description: "Sweet fried plantain served with delicious egg sauce.",
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=85",
        availability: "Available",
        vendorEmail: "savora-demo"
    },
    {
        id: "meal005",
        name: "Beans & Plantain",
        category: "Meals",
        price: 2800,
        description: "A filling Nigerian beans and fried plantain meal.",
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85",
        availability: "Available",
        vendorEmail: "savora-demo"
    },
    {
        id: "meal006",
        name: "Spaghetti Special",
        category: "Meals",
        price: 3000,
        description: "Tasty spaghetti prepared with a rich tomato sauce.",
        image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85",
        availability: "Available",
        vendorEmail: "savora-demo"
    },

    {
        id: "desseert001",
        name: "Chocolate Cake",
        category: "Desseerts",
        price: 1800,
        description: "Soft chocolate cake with rich chocolate flavour.",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85",
        availability: "Available",
        vendorEmail: "savora-demo"
    },
    {
        id: "desseert002",
        name: "Cupcake",
        category: "Desseerts",
        price: 1200,
        description: "Freshly baked cupcake with smooth frosting.",
        image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=900&q=85",
        availability: "Available",
        vendorEmail: "savora-demo"
    },
    {
        id: "desseert003",
        name: "Doughnuts",
        category: "Desseerts",
        price: 1000,
        description: "Soft and delicious sweet doughnuts.",
        image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=85",
        availability: "Available",
        vendorEmail: "savora-demo"
    },
    {
        id: "desseert004",
        name: "Ice Cream",
        category: "Desseerts",
        price: 1500,
        description: "A refreshing serving of creamy ice cream.",
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=85",
        availability: "Available",
        vendorEmail: "savora-demo"
    },
    {
        id: "desseert005",
        name: "Pancakes",
        category: "Desseerts",
        price: 2000,
        description: "Fluffy pancakes served with a sweet topping.",
        image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=900&q=85",
        availability: "Available",
        vendorEmail: "savora-demo"
    },
    {
        id: "desseert006",
        name: "Cookies",
        category: "Desseerts",
        price: 800,
        description: "Freshly baked crunchy chocolate cookies.",
        image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=900&q=85",
        availability: "Available",
        vendorEmail: "savora-demo"
    },

    {
        id: "drink001",
        name: "Fresh Orange Juice",
        category: "Drinks",
        price: 1200,
        description: "Refreshing orange juice served chilled.",
        image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=900&q=85",
        availability: "Available",
        vendorEmail: "savora-demo"
    },
    {
        id: "drink002",
        name: "Strawberry Smoothie",
        category: "Drinks",
        price: 2500,
        description: "A creamy smoothie blended with strawberries.",
        image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=900&q=85",
        availability: "Available",
        vendorEmail: "savora-demo"
    },
    {
        id: "drink003",
        name: "Iced Coffee",
        category: "Drinks",
        price: 2000,
        description: "Cold coffee prepared for a refreshing break.",
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=85",
        availability: "Available",
        vendorEmail: "savora-demo"
    },
    {
        id: "drink004",
        name: "Milkshake",
        category: "Drinks",
        price: 2200,
        description: "A smooth and creamy chilled milkshake.",
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=85",
        availability: "Available",
        vendorEmail: "savora-demo"
    },
    {
        id: "drink005",
        name: "Water",
        category: "Drinks",
        price: 500,
        description: "Chilled bottled drinking water.",
        image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=900&q=85",
        availability: "Available",
        vendorEmail: "savora-demo"
    },
    {
        id: "drink006",
        name: "Pineapple Juice",
        category: "Drinks",
        price: 1500,
        description: "Sweet and refreshing pineapple juice.",
        image: "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=900&q=85",
        availability: "Available",
        vendorEmail: "savora-demo"
    }
];

function initialiseProducts() {
    if (localStorage.getItem(STORAGE.products) === null) {
        saveData(STORAGE.products, starterProducts);
    }
}


/* =====================================================
   3. PAGE ACCESS AND LOGIN PROTECTION
===================================================== */

function protectPage() {
    const page = location.pathname.split("/").pop().toLowerCase();
    const session = getSession();

    const studentPages = [
        "student.html",
        "meals.html",
        "desserts.html",
        "drinks.html",
        "cart.html",
        "orders.html"
    ];

    if (studentPages.includes(page)) {
        if (!session || session.role !== "student") {
            location.replace("index.html");
            return false;
        }
    }

    if (page === "vendor.html") {
        if (!session || session.role !== "vendor") {
            location.replace("index.html");
            return false;
        }
    }

    if (page === "index.html" || page === "signup.html" || page === "") {
        if (session && session.role === "student") {
            location.replace("student.html");
            return false;
        }

        if (session && session.role === "vendor") {
            location.replace("vendor.html");
            return false;
        }
    }

    return true;
}

function logout() {
    localStorage.removeItem(STORAGE.session);
    localStorage.removeItem(STORAGE.cart);
    location.replace("index.html");
}


/* =====================================================
   4. SIGNUP FUNCTION
===================================================== */

function setupSignup() {
    const form = document.getElementById("signupForm");

    if (!form) return;

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("signupName").value.trim();
        const email = document.getElementById("signupEmail").value.trim().toLowerCase();
        const password = document.getElementById("signupPassword").value;
        const role = document.getElementById("signupRole").value;

        if (!name || !email || !password || !role) {
            alert("Please complete all the fields.");
            return;
        }

        if (password.length < 6) {
            alert("Your password must contain at least 6 characters.");
            return;
        }

        if (!["student", "vendor"].includes(role)) {
            alert("Please select a valid account type.");
            return;
        }

        const users = getData(STORAGE.users, []);

        const existingUser = users.find(user => user.email === email);

        if (existingUser) {
            alert("An account with this email already exists. Please log in.");
            return;
        }

        users.push({
            id: makeId(),
            name,
            email,
            password,
            role
        });

        if (!saveData(STORAGE.users, users)) return;

        alert("Account created successfully. You can now log in.");

        location.href = "index.html";
    });
}


/* =====================================================
   5. LOGIN FUNCTION
===================================================== */

function setupLogin() {
    const form = document.getElementById("loginForm");

    if (!form) return;

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim().toLowerCase();
        const password = document.getElementById("loginPassword").value;
        const role = document.getElementById("loginRole").value;

        const users = getData(STORAGE.users, []);

        const user = users.find(item =>
            item.email === email &&
            item.password === password &&
            item.role === role
        );

        if (!user) {
            alert("Incorrect email, password or account type.");
            return;
        }

        saveData(STORAGE.session, {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        });

        if (role === "student") {
            location.href = "student.html";
        } else {
            location.href = "vendor.html";
        }
    });
}


/* =====================================================
   6. LOGOUT BUTTONS
===================================================== */

function setupLogoutButtons() {
    const studentLogout = document.getElementById("studentLogout");
    const vendorLogout = document.getElementById("vendorLogout");

    if (studentLogout) {
        studentLogout.addEventListener("click", logout);
    }

    if (vendorLogout) {
        vendorLogout.addEventListener("click", logout);
    }
}


/* =====================================================
   7. DISPLAY STUDENT NAME
===================================================== */

function displayStudentName() {
    const session = getSession();

    if (!session) return;

    document.querySelectorAll("[data-user-name]").forEach(element => {
        element.textContent = session.name;
    });
}


/* =====================================================
   8. PRODUCT CARD DESIGN
===================================================== */

function productCard(product) {
    const available = product.availability === "Available";

    return `
        <div class="col-12 col-sm-6 col-lg-4 mb-4">
            <div class="product-card">
                <div class="product-image-wrap">
                    <img
                        src="${escapeHTML(product.image)}"
                        alt="${escapeHTML(product.name)}"
                        class="product-image"
                        loading="lazy"
                    >

                    <span class="product-badge ${available ? "" : "unavailable-badge"}">
                        ${available ? "Available" : "Unavailable"}
                    </span>
                </div>

                <div class="product-info">
                    <h3>${escapeHTML(product.name)}</h3>

                    <p>${escapeHTML(product.description)}</p>

                    <div class="d-flex align-items-center justify-content-between">
                        <span class="product-price">
                            ${formatMoney(product.price)}
                        </span>
                    </div>

                    <button
                        class="add-to-cart-btn"
                        data-add-cart="${escapeHTML(product.id)}"
                        ${available ? "" : "disabled"}
                    >
                        <i class="bi bi-bag-plus"></i>
                        ${available ? "Add to Cart" : "Unavailable"}
                    </button>
                </div>
            </div>
        </div>
    `;
}


/* =====================================================
   9. DISPLAY PRODUCTS ON STUDENT PAGES
===================================================== */

function renderProducts(container, products) {
    if (!container) return;

    if (products.length === 0) {
        container.innerHTML = "";
        return;
    }

    container.innerHTML = products.map(productCard).join("");
}

function setupPopularProducts() {
    const container = document.getElementById("popularProducts");

    if (!container) return;

    const products = getProducts()
        .filter(product => product.availability === "Available")
        .slice(0, 6);

    renderProducts(container, products);
}

function setupCategoryPage() {
    const container = document.getElementById("categoryProducts");

    if (!container) return;

    const category = container.dataset.category;

    const searchInput = document.getElementById("categorySearch");
    const searchButton = document.getElementById("categorySearchButton");

    function displayCategoryProducts() {
        const search = searchInput ? searchInput.value.trim().toLowerCase() : "";

        const products = getProducts().filter(product =>
            product.category === category &&
            (
                product.name.toLowerCase().includes(search) ||
                product.description.toLowerCase().includes(search)
            )
        );

        renderProducts(container, products);

        const count = document.querySelector(".menu-result-count");

        if (count) {
            count.textContent = `${products.length} product(s) found`;
        }

        const emptyMessage = document.getElementById("emptyCategoryMessage");

        if (emptyMessage) {
            emptyMessage.style.display = products.length ? "none" : "block";
        }
    }

    displayCategoryProducts();

    if (searchButton) {
        searchButton.addEventListener("click", displayCategoryProducts);
    }

    if (searchInput) {
        searchInput.addEventListener("input", displayCategoryProducts);
    }
}


/* =====================================================
   10. STUDENT HOMEPAGE SEARCH
===================================================== */

function setupStudentSearch() {
    const input = document.getElementById("studentSearch");
    const button = document.getElementById("searchButton");

    if (!input || !button) return;

    function searchProducts() {
        const search = input.value.trim().toLowerCase();

        if (!search) {
            alert("Enter a food or drink name to search.");
            return;
        }

        const product = getProducts().find(item =>
            item.availability === "Available" &&
            (
                item.name.toLowerCase().includes(search) ||
                item.category.toLowerCase().includes(search)
            )
        );

        if (!product) {
            alert("No matching product was found.");
            return;
        }

        const pages = {
            Meals: "meals.html",
            Desserts: "desserts.html",
            Drinks: "drinks.html"
        };

        location.href = pages[product.category];
    }

    button.addEventListener("click", searchProducts);

    input.addEventListener("keydown", event => {
        if (event.key === "Enter") searchProducts();
    });
}


/* =====================================================
   11. CART FUNCTIONS
===================================================== */

function addToCart(productId) {
    const products = getProducts();

    const product = products.find(item => item.id === productId);

    if (!product || product.availability !== "Available") {
        alert("This product is currently unavailable.");
        return;
    }

    const cart = getCart();

    const existingItem = cart.find(item => item.productId === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            productId: product.id,
            quantity: 1
        });
    }

    if (!saveData(STORAGE.cart, cart)) return;

    updateCartCount();

    alert(`${product.name} added to your cart.`);
}

function updateCartCount() {
    const cart = getCart();

    const total = cart.reduce((sum, item) => sum + item.quantity, 0);

    document.querySelectorAll("#cartCount").forEach(element => {
        element.textContent = total;
    });
}

function changeCartQuantity(productId, amount) {
    const cart = getCart();

    const item = cart.find(product => product.productId === productId);

    if (!item) return;

    item.quantity += amount;

    const updatedCart = cart.filter(product => product.quantity > 0);

    if (!saveData(STORAGE.cart, updatedCart)) return;

    updateCartCount();
    renderCart();
}

function removeCartItem(productId) {
    const cart = getCart().filter(item => item.productId !== productId);

    if (!saveData(STORAGE.cart, cart)) return;

    updateCartCount();
    renderCart();
}


/* =====================================================
   12. DISPLAY CART ITEMS
===================================================== */

function renderCart() {
    const container = document.getElementById("cartItemsContainer");

    if (!container) return;

    const cart = getCart();
    const products = getProducts();

    let subtotal = 0;
    let itemCount = 0;

    const itemsHTML = cart.map(cartItem => {
        const product = products.find(item => item.id === cartItem.productId);

        if (!product) return "";

        const itemTotal = product.price * cartItem.quantity;

        subtotal += itemTotal;
        itemCount += cartItem.quantity;

        return `
            <div class="cart-item">
                <img
                    src="${escapeHTML(product.image)}"
                    alt="${escapeHTML(product.name)}"
                    class="cart-item-image"
                >

                <div class="cart-item-details">
                    <h4>${escapeHTML(product.name)}</h4>
                    <p>${formatMoney(product.price)}</p>
                </div>

                <div class="cart-quantity-controls">
                    <button data-quantity-minus="${escapeHTML(product.id)}">−</button>
                    <strong>${cartItem.quantity}</strong>
                    <button data-quantity-plus="${escapeHTML(product.id)}">+</button>
                </div>

                <div>
                    <strong>${formatMoney(itemTotal)}</strong>
                    <br>
                    <button
                        class="cart-remove-btn"
                        data-remove-cart="${escapeHTML(product.id)}"
                    >
                        Remove
                    </button>
                </div>
            </div>
        `;
    }).join("");

    container.innerHTML = itemsHTML;

    const emptyMessage = document.getElementById("emptyCartMessage");

    if (emptyMessage) {
        emptyMessage.style.display = itemCount ? "none" : "block";
    }

    const deliveryFee = itemCount > 0 ? 500 : 0;

    const subtotalElement = document.getElementById("cartSubtotal");
    const deliveryElement = document.getElementById("deliveryFee");
    const totalElement = document.getElementById("cartTotal");
    const countElement = document.getElementById("cartItemCount");

    if (subtotalElement) subtotalElement.textContent = formatMoney(subtotal);
    if (deliveryElement) deliveryElement.textContent = formatMoney(deliveryFee);
    if (totalElement) totalElement.textContent = formatMoney(subtotal + deliveryFee);
    if (countElement) countElement.textContent = `${itemCount} item(s)`;

    updateCartCount();
}


/* =====================================================
   13. CART BUTTON EVENTS
===================================================== */

document.addEventListener("click", function (event) {
    const addButton = event.target.closest("[data-add-cart]");

    if (addButton) {
        addToCart(addButton.dataset.addCart);
    }

    const plusButton = event.target.closest("[data-quantity-plus]");

    if (plusButton) {
        changeCartQuantity(plusButton.dataset.quantityPlus, 1);
    }

    const minusButton = event.target.closest("[data-quantity-minus]");

    if (minusButton) {
        changeCartQuantity(minusButton.dataset.quantityMinus, -1);
    }

    const removeButton = event.target.closest("[data-remove-cart]");

    if (removeButton) {
        removeCartItem(removeButton.dataset.removeCart);
    }
});


/* =====================================================
   14. CHECKOUT AND PLACE ORDER
===================================================== */

function setupCheckout() {
    const checkoutButton = document.getElementById("checkoutButton");
    const checkoutForm = document.getElementById("checkoutForm");

    if (!checkoutButton || !checkoutForm) return;

    checkoutButton.addEventListener("click", function () {
        if (getCart().length === 0) {
            alert("Your cart is empty. Add some food first.");
            return;
        }

        const modalElement = document.getElementById("checkoutModal");

        if (modalElement && window.bootstrap) {
            bootstrap.Modal.getOrCreateInstance(modalElement).show();
        }
    });

    checkoutForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const session = getSession();
        const cart = getCart();
        const products = getProducts();

        if (!session || cart.length === 0) {
            alert("Your cart is empty or your session has expired.");
            return;
        }

        const locationInput = document.getElementById("deliveryLocation");
        const phoneInput = document.getElementById("deliveryPhone");
        const noteInput = document.getElementById("orderNote");

        const deliveryLocation = locationInput.value.trim();
        const deliveryPhone = phoneInput.value.trim();
        const note = noteInput.value.trim();

        if (!deliveryLocation || !deliveryPhone) {
            alert("Please enter your delivery location and phone number.");
            return;
        }

        let subtotal = 0;

        const orderItems = cart.map(cartItem => {
            const product = products.find(item => item.id === cartItem.productId);

            if (!product || product.availability !== "Available") {
                return null;
            }

            subtotal += product.price * cartItem.quantity;

            return {
                productId: product.id,
                name: product.name,
                category: product.category,
                price: product.price,
                quantity: cartItem.quantity,
                image: product.image,
                vendorEmail: product.vendorEmail
            };
        }).filter(Boolean);

        if (orderItems.length === 0) {
            alert("The items in your cart are no longer available.");
            return;
        }

        const order = {
            id: makeId(),
            orderNumber: "SK-" + Date.now().toString().slice(-7),
            studentEmail: session.email,
            studentName: session.name,
            items: orderItems,
            subtotal,
            deliveryFee: 500,
            total: subtotal + 500,
            deliveryLocation,
            deliveryPhone,
            note,
            status: "Pending",
            createdAt: new Date().toISOString()
        };

        const orders = getOrders();
        orders.unshift(order);

        if (!saveData(STORAGE.orders, orders)) return;

        if (!saveData(STORAGE.cart, [])) return;

        alert("Your order has been placed successfully!");

        checkoutForm.reset();

        const modalElement = document.getElementById("checkoutModal");

        if (modalElement && window.bootstrap) {
            bootstrap.Modal.getOrCreateInstance(modalElement).hide();
        }

        renderCart();
        location.href = "orders.html";
    });
}


/* =====================================================
   15. STUDENT ORDER HISTORY
===================================================== */

function renderStudentOrders() {
    const container = document.getElementById("studentOrdersContainer");

    if (!container) return;

    const session = getSession();

    if (!session) return;

    const allOrders = getOrders().filter(order =>
        order.studentEmail === session.email
    );

    const filter = document.getElementById("orderStatusFilter");

    const selectedStatus = filter ? filter.value : "all";

    const orders = selectedStatus === "all"
        ? allOrders
        : allOrders.filter(order => order.status === selectedStatus);

    const statistics = {
        totalOrdersCount: allOrders.length,
        pendingOrdersCount: allOrders.filter(order => order.status === "Pending").length,
        preparingOrdersCount: allOrders.filter(order => order.status === "Preparing").length,
        completedOrdersCount: allOrders.filter(order => order.status === "Completed").length
    };

    Object.entries(statistics).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) element.textContent = value;
    });

    const emptyMessage = document.getElementById("emptyOrdersMessage");

    if (emptyMessage) {
        emptyMessage.style.display = orders.length ? "none" : "block";
    }

    container.innerHTML = orders.map(order => `
        <div class="order-card">
            <div class="order-card-header">
                <div>
                    <h4>Order ${escapeHTML(order.orderNumber)}</h4>
                    <p>${new Date(order.createdAt).toLocaleString()}</p>
                </div>

                <span class="order-status ${order.status.toLowerCase()}">
                    ${escapeHTML(order.status)}
                </span>
            </div>

            <div class="py-3">
                ${order.items.map(item => `
                    <div class="d-flex justify-content-between gap-3 mb-2">
                        <span class="small">
                            ${escapeHTML(item.name)} × ${item.quantity}
                        </span>
                        <strong class="small">
                            ${formatMoney(item.price * item.quantity)}
                        </strong>
                    </div>
                `).join("")}
            </div>

            <p><strong>Delivery:</strong> ${escapeHTML(order.deliveryLocation)}</p>
            <p><strong>Phone:</strong> ${escapeHTML(order.deliveryPhone)}</p>

            <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">
                <strong>Total: ${formatMoney(order.total)}</strong>

                ${order.status === "Pending" ? `
                    <button
                        class="danger-btn"
                        data-cancel-order="${escapeHTML(order.id)}"
                    >
                        Cancel Order
                    </button>
                ` : ""}
            </div>
        </div>
    `).join("");
}


/* =====================================================
   16. CANCEL STUDENT ORDER
===================================================== */

let selectedCancelOrderId = null;

function setupOrderCancellation() {
    const confirmButton = document.getElementById("confirmCancelOrder");
    const hiddenInput = document.getElementById("cancelOrderId");

    document.addEventListener("click", function (event) {
        const button = event.target.closest("[data-cancel-order]");

        if (!button) return;

        selectedCancelOrderId = button.dataset.cancelOrder;

        if (hiddenInput) {
            hiddenInput.value = selectedCancelOrderId;
        }

        const modalElement = document.getElementById("cancelOrderModal");

        if (modalElement && window.bootstrap) {
            bootstrap.Modal.getOrCreateInstance(modalElement).show();
        } else {
            if (confirm("Are you sure you want to cancel this order?")) {
                cancelOrder(selectedCancelOrderId);
            }
        }
    });

    if (confirmButton) {
        confirmButton.addEventListener("click", function () {
            const orderId = hiddenInput
                ? hiddenInput.value
                : selectedCancelOrderId;

            cancelOrder(orderId);

            const modalElement = document.getElementById("cancelOrderModal");

            if (modalElement && window.bootstrap) {
                bootstrap.Modal.getOrCreateInstance(modalElement).hide();
            }
        });
    }
}

function cancelOrder(orderId) {
    const session = getSession();

    const orders = getOrders();

    const order = orders.find(item =>
        item.id === orderId &&
        item.studentEmail === session.email
    );

    if (!order) {
        alert("Order not found.");
        return;
    }

    if (order.status !== "Pending") {
        alert("Only pending orders can be cancelled.");
        return;
    }

    order.status = "Cancelled";

    if (!saveData(STORAGE.orders, orders)) return;

    alert("Your order has been cancelled.");

    renderStudentOrders();
}


/* =====================================================
   17. VENDOR DASHBOARD OVERVIEW
===================================================== */

function renderVendorOverview() {
    const session = getSession();

    if (!session) return;

    const products = getProducts().filter(product =>
        product.vendorEmail === session.email
    );

    const orders = getOrders().filter(order =>
        order.items.some(item => item.vendorEmail === session.email)
    );

    const statistics = {
        vendorTotalProducts: products.length,
        vendorAvailableProducts: products.filter(
            product => product.availability === "Available"
        ).length,
        vendorTotalOrders: orders.length,
        vendorPendingOrders: orders.filter(
            order => order.status === "Pending"
        ).length
    };

    Object.entries(statistics).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) element.textContent = value;
    });
}


/* =====================================================
   18. VENDOR PRODUCT IMAGE UPLOAD
===================================================== */

let selectedProductImage = "";

function compressImage(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function () {
            const image = new Image();

            image.onload = function () {
                const canvas = document.createElement("canvas");

                const maximumWidth = 900;
                const scale = Math.min(1, maximumWidth / image.width);

                canvas.width = Math.round(image.width * scale);
                canvas.height = Math.round(image.height * scale);

                const context = canvas.getContext("2d");

                context.drawImage(
                    image,
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );

                resolve(canvas.toDataURL("image/jpeg", 0.75));
            };

            image.onerror = reject;
            image.src = reader.result;
        };

        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function setupProductImageUpload() {
    const input = document.getElementById("productImage");

    if (!input) return;

    input.addEventListener("change", async function () {
        const file = input.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please select an image file.");
            input.value = "";
            return;
        }

        if (file.size > 4 * 1024 * 1024) {
            alert("Please select an image smaller than 4MB.");
            input.value = "";
            return;
        }

        try {
            selectedProductImage = await compressImage(file);

            const preview = document.getElementById("productImagePreview");
            const previewContainer = document.getElementById("productImagePreviewContainer");

            if (preview) preview.src = selectedProductImage;

            if (previewContainer) {
                previewContainer.style.display = "block";
            }
        } catch (error) {
            alert("Could not process this image. Please try another one.");
            console.error(error);
        }
    });
}


/* =====================================================
   19. VENDOR ADD AND EDIT PRODUCTS
===================================================== */

function setupProductForm() {
    const form = document.getElementById("productForm");

    if (!form) return;

    const resetButton = document.getElementById("resetProductForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const session = getSession();

        const id = document.getElementById("productId").value;
        const name = document.getElementById("productName").value.trim();
        const category = document.getElementById("productCategory").value;
        const price = Number(document.getElementById("productPrice").value);
        const availability = document.getElementById("productAvailability").value;
        const description = document.getElementById("productDescription").value.trim();

        if (!name || !category || !price || !description) {
            alert("Please complete all product details.");
            return;
        }

        if (!["Meals", "Desserts", "Drinks"].includes(category)) {
            alert("Please select a valid category.");
            return;
        }

        if (price <= 0) {
            alert("Enter a valid product price.");
            return;
        }

        const products = getProducts();

        if (id) {
            const product = products.find(item =>
                item.id === id &&
                item.vendorEmail === session.email
            );

            if (!product) {
                alert("Product not found.");
                return;
            }

            product.name = name;
            product.category = category;
            product.price = price;
            product.availability = availability;
            product.description = description;

            if (selectedProductImage) {
                product.image = selectedProductImage;
            }

            alert("Product updated successfully.");
        } else {
            if (!selectedProductImage) {
                alert("Please upload a product image.");
                return;
            }

            products.push({
                id: makeId(),
                name,
                category,
                price,
                availability,
                description,
                image: selectedProductImage,
                vendorEmail: session.email
            });

            alert("Your product has been published successfully.");
        }

        if (!saveData(STORAGE.products, products)) return;

        resetProductForm();
        refreshVendorDashboard();
    });

    if (resetButton) {
        resetButton.addEventListener("click", resetProductForm);
    }
}

function resetProductForm() {
    const form = document.getElementById("productForm");

    if (!form) return;

    form.reset();

    document.getElementById("productId").value = "";

    selectedProductImage = "";

    const previewContainer = document.getElementById("productImagePreviewContainer");

    if (previewContainer) {
        previewContainer.style.display = "none";
    }

    const publishButton = document.getElementById("publishProductButton");

    if (publishButton) {
        publishButton.textContent = "Publish Product";
    }
}


/* =====================================================
   20. DISPLAY VENDOR PRODUCTS
===================================================== */

function renderVendorProducts() {
    const container = document.getElementById("vendorProductsContainer");

    if (!container) return;

    const session = getSession();

    const searchInput = document.getElementById("vendorProductSearch");
    const categoryFilter = document.getElementById("vendorCategoryFilter");

    const search = searchInput ? searchInput.value.toLowerCase().trim() : "";
    const category = categoryFilter ? categoryFilter.value : "all";

    const products = getProducts().filter(product =>
        product.vendorEmail === session.email &&
        (category === "all" || product.category === category) &&
        (
            product.name.toLowerCase().includes(search) ||
            product.description.toLowerCase().includes(search)
        )
    );

    const emptyMessage = document.getElementById("emptyVendorProducts");

    if (emptyMessage) {
        emptyMessage.style.display = products.length ? "none" : "block";
    }

    container.innerHTML = products.map(product => `
        <div class="col-12 col-sm-6 col-lg-4 mb-3">
            <div class="vendor-product-card">
                <img
                    src="${escapeHTML(product.image)}"
                    alt="${escapeHTML(product.name)}"
                >

                <h4>${escapeHTML(product.name)}</h4>

                <p>${escapeHTML(product.category)}</p>

                <strong class="product-price">
                    ${formatMoney(product.price)}
                </strong>

                <p class="mt-2">
                    Status: ${escapeHTML(product.availability)}
                </p>

                <div class="vendor-product-actions">
                    <button data-edit-product="${escapeHTML(product.id)}">
                        <i class="bi bi-pencil"></i> Edit
                    </button>

                    <button data-toggle-product="${escapeHTML(product.id)}">
                        ${product.availability === "Available"
                            ? "Mark unavailable"
                            : "Make available"}
                    </button>

                    <button
                        data-delete-product="${escapeHTML(product.id)}"
                        class="text-danger"
                    >
                        <i class="bi bi-trash"></i> Delete
                    </button>
                </div>
            </div>
        </div>
    `).join("");
}


/* =====================================================
   21. VENDOR PRODUCT ACTIONS
===================================================== */

function setupVendorProductActions() {
    document.addEventListener("click", function (event) {
        const editButton = event.target.closest("[data-edit-product]");

        if (editButton) {
            editProduct(editButton.dataset.editProduct);
        }

        const deleteButton = event.target.closest("[data-delete-product]");

        if (deleteButton) {
            deleteProduct(deleteButton.dataset.deleteProduct);
        }

        const toggleButton = event.target.closest("[data-toggle-product]");

        if (toggleButton) {
            toggleProductAvailability(toggleButton.dataset.toggleProduct);
        }
    });
}

function editProduct(productId) {
    const session = getSession();

    const product = getProducts().find(item =>
        item.id === productId &&
        item.vendorEmail === session.email
    );

    if (!product) return;

    document.getElementById("productId").value = product.id;
    document.getElementById("productName").value = product.name;
    document.getElementById("productCategory").value = product.category;
    document.getElementById("productPrice").value = product.price;
    document.getElementById("productAvailability").value = product.availability;
    document.getElementById("productDescription").value = product.description;

    selectedProductImage = "";

    const preview = document.getElementById("productImagePreview");
    const previewContainer = document.getElementById("productImagePreviewContainer");

    if (preview) preview.src = product.image;

    if (previewContainer) {
        previewContainer.style.display = "block";
    }

    const publishButton = document.getElementById("publishProductButton");

    if (publishButton) {
        publishButton.textContent = "Update Product";
    }

    document.getElementById("addProductSection").scrollIntoView({
        behavior: "smooth"
    });
}

function deleteProduct(productId) {
    const session = getSession();

    if (!confirm("Are you sure you want to delete this product?")) return;

    const products = getProducts().filter(product =>
        !(product.id === productId && product.vendorEmail === session.email)
    );

    if (!saveData(STORAGE.products, products)) return;

    alert("Product deleted successfully.");

    refreshVendorDashboard();
}

function toggleProductAvailability(productId) {
    const session = getSession();

    const products = getProducts();

    const product = products.find(item =>
        item.id === productId &&
        item.vendorEmail === session.email
    );

    if (!product) return;

    product.availability = product.availability === "Available"
        ? "Unavailable"
        : "Available";

    if (!saveData(STORAGE.products, products)) return;

    refreshVendorDashboard();
}


/* =====================================================
   22. VENDOR ORDER MANAGEMENT
===================================================== */

function renderVendorOrders() {
    const container = document.getElementById("vendorOrdersContainer");

    if (!container) return;

    const session = getSession();

    const filter = document.getElementById("vendorOrderFilter");

    const selectedStatus = filter ? filter.value : "all";

    const orders = getOrders().filter(order =>
        order.items.some(item => item.vendorEmail === session.email) &&
        (selectedStatus === "all" || order.status === selectedStatus)
    );

    const emptyMessage = document.getElementById("emptyVendorOrders");

    if (emptyMessage) {
        emptyMessage.style.display = orders.length ? "none" : "block";
    }

    container.innerHTML = orders.map(order => {
        const vendorItems = order.items.filter(item =>
            item.vendorEmail === session.email
        );

        const vendorTotal = vendorItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        return `
            <div class="order-card">
                <div class="order-card-header">
                    <div>
                        <h4>Order ${escapeHTML(order.orderNumber)}</h4>
                        <p>Student: ${escapeHTML(order.studentName)}</p>
                        <p>${new Date(order.createdAt).toLocaleString()}</p>
                    </div>

                    <span class="order-status ${order.status.toLowerCase()}">
                        ${escapeHTML(order.status)}
                    </span>
                </div>

                <div class="py-3">
                    ${vendorItems.map(item => `
                        <p>
                            ${escapeHTML(item.name)} × ${item.quantity}
                        </p>
                    `).join("")}
                </div>

                <p><strong>Delivery location:</strong> ${escapeHTML(order.deliveryLocation)}</p>
                <p><strong>Phone:</strong> ${escapeHTML(order.deliveryPhone)}</p>
                <p><strong>Vendor item total:</strong> ${formatMoney(vendorTotal)}</p>

                <div class="vendor-order-actions">
                    ${order.status === "Pending" ? `
                        <button data-order-action="Accepted" data-order-id="${escapeHTML(order.id)}">
                            Accept
                        </button>

                        <button data-order-action="Rejected" data-order-id="${escapeHTML(order.id)}">
                            Reject
                        </button>
                    ` : ""}

                    ${order.status === "Accepted" ? `
                        <button data-order-action="Preparing" data-order-id="${escapeHTML(order.id)}">
                            Start Preparing
                        </button>
                    ` : ""}

                    ${order.status === "Preparing" ? `
                        <button data-order-action="Completed" data-order-id="${escapeHTML(order.id)}">
                            Mark Completed
                        </button>
                    ` : ""}
                </div>
            </div>
        `;
    }).join("");
}

function setupVendorOrderActions() {
    document.addEventListener("click", function (event) {
        const button = event.target.closest("[data-order-action]");

        if (!button) return;

        const session = getSession();
        const orderId = button.dataset.orderId;
        const newStatus = button.dataset.orderAction;

        const orders = getOrders();

        const order = orders.find(item =>
            item.id === orderId &&
            item.items.some(product => product.vendorEmail === session.email)
        );

        if (!order) {
            alert("Order not found.");
            return;
        }

        order.status = newStatus;

        if (!saveData(STORAGE.orders, orders)) return;

        alert("Order status updated to " + newStatus + ".");

        refreshVendorDashboard();
    });
}


/* =====================================================
   23. REFRESH VENDOR DASHBOARD
===================================================== */

function refreshVendorDashboard() {
    renderVendorOverview();
    renderVendorProducts();
    renderVendorOrders();
}

function setupVendorFilters() {
    const productSearch = document.getElementById("vendorProductSearch");
    const categoryFilter = document.getElementById("vendorCategoryFilter");
    const orderFilter = document.getElementById("vendorOrderFilter");

    if (productSearch) {
        productSearch.addEventListener("input", renderVendorProducts);
    }

    if (categoryFilter) {
        categoryFilter.addEventListener("change", renderVendorProducts);
    }

    if (orderFilter) {
        orderFilter.addEventListener("change", renderVendorOrders);
    }
}


/* =====================================================
   24. ORDER FILTER
===================================================== */

function setupStudentOrderFilter() {
    const filter = document.getElementById("orderStatusFilter");

    if (!filter) return;

    filter.addEventListener("change", renderStudentOrders);
}


/* =====================================================
   25. APPLICATION STARTUP
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    // Create starter products on first use.
    initialiseProducts();

    // Check whether the user is allowed to view this page.
    if (!protectPage()) return;

    // Authentication.
    setupSignup();
    setupLogin();
    setupLogoutButtons();

    // User information.
    displayStudentName();

    // Student pages.
    setupPopularProducts();
    setupCategoryPage();
    setupStudentSearch();

    // Shopping cart.
    updateCartCount();
    renderCart();
    setupCheckout();

    // Student orders.
    renderStudentOrders();
    setupStudentOrderFilter();
    setupOrderCancellation();

    // Vendor pages.
    setupProductImageUpload();
    setupProductForm();
    setupVendorProductActions();
    setupVendorOrderActions();
    setupVendorFilters();
    refreshVendorDashboard();

});