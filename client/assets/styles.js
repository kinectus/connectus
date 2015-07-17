$('.ui.form')
  .form({
    fields: {
      street: {
        identifier  : 'street',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter your street address'
          }
        ]
      },
      city: {
        identifier  : 'city',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter your city'
          }
        ]
      },
      state: {
        identifier  : 'state',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter your state'
          }
        ]
      },
      zip: {
        identifier  : 'zip',
        rules: [
          {
            type   : 'length[5]',
            prompt : 'Please enter your 5 digit zip code'
          }
        ]
      },
      name: {
        identifier  : 'name',
        rules: [
          {
            type   : 'length[1]',
            prompt : 'Please enter your name'
          }
        ]
      },
      description: {
        identifier  : 'description',
        rules: [
          {
            type   : 'length[20]',
            prompt : 'Please enter a full description'
          }
        ]
      },
      charge: {
        identifier  : 'charge',
        rules: [
          {
            type   : 'integer',
            prompt : 'Please enter your charging price'
          }
        ]
      }
    },
    inline: true,
    on: 'blur'
  }
);