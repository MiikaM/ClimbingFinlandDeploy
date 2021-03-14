const correctTimes = [
  '00:00',
  '01:01',
  '02:23',
  '07:30',
  '04:04',
  '05:53',
  '06:20',
  '07:59',
  '08:00',
  '09:10',
  '10:20',
  '11:30',
  '12:40',
  '13:50',
  '14:51',
  '15:23',
  '16:40',
  '17:00',
  '18:00',
  '19:07',
  '20:22',
  '21:41',
  '22:00',
  '23:00',
  '23:59',
  'Closed'
]

const wrongTimes = [
  '0000',
  '0101',
  '02:3',
  '03:60',
  '04:064',
  '05:73',
  '6:20',
  '07:5',
  '26:00',
  '0:10',
  '1020',
  '11230',
  '12;40',
  '13,50',
  '14<51',
  '15>23',
  '16.40',
  '17,00',
  '18 00',
  '23:60',
  '25:22',
  '21:-11',
  '2:00',
  '23:0',
  '24:59',
]

const correctDays = [
  {
    open: '00:00',
    close: '04:04'
  },
  {
    open: '07:30',
    close: '15:00'
  },
  {
    open: '15:00',
    close: '20:00'
  },
  {
    open: 'Closed',
    close: 'Closed'
  },
  {
    open: '11:30',
    close: '23:59'
  },
  {
    open: '17:00',
    close: '21:00'
  },
  {
    open: '07:30',
    close: '15:30'
  },
  {
    open: '00:00',
    close: '07:30'
  },
  {
    open: '01:01',
    close: '18:00'
  },
  {
    open: '06:00',
    close: '12:00'
  },
]

const wrongDaysIncorrect = [
  {
    open: 'Closed',
    close: 'k'
  },
  {
    open: 'closed',
    close: '23:59'
  },
  {
    open: '07:30',
    close: '1500'
  }
]

const wrongCities = [
  'Recife'
  , 'Shiraz'
  , 'Novosibirsk'
  , 'Berlin'
  , 'Hiroshima'
  , 'Hamburg'
  , 'Milan'
  , 'Rio de Janeiro'
  , 'Giza'
  , 'Singapore'
  , 'Phoenix'
  , 'Quito'
  , 'Surabaya'
  , 'Hanoi'
  , 'Luanda'
  , 'Jakarta'
  , 'Chongqing'
  , 'Mumbai'
  , 'Tainan'
  , 'Fukuoka'
  , 'Riyadh'
  , 'T\'bilisi'
  , 'Bucharest'
  , 'Fez'
  , 'Dongguan'
  , 'Melbourne'
  , 'Philadelphia'
  , 'Barcelona'
  , 'Guangzhou'
  , 'Nagoya'
  , 'Montevideo'
  , 'Xiamen'
  , 'Lagos'
  , 'Hyderabad'
  , 'Fortaleza'
  , 'Rostov-on-Don'
  , 'Santiago'
  , 'Quanzhou'
  , 'Istanbul'
  , 'Yokohama'
  , 'Nairobi'
  , 'Harare'
  , 'Porto Alegre'
  , 'Chittagong'
  , 'Isfahan'
  , 'Prague'
  , 'Abidjan'
  , 'Davao City'
  , 'Tangshan'
  , 'Belgrade'
  , 'Ahvaz'
  , 'Houston'
  , 'Ho Chi Minh City'
  , 'Baghdad'
  , 'Shantou'
  , 'Buenos Aires'
  , 'Hong Kong'
  , 'Shenyang'
  , 'Cape Town'
  , 'Ankara'
  , 'Vienna'
  , 'Kampala'
  , 'Karachi'
  , 'Tashkent'
  , 'Pune'
  , 'Beijing'
  , 'Semarang'
  , 'Osaka'
  , 'Alexandria'
  , 'San Diego'
  , 'Dakar'
  , 'Bulawayo'
  , 'Phnom Penh'
  , 'Belo Horizonte'
  , 'Tehran'
  , 'Kathmandu'
  , 'Córdoba'
  , 'Hyderabad'
  , 'Kwangju'
  , 'Addis Ababa'
  , 'Kuala Lumpur'
  , 'Tunis'
  , 'Lima'
  , 'İzmir'
  , 'Medellin'
  , 'Salvador'
  , 'Delhi'
  , 'Caracas'
  , 'Rawalpindi'
  , 'San Antonio'
  , 'Shanghai'
  , 'Ekurhuleni'
  , 'São Paulo'
  , 'Manila'
  , 'Calgary'
  , 'Guadalajara'
  , 'Nizhny Novgorod'
  , 'Rome'
  , 'Visakhapatnam'
  , 'Makassar'

]


