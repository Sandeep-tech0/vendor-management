export const vendors = Array.from({ length: 10000 }, (_, i) => ({
    id: i + 1,
    name: `Vendor ${i + 1}`,
    code: `V${i + 1}`,
    category: ['Electrical', 'Mechanical', 'Diesel'][i % 3],
    city: ['Mumbai', 'Delhi', 'Bangalore'][i % 3],
    status: i % 2 === 0 ? 'Active' : 'Inactive',
    type: ['SAP', 'Temp'][i % 2],
    region: ['North', 'South', 'East', 'West'][i % 4],
    registrationDate: new Date(2023, 0, 1 + (i % 365)).toISOString().slice(0, 10), // YYYY-MM-DD
  }));