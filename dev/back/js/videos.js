$(function () {
  $(".videoC").click(function () {
    $(".upVideoData").hide();
  });
  $(".videoAddData").click(function () {
    $(".upVideoData").show();
  });
});



function init() {

/*按刪除鍵 studyEngMag.php 開始*/
function videoDel(e){
  let videoNum=e.target.parentNode.parentNode.firstElementChild.innerHTML;
  e.target.parentNode.parentNode.remove();
  $.post('studyEngAdd.php',{videoNum: videoNum, who: 'deleteVideo'}
  ,function(data){console.log(data)}
  );

}
for(var i=0;i<document.getElementsByClassName('videoDel').length;i++){
  document.getElementsByClassName('videoDel')[i].addEventListener('click',videoDel);
}



/*按刪除鍵 studyEngMag.php 結束*/

  /*按修改鍵轉成input studyEngMag.php 開始*/

  function fixed(e) {

    if(e.target.innerText === '修改'){
      
    e.target.innerText = '送出'; //按鈕修改文字改成送出
    let videoPic = e.target.parentNode.previousElementSibling.innerHTML; //影片截圖
    let videoClass = e.target.parentNode.previousElementSibling.previousElementSibling.innerHTML; //影片類別
    let videoDesc = e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.innerText; //影片描述
    let filmName = e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText; //影片名稱
    let videoGrade = e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML; //英文等級

    // console.log(videoClass, ":" ,videoDesc,":", filmName,":", grade);
    // e.target.parentNode.previousSibling.remove();

    e.target.parentNode.previousElementSibling.innerHTML = ""; //清空影片截圖
    e.target.parentNode.previousElementSibling.previousElementSibling.innerHTML = ""; //清空影片類別
    e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.innerText = ""; //清空影片描述
    e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText = "";//清空影片名稱
    e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML = ""; //清空英文等級



    let selectClass = document.createElement('select'); //新增select
    let OptionMusic = document.createElement('option'); //新增option
    let OptionNews = document.createElement('option');
    let OptionMovie = document.createElement('option');
    let inputDesc = document.createElement('input');
    let inputName = document.createElement('input');
    let selectGrade = document.createElement('select');
    let OptionGa = document.createElement('option');
    let OptionGb = document.createElement('option');
    let OptionGc = document.createElement('option');

    let partPic = document.createElement('input');
    partPic.setAttribute("type","file");
    
    // partPic.src = "http://fakeimg.pl/300x100/"; //给img元素的src属性赋值
    selectClass.value = videoClass; //把videoClass塞到selectClass.value
    inputDesc.value = videoDesc;
    inputName.value = filmName;
    selectGrade.value = videoGrade;

    OptionMusic.innerHTML = '音樂'; //增加option:音樂
    OptionNews.innerHTML = '新聞'; //增加option:新聞
    OptionMovie.innerHTML = '影劇'; //增加option:影劇


    e.target.parentNode.previousElementSibling.appendChild(partPic); //影片截圖
    selectClass.appendChild(OptionMusic); //把slectClass的select選項，增加OptionMusic
    selectClass.appendChild(OptionNews);
    selectClass.appendChild(OptionMovie);
    e.target.parentNode.previousElementSibling.previousElementSibling.appendChild(selectClass);
    e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.appendChild(inputDesc);
    e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.appendChild(inputName);
    selectGrade.appendChild(OptionGa);
    selectGrade.appendChild(OptionGb);
    selectGrade.appendChild(OptionGc);
    OptionGa.innerHTML = "初級";
    OptionGb.innerHTML = "中級";
    OptionGc.innerHTML = "高級";
    e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.appendChild(selectGrade);

    }else if(e.target.innerText === '送出'){
    
        let videoGrade=e.target.parentNode.parentNode.childNodes.innerHTML;
        let filmName=e.target.parentNode.parentNode.childNodes.innerHTML;
        let videoDesc=e.target.parentNode.parentNode.childNodes.innerHTML;
        let videoClass=e.target.parentNode.parentNode.childNodes.innerHTML;
        let videoPic=e.target.parentNode.parentNode.childNodes.innerHTML;

        // console.log('videoGrade');
        // console.log('filmName');
        // console.log('videoDesc');
        // console.log('videoClass');
        // console.log('videoPic');

      


       

  





    }


    

  }
  for (var i = 0; i < document.getElementsByClassName('fixed').length; i++) {
    document.getElementsByClassName('fixed')[i].addEventListener('click', fixed);
  }
/*按修改鍵轉成input studyEngMag.php 結束*/

}

window.addEventListener('load', init);