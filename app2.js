//Storage Controller

StorageController = (function() {

})();


//Data Controller

DataController = (function() {

    //Private
    const Car = function(id, regNum, brand, color, model, engine, price) {
        this.id = id;
        this.regNum = regNum;
        this.brand = brand;
        this.color = color;
        this.model = model;
        this.engine = engine;
        this.price = price;
    }

    const data = {
        cars: [{ id: 0, regNum: 'THE97K', brand: 'Renault', color: 'silver', model: '2011', engine: 'diesel', price: 35000 },
            { id: 0, regNum: 'THE97K', brand: 'Renault', color: 'silver', model: '2011', engine: 'diesel', price: 35000 },
            { id: 0, regNum: 'THE97K', brand: 'Renault', color: 'silver', model: '2011', engine: 'diesel', price: 35000 }
        ],
        selectedCar: null
    }

    //public
    return {
        getCars: function() {
            return data.cars;
        },
        getData: function() {
            return data;
        },
        addCar: function(regNum, brand, color, model, engine, price) {
            let id;

            if (data.cars.length > 0) {
                id = data.cars[data.cars.length - 1].id + 1;
                console.log(id);
            }
        }
    }


})();


//UI Controller

UIController = (function() {


})();


//App Controller

AppController = (function(DataCtrl, UICtrl) {

    return {
        init: function() {
            console.log('App starting...');
        }
    }

})(DataController, UIController);

AppController.init();