// StorageController   >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const StorageController = (function() {

})();

// CarController   >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const CarController = (function() {

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
        cars: [],
        selectedCar: null,
        //totalPrice: 0
    }


    //Public
    return {
        getCars: function() {
            return data.cars;
        },

        getData: function() {
            return data;
        },
        getCarById: function(id) {
            let car = null;

            data.cars.forEach(function(caR) {
                if (caR.id == id) {
                    car = caR;
                }
            })


            return car;
        },
        setCurrentCar: function(car) {
            data.selectedCar = car;
        },
        getCurrentCar: function() {
            return data.selectedCar;
        },
        addCar: function(regNum, brand, color, model, engine, price) {
            let id;

            if (data.cars.length > 0) {
                id = data.cars[data.cars.length - 1].id + 1;
            } else {
                id = 0;
            }
            const newCar = new Car(id, regNum, brand, color, model, engine, parseFloat(price));
            data.cars.push(newCar);
            return newCar;
        },
        updateCar: function(regNum, brand, color, model, engine, price) {
                let car = null;

                data.cars.forEach(function(caR) {
                    if (caR.id == data.selectedCar.id) {
                        caR.regNum = regNum;
                        caR.brand = brand;
                        caR.color = color;
                        caR.model = model;
                        caR.engine = engine;
                        caR.price = price;
                        car = caR;
                    }
                });
                return car;

            }
            /* getTotal: function() {
                 let total = 0;
                 data.products.forEach(item => {
                     total += item.price;
                 });

                 data.totalPrice = total;
                 return data.totalPrice;
             }*/

    }


})();

// UIController            >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const UIController = (function() {

    const Selectors = {
        carList: '#carList',
        carListItems: "#carList tr",
        addButton: '.addBtn',
        updateButton: '.updateBtn',
        deleteButton: '.deleteBtn',
        cancelButton: '.cancelBtn',
        regNumber: '#regNumber',
        carBrand: '#carBrand',
        carColor: '#carColor',
        carModel: '#carModel',
        carEngine: '#carEngine',
        carPrice: '#carPrice',
        carCard: '#carCard'
    }

    //Public
    return {
        createCarList: function(cars) {
            let html = '';

            cars.forEach(car => {
                html += `
                    <tr>
                        <td>${car.id}</td>
                        <td>${car.regNum}</td>
                        <td>${car.brand}</td>
                        <td>${car.color}</td>
                        <td>${car.model}</td>
                        <td>${car.engine}</td>
                        <td>${car.price} SEK</td>
                        <td class="text-right">
                                <i class="far fa-edit edit-car"></i>
                        </td>
                    </tr>
                `;
            });

            document.querySelector(Selectors.carList).innerHTML = html;
        },
        getSelectors: function() {
            return Selectors;
        },
        addCar: function(car) {
            document.querySelector(Selectors.carCard).style.display = 'block';
            var item = `
                    <tr>
                        <td>${car.id}</td>
                        <td>${car.regNum}</td>
                        <td>${car.brand}</td>
                        <td>${car.color}</td>
                        <td>${car.model}</td>
                        <td>${car.engine}</td>
                        <td>${car.price} SEK</td>
                        <td class="text-right">
                                <i class="far fa-edit edit-car"></i>
                        </td>
                    </tr>
            `;
            document.querySelector(Selectors.carList).innerHTML += item;
        },
        updateCar: function(car) {
            let updatedItem = null;
            let items = document.querySelectorAll(Selectors.carListItems);
            items.forEach(function(item) {
                if (item.classList.contains('bg-warning')) {
                    item.children[1].textContent = car.regNum;
                    item.children[2].textContent = car.brand;
                    item.children[3].textContent = car.color;
                    item.children[4].textContent = car.model;
                    item.children[5].textContent = car.engine;
                    item.children[6].textContent = car.price + ' $';
                    updatedItem = item;
                }
            });

            return updatedItem;
        },
        clearInputs: function() {
            document.querySelector(Selectors.regNumber).value = '';
            document.querySelector(Selectors.carBrand).value = '';
            document.querySelector(Selectors.carColor).value = '';
            document.querySelector(Selectors.carModel).value = '';
            document.querySelector(Selectors.carEngine).value = '';
            document.querySelector(Selectors.carPrice).value = '';
        },
        hideCard: function() {
            document.querySelector(Selectors.carCard).style.display = 'none';
        },
        addCarToForm: function() {
            const selectedCar = CarController.getCurrentCar();
            document.querySelector(Selectors.regNumber).value = selectedCar.regNum;
            document.querySelector(Selectors.carBrand).value = selectedCar.brand;
            document.querySelector(Selectors.carColor).value = selectedCar.color;
            document.querySelector(Selectors.carModel).value = selectedCar.model;
            document.querySelector(Selectors.carEngine).value = selectedCar.engine;
            document.querySelector(Selectors.carPrice).value = selectedCar.price;
        },
        addingState: function() {
            UIController.clearInputs();
            document.querySelector(Selectors.addButton).style.display = 'inline';
            document.querySelector(Selectors.updateButton).style.display = 'none';
            document.querySelector(Selectors.deleteButton).style.display = 'none';
            document.querySelector(Selectors.cancelButton).style.display = 'none';
        },
        editState: function(tr) {

            const parent = tr.parentNode;

            for (let i = 0; i < parent.children.length; i++) {
                parent.children[i].classList.remove('bg-warning');
            }

            tr.classList.add('bg-warning');
            document.querySelector(Selectors.addButton).style.display = 'none';
            document.querySelector(Selectors.updateButton).style.display = 'inline';
            document.querySelector(Selectors.deleteButton).style.display = 'inline';
            document.querySelector(Selectors.cancelButton).style.display = 'inline';
        }
    }
})();

