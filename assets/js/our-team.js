// Get all the hoverable headers
const headers = document.querySelectorAll('.header');

// Set the default background image
document.getElementById('our-team').style.backgroundImage = 'url("assets/images/team/all.jpg")'; // Replace with your default image

// Get the description paragraph element
const descriptionText = document.getElementById('description-text');
const teamMemberTitle = document.getElementById('team-member-title');

// Define the hover content for Josef
const josefDescription = `
  
`;

// Function to change background image and description on hover
headers.forEach(header => {
    header.addEventListener('mouseenter', function () {
        const imageUrl = this.getAttribute('data-image');
        const description = this.getAttribute('data-description');

        // Change background image
        document.getElementById('our-team').style.backgroundImage = `url(${imageUrl})`;

        // Change description based on hover

        descriptionText.textContent = this.getAttribute("data-description");
        teamMemberTitle.textContent = this.getAttribute("data-title");


    });

    header.addEventListener('mouseleave', function () {
        // Revert to the default background image
        document.getElementById('our-team').style.backgroundImage = 'url("assets/images/team/all.jpg")'; // Replace with your default image

        // Revert back to the default description
        descriptionText.textContent = `Our team, united by a passion for aviation, founded FlyCzech in 2018 to pass on our enthusiasm and contribute to the education of future aviation professionals. We aim to uphold the proud tradition of Czech aviation, improve safety, and provide high-quality training through close cooperation with airlines and aviation organizations.`;
        descriptionText.textContent = `Our team, united by a passion for aviation, founded FlyCzech in 2018 to pass on our enthusiasm and contribute to the education of future aviation professionals. We aim to uphold the proud tradition of Czech aviation, improve safety, and provide high-quality training through close cooperation with airlines and aviation organizations.`;
        teamMemberTitle.textContent = "Our Team";
    });
});


// Mobile onclick
function handleServiceCategoryClick(element) {
    // Check if we're on a phone
    const isPhone = window.getComputedStyle(element).getPropertyValue('--is-phone') === '1';

    // Get the URL from the data attribute
    const url = element.getAttribute('data-url');

    if (isPhone) {
        const isActive = element.classList.contains('active');

        // Remove "active" class from all elements
        element.classList.remove('active');

        // Add "active" class if it was not already set
        if (!isActive) {
            element.classList.add('active');
        }
    } else {
        // Non-phone: Open the URL in a new tab
        if (url) {
            window.open(url, '_blank');
        } else {
            console.error('No URL found for this service category');
        }
    }
}

// Attach the function to the onclick event
document.querySelectorAll('.team-category').forEach(element => {
    element.onclick = function () {
        handleServiceCategoryClick(this);
    };
});
