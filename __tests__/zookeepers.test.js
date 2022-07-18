const { filterByQuery, findById, createNewZookeeper, validateZookeeper } = require("../lib/zookeepers");

const { zookeepers } = require("../data/zookeepers.json");
jest.mock("fs");

test("creates new zookeeper", () => {
    const newZookeeper = createNewZookeeper({
        "name": "Mertyl",
        "age": 94,
        "favoriteAnimal": "Flamingo",
        "id": "10"
    }, zookeepers);

    expect(newZookeeper.name).toBe("Mertyl");
    expect(newZookeeper.id).toBe("10");
});

test("filters by query", () => {
    const zookeepersAll = [
        {
            "id": "7",
            "name": "Emmy",
            "age": 29,
            "favoriteAnimal": "Duckbilled Platypus"
        },
        {
            "id": "8",
            "name": "Lernantino",
            "age": 19,
            "favoriteAnimal": "Business Cat"
        },
        {
            "name": "Les",
            "age": 64,
            "favoriteAnimal": "Rabbit",
            "id": "9"
        }
    ];
    const zookeepersFiltered = filterByQuery({ age: 64 }, zookeepersAll);
    expect(zookeepersFiltered.length).toBe(1);
});

test("finds by id", () => {
    const zookeepersAll = [
        {
            "id": "7",
            "name": "Emmy",
            "age": 29,
            "favoriteAnimal": "Duckbilled Platypus"
        },
        {
            "id": "8",
            "name": "Lernantino",
            "age": 19,
            "favoriteAnimal": "Business Cat"
        },
        {
            "name": "Les",
            "age": 64,
            "favoriteAnimal": "Rabbit",
            "id": "9"
        }
    ];
    const zookeepersId = findById("8", zookeepersAll);

    expect(zookeepersId.name).toBe("Lernantino");
    expect(zookeepersId.age).toBe(19);
});

test("validates zookeeper", () => {
    const zookeeperOk = {
        "name": "Mertyl",
        "age": 94,
        "favoriteAnimal": "Flamingo",
        "id": "10"
    };
    const zookeeperInvalid={
        "name": "Nora",
        "favoriteAnimal": "Cat",
        "id": "13"
    };

    const result = validateZookeeper(zookeeperOk);
    const result2 = validateZookeeper(zookeeperInvalid);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});