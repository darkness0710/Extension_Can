$(document).ready(function() {
  // Darkness0710
  const table = new DataTable('#element');
  table.build();

  $('#clickme').on('click', function (e) {
      var checkboxed = $('input[type=checkbox]:checked');

      let object = {
        address1: checkboxed.data('address1'),
        card_month: checkboxed.data('card_month'),
        card_number: checkboxed.data('card_number'),
        card_year: checkboxed.data('card_year'),
        city: checkboxed.data('city'),
        email: checkboxed.data('email'),
        first_name: checkboxed.data('first_name'),
        last_name: checkboxed.data('last_name'),
        phone: checkboxed.data('phone'),
        state: checkboxed.data('state'),
        zip: checkboxed.data('zip'),
        card_month_year: checkboxed.data('card_month_year'),
        passowrd: checkboxed.data('passowrd'),
      };
      chrome.tabs.executeScript(null, {
        code: 'var object = ' + JSON.stringify(object)
      }, function() {
        chrome.tabs.executeScript(null, {file: 'executes.js'});
      });

      $("#inject-alert").removeClass('hidden');
      $("#inject-alert").fadeTo(2000, 500).slideUp(500, function(){
          $("#inject-alert").slideUp(500);
      });

  });
  // End Darkness
});


class DataTable {
  constructor (element) {
    this._element = element;
  }

  build (data) {
    const self = this;
    chrome.storage.sync.get('ship_to_billing_address', function(data) {
      /* error */
      if(chrome.runtime.lastError) {
          return;
      }

      let temp = JSON.parse(data.ship_to_billing_address);
      let array = [];

      _.forEach(temp, function(item, index) {
        if (item) {
          array.push(item);
        }
      });

      $('#element').DataTable({
        data: array,
        lengthMenu: [1000, 2000],
        columnDefs: [
          {
            className: 'dt-center',
            targets: 'td',
          }
        ],
        columns: [
          {
            title: '#',
            render: function (data, type, row) {
              let address1 = row.address1;
              let card_month = row.card_month;
              let card_number = row.card_number;
              let card_month_year = row.card_month_year;
              let card_year = row.card_year;
              let city = row.city;
              let email = row.email;
              let first_name = row.first_name;
              let last_name = row.last_name;
              let phone = row.phone;
              let state = row.state;
              let zip = row.zip;
              let password = row.password;

              return `<input type='checkbox' data-address1="${address1}"
                                             data-card_month="${card_month}"
                                             data-card_number="${card_number}"
                                             data-card_year="${card_year}"
                                             data-city="${city}"
                                             data-email="${email}"
                                             data-first_name="${first_name}"
                                             data-last_name="${last_name}"
                                             data-phone="${phone}"
                                             data-state="${state}"
                                             data-card_month_year="${card_month_year}"
                                             data-password="${password}"
                                             data-zip="${zip}" >`;
            }
          },
          {
            title: 'first_name',
            render: function (data, type, row, meta) {
              return row.first_name;
            }
          },
          {
            title: 'last_name',
            render: function (data, type, row, meta) {
              return row.last_name;
            }
          },
          {
            title: 'address1',
            render: function (data, type, row, meta) {
              return row.address1;
            }
          },
          {
            title: 'city',
            render: function (data, type, row, meta) {
              return row.city;
            }
          },
          {
            title: 'state',
            render: function (data, type, row, meta) {
              return row.state;
            }
          },
          {
            title: 'phone',
            render: function (data, type, row, meta) {
              return row.phone;
            }
          },
          {
            title: 'zip',
            render: function (data, type, row, meta) {
              return row.zip;
            }
          },
          {
            title: 'card_number',
            render: function (data, type, row, meta) {
              return row.card_number;
            }
          },
          {
            title: 'card_month',
            render: function (data, type, row, meta) {
              return row.card_month;
            }
          },
          {
            title: 'card_year',
            render: function (data, type, row, meta) {
              return row.card_year;
            }
          },
          {
            title: 'email',
            render: function (data, type, row, meta) {
              return row.email;
            }
          },
          {
            title: 'card_month_year',
            render: function (data, type, row, meta) {
              return row.card_month_year;
            }
          },
          {
            title: 'password',
            render: function (data, type, row, meta) {
              return row.password;
            }
          }
        ]
      });

      $('input[type="checkbox"]').on('change', function() {
        $('input[type="checkbox"]').not(this).prop('checked', false);
      });

    });

  }

}
