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

var fininceController = (function () {})();

var appController = (function (fininceController, uIController) {
  var DOM = uIController.getDomStrings();
  var ctrAddItem = function () {
    console.log("button clicked", uIController.getInput());
    // 1.oruulAh ogogdol olj avna

    // 2.olj avsan ogogdloo sankhuud damjuulj hadgalna.
    // 3. olj avsan ogogdol tohiroh hesegt gargana.
    // 4. төсөвийг тооцоолнов
    // 5. эцэсийн үлдэгдэл харуулна
  };
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
})(fininceController, uIController);
