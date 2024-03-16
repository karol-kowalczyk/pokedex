async function showTenMoreWithDelay() {
    const originalButtonHTML = showTenMoreId.innerHTML; // Speichere den ursprünglichen HTML-Inhalt des Buttons
    loadingCard.innerHTML = /*html*/ `
    <div id="loading-screen"><h1>Loading ends in 3 second(s)...</h1>&nbsp&nbsp&nbsp<img id="pokeball" src="img/pokeball.png" alt=""></div>
    `;

    showTenMoreId.style.display = 'none';

    let secondsRemaining = 3;

    const countdownInterval = setInterval(() => {
        secondsRemaining--;

        if (secondsRemaining > 0) {
            loadingCard.innerHTML = /*html*/ `
                <div id="loading-screen"><h1>Loading ends in ${secondsRemaining} second(s)...</h1>&nbsp&nbsp&nbsp<img id="pokeball" src="img/pokeball.png" alt=""></div>
            `;
        } else {
            clearInterval(countdownInterval); // Stoppe den Countdown
            loadingCard.innerHTML = ''; // Lösche den Text, wenn die Verzögerung vorbei ist
            showTenMore();
            showTenMoreId.style.display = 'block'; // Zeige den Button wieder an
            showTenMoreId.innerHTML = originalButtonHTML; // Setze den ursprünglichen Button-HTML-Inhalt zurück
        }
    }, 1000);
}


async function showTenMore() {
    loadingCard.innerHTML = '';
    await loadInfoCard();
}