const wrongDaysMissing = [
  {
    open: '00:00'
  },
  {
    close: '15:00'
  },
  {
    open: '1500',
    colse: '20:00'
  },
  {

  },
  {
    open: '00:00',
    close: undefined
  },
  {
    open: '01:01',
    clsoing: '18:00'
  },
  {
    opening: '18:00',
    close: 'closed'
  },
]

const correctWeek = [
  {
    ma: {
      open: 'Closed',
      close: 'Closed'
    },
    ti: {
      open: '12:00',
      close: '21:00'
    },
    ke: {
      open: '17:00',
      close: '22:00'
    },
    to: {
      open: '18:00',
      close: '00:00'
    },
    pe: {
      open: '13:00',
      close: '21:00'
    },
    la: {
      open: '12:00',
      close: '18:00'
    },
    su: {
      open: 'Closed',
      close: 'Closed'
    }
  },
  {
    ma: {
      open: 'Closed',
      close: 'Closed'
    },
    ti: {
      open: '15:00',
      close: '20:00'
    },
    ke: {
      open: '15:00',
      close: '20:00'
    },
    to: {
      open: '15:00',
      close: '20:00'
    },
    pe: {
      open: '15:00',
      close: '20:00'
    },
    la: {
      open: '12:00',
      close: '18:00'
    },
    su: {
      open: '12:00',
      close: '16:00'
    }
  },
  {
    ma: {
      open: '13:00',
      close: '21:00'
    },
    ti: {
      open: '13:00',
      close: '21:00'
    },
    ke: {
      open: '13:00',
      close: '21:00'
    },
    to: {
      open: '13:00',
      close: '21:00'
    },
    pe: {
      open: '13:00',
      close: '21:00'
    },
    la: {
      open: '10:00',
      close: '18:00'
    },
    su: {
      open: '10:00',
      close: '18:00'
    }
  }
]

const wrongWeekUndefined = [
  [
    {
      open: 'Closed',
      close: 'Closed'
    }
    ,
    {
      open: 'Closed',
      close: 'Closed'
    },

    {
      open: 'Closed',
      close: 'Closed'
    }
    ,
    {
      open: 'Closed',
      close: 'Closed'
    },

    {
      open: 'Closed',
      close: 'Closed'
    }
    ,
    {
      open: 'Closed',
      close: 'Closed'
    },

    {
      open: 'Closed',
      close: 'Closed'
    }

  ],
  {

  },
  undefined
]

const wrongWeekBadInputs = [
  {
    ma: {
      open: 'Closed',
      close: 'k'
    },
    ti: {
      open: 'closed',
      close: '23:59'
    },
    ke: {
      open: '17:00',
      close: '21:00'
    },
    to: {
      open: 'Closed',
      close: 'k'
    },
    pe: {
      open: 'closed',
      close: '23:59'
    },
    la: {
      open: '17:00',
      close: '21:00'
    },
    su: {
      open: '17:00',
      close: '21:00'
    }
  },
  {
    ma: {
      open: 'Closed',
      close: 'k'
    },
    ti: {
      open: 'closed',
      close: '23:59'
    },
    ke: {
      open: '17:00',
      close: '21:00'
    },
    to: {
      open: 'Closed',
      close: 'k'
    },
    pe: {
      open: 'closed',
      close: '23:59'
    },
    la: {
      open: '17:00',
      close: '21:00'
    },
    su: {
      open: '17:00',
      close: '21:00'
    }
  },

]

