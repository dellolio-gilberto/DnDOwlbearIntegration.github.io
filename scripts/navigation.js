function switchPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    document.querySelector(`.${pageId}-page`).classList.add('active');
    
    // Update buttons state
    document.querySelectorAll('.sheet-nav-footer button').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`#btn-${pageId}`).classList.add('active');
}

// Initialize the first page as active
document.addEventListener('DOMContentLoaded', function() {
    switchPage('front');
});
