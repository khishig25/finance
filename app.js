var uIController = (function () {
  console.log("hello");
})();

var fininceController = (function () {})();

var appController = (function (fininceController, uIController) {
  var ctrAddItem = function () {
    console.log("button clicked");
    // 1.oruulAh ogogdol olj avna
    // 2.olj avsan ogogdloo sankhuud damjuulj hadgalna.
    // 3. olj avsan ogogdol tohiroh hesegt gargana.
    // 4. төсөвийг тооцоолнов
    // 5. эцэсийн үлдэгдэл харуулна
  };
  document.querySelector(".add__btn").addEventListener("click", function () {
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