const correctURLs = [
  'https://sites.google.com/view/jyvskyln-boulderpaja/etusivu',
  'https://lh6.googleusercontent.com/G-3e5bdYFgboU8spMtWWz4LeIqfGMvNH3B5wom-2UzKlecqQTmnZ-jL4sdMQ_f1qRrSx1T3p=w16383',
  'https://voema.net/',
  'https://voema.net/wp-content/uploads/2018/09/2017_panorama1_www.jpg',
  'https://kiipeilyareena.com/salmisaari-seinakiipeily/',
  'https://kiipeilyareena.com/wp-content/uploads/2019/10/Salmisaari_Salmisaari_laatikko2.jpg',
  'https://kiipeilykeskus.com/',
  'https://kiipeilykeskus.com/wp-content/uploads/sites/5/2019/11/20190708-A7_03886-1920x960.jpg',
  'https://kiipeilyareena.com/kalasatama/',
  'https://i.ytimg.com/vi/hSrd8sZeI2o/maxresdefault.jpg',
  'https://www.tampereenkiipeilykeskus.fi/',
  'https://static.wixstatic.com/media/48b705_2b204ec82a0543b08bb7c301c14315c1~mv2.jpg/v1/fill/w_872,h_540,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01/48b705_2b204ec82a0543b08bb7c301c14315c1~mv2.webp',
  'https://www.tampereenkiipeilykeskus.fi/',
  'https://static.wixstatic.com/media/48b705_2b204ec82a0543b08bb7c301c14315c1~mv2.jpg/v1/fill/w_872,h_540,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01/48b705_2b204ec82a0543b08bb7c301c14315c1~mv2.webp',
  'https://www.bouldertehdas.fi/boulder/home',
  'https://www.bouldertehdas.fi/boulder/themes/fusion/bouldertehdas/images/banner_new.jpg',
  'https://www.oulunkiipeilykeskus.com/',
  'https://www.oulunkiipeilykeskus.com/wp-content/uploads/2017/03/oulunkiipeilykeskus_toppila.jpg',
  'https://kiipeilyareena.com/tammisto/',
  'https://i.ytimg.com/vi/wuq40V9nssw/maxresdefault.jpg',
  'https://images.squarespace-cdn.com/content/v1/5b7dae4a9772ae2fccb28eb0/1534966028433-IXKFPA2X07LIJM5J4QXG/ke17ZwdGBToddI8pDm48kNbMioNy28ihkN7VTdCZkNN7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmi7D7yXkH8nfwsxTs5kW9h6XGjcwafeGWzG5r4OfZ3vTUnQ_6ma9z7H2tyhsCx-gw/grottan_va%CC%88riexplosion+1.jpg?format=2500w'
]

const wrongURLs = [
  'http://',
  'http://.',
  'http://..',
  'http://../',
  'http://?',
  'http://??',
  'http://??/',
  'http://#',
  'http://##',
  'http://##/',
  'http://foo.bar?q=Spaces should be encoded',
  '//',
  '//a',
  '///a',
  '///',
  'http:///a',
  'rdar://1234',
  'h://test',
  'http:// shouldfail.com',
  ':// should fail',
  'http://foo.bar/foo(bar)baz quux',
  'ftps://foo.bar/',
  'http://-error-.invalid/',
  'http://-a.b.co',
  'http://a.b-.co',
  'http://1.1.1.1.1',
  'http://123.123.123',
  'http://3628126748',
  'http://.www.foo.bar/',
  'http://www.foo.bar./',
  'http://.www.foo.bar./'
]

