var uIController = (function () {
  var domStings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
  };
  return {
    getInput: function () {
      return {
        type: document.querySelector(domStings.inputType).value,
        description: document.querySelector(domStings.inputDescription).value,
        value: document.querySelector(domStings.inputValue).value,

        //
      };
    },
    getDomStrings: function () {
      return domStings;
    },
  };
  //console.log("hello");
})();

var fininceController = (function () {
  var Income = function (id, value, description) {
    this.id = id;
    this.value = value;
    this.description = description;
  };
  var Expense = function (id, value, description) {
    this.id = id;
    this.value = value;
    this.description = description;
  };
  var data = {
    allItems: {
      inc: [],
      exp: [],
    },
    totals: {
      inc: 0,
      exp: 0,
    },
  };
  return {
    addItem: function (type, desc, val) {
      console.log("Item added......");
      var item;
      var id;
      if (data.allItems[type].length === 0) {
        id = 1;
      } else {
        id = data.allItems[type][data.allItems[type].length() - 1].id + 1;
      }
      if (type === "inc") {
        item = new Income(id, desc, val);
      } else {
        item = new Expense(id, desc, val);
      }

      data.allItems[type].push(item);
    },
    seeData: function () {
      return data;
    },
  };
})();

var appController = (function (fininceController, uIController) {
  var DOM = uIController.getDomStrings();
  var ctrAddItem = function () {
    //console.log("button clicked", uIController.getInput());
    // 1.oruulAh ogogdol olj avna
    var input = uIController.getInput();
    //console.log(input);
    fininceController.addItem(input.type, input.description, input.value);

    // 2.olj avsan ogogdloo sankhuud damjuulj hadgalna.
    // 3. olj avsan ogogdol tohiroh hesegt gargana.
    // 4. төсөвийг тооцоолнов
    // 5. эцэсийн үлдэгдэл харуулна
  };
  ///-------------event huleeh

  var setupEventListners = function () {
    document.querySelector(DOM.addBtn).addEventListener("click", function () {
      ctrAddItem();
    });

    document.addEventListener("keypress", function (event) {
      // wich ---- deer ueiin browser
      if (event.keyCode === 13 || event.which === 13) {
        console.log("товч дарагдлаа");
        ctrAddItem();
      }
    });
  };
  return {
    init: function () {
      setupEventListners();
      console.log("Яг эхэллээ....6");
    },
  };
})(fininceController, uIController);
appController.init();
