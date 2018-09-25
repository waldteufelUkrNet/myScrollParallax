// .parallax-container
// .parallax-item
// якщо підключати окремим файлом через gulp, конфліктує зі slick.js (його налаштуваннями у js.js)


$(document).ready(function(){

/*

ПОСТАНОВКА ЗАДАЧІ:
простий паралакс ефект: при появі контейнера внизу екрану, елемент в контейнері (розташований на верху контейнера) починає проскролюватися вверх (як і контейнер) з такою швидкістю, що в момент зникнення контейнеру елемент розташовуватимется точно внизу контейнера.

ЗМІННІ:
wS - windowScrollTop - поточна прокрутка (відстань від верху екрану до верху документу)
wH - windowHeight - висота вікна
cT - containerTop - координата контейнера (відстань від верху документа до верху контейнера)
cH - containerHeight - висота контейнера
iH - itemHeight - висота елемента

РОЗРАХУНКИ:
Ефект паролаксу починається тоді, коли контейнер верхнім краєм торкається низу екрана:

      wS + wH >= cT,   --> wS >= cT - wH

а закінчується, коли контейнер нижнім краєм торкається верху екрана:

      wS >= cT + cH

За час перебігу ефекту елемент в контейнері проходить відстань sE:

      від  top: 0px
      до   top: - (iH - cH),
      sE = - (iH - cH)

а контейнер відносно екрану (sC):

      від  top: cT (який в цей момент буде рівним cT = wS + wH)
      до   top: cT - (wH + cH),
      sC = wH + cH

Ці відстані різні, але пов'язані між собою співвідношенням:

      sE = deltaS * S2sC,

звідки deltaS буде рівна:

      deltaS = sE / sC = - (iH - cH) / (wH + cH).

Тепер можливо відслідковувати зміну положення контейнеру і через змінну deltaS вираховувати поточне положення елементу:

      curSE = curSC/deltaS

Для розрахунку зміни положення контейнеру потрібно рівняння його відстаней виразити через поточну прокрутку wS:

      startWS = cT - wH

тоді поточне значення, на яке змінилося положення контейнеру, буде:

      curSC = wS - startWS,

а тоді поточне значення, на яке змінилося положення елементу, буде відповідно:

      curSE = (wS - startWS)/deltaS

*/
    var wS = $(window).scrollTop();
    var wH = $(window).height();
    var cT = $(".parallax-container").offset().top;
    var cH = $(".parallax-container").innerHeight();
    var iH = $(".parallax-item").innerHeight();

    var deltaS = +((wH + cH)/(iH - cH)).toFixed(3); 
    var startWS = cT - wH;

  $(window).scroll(function(){

     wS = $(window).scrollTop();

    if(wS > cT - wH && wS < cH + cT) {

      var curSE = parseInt((wS - cT + wH)/deltaS);
      var translate = "translate(0px,-" + curSE + "px)";
      $(".parallax-item").css({
        "transform": translate
      });
    }
  });

});