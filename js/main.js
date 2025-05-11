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
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.parentElement;
            const productName = product.querySelector('h3').textContent;
            const productPrice = product.querySelector('.price').textContent;
            
            // Create cart item
            const cartItem = {
                name: productName,
                price: productPrice
            };

            // Add to cart (you can implement your own cart logic here)
            addToCart(cartItem);
            
            // Show notification
            showNotification(`${productName} đã được thêm vào giỏ hàng!`);
        });
    });

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

    // Scroll to top button
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.classList.add('scroll-top');
    document.body.appendChild(scrollButton);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollButton.classList.add('show');
        } else {
            scrollButton.classList.remove('show');
        }
    });

    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
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
}); 