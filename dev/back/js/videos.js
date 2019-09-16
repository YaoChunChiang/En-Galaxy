$(function(){
    $(".videoC").click(function(){
      $(".upVideoData").hide();
    });
    $(".videoAddData").click(function(){
      $(".upVideoData").show();
    });
  });
  
  /*按修改鍵轉成input*/

  function init(){
    function fixed(e){
      e.target.innerText='送出'; //按鈕修改文字改成送出
      let videoClass=e.target.parentNode.previousElementSibling.innerHTML;
      let videoDesc=e.target.parentNode.previousElementSibling.previousElementSibling.innerText;
      let filmName=e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
      let videoGrade=e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;

      // console.log(videoClass, ":" ,videoDesc,":", filmName,":", grade);
      // e.target.parentNode.previousSibling.remove();

      e.target.parentNode.previousElementSibling.innerHTML=""; //清空
      e.target.parentNode.previousElementSibling.previousElementSibling.innerText="";
      e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.innerText="";
      e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML="";
     
      let selectClass=document.createElement('select'); //新增select
      let OptionMusic=document.createElement('option'); //新增option
      let OptionNews=document.createElement('option');
      let OptionMovie=document.createElement('option');
      let inputDesc=document.createElement('input');
      let inputName=document.createElement('input');
      let selectGrade=document.createElement('select');
      let OptionGa=document.createElement('option');
      let OptionGb=document.createElement('option');
      let OptionGc=document.createElement('option');

      selectClass.value=videoClass; //把videoClass塞到selectClass.value
      inputDesc.value=videoDesc;
      inputName.value=filmName;
      selectGrade.value=videoGrade;

      OptionMusic.innerHTML ='音樂'; //增加option:音樂
      OptionNews.innerHTML='新聞'; //增加option:新聞
      OptionMovie.innerHTML='影劇'; //增加option:影劇

      selectClass.appendChild(OptionMusic); //把slectClass的select選項，增加OptionMusic
      selectClass.appendChild(OptionNews);
      selectClass.appendChild(OptionMovie);
      e.target.parentNode.previousElementSibling.appendChild(selectClass);
      e.target.parentNode.previousElementSibling.previousElementSibling.appendChild(inputDesc);
      e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.appendChild(inputName);
      selectGrade.appendChild(OptionGa);
      selectGrade.appendChild(OptionGb);
      selectGrade.appendChild(OptionGc);
      OptionGa.innerHTML="初級";
      OptionGb.innerHTML="中級";
      OptionGc.innerHTML="高級";
      e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.appendChild(selectGrade);

    }
    for(var i=0;i < document.getElementsByClassName('fixed').length; i++){
      document.getElementsByClassName('fixed')[i].addEventListener('click',fixed);
    }
    

  }
  
  window.addEventListener('load',init);




  // INSERT INTO `video` (`video_no`, `level_no`, `video_name`, `video_desc`, `video_src`, `video_type`, `video_status`) VALUES (NULL, '2', '哈囉', '說你好', NULL, '影劇', '01');