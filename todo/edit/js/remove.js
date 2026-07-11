async function FINE(ID) {
    let succes;
    const nameEL = document.getElementById('name');
    const passEL = document.getElementById('key');
    if (!ID || !nameEL.value || !passEL.value) {alert('prosím vložťe platnú položku, kľúč a meno');return;};
    
    const Continue = confirm('Sťe si istý že ste zadali správne číslo položky\nA chceťe túto funkciu vikonať?');
    if(Continue === false || !Continue) {alert('abort');return;}
    if(Continue === true) {
        try{
            const response = await fetch(`http://${window.location.hostname}:3003/drop?t=todo${nameEL.value}&id=${ID}`, {
                headers: {
                    'pass': passEL.value
                }
            });
            if (response.status === 202) {
                succes = true;
            } else {
                succes = response.status;
            }
        } catch (err) {
            succes = err;
        } finally {
            if (succes === true) {
                alert('Úspešne poslané');
            } else {
                alert('Chiba' + succes);
            }
        }
    }
}