var outletExamples = [
  { name: 'Hack Reactor Outlet',
    priceHourly: '2',
    priceEnergy: '5',
    description: 'on the corner guarded by a purple dragon',
    lat: 37.783624,
    long: -122.408999,
    priceSuggest: '3',
    address: '125 Sky Pie Ave',
    // seller_id: 12,
    // buyer_id: 6
  },
  { name: 'Yerba Buena Center',
    priceHourly: '2',
    priceEnergy: '4',
    description: 'just dont look directly at it though',
    lat: 37.782666,
    long: -122.400755,
    priceSuggest: '9',
    address: '123 Main St',
    // seller_id: 13,
    // buyer_id: 7
  },
  { name: 'Civic Center/UN Plaza',
    priceHourly: '4',
    priceEnergy: '3',
    description: 'pay the troll to get access',
    lat: 37.779528,
    long: -122.413756,
    priceSuggest: '6',
    address: 'BART stop on Market',
    // seller_id: 15,
    // buyer_id: 8
  },
  { name: 'Burger Shack Outlet',
    priceHourly: '2',
    priceEnergy: '5',
    description: 'watch out for broken dreams',
    lat: 37.779558,
    long: -122.413726,
    priceSuggest: '8',
    address: '639 Leavenworth Ave',
    // seller_id: 14,
    // buyer_id: 9
  }
];

module.exports = outletExamples;

      // outlet.string('name', 30).notNullable();
      // outlet.decimal('priceEnergy', 5, 2).notNullable();
      // outlet.decimal('priceHourly', 5, 2).notNullable();
      // outlet.decimal('lat', 7, 5).notNullable();
      // outlet.decimal('long', 7 ,5).notNullable();
      // outlet.string('description', 300).notNullable();
      // outlet.decimal('priceSuggest', 5, 2).notNullable();
      // // outlet.string('photo'); --store the path to a directory, not the photo (worstcase, longblob)
      // outlet.string('address', 100).notNullable();
      // outlet.integer('seller_id', 11).unsigned().references('users.id').notNullable();
      // outlet.integer('buyer_id', 11).unsigned().references('users.id').notNullable();





