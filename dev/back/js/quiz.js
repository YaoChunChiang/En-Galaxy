/*按修改鍵轉成input studyEngQuizContent.php 開始*/

function init() {

/*按刪除鍵 studyEngQuizContent.php 開始*/
  function quizDel(e){
    let myQuiz=e.target.parentNode.parentNode.firstElementChild.innerHTML;
    e.target.parentNode.parentNode.remove();
    console.log(myQuiz);
    $.post('upQuiz.php',{myQuiz:myQuiz, who:'deleteQuiz'}
    ,function(ccc){console.log(ccc)}
    );
  }

   for(var i=0;i<document.getElementsByClassName('quizDel').length;i++){
     document.getElementsByClassName('quizDel')[i].addEventListener('click',quizDel);
   }

   /*按刪除鍵 studyEngQuizContent.php 結束*/


    function repair(e) {
      e.target.innerText = "送出";
      let ansCort = e.target.parentNode.previousElementSibling.innerText;
      let optFour = e.target.parentNode.previousElementSibling.previousElementSibling.innerText;
      let optThree = e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
      let optTwo = e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
      let optOne = e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
      let videoQuest = e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
  
      e.target.parentNode.previousElementSibling.innerText="";
      e.target.parentNode.previousElementSibling.previousElementSibling.innerText="";
      e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.innerText="";
      e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText="";
      e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText="";
      e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText="";
  
      let input_C = document.createElement('input');
      input_C.size=10; //輸入框10個字的寬度
      let input_F = document.createElement('input');
      input_F.size=10;
      let input_Three = document.createElement('input');
      input_Three.size=10;
      let input_Two = document.createElement('input');
      input_Two.size=10;
      let input_One = document.createElement('input');
      input_One.size=10;
      let input_Quest = document.createElement('input');
      input_Quest.size=20; //輸入框20個字的寬度
  
      input_C.value=ansCort;
      input_F.value=optFour;
      input_Three.value=optThree;
      input_Two.value=optTwo;
      input_One.value=optOne;
      input_Quest.value=videoQuest;
  
      e.target.parentNode.previousElementSibling.appendChild(input_C);
      e.target.parentNode.previousElementSibling.previousElementSibling.appendChild(input_F);
      e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.appendChild(input_Three);
      e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.appendChild(input_Two);
      e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.appendChild(input_One);
      e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.appendChild(input_Quest);
  
    }
    for (var i = 0; i < document.getElementsByClassName('repair').length; i++) {
      document.getElementsByClassName('repair')[i].addEventListener('click', repair);
    }
  }
  
  window.addEventListener('load', init);
    /*按修改鍵轉成input studyEngQuizContent.php 開始*/