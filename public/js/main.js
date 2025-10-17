document.getElementById('userForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const form = e.target;
    const data = {
        name: form.name.value,
        phone: form.phone.value,
        email: form.email.value,
        address: form.address.value
    };

    const res = await fetch('/api/users', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });

    const result = await res.json();
    alert(result.message);
    form.reset();
});

