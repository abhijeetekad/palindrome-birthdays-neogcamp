var inputEl = document.querySelector("#input-date");
var btnEl = document.querySelector("#btn-el");
var output = document.querySelector("#result");
var socialLink1 = document.querySelector("#social-link1");
var socialLink2 = document.querySelector("#social-link2");

socialLink1.style.display="none"
socialLink2.style.display="none"


function reverseList(str){
    var listOfChars = str.split('');
    var reversedListOfChar = listOfChars.reverse();
    var reversedString = reversedListOfChar.join('');
    return reversedString;
  }
  function isPalindrome(str){
    var reverse = reverseList(str);
   return str === reverse;
  }
  function convertDatetoString(date){
    var dateStr={day:'', month:'', year:''};
    if (date.day<10){
      dateStr.day="0"+date.day;
    }
    else{
      dateStr.day=date.day.toString();
    }
     if (date.month<10){
      dateStr.month="0"+date.month;
    }
    else{
      dateStr.month=date.month.toString();
    }
    dateStr.year=date.year.toString();
    return dateStr
  }
  
  function getAllFormatsofDate(date){
    var dateStr=convertDatetoString(date);
    var ddmmyyyy=dateStr.day+dateStr.month+dateStr.year;
    var mmddyyyy=dateStr.month+dateStr.day+dateStr.year;
    var yyyymmdd=dateStr.year+dateStr.month+dateStr.day;
    var ddmmyy=dateStr.day+dateStr.month+dateStr.year.slice(-2);
    var mmddyy=dateStr.month+dateStr.day+dateStr.year.slice(-2);
    var yymmdd=dateStr.year.slice(-2)+dateStr.month+dateStr.day;
    return [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd];
  }
  
  function checkPalindromeForAllDates(date){
    var listOfPalindrome = getAllFormatsofDate(date);
    var palindrome = false;
  
    for (var i=0;i<listOfPalindrome.length;i++){
      if(isPalindrome(listOfPalindrome[i])){
        palindrome = true;
        break;
      }
    }
    return palindrome;
  } 
  
  function isLeapYear(year){
    if(year % 400==0){
      return true;
    }
    if(year % 100==0){
      return false;
    }
    if (year % 4 == 0){
      return true;
    }
  }
  
  function getNextDate(date){
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
  
    var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
  
    if (month==2){
      if (isLeapYear){
        if (day > 29){
          day=1;
          month++
        }
      }
      else{
        if (day > 28){
          day = 1;
          month++;
        }
      }
    }
    else{
      if(day > daysInMonth[month-1]){
        day=1;
        month++
      }
    }
    if (month > 12){
      month = 1;
      year++
    }
    return {
      day: day,
      month:month,
      year:year
    }
  }
  
  function getNextPalindromeDate(date){
    var ctr = 0;
    var nextDate = getNextDate(date);
  
    while(1){
      ctr++;
      var isPalindrome = checkPalindromeForAllDates(nextDate);
      if (isPalindrome){
        break;
      }
      nextDate = getNextDate(nextDate);
    }
    return [ctr, nextDate];
  }
  
   

  
  
  function clickHandler(event){
    var inputDate = inputEl.value;
    
    if (inputDate !== ''){
      var listOfDates = inputDate.split('-');
      var date={
        day:Number(listOfDates[2]),
        month:Number(listOfDates[1]),
        year:Number(listOfDates[0])
      }
      var isPalindrome = checkPalindromeForAllDates(date);
      
      if (isPalindrome){
        output.innerText="yes!! your birthday is palindrome."
        output.style.color="green";
        socialLink1.style.display="block"
        socialLink2.style.display="block"
      }
      else{
        var [ctr, nextDate] = getNextPalindromeDate(date);
        output.innerText = `Next palindrome date is on ${nextDate.day}-${nextDate.month}-${nextDate.year} !! so you missed by ${ctr} days. `
        output.style.color="red";
        socialLink1.style.display="block"
        socialLink2.style.display="block"
        
      }
    }
  
  }
  btnEl.addEventListener("click", clickHandler);