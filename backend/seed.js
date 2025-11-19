require("dotenv").config(); // Load .env

const mongoose = require("mongoose");
const faker = require("faker");
const Nameplate = require("./src/modules/nameplate/nameplate.model");
const Lot = require("./src/modules/lot/lot.model");

const MONGO_URI = process.env.MONGO_URI;

// MongoDB connection
mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

const heads = [];
for (let i = 1; i <= 10; i++) {
    heads.push(`TSE${String(i).padStart(3, "0")}`);
}

const themes = ["Ambuja", "ACC"];
const images = {
    Ambuja: ["/ambuja/d1.webp", "/ambuja/d2.webp", "/ambuja/d3.webp", "/ambuja/d4.webp"],
    ACC: ["/acc/d1.webp", "/acc/d2.webp", "/acc/d3.webp", "/acc/d4.webp"]
};

const randomStyle = () => ({
    color: faker.internet.color(),
    fontSize: faker.datatype.number({ min: 12, max: 60 }),
    fontWeight: faker.helpers.randomize(["normal", "bold", "600", "700"]),
    fontStyle: faker.helpers.randomize(["normal", "italic"]),
    fontFamily: faker.helpers.randomize(["Inter", "Roboto", "Open Sans", "Lato", "Montserrat"])
});

const seed = async() => {
    try {
        // Delete existing data
        await Nameplate.deleteMany({});
        await Lot.deleteMany({});

        // Create lots
        const lots = [];
        heads.forEach(() => {
            for (let j = 1; j <= 5; j++) {
                lots.push({
                    lotno: `${faker.random.alphaNumeric(3).toUpperCase()}LOT${j}`,
                    officerId: mongoose.Types.ObjectId(),
                    headId: mongoose.Types.ObjectId(),
                    isDeleted: false
                });
            }
        });

        const createdLots = await Lot.insertMany(lots);

        // Create nameplates
        const nameplates = [];
        for (let i = 0; i < 500; i++) {
            const randomLot = faker.helpers.randomize(createdLots);
            const theme = faker.helpers.randomize(themes);
            nameplates.push({
                lotId: randomLot._id,
                officerId: randomLot.officerId,
                headId: randomLot.headId,
                name: faker.name.findName(),
                address: faker.address.streetAddress(),
                houseName: faker.address.streetName(),
                theme,
                selectedImage: faker.helpers.randomize(images[theme]),
                nameStyle: randomStyle(),
                addressStyle: randomStyle(),
                houseStyle: randomStyle(),
                status: "unverified",
                approvalStatus: "Pending",
                isDeleted: false
            });
        }

        await Nameplate.insertMany(nameplates);
        console.log("Seed complete: 500 nameplates created!");

        mongoose.disconnect();
    } catch (err) {
        console.error(err);
        mongoose.disconnect();
    }
};

seed();