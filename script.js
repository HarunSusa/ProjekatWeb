document.querySelector('#ponudiVoznju form').addEventListener('submit', function (e) {
    e.preventDefault();

    const start = this.querySelector('input[placeholder="Unesite početnu lokaciju"]').value;
    const destination = this.querySelector('input[placeholder="Unesite destinaciju"]').value;
    const date = this.querySelector('input[type="date"]').value;
    const time = this.querySelector('input[type="time"]').value;
    const seats = this.querySelector('input[placeholder="Unesite broj slobodnih mjesta"]').value;
    const price = this.querySelector('input[placeholder="Unesite cijenu(u KM)"]').value;

    const voznje = JSON.parse(localStorage.getItem('voznje')) || [];
    voznje.push({ start, destination, date, time, seats, price });
    localStorage.setItem('voznje', JSON.stringify(voznje));
    alert('Vožnja je uspješno ponuđena!');
    this.reset();
});
document.querySelector('#pronadjiVoznju form').addEventListener('submit', function (e) {
    e.preventDefault();

    const start = this.querySelector('input[placeholder="Unesite početnu lokaciju"]').value;
    const destination = this.querySelector('input[placeholder="Unesite destinaciju"]').value;
    const date = this.querySelector('input[type="date"]').value;

    const voznje = JSON.parse(localStorage.getItem('voznje')) || [];
    const matchingVoznje = voznje.filter(v => 
        v.start.toLowerCase() === start.toLowerCase() &&
        v.destination.toLowerCase() === destination.toLowerCase() &&
        v.date === date
    );

    let rezultatDiv = document.querySelector('#pronadjiVoznju .rezultat');
    if (!rezultatDiv) {
        rezultatDiv = document.createElement('div');
        rezultatDiv.className = 'rezultat';
        document.querySelector('#pronadjiVoznju').appendChild(rezultatDiv);
    }

    rezultatDiv.innerHTML = '';
    if (matchingVoznje.length > 0) {
        matchingVoznje.forEach(voznja => {
            const p = document.createElement('p');
            p.textContent = `Početna lokacija: ${voznja.start}, Destinacija: ${voznja.destination}, Datum: ${voznja.date}, Vrijeme: ${voznja.time}, Slobodna mjesta: ${voznja.seats}, Cijena: ${voznja.price} KM`;
            rezultatDiv.appendChild(p);
        });
    } else {
        rezultatDiv.textContent = 'Trenutno nema vožnji za unijete kriterije.';
    }
});