const wrongImageURLs = [
  'https://agreement.example.com/'
  , 'https://www.example.com/?addition=back'
  , 'https://www.example.net/'
  , 'http://www.example.edu/?boat=boy'
  , 'https://www.example.com/'
  , 'https://example.org/'
  , 'http://www.example.com/?babies=aunt'
  , 'http://www.example.com/'
  , 'http://art.example.edu/berry.html#basketball'
  , 'https://example.com/'
  , 'https://www.example.edu/?amount=advice#addition'
  , 'https://example.com/base/apparatus.html'
  , 'http://example.com/bedroom/bed.html'
  , 'https://www.example.com/'
  , 'http://www.example.com/'
  , 'https://www.example.com/'
  , 'https://army.example.com/blade.php'
  , 'http://afterthought.example.org/beef/aunt.php'
  , 'http://baseball.example.com/'
  , 'https://example.com/apparatus'
  , 'http://example.edu/afternoon/activity?approval=branch'
  , 'https://birds.example.com/'
  , 'http://www.example.org/animal?bed=amount'
  , 'https://example.com/aunt/appliance'
  , 'http://example.com/'
  , 'http://www.example.com/boy.html'
  , 'https://blood.example.com/arm#achiever'
  , 'https://bead.example.com/?argument=behavior&ants=advertisement'
  , 'https://act.example.com/arm/agreement.html'
  , 'http://www.example.com/arm.php'
  , 'http://alarm.example.org/addition#book'
  , 'https://example.com/bat/agreement?bit=boy'
  , 'http://www.example.com/'
  , 'https://www.example.com/'
  , 'http://www.example.com/bells'
  , 'https://example.com/?behavior=birthday#apparatus'
  , 'https://www.example.com/believe'
  , 'http://example.com/?air=apparel&bite=bell'
  , 'https://example.com/aftermath.php#bite'
  , 'https://www.example.net/afternoon/blade'
  , 'http://example.net/'
  , 'http://www.example.com/birth/bells'
  , 'http://example.com/'
  , 'https://example.com/bridge'
  , 'http://example.com/brake/bird'
  , 'http://www.example.com/achiever.php#bead'
  , 'https://www.example.com/'
  , 'http://bite.example.edu/advertisement/bedroom.php'
  , 'https://www.example.com/aunt'
  , 'http://believe.example.com/'
  , 'https://example.com/afterthought/blood'
  , 'http://www.example.edu/'
  , 'http://example.com/bikes.htm'
  , 'https://bedroom.example.com/'
  , 'http://www.example.org/'
  , 'https://www.example.com/boot/ball'
  , 'http://www.example.com/'
  , 'https://www.example.edu/approval/alarm.php?apparel=basketball&apparatus=back'
  , 'http://example.org/?base=bomb',
  'http://www.example.com/'
]

