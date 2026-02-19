// Malabar Furniture - Product Data & Logic

// Sample Product Data
// Using Unsplash source URLs for realistic furniture placeholder images
const products = [
    {
        id: 1,
        code: '#MF101',
        name: 'Velvet Lounge Chair',
        category: 'chairs',
        images: [
            'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1617505370200-a947d12a67e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
        ]
    },
    {
        id: 2,
        code: '#MF202',
        name: 'Oak Dining Table',
        category: 'tables',
        images: [
            'https://images.unsplash.com/photo-1577140917170-285929fb55b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
        ]
    },
    {
        id: 3,
        code: '#MF305',
        name: 'Modern Gray Sofa',
        category: 'sofas',
        images: [
            'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
        ]
    },
    {
        id: 4,
        code: '#MF401',
        name: 'Wooden Wardrobe',
        category: 'cupboards',
        images: [
            'https://images.unsplash.com/photo-1595428774223-ef52624120d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
        ]
    },
    {
        id: 5,
        code: '#MF105',
        name: 'Minimalist Stool',
        category: 'chairs',
        images: [
            'https://images.unsplash.com/photo-1595428774223-ef52624120d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
        ]
    },
    {
        id: 6,
        code: '#MF210',
        name: 'Coffee Table Glass',
        category: 'tables',
        images: [
            'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1499933374294-4584851497cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
        ]
    },
    {
        id: 7,
        code: '#MF315',
        name: 'Leather Armchair',
        category: 'sofas',
        images: [
            'https://images.unsplash.com/photo-1550254478-ead40cc54513?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
        ]
    },
    {
        id: 8,
        code: '#MF420',
        name: 'Storage Cabinet',
        category: 'cupboards',
        images: [
            'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
        ]
    }
];

// WhatsApp Config
const WHATSAPP_NUMBER = '919876543210'; // Placeholder

// DOM Elements
const productGrid = document.querySelector('.product-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const modalClose = document.querySelector('.modal-close');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const modalTitle = document.getElementById('modalTitle');
const modalCounter = document.getElementById('modalCounter');

let currentProductImages = [];
let currentImageIndex = 0;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    setupFilters();
    setupModal();
});

// Render Products
function renderProducts(items) {
    productGrid.innerHTML = '';

    // Add animation delay based on index
    items.forEach((product, index) => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.style.animationDelay = `${index * 0.1}s`;

        card.innerHTML = `
            <div class="card-image" onclick="openModal(${product.id})">
                <img src="${product.images[0]}" alt="${product.name}">
                <div class="card-overlay">
                    <button class="view-btn">View Images</button>
                </div>
            </div>
            <div class="card-details">
                <span class="category-tag">${product.category}</span>
                <h3>${product.name}</h3>
                <span class="product-code">${product.code}</span>
                <a href="https://wa.me/${WHATSAPP_NUMBER}?text=Hello, I'm interested in product ${product.code} (${product.name})" 
                   class="whatsapp-btn" target="_blank">
                   <i class="fab fa-whatsapp"></i> Enquire
                </a>
            </div>
        `;
        productGrid.appendChild(card);
    });
}

// Setup Filters
function setupFilters() {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            if (filterValue === 'all') {
                renderProducts(products);
            } else {
                const filtered = products.filter(p => p.category === filterValue);
                renderProducts(filtered);
            }
        });
    });
}

// Modal Logic
window.openModal = function (productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    currentProductImages = product.images;
    currentImageIndex = 0;

    updateModalImage();
    modalTitle.textContent = product.name;

    modal.style.display = 'block';
    // Small delay to allow display:block to apply before opacity transition
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);

    document.body.style.overflow = 'hidden'; // Stop background scrolling
}

function closeModal() {
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }, 300);
}

function updateModalImage() {
    modalImg.style.opacity = '0.5';

    setTimeout(() => {
        modalImg.src = currentProductImages[currentImageIndex];
        modalImg.onload = () => {
            modalImg.style.opacity = '1';
        };
        modalCounter.textContent = `${currentImageIndex + 1} / ${currentProductImages.length}`;
    }, 200);
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % currentProductImages.length;
    updateModalImage();
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + currentProductImages.length) % currentProductImages.length;
    updateModalImage();
}

// Modal Event Listeners
modalClose.addEventListener('click', closeModal);

// Close on outside click
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    nextImage();
});

prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    prevImage();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'block') {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    }
});

// Touch Swipe Support
let touchStartX = 0;
let touchEndX = 0;

modal.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

modal.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) nextImage(); // Swipe Left
    if (touchEndX > touchStartX + 50) prevImage(); // Swipe Right
}
