
const icons = require('lucide-react');
const names = Object.keys(icons);
console.log('Total icons:', names.length);
console.log('Pants/Trousers:', names.filter(n => n.toLowerCase().includes('pant') || n.toLowerCase().includes('trouser')));
console.log('Cap/Hat:', names.filter(n => n.toLowerCase().includes('cap') || n.toLowerCase().includes('hat')));
console.log('Shoe/Sneaker:', names.filter(n => n.toLowerCase().includes('shoe') || n.toLowerCase().includes('sneaker') || n.toLowerCase().includes('foot')));