const imageUrls = [
  'https://i.ytimg.com/vi/wuq40V9nssw/maxresdefault.jpg',
  'https://www.oulunkiipeilykeskus.com/wp-content/uploads/2017/03/oulunkiipeilykeskus_toppila.jpg',
  'https://www.bouldertehdas.fi/boulder/themes/fusion/bouldertehdas/images/banner_new.jpg',
  'https://static.wixstatic.com/media/48b705_2b204ec82a0543b08bb7c301c14315c1~mv2.jpg/v1/fill/w_872,h_540,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01/48b705_2b204ec82a0543b08bb7c301c14315c1~mv2.webp',
  'https://i.ytimg.com/vi/hSrd8sZeI2o/maxresdefault.jpg',
  'https://voema.net/wp-content/uploads/2018/09/2017_panorama1_www.jpg',

  'https://i.ytimg.com/vi/wuq40V9nssw/maxresdefault.gif',
  'https://www.oulunkiipeilykeskus.com/wp-content/uploads/2017/03/oulunkiipeilykeskus_toppila.gif',
  'https://www.bouldertehdas.fi/boulder/themes/fusion/bouldertehdas/images/banner_new.gif',
  'https://static.wixstatic.com/media/48b705_2b204ec82a0543b08bb7c301c14315c1~mv2.gif/v1/fill/w_872,h_540,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01/48b705_2b204ec82a0543b08bb7c301c14315c1~mv2.webp',
  'https://i.ytimg.com/vi/hSrd8sZeI2o/maxresdefault.gif',
  'https://voema.net/wp-content/uploads/2018/09/2017_panorama1_www.gif',

  'https://i.ytimg.com/vi/wuq40V9nssw/maxresdefault.jpeg',
  'https://www.oulunkiipeilykeskus.com/wp-content/uploads/2017/03/oulunkiipeilykeskus_toppila.jpeg',
  'https://www.bouldertehdas.fi/boulder/themes/fusion/bouldertehdas/images/banner_new.jpeg',
  'https://static.wixstatic.com/media/48b705_2b204ec82a0543b08bb7c301c14315c1~mv2.jpeg/v1/fill/w_872,h_540,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01/48b705_2b204ec82a0543b08bb7c301c14315c1~mv2.webp',
  'https://i.ytimg.com/vi/hSrd8sZeI2o/maxresdefault.jpeg',
  'https://voema.net/wp-content/uploads/2018/09/2017_panorama1_www.jpeg',

  'https://i.ytimg.com/vi/wuq40V9nssw/maxresdefault.tiff',
  'https://www.oulunkiipeilykeskus.com/wp-content/uploads/2017/03/oulunkiipeilykeskus_toppila.tiff',
  'https://www.bouldertehdas.fi/boulder/themes/fusion/bouldertehdas/images/banner_new.tiff',
  'https://static.wixstatic.com/media/48b705_2b204ec82a0543b08bb7c301c14315c1~mv2.tiff/v1/fill/w_872,h_540,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01/48b705_2b204ec82a0543b08bb7c301c14315c1~mv2.webp',
  'https://i.ytimg.com/vi/hSrd8sZeI2o/maxresdefault.tiff',
  'https://voema.net/wp-content/uploads/2018/09/2017_panorama1_www.tiff',

  'https://i.ytimg.com/vi/wuq40V9nssw/maxresdefault.png',
  'https://www.oulunkiipeilykeskus.com/wp-content/uploads/2017/03/oulunkiipeilykeskus_toppila.png',
  'https://www.bouldertehdas.fi/boulder/themes/fusion/bouldertehdas/images/banner_new.png',
  'https://static.wixstatic.com/media/48b705_2b204ec82a0543b08bb7c301c14315c1~mv2.png/v1/fill/w_872,h_540,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01/48b705_2b204ec82a0543b08bb7c301c14315c1~mv2.webp',
  'https://i.ytimg.com/vi/hSrd8sZeI2o/maxresdefault.png',
  'https://voema.net/wp-content/uploads/2018/09/2017_panorama1_www.png',




]

const priceCategories = [
  {
    onetime: 12,
    tentime: 99,
    month: 69,
  },
  {
    onetime: 0,
    tentime: 12.789546,
    month: 3,
  },
  {
    onetime: 12354676567868,
    tentime: 23425476,
    month: 1,
  },
  {
    onetime: NaN,
    tentime: NaN,
    month: NaN,
  },
  {
    onetime: 12,
    tentime: 99,
    month: 69,
  },
  {
    onetime: NaN,
    tentime: 99,
    month: 69,
  },
  {
    onetime: 12,
    tentime: 99,
    month: NaN,
  },
  {
    onetime: 12,
    tentime: 99,
    month: 69,
  }
]

