document.addEventListener('DOMContentLoaded', async () => {
    const welcomeMessage = document.querySelector('.welcome-message h1');
    const paragraph = document.querySelector('.welcome-message p');

    welcomeMessage.style.opacity = '1';
    paragraph.style.opacity = '1';
    paragraph.style.transform = 'translateY(0)';

    // Load data
    const data = await loadChartData();

    updateDashboardMetrics(data);

    const defaultTopProducts = getTopProductsByCategory(data);
    updateTopProducts(defaultTopProducts);
    
    setupCategoryFilter(data);

    setupLoginForm();
});

// Function to load data from a JSON file
async function loadChartData() {
    const response = await fetch('assets/data.json');
    const data = await response.json();
    return data;
}

// Function to update the dashboard
function updateDashboardMetrics(data) {
    const instagramFollowers = document.querySelector('.dashboard-metrics .metric-box:nth-child(1) h2');
    const tiktokFollowers = document.querySelector('.dashboard-metrics .metric-box:nth-child(2) h2');
    const youtubeViews = document.querySelector('.dashboard-metrics .metric-box:nth-child(3) h2');
    const lastinteractions_notifications = document.querySelector('.dashboard-metrics .metric-box:nth-child(4) h2');

    const instagramChange = document.querySelector('.dashboard-metrics .metric-box:nth-child(1) .metric-detail');
    const tiktokChange = document.querySelector('.dashboard-metrics .metric-box:nth-child(2) .metric-detail');
    const youtubeChange = document.querySelector('.dashboard-metrics .metric-box:nth-child(3) .metric-detail');
    const lastinteractions_shares = document.querySelector('.dashboard-metrics .metric-box:nth-child(4) .metric-detail');

    // Update the content of the elements
    instagramFollowers.textContent = data.socialMetrics.instagram_followers.toLocaleString();
    tiktokFollowers.textContent = data.socialMetrics.tiktok_followers.toLocaleString();
    youtubeViews.textContent = data.socialMetrics.youtube_views.toLocaleString();
    lastinteractions_notifications.textContent = data.socialMetrics.lastinteractions_notifications.toLocaleString();

    instagramChange.textContent = data.socialMetrics.instagram_change;
    tiktokChange.textContent = data.socialMetrics.tiktok_change;
    youtubeChange.textContent = data.socialMetrics.youtube_change;
    lastinteractions_shares.textContent = data.socialMetrics.lastinteractions_shares;

    // Generate charts
    generateCharts(data);
}

// Function to generate charts
function generateCharts(data) {
    // Line chart: Monthly revenue and orders
    const ctx1 = document.getElementById('revenue-vs-orders').getContext('2d');
    new Chart(ctx1, {
        type: 'line',
        data: {
            labels: data.months,
            datasets: [
                {
                    label: 'Revenue',
                    data: data.revenue,
                    borderColor: 'rgba(231, 76, 60, 1)',
                    borderWidth: 2,
                    fill: false,
                },
                {
                    label: 'Orders',
                    data: data.orders,
                    borderColor: 'rgba(241, 196, 15, 1)',
                    borderWidth: 2,
                    fill: false,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Monthly Revenue vs Orders'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });

    // Bar chart: Monthly sales
    const ctx2 = document.getElementById('monthly-sales').getContext('2d');
    new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: data.months,
            datasets: [{
                label: 'Monthly Sales',
                data: data.monthlySales,
                backgroundColor: '#3498db',
            }],
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Monthly Sales'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });

    // Pie chart: Sales by category
    const ctx3 = document.getElementById('sales-by-category').getContext('2d');
    new Chart(ctx3, {
        type: 'pie',
        data: {
            labels: data.categories,
            datasets: [{
                data: data.salesByCategory,
                backgroundColor: ['#3498db', '#e74c3c', '#f39c12'],
            }],
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Sales by Category'
                }
            },
        },
    });
}

// Function to setup the category filter
function setupCategoryFilter(data) {
    const categoryFilter = document.getElementById('categoryFilter');

    categoryFilter.addEventListener('change', () => {
        const selectedCategory = categoryFilter.value;

        if (selectedCategory === 'all') {
            const allTopProducts = getTopProductsByCategory(data);
            updateTopProducts(allTopProducts);
        } else {
            const filteredProduct = filterByCategory(selectedCategory, data);
            updateTopProducts([filteredProduct]);
        }
    });
}

// Function to get the top product of each category
function getTopProductsByCategory(data) {
    const topProductsByCategory = {};

    data.topProducts.forEach(product => {
        if (!topProductsByCategory[product.category] || product.sales > topProductsByCategory[product.category].sales) {
            topProductsByCategory[product.category] = product;
        }
    });

    return Object.values(topProductsByCategory);
}

// Function to filter products by a specific category
function filterByCategory(category, data) {
    return data.topProducts.filter(product => product.category === category)
                           .sort((a, b) => b.sales - a.sales)[0];
}

// Function to update the table with the top products
function updateTopProducts(products) {
    const topProductsTableBody = document.querySelector('.top-products tbody');
    topProductsTableBody.innerHTML = '';

    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.orderID}</td>
            <td>${product.price}</td>
            <td>${product.sales.toLocaleString()}</td>
        `;
        topProductsTableBody.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const logoutBtn = document.getElementById('logout-btn');

    // Login functionality
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Fetch credentials and validate login
            fetch('credentials.json')
                .then(response => response.json())
                .then(data => {
                    const user = data.users.find(user => user.username === username && user.password === password);
                    if (user) {
                        document.cookie = "loggedIn=true; path=/";
                        window.location.href = 'dashboard.html';
                    } else {
                        alert('Invalid credentials.');
                    }
                });
        });
    }
});
