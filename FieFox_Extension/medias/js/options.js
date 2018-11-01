$( document ).ready(function() {
    const self = this;
    let file = null;
    let lines = null;

    // Get file
    $('#main_file').on('change', function (event) {
        file = event.target.files[0];
    });

    // Process file
    $('#process_main_file').on('click', function (event) {
        const reader = new FileReader();
        reader.readAsText(file);

        reader.onload = function(e) {
            const content = reader.result;
            lines = reader.result.split('\n');

            let darkness = new Darkness(file, lines);
            darkness.setConfig();
            darkness.start();
            $("#success-alert").removeClass('hidden');
            $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
                $("#success-alert").slideUp(500);
            });
        };
    });

    class Darkness {
        constructor (file = null, lines = null) {
            // Config Data
            this._file = file;
            this._lines = lines;
            // Config Index
            this._config_dwfrm_personinf_billtoaddress_firstName = null;
            this._config_dwfrm_personinf_billtoaddress_lastName = null;
            this._config_dwfrm_personinf_billtoaddress_address1 = null;
            this._config_dwfrm_personinf_billtoaddress_city = null;
            this._config_dwfrm_personinf_billtoaddress_states_state = null;
            this._config_dwfrm_personinf_contact_daytimephone = null;
            this._config_dwfrm_personinf_billtoaddress_zip = null;
            this._config_dwfrm_personinf_creditcard_number = null;
            this._config_creditCardMonth = null;
            this._config_creditCardYear = null;
            this._config_dwfrm_personinf_contact_email = null;

            this._option_emails = null;
        }

        setFile (file) {
            this._file = file;
        }

        getFile () {
            return this._file;
        }

        setLines (lines) {
            this._lines = lines;
        }

        getLines () {
            return this._lines;
        }

        start () {
            const self = this;
            let array = [];

            _.forEach(this._lines, function(line) {
              let item = self.perLine(line);
              array.push(item);
            });

            browser.storage.local.set({'ship_to_billing_address': JSON.stringify(array)})
                .then();

            // let data = browser.storage.local.get("ship_to_billing_address");

            // data.then(function (ele) {
            //     console.log(ele.ship_to_billing_address);
            // });
        }

        perLine (line) {
            line = line.trim();
            if (line <= 0) {
                return;
            }
            let arrayValues = line.split('|');

            let object = {};

            object.first_name = arrayValues[this._config_dwfrm_personinf_billtoaddress_firstName];
            object.last_name = arrayValues[this._config_dwfrm_personinf_billtoaddress_lastName];
            object.address1 = arrayValues[this._config_dwfrm_personinf_billtoaddress_address1];
            object.city = arrayValues[this._config_dwfrm_personinf_billtoaddress_city];
            object.state = arrayValues[this._config_dwfrm_personinf_billtoaddress_states_state];
            object.phone = arrayValues[this._config_dwfrm_personinf_contact_daytimephone];
            object.zip = arrayValues[this._config_dwfrm_personinf_billtoaddress_zip];
            object.card_number = arrayValues[this._config_dwfrm_personinf_creditcard_number];
            object.card_month = arrayValues[this._config_creditCardMonth];
            object.card_year = arrayValues[this._config_creditCardYear];
            object.email = arrayValues[this._config_dwfrm_personinf_contact_email];
            object.card_month_year = this.formatMonthYear(object.card_year, object.card_month);
            object.email = this.formatEmail(object.email);
            object.password = this._option_password;

            return object;
        }

        formatMonthYear (year, month) {
            let formatYear;
            let formatMonth;

            if (year.length == 1) {
                formatYear = 0 + year;
            }

            if (year.length == 2) {
                formatYear = year;
            }

            if (year.length == 4) {
                formatYear = year % 2000;
            }

            if (month.length == 1) {
                formatMonth = 0 + month;
            }

            if (month.length == 2) {
                formatMonth = month;
            }

            return formatMonth + '/' + formatYear;
        }

        formatEmail (email) {
            let formatEmail = email.substring(0, email.lastIndexOf("@"));
            if (this._option_emails.trim()) {
                let typeEmail = this._option_emails.split('|');
                let random = Math.floor(Math.random() * typeEmail.length) + 0;

                return formatEmail + typeEmail[random];
            }

            return email;
        }

        setConfig () {
            this._config_dwfrm_personinf_billtoaddress_firstName = $('#config_dwfrm_personinf_billtoaddress_firstName').val();
            this._config_dwfrm_personinf_billtoaddress_lastName = $('#config_dwfrm_personinf_billtoaddress_lastName').val();
            this._config_dwfrm_personinf_billtoaddress_address1 = $('#config_dwfrm_personinf_billtoaddress_address1').val();
            this._config_dwfrm_personinf_billtoaddress_city = $('#config_dwfrm_personinf_billtoaddress_city').val();
            this._config_dwfrm_personinf_billtoaddress_states_state = $('#config_dwfrm_personinf_billtoaddress_states_state').val();
            this._config_dwfrm_personinf_contact_daytimephone = $('#config_dwfrm_personinf_contact_daytimephone').val();
            this._config_dwfrm_personinf_billtoaddress_zip = $('#config_dwfrm_personinf_billtoaddress_zip').val();
            this._config_dwfrm_personinf_creditcard_number = $('#config_dwfrm_personinf_creditcard_number').val();
            this._config_creditCardMonth = $('#config_creditCardMonth').val();
            this._config_creditCardYear = $('#config_creditCardYear').val();
            this._config_dwfrm_personinf_contact_email = $('#config_dwfrm_personinf_contact_email').val();

            this._option_emails = $('#email_options').val();
            this._option_password = $('#password_options').val();
        }
    }
});
