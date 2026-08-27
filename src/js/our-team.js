// ---------------------------------------------------------------------------
// Team section — interactive team member display
// ---------------------------------------------------------------------------

// DOM references
const teamResetMessage = document.getElementById('team-reset-message');
const teamHeaders      = document.querySelectorAll('.team-header');
const teamSection      = document.getElementById('our-team');
const descriptionText  = document.getElementById('description-text');
const teamMemberTitle  = document.getElementById('team-member-title');

const defaultTeamBg = 'url("assets/images/team/all.jpg")';
if (teamSection) teamSection.style.backgroundImage = defaultTeamBg;

// ---------------------------------------------------------------------------
// State machine — 'DEFAULT' | 'CLICKED'
// ---------------------------------------------------------------------------
const TEAM_STATE = { DEFAULT: 'DEFAULT', CLICKED: 'CLICKED' };
let state = TEAM_STATE.DEFAULT;
let activeHeader = null;

// Image object reused across interactions
const currentImg = new Image();

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function showMemberInfo(data) {
    descriptionText.setAttribute('keep-text', '1');
    teamMemberTitle.setAttribute('keep-text', '1');
    descriptionText.textContent = data.description;
    teamMemberTitle.textContent = data.title;
}

function readHeaderData(header) {
    return {
        imageUrl:    header.getAttribute('data-image'),
        description: header.getAttribute('data-description'),
        title:       header.getAttribute('data-title'),
    };
}

// ---------------------------------------------------------------------------
// State transitions
// ---------------------------------------------------------------------------
function setState(newState, data) {
    state = newState;

    if (newState === TEAM_STATE.DEFAULT) {
        if (teamSection) teamSection.style.backgroundImage = defaultTeamBg;
        if (descriptionText) {
            descriptionText.textContent = descriptionText.getAttribute('data-default');
            descriptionText.removeAttribute('keep-text');
        }
        if (teamMemberTitle) {
            teamMemberTitle.textContent = teamMemberTitle.getAttribute('data-default');
            teamMemberTitle.removeAttribute('keep-text');
        }
        if (teamResetMessage) teamResetMessage.style.display = 'none';

    } else if (newState === TEAM_STATE.CLICKED) {
        const imageUrl = (data.imageUrl || '').replace(/^url\(['"]?|['"]?\)$/g, '').trim();
        currentImg.onload = () => {
            if (teamSection) teamSection.style.backgroundImage = `url("${imageUrl}")`;
        };
        if (imageUrl) {
            currentImg.src = imageUrl;
            if (currentImg.complete && currentImg.naturalWidth !== 0) {
                if (teamSection) teamSection.style.backgroundImage = `url("${imageUrl}")`;
            }
        }

        showMemberInfo(data);
        if (teamResetMessage) teamResetMessage.style.display = 'block';
    }
}

// ---------------------------------------------------------------------------
// Event listeners
// ---------------------------------------------------------------------------
teamHeaders.forEach(header => {
    function toggleHeader(e) {
        e.stopPropagation();

        // Toggle off if clicking the currently active member
        if (activeHeader === header) {
            setState(TEAM_STATE.DEFAULT);
            header.classList.remove('active');
            activeHeader = null;
            return;
        }

        // Deactivate previous header
        if (activeHeader) {
            activeHeader.classList.remove('active');
        }

        // Activate clicked header
        header.classList.add('active');
        activeHeader = header;

        const data = readHeaderData(header);
        setState(TEAM_STATE.CLICKED, data);
    }

    header.addEventListener('click', toggleHeader);
    header.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleHeader(e);
        }
    });
});

// Reset to default overview when clicking outside team titles
document.addEventListener('click', function (e) {
    if (!e.target.closest('.team-header') && !e.target.closest('.paragraph-section') && activeHeader) {
        setState(TEAM_STATE.DEFAULT);
        if (activeHeader) activeHeader.classList.remove('active');
        activeHeader = null;
    }
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
