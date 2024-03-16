function deleteContent(i) {
    let popup = document.getElementById(`about-stats-card${i}`);
    popup.innerHTML = '';
}

function closeOnlyBlack(event) {
    event.stopPropagation();
}

function closeInformation() {
    document.body.style.overflow = 'auto';

    const popup = document.querySelector('.info-card-popup');
    if (popup) {
        popup.remove();
    }
}

