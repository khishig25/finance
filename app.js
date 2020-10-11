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
    addListItem: function (item, type) {
      var HTML;
      var htmlClassId;
      console.log("item----", item.description + "type--", type);

      // typaar ni salgah
      if (type === "inc") {
        HTML =
          '<div class="item clearfix" id="income-&ID&"><div class="item__description">&datahole&</div><div class="right clearfix"><div class="item__value">&value&</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        htmlClassId = ".income__list";
        HTML = HTML.replace("&ID&", item.id);
        HTML = HTML.replace("&datahole&", item.description);
        HTML = HTML.replace("&value&", item.value);
      } else {
        HTML =
          '<div class="item clearfix" id="expense-&ID&"><div class="item__description">&datahole&</div><div class="right clearfix"><div class="item__value">&value&</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        htmlClassId = ".expenses__list";
        HTML = HTML.replace("&ID&", item.id);
        HTML = HTML.replace("&datahole&", item.description);
        HTML = HTML.replace("&value&", item.value);
      }

      HTML.replace("&ID&", "id");
      document.querySelector(htmlClassId).insertAdjacentHTML("beforeend", HTML);
    },
  };
  //console.log("hello");
})();

var fininceController = (function () {
  var Income = function (id, description, value) {
    this.id = id;
    this.value = value;
    this.description = description;
  };
  var Expense = function (id, description, value) {
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
    addItem: function (type, val, desc) {
      console.log("Item added......");
      var item;
      var id, ids;
      if (data.allItems[type].length === 0) {
        id = 1;
      } else {
        id = data.allItems[type][data.allItems[type].length - 1].id + 1;
        var a = data.allItems[type].length - 1; //deed codiig zadalj uzvel
        ids = data.allItems[type][a].id + 1; // iim bailaa
        console.log(ids, "<--id", +a, "<---urtaas hasah ni 1"); //
      }
      if (type === "inc") {
        item = new Income(id, val, desc);
      } else {
        item = new Expense(id, val, desc);
      }

      data.allItems[type].push(item);
      return item;
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
    var item = fininceController.addItem(
      input.type,
      input.description,
      input.value
    );
    var str = input.type;
    // 2.olj avsan ogogdloo sankhuud damjuulj hadgalna.

    uIController.addListItem(item, str);
    // 3. olj avsan ogogdol tohiroh hesegt gargana.
    // 4. төсөвийг тооцоолнов
    // 5. эцэсийн үлдэгдэл харуулна
  };
  ///-------------event huleeh

  var setupEventListners = function () {
    document.querySelector(DOM.addBtn).addEventListener("click", function () {
      ctrAddItem();
      //uIController.addListItem();
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