// AppController        >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const App = (function(CarCtrl, UICtrl) {

    const UISelectors = UICtrl.getSelectors();

    // Load Event Listener
    const loadEventListener = function() {

        //Add car Event
        document.querySelector(UISelectors.addButton).addEventListener('click', carAddSubmit);

        // edit car click
        document.querySelector(UISelectors.carList).addEventListener('click', carEditClick);

        // edit car submit

        document.querySelector(UISelectors.updateButton).addEventListener('click', editCarSubmit);

    }

    const carAddSubmit = function(e) {

        const regNumber = document.querySelector(UISelectors.regNumber).value;
        const carBrand = document.querySelector(UISelectors.carBrand).value;
        const carColor = document.querySelector(UISelectors.carColor).value;
        const carModel = document.querySelector(UISelectors.carModel).value;
        const carEngine = document.querySelector(UISelectors.carEngine).value;
        const carPrice = document.querySelector(UISelectors.carPrice).value;

        if (regNumber !== '' && carBrand !== '' && carColor !== '' && carModel !== '' && carEngine !== '' && carPrice !== '') {
            //Add Product
            const newCar = CarCtrl.addCar(regNumber, carBrand, carColor, carModel, carEngine, carPrice);

            //Add item to list
            UIController.addCar(newCar);

            //Get total
            //const total = CarCtrl.getTotal();

            //Show total
            //UICtrl.showTotal(total);

            //Clear inputs
            UIController.clearInputs();
        }

        //console.log(productName, productPrice);

        e.preventDefault();
    }

    const carEditClick = function(e) {

        if (e.target.classList.contains('edit-car')) {
            const id = e.target.parentNode.parentNode.firstElementChild.textContent;
            console.log(id);

            //get selected car
            const car = CarCtrl.getCarById(id);

            //set current car
            CarCtrl.setCurrentCar(car);

            //add car to UI
            UICtrl.addCarToForm();

            UICtrl.editState(e.target.parentNode.parentNode);
        }
        e.preventDefault();

    }

    const editCarSubmit = function(e) {

        const regNumber = document.querySelector(UISelectors.regNumber).value;
        const carBrand = document.querySelector(UISelectors.carBrand).value;
        const carColor = document.querySelector(UISelectors.carColor).value;
        const carModel = document.querySelector(UISelectors.carModel).value;
        const carEngine = document.querySelector(UISelectors.carEngine).value;
        const carPrice = document.querySelector(UISelectors.carPrice).value;

        if (regNumber !== '' && carBrand !== '' && carColor !== '' && carModel !== '' && carEngine !== '' && carPrice !== '') {

            //update car
            const updatedCar = CarCtrl.updateCar(regNumber, carBrand, carColor, carModel, carEngine, carPrice);

            //update UI

            let item = UICtrl.updateCar(updatedCar);


            e.preventDefault();
        }
    }






    return {
        init: function() {
            console.log('Satarting App....')
            UICtrl.addingState();
            const cars = CarCtrl.getCars();

            if (cars.length == 0) {
                UICtrl.hideCard();
            } else {
                UICtrl.createCarList(cars);
            }



            loadEventListener();
        }
    }

})(CarController, UIController);

App.init();