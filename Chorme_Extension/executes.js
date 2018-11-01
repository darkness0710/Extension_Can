chrome.storage.sync.get('ship_to_billing_address', function(data) {
    /* error */
    if(chrome.runtime.lastError) {
        return;
    }

    if (!object) {
        return;
    }

    console.log(object);

    document.getElementById('dwfrm_personinf_contact_email').value = object.email;
    document.getElementById('dwfrm_personinf_creditcard_number').value = object.card_number;
    document.getElementById('dwfrm_personinf_billtoaddress_firstName').value = object.first_name;
    document.getElementById('dwfrm_personinf_billtoaddress_lastName').value = object.last_name;
    document.getElementById('dwfrm_personinf_billtoaddress_address1').value = object.address1;
    document.getElementById('dwfrm_personinf_billtoaddress_city').value = object.city;
    document.getElementById('dwfrm_personinf_contact_daytimephone').value = object.phone;
    document.getElementById('dwfrm_personinf_billtoaddress_zip').value = object.zip;
    document.getElementById('dwfrm_personinf_creditcard_number').value = object.card_number;
    document.getElementById('dwfrm_personinf_creditcard_monthyear').value = object.card_month_year;
    document.getElementById('dwfrm_personinf_account_password').value = object.password;
    // State
    let state = document.getElementById('dwfrm_personinf_billtoaddress_states_state');
    state.value = object.state;

    // Remove CVV + Argee Temps
    let element = document.getElementById("dwfrm_personinf_creditcard_cvv");
    element.parentNode.removeChild(element);
    document.getElementById('dwfrm_personinf_agree').checked =  true;
});

chrome.storage.sync.get('shipping_info', function(data) {
    /* error */
    if(chrome.runtime.lastError) {
        return;
    }
    console.log(data);
});
