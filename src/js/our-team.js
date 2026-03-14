const headers         = document.querySelectorAll('.header');
const teamSection     = document.getElementById('our-team');
const descriptionText = document.getElementById('description-text');
const teamMemberTitle = document.getElementById('team-member-title');

const defaultTeamBg = 'url("assets/images/team/all.jpg")';
teamSection.style.backgroundImage = defaultTeamBg;

headers.forEach(header => {
    header.addEventListener('mouseenter', function () {
        teamSection.style.backgroundImage = `url(${this.getAttribute('data-image')})`;
        descriptionText.textContent = this.getAttribute('data-description');
        teamMemberTitle.textContent = this.getAttribute('data-title');
    });

    header.addEventListener('mouseleave', function () {
        teamSection.style.backgroundImage = defaultTeamBg;
        descriptionText.textContent = descriptionText.getAttribute('data-default');
        teamMemberTitle.textContent = teamMemberTitle.getAttribute('data-default');
    });
});

// Mobile team card toggle — named to match the inline onclick in index.html
function handleTeamCategoryClick(element) {
    const isPhone = window.getComputedStyle(element).getPropertyValue('--is-phone') === '1';
    if (isPhone) {
        const isActive = element.classList.contains('active');
        element.classList.remove('active');
        if (!isActive) element.classList.add('active');
    }
}

document.querySelectorAll('.team-category').forEach(element => {
    element.onclick = function () { handleTeamCategoryClick(this); };
});
