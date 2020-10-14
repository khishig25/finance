var uIController = (function () {
  var domStings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
    incomeList: ".income__list",
    expenseList: ".expenses__list",

    expenseTotal: ".budget__expenses--value",
    incomeTotalLabel: ".budget__income--value",
    percentageLabel: ".budget__expenses--percentage",
    tusuvLabel: ".budget__value",
    listDiv: ".container",
  };
  return {
    getInput: function () {
      return {
        type: document.querySelector(domStings.inputType).value,
        description: document.querySelector(domStings.inputDescription).value,
        value: parseInt(document.querySelector(domStings.inputValue).value),

        //
      };
    },
    getDomStrings: function () {
      return domStings;
    },

    // оролт цэвэрлэх функц-------------------
    clearFields: function () {
      // нэг дор селект
      var fields = document.querySelectorAll(
        domStings.inputDescription + "," + domStings.inputValue
      ); // лист ирнэ.
      console.log(fields);
      // листийг массив хувиргах slice()herchih iin call()
      var fieldsArr = Array.prototype.slice.call(fields); //massiv bhgu uchiraas etsegees ni duudaj bgan bn
      console.log(fieldsArr);

      // for (i = 0; i < fieldsArr.length; i++) {
      //   fields[i].description = "";
      //   fields[i].value = "";
      // } bas ingej bolno
      fields.forEach(function (ele, indx, fields) {
        ele.description = "";
        ele.value = "";
      });
      // cursor iishee shiljine
      fieldsArr[0].focus();
    },

    showDesplay: function (damjuulahUtga) {
      // return {
      //   huvi: data.huvi,
      //   tusuv: data.tusuv,
      //   totalExp: data.totals.exp,
      //   totalInc: data.totals.inc,
      // };
      document.querySelector(domStings.tusuvLabel).textContent =
        damjuulahUtga.tusuv;

      document.querySelector(domStings.incomeTotalLabel).textContent =
        damjuulahUtga.totalInc;

      document.querySelector(domStings.expenseTotal).textContent =
        damjuulahUtga.totalExp;
      if (damjuulahUtga.huvi !== 0 && isNaN(damjuulahUtga.huvi) !== true) {
        document.querySelector(domStings.percentageLabel).textContent =
          damjuulahUtga.huvi + "%";
      } else if (isNaN(damjuulahUtga.huvi) === true) {
      } else {
        document.querySelector(domStings.percentageLabel).textContent =
          damjuulahUtga.huvi;
      }
    },
    // web ээс лшыт устгах
    deleteListItem: function (id) {
      //parent дээр нь хүүгээ устгадаг функц байдаг
      var el = document.getElementById(id);
      // эцэгийг нь дуудаад түүн дээрээс нь removeChildiig дуудаад элементээ өөрийг нь буцааж дамжуулаад устгуулчлаа.
      el.parentNode.removeChild(el);
    },
    addListItem: function (item, type) {
      var HTML;
      var htmlClassId;
      console.log("item----", item.description + "type--", type);

      // typaar ni salgahж тохиро газарт байрлуулна.
      if (type === "inc") {
        HTML =
          '<div class="item clearfix" id="inc-&ID&"><div class="item__description">&datahole&</div><div class="right clearfix"><div class="item__value">&value&</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        htmlClassId = domStings.incomeList;
        HTML = HTML.replace("&ID&", item.id);
        HTML = HTML.replace("&datahole&", item.description);
        HTML = HTML.replace("&value&", item.value);
      } else {
        HTML =
          '<div class="item clearfix" id="exp-&ID&"><div class="item__description">&datahole&</div><div class="right clearfix"><div class="item__value">&value&</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        htmlClassId = domStings.expenseList;
        HTML = HTML.replace("&ID&", item.id);
        HTML = HTML.replace("&datahole&", item.description);
        HTML = HTML.replace("&value&", item.value);
      }

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

  var calculateTotal = function (type) {
    var sum = 0;
    data.allItems[type].forEach(function (el) {
      sum = sum + el.value;
      console.log("төсөвөөё орлого луу SUM ni=", sum + "type", type);

      console.log("Toootals ", data.totals[type]);
    });
    data.totals[type] = sum;
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
    tusuv: 0,
    huvi: 0,
  };
  return {
    tusuvTootsooloh: function () {
      console.log("Төсөв тооцооллооо_-------------------");

      // Нийт орлогыг тооцоолно
      calculateTotal("inc");

      //Нийт зарлагыг тоооцоолно.
      calculateTotal("exp");

      // Төсөвийн дүн
      data.tusuv = data.totals.inc - data.totals.exp;
      console.log("data.tusuv ", data.tusuv);

      //Зарлагын Хувь тооцоолоно.
      if (data.totals.inc !== 0) {
        data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);

        console.log("Зарлагын Хувь нь  %%", data.huvi);
      } else {
        data.huvi = 0;
      }
    },
    uldegdeluudAvah: function () {
      return {
        huvi: data.huvi,
        tusuv: data.tusuv,
        totalExp: data.totals.exp,
        totalInc: data.totals.inc,
      };
    },

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

    deleteItem: function (type, id) {
      // map функц нь массиваар гүйгээд элемэнтийг олоод массиваар буцаана.
      var ids = data.allItems[type].map(function (e) {
        return e.id;
      });
      //орж ирэх утгыг массиваас хайж индексийг нь олж байна.
      var index = ids.indexOf(id);
      console.log("index ", index);
      console.log("index of ", data.allItems[type][index]);
      // indexOf ni хайсан утга байхгүй бол -1 г буцаадаг. -1 байвар scplice функц нь сүүлийн элемэнтийг устгадаг учир шалгах хэрэгтэй.
      if (index !== -1) {
      }
      console.log("delete item fuction ids устгана", ids);
      // олоод устгаж байна
      data.allItems[type].splice(index, 1);
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

    //Оролт хоосон эсэхийг шалгаж байна
    //if (input.description !== "" && input.value !== "")
    if (input.description !== "" && isNaN(input.value) !== true) {
      console.log("sadaakaaa", input.value);
      var item = fininceController.addItem(
        input.type,
        input.description,
        input.value
      );
      var str = input.type;
      // 2.olj avsan ogogdloo sankhuud damjuulj hadgalna.

      uIController.addListItem(item, str);
      uIController.clearFields();
      // 3. olj avsan ogogdol tohiroh hesegt gargana.
      // 4. төсөвийг тооцоолнов
      updateTusuv();
    }
  };

  var updateTusuv = function () {
    fininceController.tusuvTootsooloh();
    // 5. эцэсийн үлдэгдэл харуулна
    var damjuulahUtga = fininceController.uldegdeluudAvah();

    uIController.showDesplay(damjuulahUtga);
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
    // html ээс устгах үзэгдлийг барих
    document
      .querySelector(DOM.listDiv)
      .addEventListener("click", function (event) {
        // console.log("click", event.target.id);
        // console.log(event.target.parentNode);
        // console.log(event.target.parentNode.parentNode);
        // console.log(event.target.parentNode.parentNode.parentNode);
        console.log(
          event.target.parentNode.parentNode.parentNode.parentNode.id
        );
        // exp-1 inc-1 ийм хэлбэртэй класс id ирнэ
        var id = event.target.parentNode.parentNode.parentNode.parentNode.id;

        //ӨӨР газар дарвал юу ч хйихгүй байхыг шалгаж байна.
        if (id) {
          var b = id.split("-");
          var type = b[0];
          var sentId = parseInt(b[1]);
          console.log(b);
          fininceController.deleteItem(type, sentId);
          uIController.deleteListItem(id);
          updateTusuv();
        }
      });
  };
  return {
    init: function () {
      setupEventListners();
      console.log("Яг эхэллээ....6");
      // huvi: data.huvi,
      //   tusuv: data.tusuv,
      //   totalExp: data.totals.exp,
      //   totalInc: data.totals.inc,

      uIController.showDesplay({
        huvi: 0,
        tusuv: 0,
        totalExp: 0,
        totalInc: 0,
      });
    },
  };
})(fininceController, uIController);
appController.init();