const incorrectPrices = [
  {
    onetime: -12,
    tentime: undefined,
    month: null,
  },
  {
    onetime: '0',
    tentime: '12' + '789546',
    month: '',
  },
  {
    onetime: '12354676567868',
    tentime: -0.00000000000000000000000000000000000000000000000001,
    month: 1,
  },
  {
    onetime: 'NaN',
    tentime: NaN,
    month: NaN,
  },
  {
    onetime: '12',
    tentime: '99',
    month: '69',
  },
  {
    onetime: NaN,
    tentime: -2,
    month: -0.1,
  },
  {
    onetime: !NaN,
    tentime: true,
    month: false,
  },
  {
    onetime: '12',
    tentime: 'ten',
    month: 's',
  }
]

const incorrectCategories = [
  {
    onetime: -12,
    tentime: undefined,
  },
  {
    time: '0',
    tentime: '12' + '789546',
    month: '',
  },
  {
    k: -0.00000000000000000000000000000000000000000000000001,
    month: 1,
  },
  {
    onetime: 'NaN',
    month: NaN,
  },
  {
    onetime: '12',
  },
  {
    month: -0.1,
  },
  {
    undefined
  },
  {
    tentime: 'ten',
    month: 's',
  }
]

const nullCategories = [
  {

  },
  null,
  [
    '12354676567868',
    -0.00000000000000000000000000000000000000000000000001,
    1,
  ],
  'jaah',
  3,
  () => console.log('Hey')
]

const pricing = [
  {
    adult: {
      onetime: 12,
      tentime: 99,
      month: 69,
    },
    under15: {
      onetime: 0,
      tentime: 12.789546,
      month: 3,
    }
  },
  {
    adult: {
      onetime: 12,
      tentime: 99,
      month: 69,
    },
    under15: {
      onetime: 0,
      tentime: 12.789546,
      month: 3,
    },
    student: {
      onetime: 12,
      tentime: 99,
      month: 69,
    },
    senior: {
      onetime: 0,
      tentime: 12.789546,
      month: 3,
    },
    under5: {
      onetime: 12,
      tentime: 99,
      month: 69,
    },
    kids: {
      onetime: NaN,
      tentime: NaN,
      month: NaN,
    }
  },
  {
    studentAndSenior: {
      onetime: NaN,
      tentime: NaN,
      month: NaN,
    },
    under15: {
      onetime: 0,
      tentime: 12.789546,
      month: 3,
    }
  },
  {
    adult: {
      onetime: 12,
      tentime: 99,
      month: 69,
    },
    under15: {
      onetime: 0,
      tentime: 12.789546,
      month: 3,
    }
  },
  {
    adult: {
      onetime: 12,
      tentime: 99,
      month: 69,
    }
  }
]

const wrongPricing = [
  {

  },
  undefined,
  null,
  [
    '12354676567868',
    -0.00000000000000000000000000000000000000000000000001,
    1,
  ],
  'jaah',
  3,
  () => console.log('Hey')
]

const wrongPricing2 = [
  {
    adult: {
      onetime: -12,
      tentime: undefined,
    }
  },
  {
    student: {
      time: '0',
      tentime: '12' + '789546',
      month: '',
    }
  },
  {
    under15: {
      k: -0.00000000000000000000000000000000000000000000000001,
      month: 1,
    },
    under5: {
      onetime: 'NaN',
      month: NaN,
    },
    adult: {
      onetime: '12',
    },
    senior: {
      month: -0.1,
    },
    under18: {
      undefined
    },
    members: {
      tentime: 'ten',
      month: 's',
    }
  }
]
module.exports = {
  correctTimes, wrongTimes, correctDays, wrongDaysIncorrect, wrongDaysMissing, correctWeek,
  wrongWeekUndefined, wrongWeekBadInputs, correctURLs, wrongURLs, wrongCities, wrongImageURLs, imageUrls,
  priceCategories, incorrectPrices, incorrectCategories, nullCategories, pricing, wrongPricing, wrongPricing2
}