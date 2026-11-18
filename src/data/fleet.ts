export type VehicleCategory = 'Luxury Cars' | 'SUVs' | 'Executive Vans' | 'Sports Cars'

export const categories: VehicleCategory[] = ['Luxury Cars', 'SUVs', 'Executive Vans', 'Sports Cars']

export interface Vehicle {
  id: string
  year: number
  make: string
  model: string
  category: VehicleCategory
  seats: number
  transmission: string
  tagline: string
  description: string
  /** Performance specs. `null` means the figure is still to be confirmed from the manufacturer sheet. */
  specs: {
    engine: string | null
    horsepower: number | null
    zeroToHundred: string | null
    drivetrain: string | null
    luggage: string | null
  }
  /** Colours for the placeholder plate until licensed photography is supplied. */
  plate: { from: string; to: string }
  /** Public path to a photo in /public/images. Falls back to the plate when absent. */
  photo?: string
  /** Rental price. Shown as $0 until pricing is confirmed. */
  price?: number
}

export const formatPrice = (vehicle: Vehicle) => `\$${vehicle.price ?? 0}`

export const vehicles: Vehicle[] = [
  {
    id: 'ghost-extended',
    year: 2024,
    make: 'Rolls-Royce',
    model: 'Ghost Extended',
    category: 'Luxury Cars',
    seats: 4,
    transmission: 'Automatic',
    tagline: 'Effortless motion, in the back seat.',
    description:
      'The extended-wheelbase Ghost gives rear-seat passengers the space and quiet of a private lounge. Ideal for executive arrivals, galas and long transfers across the GTA.',
    specs: {
      engine: '6.75L Twin-Turbo V12',
      horsepower: 563,
      zeroToHundred: '4.6 sec',
      drivetrain: 'All-Wheel Drive',
      luggage: null,
    },
    plate: { from: '#22345a', to: '#071326' },
    photo: '/images/rolls-royce-ghost-extended.webp',
  },
  {
    id: 'maybach-s680',
    year: 2024,
    make: 'Mercedes-Maybach',
    model: 'S 680',
    category: 'Luxury Cars',
    seats: 4,
    transmission: 'Automatic',
    tagline: 'Understated presence, rear-seat indulgence.',
    description:
      'A reclining rear suite, separated cabin and refined ride for principals and executives who prefer to be driven in comfort.',
    specs: { engine: null, horsepower: null, zeroToHundred: null, drivetrain: null, luggage: null },
    plate: { from: '#2b2a33', to: '#0b0c12' },
    photo: '/images/mercedes-maybach-s680.png',
  },
  {
    id: 'range-rover-sv',
    year: 2024,
    make: 'Land Rover',
    model: 'Range Rover SV',
    category: 'SUVs',
    seats: 5,
    transmission: 'Automatic',
    tagline: 'Commanding presence on any road.',
    description:
      'The flagship Range Rover combines all-terrain capability with a hand-finished cabin, ideal for airport runs in winter and weekend escapes.',
    specs: { engine: null, horsepower: null, zeroToHundred: null, drivetrain: null, luggage: null },
    plate: { from: '#263a33', to: '#0c2a21' },
    photo: '/images/range-rover-sv.webp',
  },
  {
    id: 'escalade-platinum',
    year: 2024,
    make: 'Cadillac',
    model: 'Escalade Platinum',
    category: 'SUVs',
    seats: 7,
    transmission: 'Automatic',
    tagline: 'Room for the whole party.',
    description:
      'Three rows of plush seating and generous cargo space for families, delegations and luggage-heavy itineraries.',
    specs: { engine: null, horsepower: null, zeroToHundred: null, drivetrain: null, luggage: null },
    plate: { from: '#3a3c42', to: '#111318' },
    photo: '/images/cadillac-escalade-cream.png',
  },
  {
    id: 'bmw-x7',
    year: 2024,
    make: 'BMW',
    model: 'X7',
    category: 'SUVs',
    seats: 7,
    transmission: 'Automatic',
    tagline: 'Three rows of composed confidence.',
    description:
      'A seven-seat luxury SUV with a calm cabin and strong all-weather traction, well suited to family travel and small group transfers.',
    specs: { engine: null, horsepower: null, zeroToHundred: null, drivetrain: null, luggage: null },
    plate: { from: '#1f2c3d', to: '#0a1322' },
    photo: '/images/bmw-x7.webp',
  },
  {
    id: 'sprinter-jet-class',
    year: 2024,
    make: 'Mercedes-Benz',
    model: 'Sprinter Jet Class',
    category: 'Executive Vans',
    seats: 8,
    transmission: 'Automatic',
    tagline: 'Private transit for the whole delegation.',
    description:
      'Captain-style seating, a climate-controlled cabin and luggage space for executive teams, VIP delegations and event transfers.',
    specs: { engine: null, horsepower: null, zeroToHundred: null, drivetrain: null, luggage: null },
    plate: { from: '#2c3644', to: '#0d1523' },
    photo: '/images/mercedes-sprinter-jet-class.webp',
  },
  {
    id: 'porsche-911',
    year: 2024,
    make: 'Porsche',
    model: '911',
    category: 'Sports Cars',
    seats: 2,
    transmission: 'PDK Dual-Clutch',
    tagline: 'Precision you can feel in every corner.',
    description:
      'The 911 is a driver’s car in the truest sense. Reserve it for weekend drives, track-day transfers or an arrival that needs no introduction.',
    specs: { engine: null, horsepower: null, zeroToHundred: null, drivetrain: null, luggage: null },
    plate: { from: '#5c1f1f', to: '#1a0808' },
    photo: '/images/porsche-911-gt3-hero.png',
  },
  {
    id: 'ferrari-roma',
    year: 2024,
    make: 'Ferrari',
    model: 'Roma',
    category: 'Sports Cars',
    seats: 2,
    transmission: 'Automatic',
    tagline: 'Grand touring, with theatre.',
    description:
      'A two-seat grand tourer with a striking presence, reserved for special occasions and short, memorable drives.',
    specs: { engine: null, horsepower: null, zeroToHundred: null, drivetrain: null, luggage: null },
    plate: { from: '#6b1a1a', to: '#1d0606' },
    photo: '/images/ferrari-roma.webp',
  },
]

export const findVehicle = (id: string | undefined) => vehicles.find((vehicle) => vehicle.id === id)

export const vehicleTitle = (vehicle: Vehicle) => `${vehicle.year} ${vehicle.make} ${vehicle.model}`

export const serviceTypes = [
  'Luxury Car Rental',
  'Executive Van Rental',
  'Corporate Fleet Account',
  'VIP Airport Transfer',
] as const

export type ServiceType = (typeof serviceTypes)[number]

export const CONTACT = {
  brand: 'Genzee Fleet',
  phoneDisplay: '416-677-0606',
  phoneHref: 'tel:+14166770606',
  whatsappNumber: '14166770606',
  email: 'contact@genzee.ca',
  address: '10 Thornmount Dr, Scarborough, ON M1B 3J4',
  hours: 'Monday – Sunday · 24 Hours · By Appointment',
}

export const inclusions = [
  'Doorstep delivery across the GTA and airport curbside pickup',
  'Comprehensive commercial vehicle insurance coverage',
]
