var result = document.querySelector('#getResult');
var output = document.querySelector('.outputBMI');
var recordBMI = {
	height:[],
	weight:[],
	BMI:[],
	time:[]
}

var strRecord;

throwBackData();
result.addEventListener('click', getData, false);
//擷取 html 裡的 input 值，並將之存成 object 格式
function getData(){
	
	var height = document.querySelector('#heightInput').value;
	var weight = document.querySelector('#weightInput').value;
	var today = new Date();
	var currentTime = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
	console.log(currentTime);

	//若 height 以及 weight 內有填數字時才會將資料寫入 object 中
	//否則便跳出警告
	if(height != '' && weight != ''){
		height = parseFloat(height);
		weight = parseFloat(weight);
		var BMI = caculate(height, weight);
		BMI = parseFloat(BMI);
		
		//object 中的數值為 array ，直接 push 進去即可。
		pushData(height, weight, BMI, currentTime);

		//將 object 轉存到 localstorage 中
		strRecord = JSON.stringify(recordBMI);
		var localBMI = localStorage.setItem('recordBMI_ls',strRecord);

		//更新畫面
		printOutput();
	}
	else{
		alert('身高及體重欄位不可空白!');
	}
	
}

printOutput();

//計算 BMI
function caculate(h, w){
	h /= 100;
	h = Math.pow(h, 2);
	h = h.toFixed(2);
	var b = w/h;
	b = b.toFixed(2);
	return b;
}


//讓使用者只能輸入數字
//參考網址：https://goo.gl/bGfFPX
function validate(evt) {
  var theEvent = evt || window.event;

  // Handle paste
  if (theEvent.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
  } else {
  // Handle key press
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
  }
  var regex = /[0-9]|\./;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
}

function printOutput(){
	var getRecordData = localStorage.getItem('recordBMI_ls');
	
	//若 localstorage中有資料才會執行下列指令
	if(getRecordData !== null){

		var recordBMI_ary = JSON.parse(getRecordData);
		var str = '';
		for(var i = 0; i < recordBMI_ary.BMI.length; i++){
			var borderColor = whatColorIsIt(recordBMI_ary.BMI[i]);
			str += '<li style="border-left: 8px solid'+ borderColor +';"><em class="titleHead">';
			str += isOverWeighted(recordBMI_ary.BMI[i]);
			str += '</em><em class="titleName">Height</em> <em class="titleValue">';
			str += recordBMI_ary.height[i];
			str += 'cm</em><em class="titleName">Weight</em> <em class="titleValue">';
			str += recordBMI_ary.weight[i];
			str += 'kg</em><em class="titleName">BMI</em> ';
			str += recordBMI_ary.BMI[i];
			str += '<em class="titleName" style="float: right; margin-right: 5px;">'+ recordBMI_ary.time[i] +'</em>';
			str += '</li>';
		}

		output.innerHTML = str;
	}
}

function pushData(h, w, B, t){
	recordBMI.height.push(h);
	recordBMI.weight.push(w);
	recordBMI.BMI.push(B);
	recordBMI.time.push(t);
}

function throwBackData(){
	var getRecordData = localStorage.getItem('recordBMI_ls');
		
	if(getRecordData !== null){
		var recordBMI_ary = JSON.parse(getRecordData);
		for(var i = 0; i < recordBMI_ary.BMI.length; i++){
			pushData(recordBMI_ary.height[i], recordBMI_ary.weight[i], recordBMI_ary.BMI[i], recordBMI_ary.Time[i]);
		}	
	}
}


//判斷 BMI 體位
function isOverWeighted(B) {
	if(B < 18.5){
		return '過輕';
	}
	else if (B >= 18.5 && B < 25){
		return '理想';
	}
	else if (B >= 25 && B < 30){
		return '過重';
	}
	else if (B >= 30 && B < 35){
		return '輕度肥胖';
	}
	else if (B >= 35 && B < 40){
		return '中度肥胖';
	}
	else{
		return '重度肥胖';
	}
}

function whatColorIsIt(B){
	if(B < 18.5){
		return '#31BAF9';
	}
	else if (B >= 18.5 && B < 25){
		return '#86D73F';
	}
	else if (B >= 25 && B < 30){
		return '#FF982D';
	}
	else if (B >= 30 && B < 35){
		return '#FF6C03';
	}
	else if (B >= 35 && B < 40){
		return '#FF6C03';
	}
	else{
		return '#FF1200';
	}
}

