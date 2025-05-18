// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Add mobile menu toggle functionality
    const navLinks = document.querySelector('.nav-links');
    const menuButton = document.createElement('button');
    menuButton.classList.add('mobile-menu-button');
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    
    const navbar = document.querySelector('.navbar');
    navbar.insertBefore(menuButton, navLinks);

    menuButton.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add to cart functionality
    // const addToCartButtons = document.querySelectorAll('.add-to-cart');
    // addToCartButtons.forEach(button => {
    //     button.addEventListener('click', function() {
    //         const product = this.parentElement;
    //         const productName = product.querySelector('h3').textContent;
    //         const productPriceText = product.querySelector('.price').textContent;
    //         // Extract price as number
    //         const productPrice = parseInt(productPriceText.replace(/[^\d]/g, ''));
    //         // Try to get image, size if available
    //         const productImage = product.querySelector('img')?.getAttribute('src') || '';
    //         // For demo: you can extend this to get selected size from UI
    //         const productSize = product.querySelector('.size')?.textContent || null;

    //         // Load cart from localStorage
    //         let cart = JSON.parse(localStorage.getItem('cart')) || [];
    //         // Check if product (same name, size) already in cart
    //         const existingIndex = cart.findIndex(item => item.name === productName && item.size === productSize);
    //         if (existingIndex !== -1) {
    //             // Increase quantity
    //             cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
    //         } else {
    //             // Add new item
    //             cart.push({
    //                 name: productName,
    //                 price: productPrice,
    //                 image: productImage,
    //                 size: productSize,
    //                 quantity: 1
    //             });
    //         }
    //         localStorage.setItem('cart', JSON.stringify(cart));
    //         updateCartCount();
    //         showNotification(`${productName} đã được thêm vào giỏ hàng!`);
    //     });
    // });

    // Shopping cart functionality
    let cart = [];

    function addToCart(item) {
        cart.push(item);
        updateCartCount();
        saveCart();
    }

    function updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = cart.length;
        }
    }

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function loadCart() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
            updateCartCount();
        }
    }

    // Load cart on page load
    loadCart();

    // Notification system
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.textContent = message;

        document.body.appendChild(notification);

        // Add show class after a small delay
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #2c3e50;
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            box-shadow: 0 3px 10px rgba(0,0,0,0.2);
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 1000;
        }

        .notification.show {
            transform: translateY(0);
            opacity: 1;
        }

        .mobile-menu-button {
            display: none;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #2c3e50;
            cursor: pointer;
        }

        @media (max-width: 768px) {
            .mobile-menu-button {
                display: block;
            }

            .nav-links {
                display: none;
                width: 100%;
            }

            .nav-links.active {
                display: flex;
            }
        }
    `;
    document.head.appendChild(style);

    // Product image hover effect
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        const img = card.querySelector('img');
        card.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.1)';
        });
        card.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
        });
    });

    // Tạo nút cuộn lên đầu trang
    const scrollButton = document.createElement('button');
    // Thêm icon mũi tên lên vào nút
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    // Thêm class CSS cho nút
    scrollButton.classList.add('scroll-top');
    // Thêm nút vào body của trang
    document.body.appendChild(scrollButton);

    // Thêm sự kiện lắng nghe khi cuộn trang
    window.addEventListener('scroll', () => {
        // Kiểm tra nếu đã cuộn xuống quá 300px
        if (window.scrollY > 300) {
            // Hiển thị nút bằng cách thêm class 'show'
            scrollButton.classList.add('show');
        } else {
            // Ẩn nút bằng cách xóa class 'show'
            scrollButton.classList.remove('show');
        }
    });

    // Thêm sự kiện click cho nút
    scrollButton.addEventListener('click', () => {
        // Cuộn trang lên đầu với hiệu ứng mượt
        window.scrollTo({
            top: 0,           // Vị trí cuộn đến (0 = đầu trang)
            behavior: 'smooth' // Hiệu ứng cuộn mượt
        });
    });

    // Add scroll to top button styles
    const scrollButtonStyle = document.createElement('style');
    scrollButtonStyle.textContent = `
        .scroll-top {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #e74c3c;
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
        }

        .scroll-top.show {
            opacity: 1;
            visibility: visible;
        }

        .scroll-top:hover {
            background-color: #c0392b;
        }
    `;
    document.head.appendChild(scrollButtonStyle);

    // Products Module
    const ProductsModule = {
        products: [
            // Basketball Shoes (6 products)
            {
                id: 1,
                name: "Giày Nike Air Jordan 5 SP x Off-White",
                price: 2500000,
                category: "basketball",
                sizes: [38, 39, 40, 41, 42, 43],
                image: "images/basketball/2.jpg"
            },
            {
                id: 2,
                name: "Nike LeBron XX 'Time Machine'",
                price: 3200000,
                category: "basketball",
                sizes: [39, 40, 41, 42, 43, 44],
                image: "images/basketball/3.jpg"
            },
            {
                id: 3,
                name: "Nike KD 15 'Aunt Pearl'",
                price: 2800000,
                category: "basketball",
                sizes: [37, 38, 39, 40, 41, 42],
                image: "images/basketball/4.jpg"
            },
            {
                id: 4,
                name: "Nike Air Jordan 1 High OG 'Chicago'",
                price: 3500000,
                category: "basketball",
                sizes: [36, 37, 38, 39, 40, 41],
                image: "images/basketball/5.jpg"
            },
            {
                id: 5,
                name: "Nike Air Jordan 3 'White Cement'",
                price: 2900000,
                category: "basketball",
                sizes: [38, 39, 40, 41, 42, 43],
                image: "images/basketball/6.jpg"
            },
            {
                id: 6,
                name: "Nike Air Jordan 4 'Bred'",
                price: 3100000,
                category: "basketball",
                sizes: [37, 38, 39, 40, 41, 42],
                image: "images/basketball/7.jpg"
            },

            // Casual Shoes (6 products)
            {
                id: 7,
                name: "Giày Smash v2 L Perf Trainers",
                price: 3800000,
                category: "casual",
                sizes: [36, 37, 38, 39, 40, 41],
                image: "images/casual/2.jpg"
            },
            {
                id: 8,
                name: "Adidas Samba OG 'White'",
                price: 2200000,
                category: "casual",
                sizes: [35, 36, 37, 38, 39, 40],
                image: "images/casual/3.jpg"
            },
            {
                id: 9,
                name: "New Balance 550 'White Green'",
                price: 2600000,
                category: "casual",
                sizes: [36, 37, 38, 39, 40, 41],
                image: "images/casual/4.jpg"
            },
            {
                id: 10,
                name: "Converse Chuck 70 'High Top'",
                price: 1900000,
                category: "casual",
                sizes: [35, 36, 37, 38, 39, 40],
                image: "images/casual/5.jpg"
            },
            {
                id: 12,
                name: "Nike Dunk Low 'Panda'",
                price: 2400000,
                category: "casual",
                sizes: [36, 37, 38, 39, 40, 41],
                image: "images/casual/7.jpg"
            },

            // Football Shoes (6 products)
            {
                id: 13,
                name: "Nike Mercurial Superfly 9 Elite",
                price: 4200000,
                category: "football",
                sizes: [38, 39, 40, 41, 42, 43],
                image: "images/football/2.jpg"
            },
            {
                id: 14,
                name: "Adidas Predator Edge+",
                price: 3800000,
                category: "football",
                sizes: [39, 40, 41, 42, 43, 44],
                image: "images/football/3.jpg"
            },
            {
                id: 15,
                name: "Nike Phantom GX Elite",
                price: 3900000,
                category: "football",
                sizes: [37, 38, 39, 40, 41, 42],
                image: "images/football/4.jpg"
            },
            {
                id: 16,
                name: "Adidas Copa Sense+",
                price: 3500000,
                category: "football",
                sizes: [38, 39, 40, 41, 42, 43],
                image: "images/football/5.jpg"
            },
            {
                id: 17,
                name: "Nike Tiempo Legend 9 Elite",
                price: 3600000,
                category: "football",
                sizes: [37, 38, 39, 40, 41, 42],
                image: "images/football/6.jpg"
            },
            {
                id: 18,
                name: "Puma Future Z 1.3",
                price: 3200000,
                category: "football",
                sizes: [38, 39, 40, 41, 42, 43],
                image: "images/football/7.jpg"
            },

            // Running Shoes (6 products)
            {
                id: 19,
                name: "Nike Air Zoom Pegasus 39",
                price: 2800000,
                category: "running",
                sizes: [36, 37, 38, 39, 40, 41],
                image: "images/running/2.jpg"
            },
            {
                id: 20,
                name: "Adidas Ultraboost 22",
                price: 3200000,
                category: "running",
                sizes: [37, 38, 39, 40, 41, 42],
                image: "images/running/3.jpg"
            },
            {
                id: 21,
                name: "Nike ZoomX Vaporfly Next% 2",
                price: 4500000,
                category: "running",
                sizes: [38, 39, 40, 41, 42, 43],
                image: "images/running/4.jpg"
            },
            {
                id: 22,
                name: "Asics Gel-Nimbus 24",
                price: 2900000,
                category: "running",
                sizes: [36, 37, 38, 39, 40, 41],
                image: "images/running/5.jpg"
            },
            {
                id: 23,
                name: "Brooks Ghost 14",
                price: 2600000,
                category: "running",
                sizes: [37, 38, 39, 40, 41, 42],
                image: "images/running/6.jpg"
            },
            {
                id: 24,
                name: "Hoka Clifton 8",
                price: 2700000,
                category: "running",
                sizes: [36, 37, 38, 39, 40, 41],
                image: "images/running/7.jpg"
            }
        ],

        init() {
            // Only initialize if we're on the products page
            if (!document.querySelector('.products-container')) return;

            this.setupFilterHandlers();
            this.setupSortHandlers();
            this.setupResetFilters();
            this.handleCategoryParam();
            this.applyFilters(); // Initial load
        },

        setupFilterHandlers() {
            // Lấy tất cả các input trong phần filter (checkbox, radio)
            const filterInputs = document.querySelectorAll('.filter-options input');
            // Lấy các input nhập khoảng giá
            const priceInputs = document.querySelectorAll('.price-range input');
            
            // Thêm sự kiện change cho mỗi input filter
            // Khi người dùng thay đổi lựa chọn, gọi hàm applyFilters để lọc lại
            filterInputs.forEach(input => {
                input.addEventListener('change', () => this.applyFilters());
            });

            // Thêm sự kiện input cho các ô nhập khoảng giá
            // Khi người dùng nhập giá, gọi hàm applyFilters để lọc lại
            priceInputs.forEach(input => {
                input.addEventListener('input', () => this.applyFilters());
            });
        },

        setupSortHandlers() {
            // Lấy select box sắp xếp
            const sortSelect = document.querySelector('.sort-options select');
            if (sortSelect) {
                // Thêm sự kiện change cho select box
                sortSelect.addEventListener('change', (e) => {
                    // Lấy giá trị sắp xếp được chọn
                    const sortValue = e.target.value;
                    // Tạo bản sao mảng sản phẩm để sắp xếp
                    let sortedProducts = [...this.products];

                    // Sắp xếp sản phẩm theo giá trị được chọn
                    switch (sortValue) {
                        case 'price-asc':
                            // Sắp xếp tăng dần theo giá
                            sortedProducts.sort((a, b) => a.price - b.price);
                            break;
                        case 'price-desc':
                            // Sắp xếp giảm dần theo giá
                            sortedProducts.sort((a, b) => b.price - a.price);
                            break;
                    }

                    // Cập nhật hiển thị danh sách sản phẩm đã sắp xếp
                    this.updateProductsGrid(sortedProducts);
                });
            }
        },

        setupResetFilters() {
            // Lấy nút reset
            const resetButton = document.getElementById('reset-filters');
            if (resetButton) {
                // Thêm sự kiện click cho nút reset
                resetButton.addEventListener('click', () => {
                    // Reset tất cả các input filter (radio và checkbox)
                    document.querySelectorAll('.filter-options input').forEach(input => {
                        if (input.type === 'radio' || input.type === 'checkbox') {
                            input.checked = false; // Bỏ chọn tất cả
                        }
                    });
                    
                    // Reset các input khoảng giá
                    document.querySelectorAll('.price-range input').forEach(input => {
                        input.value = ''; // Xóa giá trị đã nhập
                    });

                    // Reset select box sắp xếp về mặc định
                    const sortSelect = document.querySelector('.sort-options select');
                    if (sortSelect) {
                        sortSelect.value = 'price-asc';
                    }

                    // Tải lại trang để hiển thị tất cả sản phẩm
                    window.location.reload();
                });
            }
        },

        handleCategoryParam() {
            // Lấy các tham số từ URL
            const urlParams = new URLSearchParams(window.location.search);
            // Lấy giá trị tham số category
            const categoryParam = urlParams.get('category');

            // Nếu có tham số category trong URL
            if (categoryParam) {
                // Tìm radio button tương ứng với category
                const categoryRadio = document.querySelector(`input[name="category"][value="${categoryParam}"]`);
                if (categoryRadio) {
                    // Tự động chọn radio button đó
                    categoryRadio.checked = true;
                }
            }
        },

        applyFilters() {
            // Lấy danh mục đã chọn từ radio button
            const selectedCategory = document.querySelector('input[name="category"]:checked')?.value;

            // Lấy danh sách các kích thước đã chọn từ checkbox
            // Chuyển đổi giá trị từ string sang số nguyên
            const selectedSizes = Array.from(document.querySelectorAll('input[name="size"]:checked'))
                .map(input => parseInt(input.value));

            // Lấy giá trị khoảng giá từ input
            // Nếu không có giá trị thì mặc định là 0 cho min và Infinity cho max
            const minPrice = parseInt(document.querySelector('.price-range input:first-child').value) || 0;
            const maxPrice = parseInt(document.querySelector('.price-range input:last-child').value) || Infinity;

            // Lọc sản phẩm theo các điều kiện
            const filteredProducts = this.products.filter(product => {
                // Kiểm tra điều kiện danh mục
                // Nếu có chọn danh mục và sản phẩm không thuộc danh mục đó thì loại bỏ
                if (selectedCategory && product.category !== selectedCategory) {
                    return false;
                }

                // Kiểm tra điều kiện kích thước
                // Nếu có chọn kích thước và sản phẩm không có kích thước đó thì loại bỏ
                if (selectedSizes.length > 0 && !product.sizes.some(size => selectedSizes.includes(size))) {
                    return false;
                }

                // Kiểm tra điều kiện giá
                // Nếu giá sản phẩm nằm ngoài khoảng giá đã chọn thì loại bỏ
                if (product.price < minPrice || product.price > maxPrice) {
                    return false;
                }

                // Nếu thỏa mãn tất cả điều kiện thì giữ lại sản phẩm
                return true;
            });

            // Cập nhật hiển thị danh sách sản phẩm đã lọc
            this.updateProductsGrid(filteredProducts);
        },

        updateProductsGrid(filteredProducts) {
            const productsGrid = document.querySelector('.products-grid');
            if (!productsGrid) return;

            productsGrid.innerHTML = '';

            if (filteredProducts.length === 0) {
                productsGrid.innerHTML = '<p class="no-products">Không tìm thấy sản phẩm phù hợp</p>';
                return;
            }

            filteredProducts.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p class="price">${product.price.toLocaleString('vi-VN')}đ</p>
                    <button class="add-to-cart">Thêm vào giỏ</button>
                `;
                productsGrid.appendChild(productCard);
            });

            // Intercept Add to cart button on product cards
            document.addEventListener('click', function(e) {
                if (e.target.classList.contains('add-to-cart')) {
                    e.preventDefault();
                    // Find product info from ProductsModule
                    const card = e.target.closest('.product-card');
                    const name = card.querySelector('h3').textContent;
                    const product = ProductsModule.products.find(p => p.name === name);
                    if (product) openDrawer(product);
                }
            });
        }
    };

    // Initialize Products Module
    ProductsModule.init();

    // === Product Drawer Logic ===
    if (document.getElementById('product-drawer')) {
        // Khởi tạo các phần tử DOM cho drawer
        const drawerOverlay = document.getElementById('product-drawer'); // Lớp phủ toàn màn hình
        const drawer = drawerOverlay.querySelector('.drawer'); // Phần nội dung chính của drawer
        const drawerClose = drawerOverlay.querySelector('.drawer-close'); // Nút đóng drawer
        const drawerProductImage = document.getElementById('drawer-product-image'); // Hình ảnh sản phẩm
        const drawerProductName = document.getElementById('drawer-product-name'); // Tên sản phẩm
        const drawerProductPrice = document.getElementById('drawer-product-price'); // Giá sản phẩm
        const drawerQtyMinus = document.getElementById('drawer-qty-minus'); // Nút giảm số lượng
        const drawerQtyPlus = document.getElementById('drawer-qty-plus'); // Nút tăng số lượng
        const drawerQtyInput = document.getElementById('drawer-qty-input'); // Ô nhập số lượng
        const drawerSizeGrid = document.getElementById('drawer-size-grid'); // Lưới hiển thị kích thước
        const drawerAddToCart = document.getElementById('drawer-add-to-cart'); // Nút thêm vào giỏ hàng

        // Biến lưu trữ trạng thái
        let currentProduct = null; // Sản phẩm hiện tại đang xem
        let selectedSize = null; // Kích thước đã chọn
        let availableSizes = []; // Danh sách kích thước có sẵn

        // Hàm kiểm tra kích thước có sẵn của sản phẩm
        function getSizeAvailability(product) {
            const allSizes = Array.from({length: 10}, (_, i) => 36 + i); // Tạo mảng kích thước từ 36-45
            return allSizes.map(size => ({
                size,
                available: product.sizes.includes(size) // Kiểm tra kích thước có trong danh sách của sản phẩm
            }));
        }

        // Hàm mở drawer và hiển thị thông tin sản phẩm
        function openDrawer(product) {
            currentProduct = product;
            selectedSize = null;
            availableSizes = getSizeAvailability(product);
            
            // Hiển thị thông tin sản phẩm
            drawerProductImage.src = product.image;
            drawerProductImage.alt = product.name;
            drawerProductName.textContent = product.name;
            drawerProductPrice.textContent = product.price.toLocaleString('vi-VN') + 'đ';
            drawerQtyInput.value = 1;
            
            // Tạo lưới kích thước
            drawerSizeGrid.innerHTML = '';
            
            // Tạo hai hàng cho kích thước
            const row1 = document.createElement('div');
            row1.className = 'size-row';
            const row2 = document.createElement('div');
            row2.className = 'size-row';
            
            // Phân loại kích thước thành hai nhóm
            const sizes36to40 = availableSizes.filter(({size}) => size >= 36 && size <= 40);
            const sizes41to45 = availableSizes.filter(({size}) => size >= 41 && size <= 45);
            
            // Thêm các nút kích thước vào hàng
            sizes36to40.forEach(({size, available}) => {
                const btn = createSizeButton(size, available);
                row1.appendChild(btn);
            });
            
            sizes41to45.forEach(({size, available}) => {
                const btn = createSizeButton(size, available);
                row2.appendChild(btn);
            });
            
            drawerSizeGrid.appendChild(row1);
            drawerSizeGrid.appendChild(row2);
            
            // Vô hiệu hóa nút thêm vào giỏ hàng cho đến khi chọn kích thước
            drawerAddToCart.disabled = true;
            drawerOverlay.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Khóa scroll trang
        }

        // Hàm tạo nút chọn kích thước
        function createSizeButton(size, available) {
            const btn = document.createElement('button');
            btn.className = 'drawer-size-btn';
            btn.textContent = size;
            btn.disabled = !available; // Vô hiệu hóa nếu không có sẵn
            if (!available) {
                btn.classList.add('out-of-stock'); // Thêm class cho kích thước hết hàng
            }
            btn.onclick = () => {
                if (!available) return;
                // Bỏ chọn tất cả các nút khác
                drawerSizeGrid.querySelectorAll('.drawer-size-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                selectedSize = size;
                drawerAddToCart.disabled = false; // Kích hoạt nút thêm vào giỏ hàng
            };
            return btn;
        }

        // Hàm đóng drawer
        function closeDrawer() {
            drawerOverlay.style.display = 'none';
            document.body.style.overflow = ''; // Cho phép scroll trang
        }

        // Xử lý điều khiển số lượng
        drawerQtyMinus.onclick = () => {
            let v = parseInt(drawerQtyInput.value) || 1;
            if (v > 1) drawerQtyInput.value = v - 1; // Giảm số lượng, tối thiểu là 1
        };
        drawerQtyPlus.onclick = () => {
            let v = parseInt(drawerQtyInput.value) || 1;
            if (v < 10) drawerQtyInput.value = v + 1; // Tăng số lượng, tối đa là 10
        };
        drawerQtyInput.oninput = () => {
            let v = parseInt(drawerQtyInput.value) || 1;
            if (v < 1) v = 1;
            if (v > 10) v = 10;
            drawerQtyInput.value = v; // Giới hạn số lượng từ 1-10
        };

        // Xử lý sự kiện đóng drawer
        drawerClose.onclick = closeDrawer; // Đóng khi click nút đóng
        drawerOverlay.onclick = (e) => { if (e.target === drawerOverlay) closeDrawer(); }; // Đóng khi click bên ngoài

        // Xử lý thêm vào giỏ hàng
        drawerAddToCart.onclick = () => {
            if (!selectedSize || !currentProduct) return; // Kiểm tra đã chọn kích thước và có sản phẩm
            
            // Lấy giỏ hàng từ localStorage
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            
            // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
            const existingIndex = cart.findIndex(item => item.name === currentProduct.name && item.size === selectedSize);
            
            if (existingIndex !== -1) {
                // Nếu đã có, tăng số lượng
                cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + parseInt(drawerQtyInput.value);
            } else {
                // Nếu chưa có, thêm sản phẩm mới
                cart.push({
                    name: currentProduct.name,
                    price: currentProduct.price,
                    image: currentProduct.image,
                    size: selectedSize,
                    quantity: parseInt(drawerQtyInput.value)
                });
            }
            
            // Lưu giỏ hàng vào localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Cập nhật số lượng sản phẩm trong giỏ
            if (typeof updateCartCount === 'function') updateCartCount();
            
            // Hiển thị thông báo
            if (typeof showNotification === 'function') showNotification(currentProduct.name + ' đã được thêm vào giỏ hàng!');
            
            // Đóng drawer
            closeDrawer();
        };

        // Thêm CSS cho drawer
        const drawerStyle = document.createElement('style');
        drawerStyle.textContent = `
            /* Style cho nút kích thước */
            .drawer-size-btn {
                padding: 8px 16px;
                margin: 4px;
                border: 1px solid #ddd;
                background: white;
                cursor: pointer;
                border-radius: 4px;
                transition: all 0.2s ease;
                width: 45px;
                text-align: center;
            }

            /* Hiệu ứng hover cho nút kích thước */
            .drawer-size-btn:hover:not(:disabled) {
                border-color: #2c3e50;
                background: #f8f9fa;
            }

            /* Style cho nút kích thước đã chọn */
            .drawer-size-btn.selected {
                background: #2c3e50;
                color: white;
                border-color: #2c3e50;
            }

            /* Style cho nút kích thước bị vô hiệu hóa */
            .drawer-size-btn:disabled {
                background: #f8f9fa;
                color: #999;
                cursor: not-allowed;
                position: relative;
            }

            /* Style cho thông báo hết hàng */
            .drawer-size-btn.out-of-stock:disabled::after {
                content: 'Hết hàng';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 10px;
                color: #dc3545;
            }

            /* Layout cho lưới kích thước */
            #drawer-size-grid {
                display: flex;
                flex-direction: column;
                gap: 16px;
            }

            /* Layout cho hàng kích thước */
            .size-row {
                display: grid;
                grid-template-columns: repeat(5, 1fr);
                gap: 8px;
            }
        `;
        document.head.appendChild(drawerStyle);
    }

    // Add filter styles
    const filterStyle = document.createElement('style');
    filterStyle.textContent = `
        .size-filter {
            display: flex;
            gap: 20px;
            justify-content: space-between;
        }

        .size-column {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .size-column label {
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
        }

        .size-column input[type="checkbox"] {
            width: 16px;
            height: 16px;
            cursor: pointer;
        }
    `;
    document.head.appendChild(filterStyle);
}); 