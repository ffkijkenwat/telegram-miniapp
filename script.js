document.getElementById('mijnFormulier').addEventListener('submit', function(event) {
    event.preventDefault();
    const naam = document.getElementById('naam').value;
    const email = document.getElementById('email').value;
    console.log('Naam:', naam, 'Email:', email);
    // Hier zou je de gegevens naar je server kunnen sturen
});
