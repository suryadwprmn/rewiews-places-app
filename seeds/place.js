const mongoose = require('mongoose');
const Place = require('../models/Place');
const Hashids = require('hashids/cjs');
const hashids = new Hashids('rahasia-bang', 10, 'abcdefghijklmnopqrstuvwxyz1234567890'); 

mongoose.connect('mongodb://127.0.0.1/directory-listing-app')
    .then(() => {
        console.log('connected to mongodb');
        seedPlaces();
    }).catch((err) => {
        console.log(err);
    });

    async function seedPlaces() {
        await Place.deleteMany({});
        const authorId = '66e794a0a54a57e94632f432';
        
        const places = [
            {
                title: 'Taman Mini Indonesia Indah',
                price: 20000,
                description: 'Taman hiburan keluarga dengan berbagai replika bangunan dari seluruh Indonesia',
                location: 'Taman Mini Indonesia Indah, Jakarta',
                image: 'https://source.unsplash.com/collection/2349781/1280x720',
                author: authorId // Menambahkan author di setiap objek
            },
            {
                title: 'Pantai Kuta',
                price: 0,
                description: 'Pantai yang terkenal di Bali dengan pemandangan sunset yang indah',
                location: 'Pantai Kuta, Kuta, Badung Regency, Bali',
                image: 'https://source.unsplash.com/collection/2349781/1280x720',
                author: authorId
            },
            {
                title: 'Borobudur',
                price: 0,
                description: 'Candi Buddha terbesar di dunia yang terletak di Magelang, Jawa Tengah',
                location: 'Borobudur, Magelang, Central Java',
                image: 'https://source.unsplash.com/collection/2349781/1280x720',
                author: authorId
            },
            // tambahkan author ke semua objek lainnya
            {
                title: 'Kawah Ijen',
                price: 100000,
                description: 'Kawah vulkanik dengan fenomena blue fire di Banyuwangi, Jawa Timur',
                location: 'Kawah Ijen, Banyuwangi, East Java',
                image: 'https://source.unsplash.com/collection/2349781/1280x720',
                author: authorId
            },
            {
                title: 'Tanjung Lesung',
                price: 100000,
                description: 'Kawasan wisata pantai di Banten yang cocok untuk bersantai dan berenang',
                location: 'Tanjung Lesung, Pandeglang, Banten',
                image: 'https://source.unsplash.com/collection/2349781/1280x720',
                author: authorId
            }
        ];
    
        // Menyimpan data places
        await Place.insertMany(places);
    
        console.log('Places seeded!');
    }
    
    seedPlaces();
    

seedPlaces()

